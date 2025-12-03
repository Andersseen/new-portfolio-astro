/** @jsxImportSource preact */

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
      data-swapy-slot={id}
      class={`group relative ${spanClass} rounded-3xl overflow-hidden bg-background-secondary border border-border ${color.border} transition-all duration-300 hover:shadow-lg ${color.shadow} cursor-grab active:cursor-grabbing`}
    >
      <div class="w-full h-full" data-swapy-item={id}>
        {/* Background gradients */}
        <div class="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Content */}
        <div class="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div>
            {badge && (
              <span
                class={`inline-block px-3 py-1 rounded-full ${color.badge} text-xs font-medium mb-4`}
              >
                {badge}
              </span>
            )}
            <h3 class="text-3xl font-bold text-foreground mb-2">{title}</h3>
            <p class="text-foreground-secondary max-w-md">{description}</p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div class="flex items-center gap-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  class={`px-3 py-1 rounded-lg ${color.bg} border border-${color.text}/20 ${color.text} text-sm font-medium`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Decorative elements */}
        {decorative && (
          <div class="absolute right-0 bottom-0 w-1/2 h-4/5 bg-linear-to-tl from-primary/20 to-transparent rounded-tl-3xl border-t border-l border-primary/10 translate-y-4 translate-x-4 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform duration-500"></div>
        )}

        {/* Custom children */}
        {children}
      </div>
    </div>
  );
}
