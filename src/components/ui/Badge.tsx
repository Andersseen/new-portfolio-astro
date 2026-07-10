import { cn } from "./utils";

export interface BadgeProps {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  children: string;
  className?: string;
}

const variantClasses = {
  primary: "bg-background-tertiary text-foreground border-border",
  secondary: "bg-background-tertiary text-foreground border-border",
  accent: "bg-background-tertiary text-foreground border-border",
  success: "bg-background-tertiary text-foreground border-border",
  warning: "bg-background-tertiary text-foreground border-border",
  danger: "bg-background-tertiary text-foreground border-border",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export default function Badge({
  variant = "primary",
  size = "md",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        "inline-block rounded-full border font-semibold leading-relaxed",
        className
      )}
    >
      {children}
    </span>
  );
}
