
import { motion } from "motion/react";
import { X } from "lucide-preact";
import type { PortfolioItem } from "./PortfolioGrid";
import Button from "./ui/Button";
import { useStore } from "@nanostores/preact";
import { cardRect as cardRectStore } from "../store/modalStore";

const MotionDiv = motion.div as any;


import ProjectList from "./details/ProjectList";
import StackDetails from "./details/StackDetails";
import CommunityList from "./details/CommunityList";
import ArticleList from "./details/ArticleList";

import "./details/MockUIKit";
import ServiceDetails from "./details/ServiceDetails";
import SocialCanvas from "./details/SocialCanvas";



interface PortfolioModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const rect = useStore(cardRectStore);

  const renderDetails = () => {
    
    if (item.type === "social") {
      return <SocialCanvas items={item.content as any[]} />;
    }

    if (!item.details && item.type !== "design")
      return <p>No specific details available.</p>;

    switch (item.type) {
      case "projects":
        return <ProjectList data={item.details} />;
      case "stack":
        return <StackDetails data={item.details} />;
      case "community":
        return <CommunityList data={item.details} />;
      case "articles":
        return <ArticleList data={item.details} />;
      case "design":
        
        return <mock-ui-kit />; 
      case "services":
        return <ServiceDetails data={item.details} />;
      default:
        
        if (typeof item.details === "string") {
          return <div dangerouslySetInnerHTML={{ __html: item.details }} />;
        }
        return null;
    }
  };

  const getInitialTransform = () => {
    if (!rect) return { opacity: 0, scale: 0.92 };
    const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
    const vh = typeof window !== "undefined" ? window.innerHeight : 768;
   
    const modalW = Math.min(vw - 32, 768); 
    const modalH = vh * 0.85;
    const cardCX = rect.left + rect.width / 2;
    const cardCY = rect.top + rect.height / 2;
    const modalCX = vw / 2;
    const modalCY = vh / 2;
    const scaleX = rect.width / modalW;
    const scaleY = rect.height / modalH;
    const scale = Math.min(scaleX, scaleY);
    return {
      x: cardCX - modalCX,
      y: cardCY - modalCY,
      scale,
      opacity: 0.6,
    };
  };

  return (
    <>
    
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

     
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 pointer-events-none"
      >
        <MotionDiv
          initial={getInitialTransform()}
          animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.8 }}
          className="w-full sm:max-w-3xl bg-background rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border flex flex-col max-h-[95vh] sm:max-h-[90vh] pointer-events-auto"
          onClick={(e: any) => e.stopPropagation()}
        >
   
        <div className="flex justify-between items-start px-5 sm:px-8 pt-5 sm:pt-8 pb-3 sm:pb-4 border-b border-border/60 bg-background z-10 shrink-0">
          <div className="flex-1 min-w-0 pr-3 sm:pr-4">
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground font-heading truncate">
              {item.title}
            </h2>
            {item.description && (
              <p className="text-sm sm:text-base text-foreground-secondary mt-1.5 sm:mt-2 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-foreground/10 shrink-0 mt-1"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-foreground" />
          </Button>
        </div>


        <div className="px-5 sm:px-8 py-4 sm:py-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="text-foreground-secondary">{renderDetails()}</div>
        </div>
      </MotionDiv>
      </div>
    </>
  );
}
