import { useEffect, useState, useRef } from "preact/hooks";
import { saveOrder, loadOrder } from "../scripts/idb-order";
import SkeletonCard from "./SkeletonCard";
import PortfolioCard from "./PortfolioCard";
import { openModal } from "../store/modalStore";

export interface SocialLink {
  icon: string;
  url: string;
  color: string;
  label?: string; // e.g. "My Medium Profile"
}

export interface StackItem {
  name: string;
  icon: string;
  color: string;
  description?: string; // e.g. "Experienced with Angular 14+"
}

export interface ServiceItem {
  text: string;
  gradient: string;
  details?: string; // Extended description for modal
}

export interface PortfolioItem {
  id: string;
  type:
    | "projects"
    | "community"
    | "design"
    | "social"
    | "services"
    | "stack"
    | "articles"
    | "about";
  title: string;
  description?: string;
  details?: any; // Rich content for the modal (HTML string or specific structure)
  colSpan?: "col-span-1" | "col-span-2";
  content?: SocialLink[] | StackItem[] | ServiceItem[];
  actionLabel?: string;
  lang?: string; // Track language of the data
}

interface PortfolioGridProps {
  initialItems: PortfolioItem[];
}

// Fixed bento layout pattern for visual consistency
const LAYOUT_PATTERN: ("col-span-1" | "col-span-2")[] = [
  "col-span-2", // Big
  "col-span-1", // Small
  "col-span-1", // Small
  "col-span-1", // Small
  "col-span-1", // Small
  "col-span-1", // Small
  "col-span-2", // Big
];

export default function PortfolioGrid({ initialItems }: PortfolioGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and handle Swapy enable/disable
  useEffect(() => {
    let isMounted = true;

    const initSwapy = async () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Completely destroy Swapy when switching or re-initializing
      if (swapyRef.current) {
        swapyRef.current.destroy();
        swapyRef.current = null;
      }

      // Only initialize Swapy on desktop
      if (!mobile && isLoaded && containerRef.current) {
        try {
          // Dynamic import for swapy to reduce initial bundle
          const { createSwapy } = await import("swapy");

          if (!isMounted) return;

          swapyRef.current = createSwapy(containerRef.current, {
            animation: "dynamic",
          });

          swapyRef.current.onSwapEnd(async (data: any) => {
            const slots =
              containerRef.current?.querySelectorAll("[data-swapy-slot]");
            if (!slots) return;

            const newOrderIds: string[] = [];
            slots.forEach((slot) => {
              const item = slot.querySelector("[data-swapy-item]");
              if (item) {
                const id = item.getAttribute("data-swapy-item");
                if (id) newOrderIds.push(id);
              }
            });

            if (newOrderIds.length > 0) {
              await saveOrder(newOrderIds);
            }
          });
        } catch (error) {
          console.error("Failed to load Swapy:", error);
        }
      }
    };

    initSwapy();

    const handleResize = () => {
      // Debounce could be added here
      initSwapy();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      if (swapyRef.current) {
        swapyRef.current.destroy();
      }
    };
  }, [isLoaded]);

  // Load saved order from IDB
  useEffect(() => {
    const loadSavedOrder = async () => {
      try {
        const savedOrder = await loadOrder();
        if (
          !savedOrder ||
          !Array.isArray(savedOrder) ||
          savedOrder.length === 0
        ) {
          setIsLoaded(true);
          return;
        }

        const reordered = [...initialItems].sort((a, b) => {
          const indexA = savedOrder.indexOf(a.id);
          const indexB = savedOrder.indexOf(b.id);
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });
        setItems(reordered);
      } catch (e) {
        console.error("Failed to load order from IDB", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSavedOrder();
  }, []);

  // Skeleton loading state
  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {initialItems.map((item, index) => {
          const patternColSpan = LAYOUT_PATTERN[index % LAYOUT_PATTERN.length];
          return (
            <div
              key={item.id}
              className={`${
                patternColSpan === "col-span-2"
                  ? "md:col-span-2"
                  : "md:col-span-1"
              }`}
            >
              <SkeletonCard colSpan={patternColSpan} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
        id="portfolio-grid"
      >
        {items.map((item, index) => {
          // Use fixed pattern for bento grid layout
          const patternColSpan = LAYOUT_PATTERN[index % LAYOUT_PATTERN.length];

          return (
            <div
              key={item.id}
              data-swapy-slot={item.id}
              className={`${
                patternColSpan === "col-span-2"
                  ? "md:col-span-2"
                  : "md:col-span-1"
              }`}
              style={isMobile ? { touchAction: "pan-y" } : undefined}
            >
              <PortfolioCard
                item={item}
                colSpan={patternColSpan}
                onSelect={(id) => {
                  // Find the item and open global modal
                  const found = items.find((i) => i.id === id);
                  if (found) openModal(found);
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
