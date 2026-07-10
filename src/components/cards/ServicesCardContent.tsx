import type { PortfolioItem, ServiceItem } from "../PortfolioGrid";

interface ServicesCardContentProps {
  item: PortfolioItem;
}

export default function ServicesCardContent({
  item,
}: ServicesCardContentProps) {
  const services = Array.isArray(item.content)
    ? (item.content as ServiceItem[])
    : [];

  if (services.length === 0) return null;

  return (
    <div and-layout="horizontal wrap:wrap gap:xs" className="mt-2 mb-3">
      {services.map((service, i: number) => (
        <span
          key={`${service.text}-${i}`}
          className="inline-block rounded-full border border-border bg-background-tertiary px-3 py-1.5 text-sm font-semibold leading-relaxed text-foreground"
        >
          {service.text}
        </span>
      ))}
    </div>
  );
}
