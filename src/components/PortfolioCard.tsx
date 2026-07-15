import Card from "./Card";
import type { PortfolioItem } from "./PortfolioGrid";
import CardContentRenderer from "./cards/CardContentRenderer";

interface PortfolioCardProps {
  item: PortfolioItem;
  colSpan: "col-span-1" | "col-span-2";
  onSelect: (id: string, rect: DOMRect, opener: HTMLElement) => void;
}

const getCardBadge = (type: PortfolioItem["type"]) => {
  if (type === "projects") return "Featured";
  if (type === "articles") return "Recent";
  return undefined;
};

export default function PortfolioCard({
  item,
  colSpan,
  onSelect,
}: PortfolioCardProps) {
  const handleClick = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    onSelect(item.id, rect, el);
  };

  return (
    <button
      type="button"
      data-swapy-item={item.id}
      data-testid={`portfolio-card-${item.id}`}
      className="w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-[inherit]"
      onClick={handleClick}
    >
      <Card
        id={item.id}
        title={item.title}
        description={item.description || ""}
        colSpan={colSpan}
        badge={getCardBadge(item.type)}
        badgeColor="primary"
      >
        <CardContentRenderer item={item} />
      </Card>
    </button>
  );
}
