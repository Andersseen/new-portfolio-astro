import { useStore } from "@nanostores/preact";
import { isModalOpen, selectedItem, closeModal } from "../store/modalStore";
import { Suspense, lazy } from "preact/compat";


const LazyPortfolioModal = lazy(() => import("./PortfolioModal"));

export default function ModalManager() {
  const isOpen = useStore(isModalOpen);
  const item = useStore(selectedItem);

  
  if (!isOpen || !item) return null;

  return (
    <Suspense fallback={null}>
      <LazyPortfolioModal item={item} onClose={closeModal} />
    </Suspense>
  );
}
