import { LitElement, html } from "lit";
import { cn } from "./utils";

export default class LitButton extends LitElement {
  static properties = {
    variant: { type: String },
    size: { type: String },
    fullWidth: { type: Boolean },
    disabled: { type: Boolean },
    href: { type: String },
    type: { type: String },
  };

  declare variant: "primary" | "secondary" | "accent" | "ghost" | "outline";
  declare size: "sm" | "md" | "lg" | "icon";
  declare fullWidth: boolean;
  declare disabled: boolean;
  declare href: string;
  declare type: "button" | "submit" | "reset";

  constructor() {
    super();
    this.variant = "primary";
    this.size = "md";
    this.fullWidth = false;
    this.disabled = false;
    this.href = "";
    this.type = "button";
  }

  createRenderRoot() {
    return this;
  }

  private get variantClasses() {
    const variants = {
      primary: "bg-primary text-primary-contrast hover:bg-primary/90 shadow-sm",
      secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-sm",
      accent: "bg-accent text-accent-contrast hover:bg-accent/90 shadow-sm",
      ghost: "bg-transparent hover:bg-foreground/5 text-foreground",
      outline:
        "bg-transparent border-2 border-border hover:bg-foreground/5 text-foreground",
    };
    return variants[this.variant] || variants.primary;
  }

  private get sizeClasses() {
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
    };
    return sizes[this.size] || sizes.md;
  }

  render() {
    const className = cn(
      this.variantClasses,
      this.sizeClasses,
      this.fullWidth && "w-full",
      this.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      "rounded-lg font-medium transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-primary/50",
      "active:scale-[0.98]",
      "flex items-center justify-center", // Added for centering content/icons
      this.className // Apply the class passed to the custom element itself
    );

    if (this.href) {
      return html`
        <a href=${this.href} class=${className} ?disabled=${this.disabled}>
          <slot></slot>
        </a>
      `;
    }

    return html`
      <button type=${this.type} class=${className} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define("ui-button", LitButton);

declare global {
  interface HTMLElementTagNameMap {
    "ui-button": LitButton;
  }
}
