import type { FunctionalComponent } from "preact";
import Button from "../ui/Button";

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
      {/* Description handled by parent */}

      <div className="grid gap-4">
        {data.map((project, index) => (
          <a
            key={index}
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
            className="group relative block p-5 rounded-xl bg-background-tertiary border border-border overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Swipe Background Effect */}
            <div className="absolute inset-0 bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out will-change-transform origin-left" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-lg group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h4>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-foreground-secondary mb-3 group-hover:text-white/90 transition-colors duration-300">
                {project.description}
              </p>
              <div className="flex gap-2 text-xs text-foreground-tertiary group-hover:text-white/80 transition-colors duration-300">
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
