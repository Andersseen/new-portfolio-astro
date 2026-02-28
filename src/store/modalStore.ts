import { atom } from "nanostores";

export const isModalOpen = atom(false);
export const selectedItem = atom<any>(null);
export const aboutMeStore = atom<any>(null);

/** Bounding rect of the card that was clicked to open the modal */
export const cardRect = atom<DOMRect | null>(null);

export function openModal(item: any, rect?: DOMRect) {
  cardRect.set(rect ?? null);
  selectedItem.set(item);
  isModalOpen.set(true);
}

export function closeModal() {
  isModalOpen.set(false);
  setTimeout(() => {
    selectedItem.set(null);
    cardRect.set(null);
  }, 300);
}
