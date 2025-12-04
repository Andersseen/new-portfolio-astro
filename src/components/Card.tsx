import type { ComponentChildren } from "preact";

interface CardProps {
  id: string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "accent" | "success" | "warning";
  colSpan?: "col-span-1" | "col-span-2";
  decorative?: boolean;
  children?: ComponentChildren;
  tags?: string[];
}

const colorClasses = {
  primary: {
    border: "hover:border-primary/50",
    shadow: "hover:shadow-primary/10",
    bg: "bg-primary/10",
    text: "text-primary",
    badge: "bg-primary/15 text-primary",
  },
  secondary: {
    border: "hover:border-secondary/50",
    shadow: "hover:shadow-secondary/10",
    bg: "bg-secondary/10",
    text: "text-secondary",
    badge: "bg-secondary/15 text-secondary",
  },
  accent: {
    border: "hover:border-accent/50",
    shadow: "hover:shadow-accent/10",
    bg: "bg-accent/10",
    text: "text-accent",
    badge: "bg-accent/15 text-accent",
  },
  success: {
    border: "hover:border-success/50",
    shadow: "hover:shadow-success/10",
    bg: "bg-success/10",
    text: "text-success",
    badge: "bg-success/15 text-success",
  },
  warning: {
    border: "hover:border-warning/50",
    shadow: "hover:shadow-warning/10",
    bg: "bg-warning/10",
    text: "text-warning",
    badge: "bg-warning/15 text-warning",
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
  tags = [],
}: CardProps) {
  const color = colorClasses[badgeColor];
  const spanClass =
    colSpan === "col-span-2" ? "md:col-span-2" : "md:col-span-1";

  return (
    <div
      className={`group relative w-full h-full ${spanClass} rounded-3xl bg-background-secondary transition-all duration-300 
      shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)] 
      dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.05)]
      hover:shadow-[5px_5px_10px_rgba(0,0,0,0.12),-5px_-5px_10px_rgba(255,255,255,0.9)]
      dark:hover:shadow-[5px_5px_10px_rgba(0,0,0,0.4),-5px_-5px_10px_rgba(255,255,255,0.08)]
      cursor-grab active:cursor-grabbing active:scale-[0.99]`}
    >
      <div className="w-full h-full p-8 flex flex-col">
        {/* Background gradients - Subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

        {/* Header & Content */}
        <div className="relative z-10 flex-1">
          <div className="flex justify-between items-start mb-4">
            {badge && (
              <span
                className={`inline-block px-3 py-1 rounded-full ${color.badge} text-xs font-bold tracking-wide uppercase shadow-sm`}
              >
                {badge}
              </span>
            )}
            {/* Placeholder for top-right icon if needed */}
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-foreground-secondary text-sm md:text-base leading-relaxed max-w-[90%]">
            {description}
          </p>
        </div>

        {/* Footer / Bottom Actions */}
        <div className="relative z-10 mt-6 flex items-end justify-between">
          {/* Tags (Left) */}
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 &&
              tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 rounded-md ${color.bg} ${color.text} text-xs font-medium border border-transparent`}
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Children (Right - mostly for buttons) */}
          <div className="flex-shrink-0 ml-4">{children}</div>
        </div>

        {/* Decorative elements - Simplified */}
        {decorative && (
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full opacity-50 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}
