import Card from "./Card";
import type { PortfolioItem } from "./PortfolioGrid";
import CardContentRenderer from "./cards/CardContentRenderer";

interface PortfolioCardProps {
  item: PortfolioItem;
  colSpan: "col-span-1" | "col-span-2";
  onSelect: (id: string, rect: DOMRect) => void;
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
  const handleClick = (e: any) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    onSelect(item.id, rect);
  };

  return (
    <div
      data-swapy-item={item.id}
      className="w-full h-full cursor-pointer"
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
    </div>
  );
}
