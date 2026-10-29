import {
  AtSign,
  Component,
  FolderKanban,
  Layers,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-preact";
import Card from "./Card";
import type { PortfolioItem } from "./PortfolioGrid";
import CardContentRenderer from "./cards/CardContentRenderer";

interface PortfolioCardProps {
  item: PortfolioItem;
  colSpan: "col-span-1" | "col-span-2";
  onSelect: (id: string, rect: DOMRect, opener: HTMLElement) => void;
}

// iCloud-style "app" identity for each tile: an icon and an accent tint.
const cardIdentity: Record<
  PortfolioItem["type"],
  { icon?: any; accent: "primary" | "secondary" | "accent" | "success" | "warning" }
> = {
  projects: { icon: FolderKanban, accent: "primary" },
  community: { icon: Users, accent: "success" },
  design: { icon: Component, accent: "accent" },
  social: { icon: AtSign, accent: "secondary" },
  services: { icon: Sparkles, accent: "warning" },
  stack: { icon: Layers, accent: "primary" },
  articles: { icon: Newspaper, accent: "accent" },
  about: { accent: "primary" },
};

const getCardBadge = (type: PortfolioItem["type"]) => {
  if (type === "projects") return "Featured";
  if (type === "articles") return "Recent";
  return undefined;
};

export default function PortfolioCard({
  item,
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
      className="w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-secondary rounded-3xl"
      onClick={handleClick}
    >
      <Card
        title={item.title}
        description={item.description || ""}
        badge={getCardBadge(item.type)}
        icon={cardIdentity[item.type].icon}
        accent={cardIdentity[item.type].accent}
      >
        <CardContentRenderer item={item} />
      </Card>
    </button>
  );
}
