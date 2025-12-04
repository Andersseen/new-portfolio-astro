import { useEffect, useState, useRef } from "preact/hooks";
import { createSwapy } from "swapy";
import { saveOrder, loadOrder } from "../scripts/idb-order";
import { AnimatePresence } from "motion/react";
import SkeletonCard from "./SkeletonCard";
import PortfolioCard from "./PortfolioCard";
import PortfolioModal from "./PortfolioModal";

export interface SocialLink {
  icon: string;
  url: string;
  color: string;
}

export interface StackItem {
  name: string;
  icon: string;
  color: string;
}

export interface ServiceItem {
  text: string;
  gradient: string;
}

export interface PortfolioItem {
  id: string;
  type:
    | "projects"
    | "about"
    | "design"
    | "social"
    | "services"
    | "stack"
    | "articles";
  title: string;
  description?: string;
  colSpan?: "col-span-1" | "col-span-2";
  content?: SocialLink[] | StackItem[] | ServiceItem[];
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and handle Swapy enable/disable
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Completely destroy and recreate Swapy when switching between mobile/desktop
      if (swapyRef.current) {
        swapyRef.current.destroy();
        swapyRef.current = null;
      }

      // Only initialize Swapy on desktop
      if (!mobile && isLoaded && containerRef.current) {
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
            console.log("Saved new order to IDB:", newOrderIds);
          }
        });
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
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

  const selectedItem = items.find((i) => i.id === selectedId);

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
                onSelect={setSelectedId}
              />
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <PortfolioModal
            item={selectedItem}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
