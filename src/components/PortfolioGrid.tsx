import { useEffect, useState, useRef } from "preact/hooks";
import { createSwapy } from "swapy";
import { saveOrder, loadOrder } from "../scripts/idb-order";
import Card from "./Card";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Gitlab,
  FileText,
  Code2,
  Box,
  Container,
  Layers,
  X,
  ArrowRight,
} from "lucide-preact";

// Cast icons to any to avoid "cannot be used as a JSX component" errors
// due to type mismatches between lucide-preact and the current project setup
const ArrowRightIcon = ArrowRight as any;
const XIcon = X as any;

// Map icon names to Lucide components
const IconMap: Record<string, any> = {
  github: Github,
  gitlab: Gitlab,
  medium: FileText,
  ts: Code2,
  nx: Box,
  angular: Layers,
  docker: Container,
};

interface SocialLink {
  icon: string;
  url: string;
  color: string;
}

interface StackItem {
  name: string;
  icon: string;
  color: string;
}

interface ServiceItem {
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

const SkeletonCard = ({ colSpan }: { colSpan?: string }) => (
  <div
    className={`h-full w-full rounded-3xl bg-background-secondary border border-border/50 overflow-hidden relative ${
      colSpan === "col-span-2" ? "md:col-span-2" : "md:col-span-1"
    }`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent skeleton-shimmer" />
    <div className="p-6 h-full flex flex-col gap-4">
      <div className="w-1/3 h-6 bg-foreground/5 rounded-lg" />
      <div className="w-2/3 h-4 bg-foreground/5 rounded-lg" />
      <div className="flex-1" />
      <div className="w-full h-24 bg-foreground/5 rounded-xl" />
    </div>
  </div>
);

export default function PortfolioGrid({ initialItems }: PortfolioGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);

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

  // Initialize Swapy only after items are loaded and rendered
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    swapyRef.current = createSwapy(containerRef.current, {
      animation: "dynamic",
    });

    swapyRef.current.onSwapEnd(async (data: any) => {
      const slots = containerRef.current?.querySelectorAll("[data-swapy-slot]");
      if (!slots) return;

      const newOrderIds: string[] = [];
      slots.forEach((slot) => {
        const item = slot.querySelector("[data-swapy-item]");
        if (item) {
          const id = item.getAttribute("data-swapy-item");
          if (id) newOrderIds.push(id);
        }
      });

      if (newOrderIds.length === 0) return;

      // Update state to reflect new order physically in DOM
      // This prevents "breaking" layout where small slots hold big items
      const newItemsOrder = newOrderIds
        .map((id) => items.find((item) => item.id === id))
        .filter((item): item is PortfolioItem => !!item);

      setItems(newItemsOrder);
      await saveOrder(newOrderIds);
      console.log("Saved new order to IDB:", newOrderIds);
    });

    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy();
      }
    };
  }, [isLoaded, items]); // Re-init swapy when items change to ensure it tracks new DOM

  const selectedItem = items.find((i) => i.id === selectedId);

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {initialItems.map((item) => (
          <div
            key={item.id}
            className={`${
              item.colSpan === "col-span-2" ? "md:col-span-2" : "md:col-span-1"
            }`}
          >
            <SkeletonCard colSpan={item.colSpan} />
          </div>
        ))}
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
        {items.map((item) => (
          <div
            key={item.id}
            data-swapy-slot={item.id}
            className={`${
              item.colSpan === "col-span-2" ? "md:col-span-2" : "md:col-span-1"
            }`}
          >
            <div
              data-swapy-item={item.id}
              className="w-full h-full"
              onClick={() => setSelectedId(item.id)}
            >
              <motion.div layoutId={item.id} className="h-full">
                <Card
                  id={item.id}
                  title={item.title}
                  description={item.description || ""}
                  colSpan={item.colSpan}
                  badge={
                    item.type === "projects"
                      ? "Featured"
                      : item.type === "articles"
                      ? "Recent"
                      : undefined
                  }
                  badgeColor={
                    item.type === "projects"
                      ? "primary"
                      : item.type === "articles"
                      ? "success"
                      : "primary"
                  }
                >
                  {/* Render specific content based on type */}
                  {item.type === "social" && item.content && (
                    <div className="flex gap-4 justify-center mt-4">
                      {(item.content as SocialLink[]).map((link) => {
                        const IconComponent = IconMap[link.icon];
                        return (
                          <a
                            href={link.url}
                            className={`p-3 rounded-full bg-${link.color}/10 text-${link.color} hover:bg-${link.color}/20 transition-all`}
                          >
                            {IconComponent && (
                              <IconComponent className="w-6 h-6" />
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {item.type === "stack" && item.content && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {(item.content as StackItem[]).map((tech) => {
                        const IconComponent = IconMap[tech.icon];
                        return (
                          <div
                            className={`flex flex-col items-center justify-center p-3 rounded-lg bg-${tech.color}/10 border border-${tech.color}/20 hover:bg-${tech.color}/15 transition-all`}
                          >
                            <div className={`text-${tech.color} mb-2`}>
                              {IconComponent && (
                                <IconComponent className="w-6 h-6" />
                              )}
                            </div>
                            <span className="text-xs font-medium text-foreground-secondary">
                              {tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {item.type === "services" && item.content && (
                    <div className="mt-4 space-y-2">
                      {(item.content as ServiceItem[]).map((service) => (
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}
                          ></div>
                          <span className="text-sm text-foreground-secondary">
                            {service.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Default content for others */}
                  {item.type === "projects" && (
                    <div className="flex items-center gap-2 text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
                      Explore
                      <span className="group-hover:translate-x-1 transition-transform">
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  )}

                  {item.type === "design" && (
                    <div className="flex items-center gap-2 text-sm font-medium text-accent/80 group-hover:text-accent transition-colors">
                      View
                      <span className="group-hover:translate-x-1 transition-transform">
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  )}

                  {item.type === "articles" && (
                    <div className="flex items-center gap-2 text-sm font-medium text-success/80 group-hover:text-success transition-colors">
                      Read
                      <span className="group-hover:translate-x-1 transition-transform">
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  )}

                  {item.type === "about" && (
                    <div className="mt-4">
                      {/* Content is handled by Card props mostly, but we can add more here */}
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={selectedId}
              className="w-full max-w-3xl bg-background rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e: any) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-4xl font-bold text-foreground">
                    {selectedItem.title}
                  </h2>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="p-2 rounded-full hover:bg-foreground/10"
                  >
                    <XIcon className="w-6 h-6 text-foreground" />
                  </button>
                </div>
                <p className="text-lg text-foreground-secondary mb-8">
                  {selectedItem.description}
                </p>

                {/* Expanded Content */}
                <div className="prose prose-invert max-w-none">
                  <p>
                    Here you can put more detailed content for{" "}
                    {selectedItem.title}.
                  </p>
                  {/* We can pass expanded content in props or fetch it */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
