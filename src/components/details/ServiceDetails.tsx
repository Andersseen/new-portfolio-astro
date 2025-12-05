import type { FunctionalComponent } from "preact";

interface ServiceItem {
  text: string;
  details: string;
  gradient: string;
}

interface ServiceDetailsProps {
  data: ServiceItem[];
}

const ServiceDetails: FunctionalComponent<ServiceDetailsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((service, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-background-tertiary border border-border group hover:border-primary/30 transition-colors"
          >
            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradient} mb-3 opacity-80 group-hover:opacity-100 transition-opacity`}
            />
            <h4 className="font-bold text-lg mb-2">{service.text}</h4>
            <p className="text-sm text-foreground-secondary">
              {service.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetails;
