import Badge from "./ui/Badge";
import BaseCard from "./ui/Card";
import { cn } from "./ui/utils";

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
    <BaseCard
      variant="default"
      rounded="full"
      padding="none" 
      hoverable={!decorative}
      className={cn(
        "group h-full w-full overflow-hidden transition-shadow transition-border duration-300",
        colors.border,
        `shadow-lg ${colors.shadow}`,
        !decorative && "hover:scale-[1.02] transition-transform"
      )}
    >
      {}
      {}

      {}
      <div className="relative p-5 sm:p-7 h-full flex flex-col z-20">
        {}
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-1.5 truncate">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-foreground-secondary line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          {badge && (
            <Badge variant={badgeColor} size="sm">
              {badge}
            </Badge>
          )}
        </div>

        {}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant={badgeColor} size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {}
        <div className="flex-1 flex flex-col justify-end">
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>
    </BaseCard>
  );
}
