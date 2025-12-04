export interface ButtonProps {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: any;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantClasses = {
  primary: "bg-primary text-primary-contrast hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-sm",
  accent: "bg-accent text-accent-contrast hover:bg-accent/90 shadow-sm",
  ghost: "bg-transparent hover:bg-foreground/5 text-foreground",
  outline:
    "bg-transparent border-2 border-border hover:bg-foreground/5 text-foreground",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        rounded-lg font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary/50
        active:scale-[0.98]
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
    >
      {children}
    </button>
  );
}
