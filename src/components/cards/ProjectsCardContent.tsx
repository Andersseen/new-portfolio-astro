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
        <div and-layout="vertical" className="mt-1 mb-3 gap-2.5">
          {projects.slice(0, 3).map((project, i: number) => (
            <div
              key={`${project.title || "project"}-${i}`}
              and-layout="horizontal align:center gap:sm"
              className="rounded-xl bg-background-secondary px-3 py-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-sm font-medium text-foreground truncate flex-1">
                {project.title || `Project ${i + 1}`}
              </span>
              <div and-layout="horizontal" className="shrink-0 gap-1.5">
                {(project.tech || []).slice(0, 2).map((tech, j: number) => (
                  <span
                    key={`${tech}-${j}`}
                    className={`rounded-full bg-background-tertiary px-2 py-0.5 text-xs font-semibold leading-relaxed text-foreground ${j > 0 ? "hidden sm:inline" : ""}`}
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
