import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";

interface CommunityCardContentProps {
  item: PortfolioItem;
}

export default function CommunityCardContent({
  item,
}: CommunityCardContentProps) {
  return (
    <div and-layout="vertical gap:xs" className="mt-3">
      <div className="text-sm text-foreground-secondary">
        Contributions & Open Source
      </div>
      <CardAction label={item.actionLabel || "Contributions"} />
    </div>
  );
}
