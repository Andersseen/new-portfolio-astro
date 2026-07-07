import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";

interface DesignCardContentProps {
  item: PortfolioItem;
}

export default function DesignCardContent({ item }: DesignCardContentProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mt-2 mb-3">
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary-100 text-foreground border border-primary-200 dark:bg-primary-900/40 dark:text-foreground dark:border-primary-800">
          and-button
        </span>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary-100 text-foreground border border-primary-200 dark:bg-primary-900/40 dark:text-foreground dark:border-primary-800">
          and-icon
        </span>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary-100 text-foreground border border-primary-200 dark:bg-primary-900/40 dark:text-foreground dark:border-primary-800">
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
