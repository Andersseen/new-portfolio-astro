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
  primary: "bg-primary-100 text-primary-900 border-primary-200 dark:bg-primary-900/40 dark:text-primary-100 dark:border-primary-800",
  secondary: "bg-secondary-100 text-secondary-900 border-secondary-200 dark:bg-secondary-900/40 dark:text-secondary-100 dark:border-secondary-800",
  accent: "bg-accent/15 text-accent border-accent/20",
  success: "bg-success/15 text-success border-success/20",
  warning: "bg-warning/15 text-warning border-warning/20",
  danger: "bg-danger/15 text-danger border-danger/20",
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
