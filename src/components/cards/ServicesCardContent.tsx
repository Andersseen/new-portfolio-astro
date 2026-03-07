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
    <div className="flex flex-wrap gap-2 mt-2 mb-3">
      {services.map((service, i: number) => (
        <span
          key={`${service.text}-${i}`}
          className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
        >
          {service.text}
        </span>
      ))}
    </div>
  );
}
