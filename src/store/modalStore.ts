import { atom } from "nanostores";

export type ModalPhase = "closed" | "entering" | "open" | "exiting";

export const isModalOpen = atom(false);
export const selectedItem = atom<any>(null);
export const aboutMeStore = atom<any>(null);

/** Bounding rect of the card that was clicked to open the modal */
export const cardRect = atom<DOMRect | null>(null);

/** Element that opened the modal (for returning focus on close) */
export const modalOpener = atom<HTMLElement | null>(null);

/** Animation phase for the shared-element transition */
export const modalPhase = atom<ModalPhase>("closed");

export function openModal(
  item: any,
  rect?: DOMRect,
  opener?: HTMLElement | null,
) {
  cardRect.set(rect ?? null);
  modalOpener.set(opener ?? null);
  selectedItem.set(item);
  modalPhase.set("entering");
  isModalOpen.set(true);
}

/** Called by the modal once the enter animation finishes */
export function finishEntering() {
  modalPhase.set("open");
}

export function closeModal() {
  modalPhase.set("exiting");
  // The modal component calls finishExiting() after its exit animation
}

/** Called by the modal once the exit animation finishes */
export function finishExiting() {
  modalPhase.set("closed");
  isModalOpen.set(false);
  selectedItem.set(null);
  cardRect.set(null);
  modalOpener.set(null);
}
