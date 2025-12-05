import type { FunctionalComponent } from "preact";

interface StackCategory {
  title: string;
  color: string;
  items: string[];
}

interface StackDetailsProps {
  data: {
    categories: StackCategory[];
  };
}

const StackDetails: FunctionalComponent<StackDetailsProps> = ({ data }) => {
  const colorMap: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
  };

  return (
    <div className="space-y-8">
      {data.categories.map((category, idx) => (
        <div key={idx}>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span
              className={`w-8 h-1 ${
                colorMap[category.color] || "bg-primary"
              } rounded-full`}
            ></span>
            {category.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {category.items.map((tech, techIdx) => (
              <div
                key={techIdx}
                className="p-3 bg-background-tertiary rounded-lg text-center font-medium hover:bg-background-secondary transition-colors cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StackDetails;
