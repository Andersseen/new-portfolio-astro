import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";

interface DesignCardContentProps {
  item: PortfolioItem;
}

export default function DesignCardContent({ item }: DesignCardContentProps) {
  return (
    <>
      <div and-layout="horizontal wrap:wrap gap:xs" className="mt-2 mb-3">
        <span className="rounded-full border border-border bg-background-tertiary px-3 py-1 text-sm font-semibold leading-relaxed text-foreground">
          and-button
        </span>
        <span className="rounded-full border border-border bg-background-tertiary px-3 py-1 text-sm font-semibold leading-relaxed text-foreground">
          and-icon
        </span>
        <span className="rounded-full border border-border bg-background-tertiary px-3 py-1 text-sm font-semibold leading-relaxed text-foreground">
          and-motion
        </span>
      </div>
      <p className="text-xs text-foreground-secondary mb-2 font-mono">
        @andersseen/web-components
      </p>
      <CardAction label={item.actionLabel || "Explore"} />
    </>
  );
}
