import { createSwapy } from "swapy";
import { animate } from "motion";

export function initSwapyGrid() {
  const container = document.querySelector("[data-swapy-container]");
  if (!container) return;

  const swapy = createSwapy(container);

  // Animate when items are swapped
  swapy.onSwap((event) => {
    const { slotItemA, slotItemB } = event.detail;

    // Add animation to swapped items
    [slotItemA, slotItemB].forEach((item) => {
      if (item?.element) {
        animate(item.element, { scale: [0.95, 1] }, { duration: 0.3 });
      }
    });
  });

  // Save order to localStorage
  swapy.onSwapEnd(() => {
    const order = Array.from(
      container.querySelectorAll("[data-swapy-slot]")
    ).map(
      (slot, index) =>
        slot.getAttribute("data-swapy-slot-id") || `card-${index}`
    );
    localStorage.setItem("portfolio-card-order", JSON.stringify(order));
  });

  // Restore order from localStorage
  const savedOrder = localStorage.getItem("portfolio-card-order");
  if (savedOrder) {
    try {
      // Order is automatically maintained by Swapy
      // Just log for debugging
      console.log("Restored card order:", JSON.parse(savedOrder));
    } catch (e) {
      console.error("Failed to restore card order:", e);
    }
  }

  return swapy;
}
