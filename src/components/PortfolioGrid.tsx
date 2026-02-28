import { useEffect, useState, useRef } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { AnimatePresence } from "motion/react";
import { saveOrder, loadOrder } from "../scripts/idb-order";
import SkeletonCard from "./SkeletonCard";
import PortfolioCard from "./PortfolioCard";
import { openModal, closeModal, isModalOpen, selectedItem } from "../store/modalStore";
import PortfolioModal from "./PortfolioModal";

const AnimatePresenceAny = AnimatePresence as any;

export interface SocialLink {
  icon: string;
  url: string;
  color: string;
  label?: string; 
}

export interface StackItem {
  name: string;
  icon: string;
  color: string;
  description?: string; 
}

export interface ServiceItem {
  text: string;
  gradient: string;
  details?: string; 
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
  details?: any; 
  colSpan?: "col-span-1" | "col-span-2";
  content?: SocialLink[] | StackItem[] | ServiceItem[];
  actionLabel?: string;
  lang?: string; 
}

interface PortfolioGridProps {
  initialItems: PortfolioItem[];
}


const LAYOUT_PATTERN: ("col-span-1" | "col-span-2")[] = [
  "col-span-2", 
  "col-span-1", 
  "col-span-1", 
  "col-span-1", 
  "col-span-1", 
  "col-span-1", 
  "col-span-2", 
];

export default function PortfolioGrid({ initialItems }: PortfolioGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [isMobile, setIsMobile] = useState(false);

  // Modal state from store
  const modalOpen = useStore(isModalOpen);
  const modalItem = useStore(selectedItem);

  // Block scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  
  useEffect(() => {
    let isMounted = true;

    const initSwapy = async () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      
      if (swapyRef.current) {
        swapyRef.current.destroy();
        swapyRef.current = null;
      }

      
      if (!mobile && isLoaded && containerRef.current) {
        try {
          
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

  
  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[320px]">
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[320px]"
        id="portfolio-grid"
      >
        {items.map((item, index) => {
          
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
                onSelect={(id, rect) => {
                  const found = items.find((i) => i.id === id);
                  if (found) openModal(found, rect);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Modal with zoom animation */}
      <AnimatePresenceAny>
        {modalOpen && modalItem && (
          <PortfolioModal
            key={modalItem.id}
            item={modalItem}
            onClose={closeModal}
          />
        )}
      </AnimatePresenceAny>
    </>
  );
}
