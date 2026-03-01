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
const FLY_DURATION = 380;
/** Duration of the content fade in ms */
const CONTENT_FADE = 200;

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const rect = useStore(cardRectStore);
  const phase = useStore(modalPhaseStore);

  const modalRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const timersRef = useRef<number[]>([]);

  /** Clear all pending timers */
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  /** Schedule a timer and track it */
  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

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

  /* ---- Apply styles directly to avoid batching issues ---- */
  const applyStyle = useCallback((styles: Record<string, string>) => {
    const el = modalRef.current;
    if (!el) return;
    Object.entries(styles).forEach(([key, val]) => {
      (el.style as any)[key] = val;
    });
  }, []);

  /* ---- ENTERING: animate card rect → modal rect ---- */
  useEffect(() => {
    if (phase !== "entering") return;
    clearTimers();

    const final = getFinalRect();
    const isMobile =
      (typeof window !== "undefined" ? window.innerWidth : 1024) < 640;
    const finalRadius = isMobile ? "24px 24px 0 0" : "24px";

    if (rect) {
      // 1. Place at card position (no transition)
      applyStyle({
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
        visibility: "visible",
      });

      // 2. Force layout reflow then animate
      schedule(() => {
        // Force reflow
        modalRef.current?.offsetHeight;

        applyStyle({
          top: `${final.top}px`,
          left: `${final.left}px`,
          width: `${final.width}px`,
          height: `${final.height}px`,
          borderRadius: finalRadius,
          transition: [
            `top ${FLY_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `left ${FLY_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `width ${FLY_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `height ${FLY_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `border-radius ${FLY_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          ].join(", "),
        });
      }, 20);

      // 3. Finish entering after fly completes
      schedule(() => {
        applyStyle({ transition: "none" });
        finishEntering();
        setShowContent(true);
      }, FLY_DURATION + 30);
    } else {
      // No rect — instant open
      applyStyle({
        position: "fixed",
        zIndex: "60",
        top: `${final.top}px`,
        left: `${final.left}px`,
        width: `${final.width}px`,
        height: `${final.height}px`,
        borderRadius: finalRadius,
        overflow: "hidden",
        opacity: "1",
        visibility: "visible",
        transition: "none",
      });
      schedule(() => {
        finishEntering();
        setShowContent(true);
      }, 30);
    }

    return clearTimers;
  }, [phase === "entering"]);

  /* ---- EXITING: animate modal rect → card rect ---- */
  useEffect(() => {
    if (phase !== "exiting") return;
    clearTimers();

    setShowContent(false);

    schedule(() => {
      if (rect) {
        applyStyle({
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          borderRadius: "24px",
          opacity: "0.4",
          transition: [
            `top ${FLY_DURATION * 0.75}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `left ${FLY_DURATION * 0.75}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `width ${FLY_DURATION * 0.75}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `height ${FLY_DURATION * 0.75}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `border-radius ${FLY_DURATION * 0.75}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            `opacity ${FLY_DURATION * 0.5}ms ease ${FLY_DURATION * 0.25}ms`,
          ].join(", "),
        });

        schedule(() => finishExiting(), FLY_DURATION * 0.75 + 20);
      } else {
        applyStyle({
          opacity: "0",
          transition: "opacity 180ms ease",
        });
        schedule(() => finishExiting(), 200);
      }
    }, CONTENT_FADE + 20);

    return clearTimers;
  }, [phase === "exiting"]);

  /* ---- Escape key handler ---- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  /* ---- Clean up all timers on unmount ---- */
  useEffect(() => clearTimers, []);

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
        style={{
          position: "fixed",
          zIndex: "60",
          overflow: "hidden",
          visibility: "hidden",
        }}
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
