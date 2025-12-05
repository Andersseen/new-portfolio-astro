import type { ComponentChildren } from "preact";
import { cn } from "./utils";

export interface CardProps {
  variant?: "default" | "elevated" | "outlined" | "neumorphic";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  children: ComponentChildren;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const variantClasses = {
  default: "bg-background-secondary border border-border",
  elevated: "bg-background-secondary shadow-lg",
  outlined: "bg-transparent border-2 border-border",
  neumorphic: cn(
    "bg-background-secondary",
    "shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)]",
    "dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,0.05)]"
  ),
};

const paddingClasses = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-3xl",
};

export default function Card({
  variant = "default",
  padding = "md",
  rounded = "lg",
  children,
  className,
  onClick,
  hoverable = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        roundedClasses[rounded],
        hoverable &&
          "hover:shadow-xl transition-shadow duration-300 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
