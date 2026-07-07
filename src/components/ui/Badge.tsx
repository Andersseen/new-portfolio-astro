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
  primary: "bg-primary-100 text-foreground border-primary-200 dark:bg-primary-900/40 dark:text-foreground dark:border-primary-800",
  secondary: "bg-secondary-100 text-foreground border-secondary-200 dark:bg-secondary-900/40 dark:text-foreground dark:border-secondary-800",
  accent: "bg-accent text-background border-accent",
  success: "bg-success text-background border-success",
  warning: "bg-warning text-background border-warning",
  danger: "bg-danger text-background border-danger",
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
        "inline-block rounded-full font-bold tracking-wide uppercase border",
        className
      )}
    >
      {children}
    </span>
  );
}
