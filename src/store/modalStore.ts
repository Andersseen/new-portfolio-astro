import { atom } from "nanostores";

export const isModalOpen = atom(false);
export const selectedItem = atom<any>(null);
export const aboutMeStore = atom<any>(null);

export function openModal(item: any) {
  selectedItem.set(item);
  isModalOpen.set(true);
}

export function closeModal() {
  isModalOpen.set(false);
  setTimeout(() => selectedItem.set(null), 300); // Wait for animation
}
