/** @jsxImportSource preact */
import type { FunctionalComponent } from "preact";
import { ArrowUpRight } from "lucide-preact";

interface CommunityItem {
  role: string;
  organization: string;
  description: string;
  link?: string;
  repoUrl?: string;
  demoUrl?: string;
}

interface CommunityListProps {
  data: CommunityItem[];
}

const CommunityList: FunctionalComponent<CommunityListProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="block p-5 rounded-xl bg-background-tertiary border border-border hover:border-accent hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {item.organization}
              </h4>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                {item.role}
              </span>
            </div>

            <p className="text-sm text-foreground-secondary mt-3 mb-4 leading-relaxed">
              {item.description}
            </p>

            <div className="flex gap-3">
              {item.demoUrl && (
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-background bg-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Live Demo
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {item.repoUrl && (
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-foreground border border-border px-3 py-1.5 rounded-lg hover:border-accent hover:text-accent transition-colors"
                >
                  GitHub Repo
                </a>
              )}
              {/* Fallback for legacy link if no specific urls */}
              {!item.demoUrl && !item.repoUrl && item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-background bg-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  View Project
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
