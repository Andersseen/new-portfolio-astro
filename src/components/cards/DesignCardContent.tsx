import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";

interface DesignCardContentProps {
  item: PortfolioItem;
}

export default function DesignCardContent({ item }: DesignCardContentProps) {
  return (
    <>
      <div className="flex gap-3 mt-2 mb-3">
        <div className="w-16 h-16 rounded-xl bg-primary/5 border border-primary/15" />
        <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/15" />
        <div className="w-16 h-16 rounded-xl bg-primary/15 border border-primary/15" />
      </div>
      <CardAction label={item.actionLabel || "Gallery"} />
    </>
  );
}
