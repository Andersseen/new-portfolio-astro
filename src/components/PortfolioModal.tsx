import { motion } from "motion/react";
import { X } from "lucide-preact";
import type { PortfolioItem } from "./PortfolioGrid";
import Button from "./ui/Button";

// Detail components
import ProjectList from "./details/ProjectList";
import StackDetails from "./details/StackDetails";
import AboutDetails from "./details/AboutDetails";
import CommunityList from "./details/CommunityList";
import ArticleList from "./details/ArticleList";
import DesignGallery from "./details/DesignGallery";
import ServiceDetails from "./details/ServiceDetails";

// Cast icons to any to avoid JSX component type errors
const XIcon = X as any;

interface PortfolioModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const renderDetails = () => {
    if (!item.details) return <p>No specific details available.</p>;

    switch (item.type) {
      case "projects":
        return <ProjectList data={item.details} />;
      case "stack":
        return <StackDetails data={item.details} />;
      case "about":
        return <AboutDetails data={item.details} />;
      case "community":
        return <CommunityList data={item.details} />;
      case "articles":
        return <ArticleList data={item.details} />;
      case "design":
        return <DesignGallery data={item.details} />;
      case "services":
        return <ServiceDetails data={item.details} />;
      default:
        // Fallback for types that might still use raw HTML if any (legacy safety)
        if (typeof item.details === "string") {
          return <div dangerouslySetInnerHTML={{ __html: item.details }} />;
        }
        return null;
    }
  };

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
        className="w-full max-w-3xl bg-background rounded-3xl overflow-hidden shadow-2xl border border-border flex flex-col max-h-[90vh]"
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start mb-6 sticky top-0 bg-background z-10 pb-4 border-b border-transparent">
            <h2 className="text-4xl font-bold text-foreground font-heading">
              {item.title}
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-foreground/10 shrink-0"
              aria-label="Close modal"
            >
              <XIcon className="w-6 h-6 text-foreground" />
            </Button>
          </div>
          <p className="text-lg text-foreground-secondary mb-8">
            {item.description}
          </p>

          {/* Expanded Content with specific components */}
          <div className="text-foreground-secondary">{renderDetails()}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
