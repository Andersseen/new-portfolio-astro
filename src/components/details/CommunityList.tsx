import type { FunctionalComponent } from "preact";
import { ArrowUpRight } from "lucide-preact";

import { useState } from "preact/hooks";

interface CommunityItem {
  role: string;
  organization: string;
  description: string;
  link?: string;
  repoUrl?: string;
  demoUrl?: string;
  category?: "projects" | "templates" | "games";
}

interface CommunityLabels {
  projectsTab: string;
  templatesTab: string;
  gamesTab: string;
  liveDemo: string;
  githubRepo: string;
  viewProject: string;
}

interface CommunityListProps {
  data: {
    items: CommunityItem[];
    labels: CommunityLabels;
  };
}

const CommunityList: FunctionalComponent<CommunityListProps> = ({ data }) => {
  const { items, labels } = data;
  const [activeTab, setActiveTab] = useState<"projects" | "templates" | "games">(
    "projects"
  );

  const hasTemplates = items.some((item) => item.category === "templates");
  const hasProjects = items.some((item) => item.category === "projects");
  const hasGames = items.some((item) => item.category === "games");

  const tabs = [
    hasProjects && { key: "projects" as const, label: labels.projectsTab },
    hasGames && { key: "games" as const, label: labels.gamesTab },
    hasTemplates && { key: "templates" as const, label: labels.templatesTab },
  ].filter(Boolean) as { key: "projects" | "templates" | "games"; label: string }[];

  const showTabs = tabs.length > 1;

  const filteredData = showTabs
    ? items.filter((item) => item.category === activeTab)
    : items;

  return (
    <div className="space-y-6">
      {showTabs && (
        <div className="sticky top-[-1rem] sm:top-[-1.5rem] z-10 -mx-5 sm:-mx-8 border-b border-border/60 bg-background px-5 sm:px-8 pt-4 sm:pt-6 pb-3">
          <div className="flex p-1 bg-background-tertiary rounded-lg border border-border w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 min-h-11 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.key
                    ? "bg-foreground text-background shadow-sm"
                    : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div and-layout="grid cols:1 gap:md">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="block p-5 rounded-xl bg-background-tertiary border border-border hover:border-primary/40 hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div and-layout="vertical gap:xxs">
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {item.organization}
              </h3>
              <span className="text-xs font-semibold text-foreground-secondary uppercase tracking-wider">
                {item.role}
              </span>
            </div>

            <p className="text-sm text-foreground-secondary mt-3 mb-4 leading-relaxed">
              {item.description}
            </p>

            <div and-layout="horizontal gap:sm">
              {item.demoUrl && (
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-background bg-foreground px-3 py-1.5 rounded-lg hover:bg-foreground/90 transition-colors"
                >
                  {labels.liveDemo}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {item.repoUrl && (
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-foreground border border-border px-3 py-1.5 rounded-lg hover:border-primary/40 hover:bg-background-secondary transition-colors"
                >
                  {labels.githubRepo}
                </a>
              )}
              {}
              {!item.demoUrl && !item.repoUrl && item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-background bg-foreground px-3 py-1.5 rounded-lg hover:bg-foreground/90 transition-colors"
                >
                  {labels.viewProject}
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
