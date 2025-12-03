import { useEffect, useState, useRef } from "preact/hooks";
import { createSwapy } from "swapy";
import { saveOrder, loadOrder } from "../scripts/idb-order";
import Card from "./Card";
import { motion, AnimatePresence } from "motion/react";

// Icons
const Icons = {
  github: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path
        fill-rule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clip-rule="evenodd"
      ></path>
    </svg>
  ),
  gitlab: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.955 13.487l-1.477-4.779a.75.75 0 0 0-.71-.561h-.001l-2.275-.008-1.605-5.02a.75.75 0 0 0-.714-.472.748.748 0 0 0-.71.464l-1.571 4.977H8.713l-1.57-4.977a.75.75 0 0 0-.71-.464.748.748 0 0 0-.714.472l-1.606 5.02-2.275.008h-.001a.75.75 0 0 0-.71.561l-1.477 4.779a.753.753 0 0 0 .272.839l9.906 7.215 9.906-7.215a.753.753 0 0 0 .272-.839Z"></path>
    </svg>
  ),
  medium: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2.5 3c-1.38 0-2.5 1.12-2.5 2.5v13c0 1.38 1.12 2.5 2.5 2.5h19c1.38 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.12-2.5-2.5-2.5H2.5zm15.5 4v8c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1s1 .45 1 1zm-4 .5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM2 7c.55 0 1 .45 1 1v5c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1z"></path>
    </svg>
  ),
  ts: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M8 12h2" />
      <path d="M10 12v4" />
      <path d="M14 16v-4h2" />
      <path d="M14 12h2" />
    </svg>
  ),
  nx: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  angular: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M3 6l9-4 9 4v8l-9 4-9-4V6z" />
      <path d="M12 7v10" />
    </svg>
  ),
  docker: (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 10h2v6H4z" />
      <path d="M8 10h2v6H8z" />
      <path d="M12 10h2v6h-2z" />
      <path d="M4 6h2v2H4z" />
      <path d="M8 6h2v2H8z" />
      <path d="M12 6h2v2h-2z" />
      <path d="M16 6h2v2h-2z" />
      <path d="M4 18h16v2H4z" />
    </svg>
  ),
};

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
  content?: any; // For custom content like lists
}

interface PortfolioGridProps {
  initialItems: PortfolioItem[];
}

export default function PortfolioGrid({ initialItems }: PortfolioGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved order synchronously to prevent animation
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    // Try to get saved order from localStorage (sync)
    try {
      const savedOrderStr = localStorage.getItem("portfolio-card-order");
      if (savedOrderStr) {
        const savedOrder = JSON.parse(savedOrderStr);
        if (Array.isArray(savedOrder) && savedOrder.length > 0) {
          // Reorder items based on savedOrder
          const reordered = [...initialItems].sort((a, b) => {
            const indexA = savedOrder.indexOf(a.id);
            const indexB = savedOrder.indexOf(b.id);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          });
          return reordered;
        }
      }
    } catch (e) {
      console.error("Failed to load saved order from localStorage", e);
    }
    return initialItems;
  });

  // Sync with IDB after mount (backup)
  useEffect(() => {
    const syncWithIDB = async () => {
      try {
        const savedOrder = await loadOrder();
        if (savedOrder && savedOrder.length > 0) {
          // Also save to localStorage for faster sync load
          localStorage.setItem(
            "portfolio-card-order",
            JSON.stringify(savedOrder)
          );
        }
      } catch (e) {
        console.error("Failed to sync with IDB", e);
      }
      setIsLoaded(true);
    };
    syncWithIDB();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      swapyRef.current = createSwapy(containerRef.current, {
        animation: "dynamic",
      });

      swapyRef.current.onSwapEnd(async (data: any) => {
        // data.hasChanged is true if order changed
        // We need to get the new order of ITEMS
        // The slots might have been reordered in DOM?
        // Swapy documentation says: "Swapy converts your layout into a drag-to-swap layout".
        // It swaps the ITEMS between SLOTS.
        // So we should query the slots in DOM order, and see which item is inside.

        const slots =
          containerRef.current?.querySelectorAll("[data-swapy-slot]");
        if (slots) {
          const newOrder: string[] = [];
          slots.forEach((slot) => {
            const item = slot.querySelector("[data-swapy-item]");
            if (item) {
              const id = item.getAttribute("data-swapy-item");
              if (id) newOrder.push(id);
            }
          });

          if (newOrder.length > 0) {
            // Save to both localStorage (instant) and IDB (backup)
            localStorage.setItem(
              "portfolio-card-order",
              JSON.stringify(newOrder)
            );
            await saveOrder(newOrder);
            console.log("Saved new order:", newOrder);
          }
        }
      });
    }

    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy();
      }
    };
  }, []); // Run once on mount (after initial render)

  const selectedItem = items.find((i) => i.id === selectedId);

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
                  {item.type === "social" && (
                    <div className="flex gap-4 justify-center mt-4">
                      {item.content.map((link: any) => (
                        <a
                          href={link.url}
                          className={`p-3 rounded-full bg-${link.color}/10 text-${link.color} hover:bg-${link.color}/20 transition-all`}
                        >
                          {Icons[link.icon as keyof typeof Icons]}
                        </a>
                      ))}
                    </div>
                  )}

                  {item.type === "stack" && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {item.content.map((tech: any) => (
                        <div
                          className={`flex flex-col items-center justify-center p-3 rounded-lg bg-${tech.color}/10 border border-${tech.color}/20 hover:bg-${tech.color}/15 transition-all`}
                        >
                          <div className={`text-${tech.color} mb-2`}>
                            {Icons[tech.icon as keyof typeof Icons]}
                          </div>
                          <span className="text-xs font-medium text-foreground-secondary">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.type === "services" && (
                    <div className="mt-4 space-y-2">
                      {item.content.map((service: any) => (
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
                        →
                      </span>
                    </div>
                  )}

                  {item.type === "design" && (
                    <div className="flex items-center gap-2 text-sm font-medium text-accent/80 group-hover:text-accent transition-colors">
                      View
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  )}

                  {item.type === "articles" && (
                    <div className="flex items-center gap-2 text-sm font-medium text-success/80 group-hover:text-success transition-colors">
                      Read
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
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
                    <svg
                      className="w-6 h-6 text-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
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
