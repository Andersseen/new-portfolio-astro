import { useStore } from "@nanostores/preact";
import { isModalOpen, selectedItem, closeModal } from "../store/modalStore";
// import { AnimatePresence } from "motion/react"; // Removing to fix build error
import PortfolioModal from "./PortfolioModal";
import { Suspense, lazy } from "preact/compat";

// We can still lazy load the internal heavy modal content
const LazyPortfolioModal = lazy(() => import("./PortfolioModal"));

export default function ModalManager() {
  const isOpen = useStore(isModalOpen);
  const item = useStore(selectedItem);

  // Simple conditional rendering without exit animations for now to fix build
  if (!isOpen || !item) return null;

  return (
    <Suspense fallback={null}>
      <LazyPortfolioModal item={item} onClose={closeModal} />
    </Suspense>
  );
}
