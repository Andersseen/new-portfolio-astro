import type { FunctionalComponent } from "preact";

interface CommunityItem {
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
}

interface CommunityListProps {
  data: {
    description: string;
    items: CommunityItem[];
  };
}

const CommunityList: FunctionalComponent<CommunityListProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold font-heading mb-4">
          Community & Open Source
        </h3>
        <p className="text-lg text-foreground-secondary mb-6">
          {data.description}
        </p>
      </div>

      <div className="space-y-4">
        {data.items.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-xl bg-background-tertiary border border-border hover:border-accent/50 transition-colors"
          >
            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
            <p className="text-sm text-foreground-secondary mb-3">
              {item.description}
            </p>
            {item.stats && (
              <div className="flex gap-3">
                {item.stats.map((stat, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono bg-background px-2 py-1 rounded border border-border"
                  >
                    {stat.value} {stat.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
