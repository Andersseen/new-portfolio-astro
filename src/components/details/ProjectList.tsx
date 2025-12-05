import type { FunctionalComponent } from "preact";
import Button from "../ui/Button";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
}

interface ProjectListProps {
  data: {
    description: string;
    items: Project[];
  };
}

const ProjectList: FunctionalComponent<ProjectListProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold font-heading mb-4">
          Commercial Projects
        </h3>
        <p className="text-lg text-foreground-secondary mb-6">
          {data.description}
        </p>
      </div>

      <div className="grid gap-4">
        {data.items.map((project, index) => (
          <a
            key={index}
            href="#"
            className="group block p-4 rounded-xl bg-background-tertiary hover:bg-background-secondary border border-border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                {project.title}
              </h4>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                {project.category}
              </span>
            </div>
            <p className="text-sm text-foreground-secondary mb-3">
              {project.description}
            </p>
            <div className="flex gap-2 text-xs text-foreground-tertiary">
              {project.tech.map((t, i) => (
                <span key={i}>
                  {t} {i < project.tech.length - 1 ? "•" : ""}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
