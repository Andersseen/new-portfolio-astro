import { motion } from "motion/react";
import { X } from "lucide-preact";
import type { PortfolioItem } from "./PortfolioGrid";

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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-background rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-bold text-foreground">{item.title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-foreground/10"
            >
              <XIcon className="w-6 h-6 text-foreground" />
            </button>
          </div>
          <p className="text-lg text-foreground-secondary mb-8">
            {item.description}
          </p>

          {/* Expanded Content */}
          <div className="prose prose-invert max-w-none">
            <p>Here you can put more detailed content for {item.title}.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
