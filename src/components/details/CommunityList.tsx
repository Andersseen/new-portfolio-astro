import type { FunctionalComponent } from "preact";
import { ArrowUpRight } from "lucide-preact";

interface CommunityItem {
  role: string;
  organization: string;
  description: string;
  link?: string;
}

interface CommunityListProps {
  data: CommunityItem[];
}

const CommunityList: FunctionalComponent<CommunityListProps> = ({ data }) => {
  // Cast icon to any to avoid TS JSX issues if needed, strictly speaking not needed if type definitions are correct but safe here.
  const ArrowIcon = ArrowUpRight as any;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {data.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 rounded-xl bg-background-tertiary border border-border hover:border-accent hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowIcon className="w-5 h-5 text-accent" />
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {item.organization}
              </h4>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                {item.role}
              </span>
            </div>

            <p className="text-sm text-foreground-secondary mt-3 leading-relaxed">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
