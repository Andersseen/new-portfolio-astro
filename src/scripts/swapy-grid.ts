import { createSwapy } from "swapy";
import { animate } from "motion";

export function initSwapyGrid() {
  const container = document.querySelector("[data-swapy-container]");
  if (!container) {
    console.error("Swapy container not found");
    return;
  }

  try {
    const swapy = createSwapy(container);

    // Animate when items are swapped
    swapy.onSwap(({ data }) => {
      if (!data) return;

      const { slotA, slotB } = data;

      // Add smooth animation to swapped slots
      if (slotA?.element) {
        animate(
          slotA.element,
          { scale: [0.95, 1] },
          { duration: 0.4, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
        );
      }

      if (slotB?.element) {
        animate(
          slotB.element,
          { scale: [0.95, 1] },
          { duration: 0.4, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
        );
      }
    });

    // Save order after swap ends
    swapy.onSwapEnd(() => {
      const slots = container.querySelectorAll("[data-swapy-slot]");
      const order = Array.from(slots).map((slot) => {
        return slot.getAttribute("data-swapy-slot") || "";
      });

      if (order.length > 0) {
        localStorage.setItem("portfolio-card-order", JSON.stringify(order));
        console.log("Card order saved:", order);
      }
    });

    console.log("Swapy initialized successfully");
    return swapy;
  } catch (error) {
    console.error("Failed to initialize Swapy:", error);
  }
}
