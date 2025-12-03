import { createSwapy } from "swapy";
import { animate } from "motion";
import { saveOrder, loadOrder } from "./idb-order";

export function initSwapyGrid() {
  const container = document.querySelector("[data-swapy-container]");
  if (!container) {
    console.error("Swapy container not found");
    return;
  }

  try {
    const swapy = createSwapy(container as unknown as HTMLElement);

    // Animate when items are swapped
    swapy.onSwap((evt: any) => {
      const data = evt?.detail || evt?.data || evt;
      if (!data) return;
      const slotA = data.slotA || data.slot1 || data[0];
      const slotB = data.slotB || data.slot2 || data[1];

      if (slotA?.element) {
        animate(slotA.element, { scale: [0.95, 1] }, { duration: 0.38 });
      }
      if (slotB?.element) {
        animate(slotB.element, { scale: [0.95, 1] }, { duration: 0.38 });
      }
    });

    // Save order after swap ends (persist to IndexedDB)
    swapy.onSwapEnd(async () => {
      const slots = container.querySelectorAll("[data-swapy-slot]");
      const order = Array.from(slots).map(
        (slot) => slot.getAttribute("data-swapy-slot") || ""
      );
      // filter out empty keys and deduplicate
      const filtered = Array.from(
        new Set(order.filter((k) => typeof k === "string" && k.length > 0))
      );
      console.log(
        "onSwapEnd detected - raw order:",
        order,
        "filtered:",
        filtered
      );
      if (filtered.length > 0) {
        try {
          await saveOrder(filtered);
          console.log("Card order saved:", filtered);
        } catch (e) {
          console.error("Failed to save card order:", e);
        }
      } else {
        console.warn("No valid data-swapy-slot attributes found to save");
      }
    });

    // Restore order from IndexedDB (reorder DOM slots) and animate appearance
    (async () => {
      try {
        const saved = await loadOrder();
        const slots = Array.from(
          container.querySelectorAll<HTMLElement>("[data-swapy-slot]")
        );
        if (Array.isArray(saved) && saved.length) {
          console.log("Loaded saved order from DB:", saved);
          // map existing slots
          const map = new Map<string, HTMLElement>();
          slots.forEach((el) => {
            const key = el.getAttribute("data-swapy-slot");
            if (key) map.set(key, el);
          });

          const available = Array.from(map.keys());
          const missing = saved.filter((id) => !map.has(id));
          if (missing.length) {
            console.warn(
              "Saved slot ids not present in DOM:",
              missing,
              "available:",
              available
            );
          }

          // append in saved order (appendChild moves existing nodes)
          const restored: HTMLElement[] = [];
          saved.forEach((id) => {
            const el = map.get(id);
            if (el) {
              container.appendChild(el);
              restored.push(el);
            }
          });

          // Ask Swapy to rebuild internal state after DOM changes
          if (typeof swapy.update === "function") {
            swapy.update();
          }

          // animate restored items with a consistent animation + small stagger
          restored.forEach((el, i) => {
            try {
              animate(
                el,
                { opacity: [0, 1], translateY: [12, 0], scale: [0.98, 1] },
                { duration: 0.42, delay: i * 0.06 }
              );
            } catch (e) {
              // fallback: set visible
              el.style.opacity = "";
            }
          });

          console.log("Restored card order:", saved);
          return;
        }

        // No saved order: animate initial appearance (same animation each load)
        slots.forEach((el, i) => {
          try {
            animate(
              el,
              { opacity: [0, 1], translateY: [12, 0], scale: [0.98, 1] },
              { duration: 0.42, delay: i * 0.06 }
            );
          } catch (e) {
            el.style.opacity = "";
          }
        });
      } catch (e) {
        console.warn("No saved card order or failed to restore:", e);
      }
    })();

    console.log("Swapy initialized successfully");
    return swapy;
  } catch (error) {
    console.error("Failed to initialize Swapy:", error);
  }
}
