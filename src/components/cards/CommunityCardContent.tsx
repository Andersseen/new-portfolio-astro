import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";

interface CommunityCardContentProps {
  item: PortfolioItem;
}

export default function CommunityCardContent({
  item,
}: CommunityCardContentProps) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="text-sm text-foreground-secondary">
        Contributions & Open Source
      </div>
      <CardAction label={item.actionLabel || "Contributions"} />
    </div>
  );
}
