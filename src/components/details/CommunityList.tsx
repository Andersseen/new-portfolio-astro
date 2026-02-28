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
        <div className="flex p-1 bg-background-tertiary rounded-lg border border-border w-fit mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-background shadow-sm"
                  : "text-foreground-secondary hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="block p-5 rounded-xl bg-background-tertiary border border-border hover:border-primary/40 hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {item.organization}
              </h4>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
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
                  className="flex items-center gap-1 text-xs font-bold text-background bg-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-background transition-colors"
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
                  className="flex items-center gap-1 text-xs font-bold text-foreground border border-border px-3 py-1.5 rounded-lg hover:border-primary/40 hover:text-primary transition-colors"
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
                  className="flex items-center gap-1 text-xs font-bold text-background bg-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-background transition-colors"
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
