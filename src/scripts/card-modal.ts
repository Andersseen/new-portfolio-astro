// Simple modal for cards: click a card to open enlarged centered modal
function createModal() {
  const existing = document.getElementById("card-modal-overlay");
  if (existing) return existing;

  const overlay = document.createElement("div");
  overlay.id = "card-modal-overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.background = "rgba(0,0,0,0.4)";
  overlay.style.zIndex = "9999";

  const container = document.createElement("div");
  container.id = "card-modal-container";
  container.style.width = "min(900px, 95%)";
  container.style.maxHeight = "90%";
  container.style.overflow = "auto";
  container.style.borderRadius = "16px";
  container.style.background = "var(--card-bg, white)";
  container.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
  container.style.padding = "1.25rem";
  container.style.transform = "scale(0.98)";
  container.style.transition = "transform 180ms ease, opacity 180ms ease";

  overlay.appendChild(container);
  document.body.appendChild(overlay);
  return overlay;
}

function openModalFromElement(el: HTMLElement) {
  const overlay = createModal() as HTMLDivElement;
  const container = overlay.querySelector(
    "#card-modal-container"
  ) as HTMLElement;
  if (!container) return;
  // clone the card content
  container.innerHTML = "";
  const clone = el.cloneNode(true) as HTMLElement;
  // cleanup draggable attributes to avoid conflicts
  clone.removeAttribute("data-swapy-slot");
  clone.removeAttribute("data-swapy-item");
  clone.style.width = "100%";
  clone.style.height = "auto";
  container.appendChild(clone);

  overlay.style.display = "flex";
  requestAnimationFrame(() => {
    container.style.transform = "scale(1)";
    container.style.opacity = "1";
  });

  // focus trap simple
  overlay.tabIndex = -1;
  overlay.focus();

  function onKey(e: KeyboardEvent) {
    if (e.key === "Escape") closeModal();
  }
  function onClick(e: MouseEvent) {
    if (e.target === overlay) closeModal();
  }

  function closeModal() {
    overlay.style.display = "none";
    container.style.transform = "scale(0.98)";
    container.innerHTML = "";
    document.removeEventListener("keydown", onKey);
    overlay.removeEventListener("click", onClick);
  }

  document.addEventListener("keydown", onKey);
  overlay.addEventListener("click", onClick);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("[data-swapy-container]");
  if (!container) return;
  container.addEventListener("click", (ev) => {
    const target = ev.target as HTMLElement;
    // find closest swapy-slot or swapy-item
    const slot = target.closest("[data-swapy-slot]") as HTMLElement | null;
    if (slot) {
      // get inner item element if exists
      const item = slot.querySelector(
        "[data-swapy-item]"
      ) as HTMLElement | null;
      const el = item || slot;
      openModalFromElement(el);
    }
  });
});

export {};
