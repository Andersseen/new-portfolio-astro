import { useEffect, useState, useRef, useCallback } from "preact/hooks";
import { X } from "lucide-preact";
import type { PortfolioItem } from "./PortfolioGrid";
import Button from "./ui/Button";
import { useStore } from "@nanostores/preact";
import {
  cardRect as cardRectStore,
  modalPhase as modalPhaseStore,
  finishEntering,
  finishExiting,
} from "../store/modalStore";

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

/** Duration of the fly animation in ms */
const FLY_DURATION = 420;
/** Duration of the content fade in ms */
const CONTENT_FADE = 250;

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const rect = useStore(cardRectStore);
  const phase = useStore(modalPhaseStore);

  const modalRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [flyStyle, setFlyStyle] = useState<Record<string, string>>({});

  /* ---- compute final (target) modal rect ---- */
  const getFinalRect = useCallback(() => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
    const vh = typeof window !== "undefined" ? window.innerHeight : 768;
    const isMobile = vw < 640;

    const modalW = isMobile ? vw : Math.min(vw - 32, 768);
    const modalH = isMobile ? vh * 0.95 : Math.min(vh * 0.9, 800);
    const modalX = isMobile ? 0 : (vw - modalW) / 2;
    const modalY = isMobile ? vh - modalH : (vh - modalH) / 2;

    return { top: modalY, left: modalX, width: modalW, height: modalH };
  }, []);

  /* ---- ENTERING: animate card rect → modal rect ---- */
  useEffect(() => {
    if (phase !== "entering") return;

    const final = getFinalRect();

    if (rect) {
      // Start at card position
      setFlyStyle({
        position: "fixed",
        zIndex: "60",
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: "24px",
        overflow: "hidden",
        transition: "none",
        opacity: "1",
      });

      // Next frame: animate to final position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlyStyle({
            position: "fixed",
            zIndex: "60",
            top: `${final.top}px`,
            left: `${final.left}px`,
            width: `${final.width}px`,
            height: `${final.height}px`,
            borderRadius: window.innerWidth < 640 ? "24px 24px 0 0" : "24px",
            overflow: "hidden",
            transition: `top ${FLY_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1),
                         left ${FLY_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1),
                         width ${FLY_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1),
                         height ${FLY_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1),
                         border-radius ${FLY_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            opacity: "1",
          });
        });
      });
    } else {
      // No rect available — instant open
      setFlyStyle({
        position: "fixed",
        zIndex: "60",
        top: `${final.top}px`,
        left: `${final.left}px`,
        width: `${final.width}px`,
        height: `${final.height}px`,
        borderRadius: window.innerWidth < 640 ? "24px 24px 0 0" : "24px",
        overflow: "hidden",
        opacity: "1",
      });
    }

    const timer = setTimeout(
      () => {
        finishEntering();
        setShowContent(true);
      },
      rect ? FLY_DURATION : 50,
    );

    return () => clearTimeout(timer);
  }, [phase, rect, getFinalRect]);

  /* ---- EXITING: animate modal rect → card rect ---- */
  useEffect(() => {
    if (phase !== "exiting") return;

    setShowContent(false);

    const exitTimer = setTimeout(() => {
      if (rect) {
        setFlyStyle((prev) => ({
          ...prev,
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          borderRadius: "24px",
          transition: `top ${FLY_DURATION * 0.8}ms cubic-bezier(0.4, 0, 0.2, 1),
                       left ${FLY_DURATION * 0.8}ms cubic-bezier(0.4, 0, 0.2, 1),
                       width ${FLY_DURATION * 0.8}ms cubic-bezier(0.4, 0, 0.2, 1),
                       height ${FLY_DURATION * 0.8}ms cubic-bezier(0.4, 0, 0.2, 1),
                       border-radius ${FLY_DURATION * 0.8}ms cubic-bezier(0.4, 0, 0.2, 1),
                       opacity ${FLY_DURATION * 0.6}ms ease ${FLY_DURATION * 0.2}ms`,
          opacity: "0",
        }));

        setTimeout(() => finishExiting(), FLY_DURATION * 0.8);
      } else {
        setFlyStyle((prev) => ({
          ...prev,
          opacity: "0",
          transition: `opacity 200ms ease`,
        }));
        setTimeout(() => finishExiting(), 200);
      }
    }, CONTENT_FADE);

    return () => {};
  }, [phase, rect]);

  /* ---- Escape key handler ---- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  /* ---- Render detail content ---- */
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

  const isAnimating = phase === "entering" || phase === "exiting";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        style={{
          opacity: phase === "exiting" ? 0 : 1,
          transition: `opacity ${phase === "exiting" ? FLY_DURATION * 0.6 : 250}ms ease`,
        }}
        onClick={onClose}
      />

      {/* Animated modal shell */}
      <div
        ref={modalRef}
        style={flyStyle}
        className="bg-background border border-border shadow-2xl flex flex-col"
        onClick={(e: any) => e.stopPropagation()}
      >
        {/* Header — always visible during the fly */}
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

        {/* Detail content — fades in after the card lands */}
        <div
          className="px-5 sm:px-8 py-4 sm:py-6 overflow-y-auto custom-scrollbar flex-1"
          style={{
            opacity: showContent ? 1 : 0,
            transition: `opacity ${CONTENT_FADE}ms ease`,
            pointerEvents: isAnimating ? "none" : "auto",
          }}
        >
          <div className="text-foreground-secondary">{renderDetails()}</div>
        </div>
      </div>
    </>
  );
}
