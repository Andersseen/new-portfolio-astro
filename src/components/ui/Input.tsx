export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  fullWidth = false,
  className = "",
  id,
  name,
  required = false,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e: any) => onChange?.(e.target.value)}
      disabled={disabled}
      required={required}
      className={`
        ${fullWidth ? "w-full" : ""}
        px-4 py-2 rounded-lg
        bg-background-secondary border-2
        ${
          error
            ? "border-danger focus:border-danger"
            : "border-border focus:border-primary"
        }
        text-foreground placeholder:text-foreground-tertiary
        transition-colors duration-200
        focus:outline-none focus:ring-2
        ${error ? "focus:ring-danger/20" : "focus:ring-primary/20"}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
    />
  );
}
