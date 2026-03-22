import type { ComponentChildren, JSX } from "preact";
import { cn } from "./utils";

export interface ButtonProps
  extends Omit<
    JSX.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    "size"
  > {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  children: ComponentChildren;
}

const variantClasses = {
  primary:
    "bg-primary-500 text-background hover:bg-primary-600 active:bg-primary-700 dark:hover:bg-primary-400 dark:active:bg-primary-300 shadow-sm transition-colors",
  secondary:
    "bg-secondary-500 text-background hover:bg-secondary-600 active:bg-secondary-700 dark:hover:bg-secondary-400 dark:active:bg-secondary-300 shadow-sm transition-colors",
  accent:
    "bg-accent text-background hover:opacity-90 active:scale-[0.98] shadow-sm transition-all",
  ghost: "bg-transparent hover:bg-foreground/5 text-foreground transition-colors",
  outline:
    "bg-transparent border-2 border-border hover:bg-foreground/5 text-foreground transition-all",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  icon: "p-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className,
  children,
  href,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = (href ? "a" : "button") as any;

  return (
    <Comp
      href={href}
      type={!href ? type : undefined}
      disabled={disabled}
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        "rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/50",
        "active:scale-[0.98]",
        "flex items-center justify-center", 
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
