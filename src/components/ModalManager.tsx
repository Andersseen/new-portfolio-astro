import { useStore } from "@nanostores/preact";
import { useEffect } from "preact/hooks";
import { isModalOpen, selectedItem, closeModal } from "../store/modalStore";
import { Suspense, lazy } from "preact/compat";


const LazyPortfolioModal = lazy(() => import("./PortfolioModal"));

export default function ModalManager() {
  const isOpen = useStore(isModalOpen);
  const item = useStore(selectedItem);

  // Block scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  
  if (!isOpen || !item) return null;

  return (
    <Suspense fallback={null}>
      <LazyPortfolioModal item={item} onClose={closeModal} />
    </Suspense>
  );
}
