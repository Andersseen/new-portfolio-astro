import Badge from "./ui/Badge";
import { cn } from "./ui/utils";

type CardAccent = "primary" | "secondary" | "accent" | "success" | "warning";

interface CardProps {
  title: string;
  description: string;
  badge?: string;
  /** Lucide component rendered in the iCloud-style app tile next to the title. */
  icon?: any;
  accent?: CardAccent;
  children?: any;
}

// Tinted icon tile per accent — same `bg-{color}/10 text-{color}` pairing used
// across the app, so it holds up under the runtime theme randomizer.
const iconTileClasses: Record<CardAccent, string> = {
  primary: "bg-primary/12 text-primary",
  secondary: "bg-secondary/12 text-secondary",
  accent: "bg-accent/12 text-accent",
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning",
};

export default function Card({
  title,
  description,
  badge,
  icon: Icon,
  accent = "primary",
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        "group h-full w-full overflow-hidden rounded-3xl bg-background shadow-tile",
        "transition-[box-shadow,translate] duration-300 ease-out",
        "hover:shadow-tile-hover hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
      )}
    >
      <div and-layout="vertical" className="h-full p-5 sm:p-6">
        <div
          and-layout="horizontal align:center justify:between gap:sm"
          className="mb-2"
        >
          <div and-layout="horizontal align:center gap:sm" className="min-w-0">
            {Icon && (
              <span
                aria-hidden="true"
                className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-xl shrink-0",
                  iconTileClasses[accent],
                )}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={2.25} />
              </span>
            )}
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground truncate">
              {title}
            </h2>
          </div>

          {badge && (
            <Badge variant={accent} size="sm">
              {badge}
            </Badge>
          )}
        </div>

        <p className="text-sm text-foreground-secondary line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div and-layout="vertical justify:end" className="flex-1 mt-3">
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>
    </div>
  );
}
