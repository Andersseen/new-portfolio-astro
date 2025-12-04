import Badge from "./ui/Badge";

interface CardProps {
  id: string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "accent" | "success" | "warning";
  colSpan?: "col-span-1" | "col-span-2";
  decorative?: boolean;
  children?: any;
  tags?: string[];
}

const colorClasses = {
  primary: {
    border: "hover:border-primary/50",
    shadow: "hover:shadow-primary/10",
    bg: "bg-primary/10",
    text: "text-primary",
  },
  secondary: {
    border: "hover:border-secondary/50",
    shadow: "hover:shadow-secondary/10",
    bg: "bg-secondary/10",
    text: "text-secondary",
  },
  accent: {
    border: "hover:border-accent/50",
    shadow: "hover:shadow-accent/10",
    bg: "bg-accent/10",
    text: "text-accent",
  },
  success: {
    border: "hover:border-success/50",
    shadow: "hover:shadow-success/10",
    bg: "bg-success/10",
    text: "text-success",
  },
  warning: {
    border: "hover:border-warning/50",
    shadow: "hover:shadow-warning/10",
    bg: "bg-warning/10",
    text: "text-warning",
  },
};

export default function Card({
  id,
  title,
  description,
  badge,
  badgeColor = "primary",
  colSpan = "col-span-1",
  decorative = false,
  children,
  tags,
}: CardProps) {
  const colors = colorClasses[badgeColor];

  return (
    <div
      className={`
        group relative h-full w-full
        rounded-3xl
        bg-background-secondary
        border border-border
        ${colors.border}
        shadow-lg ${colors.shadow}
        transition-all duration-300
        overflow-hidden
        ${decorative ? "" : "cursor-pointer hover:scale-[1.02]"}
      `}
    >
      {/* Neumorphic effect overlay */}
      <div className="absolute inset-0 rounded-3xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.05)] pointer-events-none" />

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground mb-1 truncate">
              {title}
            </h3>
            <p className="text-sm text-foreground-secondary line-clamp-2">
              {description}
            </p>
          </div>

          {badge && (
            <Badge variant={badgeColor} size="sm">
              {badge}
            </Badge>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant={badgeColor} size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-end">
          {children && <div className="flex-shrink-0 ml-4">{children}</div>}
        </div>
      </div>
    </div>
  );
}
