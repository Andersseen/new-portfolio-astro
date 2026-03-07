import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";

interface ProjectPreview {
  title?: string;
  tech?: string[];
}

interface ProjectsCardContentProps {
  item: PortfolioItem;
}

export default function ProjectsCardContent({
  item,
}: ProjectsCardContentProps) {
  const projects = Array.isArray(item.details)
    ? (item.details as ProjectPreview[])
    : [];

  return (
    <>
      {projects.length && (
        <div className="flex flex-col gap-2.5 mt-1 mb-3">
          {projects.slice(0, 3).map((project, i: number) => (
            <div
              key={`${project.title || "project"}-${i}`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background-tertiary/60 border border-border/50"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-sm font-medium text-foreground truncate flex-1">
                {project.title || `Project ${i + 1}`}
              </span>
              <div className="flex gap-1.5 shrink-0">
                {(project.tech || []).slice(0, 2).map((tech, j: number) => (
                  <span
                    key={`${tech}-${j}`}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <CardAction label={item.actionLabel || "View More"} />
    </>
  );
}
