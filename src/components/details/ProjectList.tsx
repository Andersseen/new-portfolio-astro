import type { FunctionalComponent } from "preact";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
}

interface ProjectListProps {
  data: Project[];
}

const ProjectList: FunctionalComponent<ProjectListProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {}

      <div and-layout="grid cols:1 gap:md">
        {data.map((project, index) => (
          <a
            key={index}
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
            className="group relative block p-5 rounded-xl bg-background-tertiary border border-border overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {}
            <div className="absolute inset-0 bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out will-change-transform origin-left" />

            <div className="relative z-10">
              <div
                and-layout="horizontal align:center justify:between"
                className="mb-2"
              >
                <h3 className="font-bold text-lg group-hover:text-background transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary group-hover:bg-background/20 group-hover:text-background transition-colors duration-300">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-foreground-secondary mb-3 group-hover:text-background/90 transition-colors duration-300">
                {project.description}
              </p>
              <div
                and-layout="horizontal gap:xs"
                className="text-xs text-foreground-tertiary transition-colors duration-300 group-hover:text-background/80"
              >
                {project.tech.map((t, i) => (
                  <span key={i}>
                    {t} {i < project.tech.length - 1 ? "•" : ""}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
