import { motion } from "motion/react";
import { X } from "lucide-preact";
import type { PortfolioItem } from "./PortfolioGrid";
import Button from "./ui/Button";

// Cast icons to any to avoid JSX component type errors
const XIcon = X as any;

interface PortfolioModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={item.id} // Enable shared layout transition from card
        className="w-full max-w-3xl bg-background rounded-3xl overflow-hidden shadow-2xl border border-border"
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-bold text-foreground font-heading">
              {item.title}
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-foreground/10"
              aria-label="Close modal"
            >
              <XIcon className="w-6 h-6 text-foreground" />
            </Button>
          </div>
          <p className="text-lg text-foreground-secondary mb-8">
            {item.description}
          </p>

          {/* Expanded Content */}
          {/* Expanded Content */}
          <div className="prose dark:prose-invert max-w-none text-foreground-secondary">
            {item.details && typeof item.details === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: item.details }} />
            ) : (
              item.details || <p>No additional details available.</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
