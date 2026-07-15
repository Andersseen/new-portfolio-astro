import { Mail } from "lucide-preact";
import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";

interface ContactCardContentProps {
  item: PortfolioItem;
}

export default function ContactCardContent({ item }: ContactCardContentProps) {
  return (
    <>
      <div
        data-testid="portfolio-contact"
        and-layout="horizontal align:center gap:sm"
        className="mt-2 mb-3 text-foreground-secondary"
      >
        <Mail className="w-8 h-8 text-primary" />
        <span className="text-sm">{item.description}</span>
      </div>
      <CardAction label={item.actionLabel || "Get in Touch"} />
    </>
  );
}
