import type { FunctionalComponent } from "preact";

interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  link?: string;
  image?: ProjectImage;
}

interface ProjectListProps {
  data: Project[];
}

const ProjectList: FunctionalComponent<ProjectListProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div and-layout="grid cols:1 gap:md">
        {data.map((project, index) => (
          <a
            key={index}
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
            className="group relative block overflow-hidden rounded-xl border border-border bg-background-tertiary p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background-secondary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <div className="relative z-10 gap-4 sm:flex sm:items-start">
              {project.image && (
                <div className="mb-4 overflow-hidden rounded-lg border border-border bg-background sm:mb-0 sm:w-48 sm:shrink-0 md:w-56">
                  <img
                    src={project.image.src}
                    alt={project.image.alt || project.title}
                    width={project.image.width}
                    height={project.image.height}
                    loading="lazy"
                    className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-32"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div
                  and-layout="horizontal align:start justify:between"
                  className="mb-2 gap-3"
                >
                  <h3 className="font-bold text-lg text-foreground transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-border bg-background-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                    {project.role}
                  </span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-foreground-secondary">
                  {project.description}
                </p>
                <div
                  and-layout="horizontal gap:xs"
                  className="flex-wrap text-xs text-foreground-secondary"
                >
                  {project.tech.map((t, i) => (
                    <span key={i}>
                      {t} {i < project.tech.length - 1 ? "•" : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
