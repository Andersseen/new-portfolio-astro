import type { FunctionalComponent } from "preact";
import { IconMap } from "../IconMap";

interface ServiceItem {
  text: string;
  details: string;
  icon: string;
}

interface ServiceDetailsProps {
  data: ServiceItem[];
}

const ACCENT_CLASSES = [
  "bg-primary/10 text-primary",
  "bg-secondary/10 text-secondary",
  "bg-accent/10 text-accent",
  "bg-success/10 text-success",
];

const ServiceDetails: FunctionalComponent<ServiceDetailsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div and-layout="grid cols:1 cols@md:2 gap:lg">
        {data.map((service, idx) => {
          const Icon = IconMap[service.icon] || IconMap["code"];
          const accentClasses = ACCENT_CLASSES[idx % ACCENT_CLASSES.length];
          return (
            <div
              key={idx}
              className="relative overflow-hidden p-6 rounded-2xl bg-background-tertiary border border-border group hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-3 text-7xl font-black text-foreground/5 select-none"
              >
                0{idx + 1}
              </span>
              <div
                className={`relative w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform ${accentClasses}`}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="relative font-bold text-lg mb-2">{service.text}</h3>
              <p className="relative text-sm text-foreground-secondary leading-relaxed">
                {service.details}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceDetails;
