import { atom } from "nanostores";
import type { PortfolioItem } from "../components/PortfolioGrid";

export const isModalOpen = atom(false);
export const selectedItem = atom<PortfolioItem | null>(null);

export function openModal(item: PortfolioItem) {
  selectedItem.set(item);
  isModalOpen.set(true);
}

export function closeModal() {
  isModalOpen.set(false);
  setTimeout(() => {
    selectedItem.set(null);
  }, 300); // Clear after animation
}
