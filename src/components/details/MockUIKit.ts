import { LitElement, html } from "lit";
import "@andersseen/motion/style.css";

/**
 * Scoped design-token bridge: maps the portfolio's oklab-based Tailwind tokens
 * to the HSL space-separated values that the Stencil Shadow-DOM components expect.
 * Applied only to mock-ui-kit so the rest of the page is unaffected.
 */
const STENCIL_VARS = `
mock-ui-kit {
  --radius: 0.5rem;
  --spacing-factor: 1;
  --border-width: 1px;
  --primary: 243 75% 59%;
  --primary-foreground: 0 0% 100%;
  --secondary: 356 100% 95%;
  --secondary-foreground: 345 83% 41%;
  --background: 226 30% 98%;
  --foreground: 224 71% 4%;
  --card: 226 40% 99%;
  --card-foreground: 224 71% 4%;
  --muted: 226 25% 93%;
  --muted-foreground: 220 9% 46%;
  --accent: 226 100% 94%;
  --accent-foreground: 244 47% 20%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 226 20% 89%;
  --input: 226 20% 89%;
  --ring: 243 75% 59%;
  --success: 142 76% 36%;
  --success-foreground: 0 0% 100%;
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 100%;
  --info: 217 91% 60%;
  --info-foreground: 0 0% 100%;
}
[data-theme="dark"] mock-ui-kit {
  --primary: 234 89% 74%;
  --primary-foreground: 244 47% 20%;
  --secondary: 343 80% 35%;
  --secondary-foreground: 356 100% 95%;
  --background: 229 50% 6%;
  --foreground: 226 100% 97%;
  --card: 230 40% 9%;
  --card-foreground: 226 100% 97%;
  --muted: 230 30% 14%;
  --muted-foreground: 220 15% 60%;
  --accent: 244 47% 20%;
  --accent-foreground: 226 100% 94%;
  --destructive: 0 63% 31%;
  --destructive-foreground: 0 86% 97%;
  --border: 230 25% 18%;
  --input: 230 25% 18%;
  --ring: 234 89% 74%;
  --success: 142 70% 45%;
  --success-foreground: 0 0% 100%;
  --warning: 38 90% 56%;
  --warning-foreground: 0 0% 100%;
  --info: 217 85% 65%;
  --info-foreground: 0 0% 100%;
}
`;

export default class MockUIKit extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._injectScopedVars();
    this._registerComponents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._styleEl?.remove();
  }

  private _styleEl?: HTMLStyleElement;

  /** Inject scoped CSS variables for the Stencil components' shadow DOM */
  private _injectScopedVars() {
    if (document.getElementById("and-stencil-vars")) return;
    const style = document.createElement("style");
    style.id = "and-stencil-vars";
    style.textContent = STENCIL_VARS;
    document.head.appendChild(style);
    this._styleEl = style;
  }

  private async _registerComponents() {
    try {
      const [{ registerAllIcons }, { initMotion }] = await Promise.all([
        import("@andersseen/icon"),
        import("@andersseen/motion"),
        import("@andersseen/web-components/components/and-button.js"),
        import("@andersseen/web-components/components/and-badge.js"),
        import("@andersseen/web-components/components/and-icon.js"),
        import("@andersseen/web-components/components/and-alert.js"),
        import("@andersseen/web-components/components/and-card.js"),
        import("@andersseen/web-components/components/and-input.js"),
      ]);

      registerAllIcons();
      initMotion({ root: this });
      this.requestUpdate();
    } catch (e) {
      console.error("Failed to register @andersseen components:", e);
    }
  }

  render() {
    return html`
      <div class="space-y-10">
        <!-- Header -->
        <div class="text-center space-y-3 mb-8">
          <div class="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <and-badge variant="secondary">v0.0.2</and-badge>
            <and-badge variant="outline">Stencil</and-badge>
            <and-badge variant="outline">24+ Components</and-badge>
          </div>
          <h3 class="text-3xl font-bold text-primary font-heading">
            @andersseen/web-components
          </h3>
          <p class="text-foreground-secondary max-w-xl mx-auto text-lg">
            Framework-agnostic component ecosystem — accessible UI, animations,
            icons, layout &amp; headless logic.
          </p>
          <div class="flex items-center justify-center gap-3 mt-4 flex-wrap">
            <a
              href="https://www.npmjs.com/package/@andersseen/web-components"
              target="_blank"
              rel="noopener noreferrer"
            >
              <and-button variant="default" size="sm">
                <and-icon name="box" size="sm"></and-icon>
                npm
              </and-button>
            </a>
            <a
              href="https://github.com/Andersseen/and-web-components"
              target="_blank"
              rel="noopener noreferrer"
            >
              <and-button variant="outline" size="sm">
                <and-icon name="github" size="sm"></and-icon>
                GitHub
              </and-button>
            </a>
            <a
              href="https://libs.andersseen.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <and-button variant="secondary" size="sm">
                <and-icon name="globe" size="sm"></and-icon>
                Live Demo
              </and-button>
            </a>
          </div>
        </div>

        <!-- Packages Overview -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          ${[
            {
              name: "@andersseen/web-components",
              desc: "24+ UI components",
              icon: "layers",
            },
            {
              name: "@andersseen/icon",
              desc: "70+ SVG icons",
              icon: "image",
            },
            {
              name: "@andersseen/motion",
              desc: "CSS/JS animations",
              icon: "zap",
            },
            {
              name: "@andersseen/layout",
              desc: "Attribute-driven CSS",
              icon: "layout",
            },
            {
              name: "@andersseen/headless",
              desc: "State machines",
              icon: "cpu",
            },
            {
              name: "@andersseen/angular",
              desc: "Angular wrappers",
              icon: "code",
            },
          ].map(
            (pkg) => html`
              <div
                class="p-4 rounded-2xl bg-background-tertiary border border-border hover:border-primary/40 transition-colors"
              >
                <div class="flex items-center gap-2 mb-2">
                  <and-icon name="${pkg.icon}" size="sm"></and-icon>
                  <span class="text-xs font-mono text-primary truncate"
                    >${pkg.name}</span
                  >
                </div>
                <p class="text-xs text-foreground-secondary">${pkg.desc}</p>
              </div>
            `,
          )}
        </div>

        <!-- Interactive Component Showcase -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Buttons & Badges -->
          <div
            class="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden hover:border-primary/40 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <h4
                class="text-sm font-bold text-primary uppercase tracking-widest"
              >
                Buttons
              </h4>
              <and-badge variant="outline">and-button</and-badge>
            </div>

            <div
              class="flex flex-wrap gap-3 items-center p-4 bg-background/50 rounded-xl border border-border/50"
            >
              <and-button variant="default" size="sm">Default</and-button>
              <and-button variant="secondary" size="sm">Secondary</and-button>
              <and-button variant="outline" size="sm">Outline</and-button>
              <and-button variant="destructive" size="sm"
                >Destructive</and-button
              >
              <and-button variant="ghost" size="sm">Ghost</and-button>
              <and-button variant="link" size="sm">Link</and-button>
            </div>

            <div
              class="font-mono text-xs p-4 bg-background-secondary text-foreground-secondary rounded-xl border border-border/50 shadow-inner overflow-x-auto"
            >
              <div class="text-primary">
                &lt;and-button
                <span class="text-primary/60">variant</span>=<span
                  class="text-foreground"
                  >"default"</span
                >&gt;
              </div>
              <div class="pl-4">Click Me</div>
              <div class="text-primary">&lt;/and-button&gt;</div>
            </div>
          </div>

          <!-- Icon System -->
          <div
            class="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden hover:border-primary/40 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <h4
                class="text-sm font-bold text-primary uppercase tracking-widest"
              >
                Icons
              </h4>
              <and-badge variant="outline">and-icon</and-badge>
            </div>

            <div
              class="grid grid-cols-6 gap-3 p-4 bg-background/50 rounded-xl border border-border/50"
            >
              ${[
                "home",
                "settings",
                "user",
                "heart",
                "star",
                "search",
                "bell",
                "mail",
                "camera",
                "github",
                "code",
                "zap",
              ].map(
                (icon) => html`
                  <div
                    class="aspect-square rounded-xl bg-background border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <and-icon name="${icon}" size="sm"></and-icon>
                  </div>
                `,
              )}
            </div>

            <div
              class="font-mono text-xs p-4 bg-background-secondary text-foreground-secondary rounded-xl border border-border/50 shadow-inner overflow-x-auto"
            >
              <div class="text-primary">
                &lt;and-icon
                <span class="text-primary/60">name</span>=<span
                  class="text-foreground"
                  >"github"</span
                >
                <span class="text-primary/60">size</span>=<span
                  class="text-foreground"
                  >"lg"</span
                >
                /&gt;
              </div>
            </div>
          </div>

          <!-- Motion System -->
          <div
            class="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden hover:border-primary/40 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <h4
                class="text-sm font-bold text-primary uppercase tracking-widest"
              >
                Animations
              </h4>
              <and-badge variant="outline">and-motion</and-badge>
            </div>

            <div
              class="flex items-center justify-center gap-6 p-4 bg-background/50 rounded-xl border border-border/50 overflow-hidden min-h-[80px]"
            >
              <div
                and-motion="fade-in"
                and-motion-trigger="enter"
                class="w-14 h-14 bg-primary/80 rounded-lg shadow-lg flex items-center justify-center"
              >
                <and-icon name="eye" size="sm"></and-icon>
              </div>
              <div
                and-motion="slide-in-left"
                and-motion-trigger="enter"
                and-motion-duration="600ms"
                class="w-14 h-14 bg-primary/60 rounded-lg shadow-lg flex items-center justify-center"
              >
                <and-icon name="arrow-right" size="sm"></and-icon>
              </div>
              <div
                and-motion="zoom-in"
                and-motion-trigger="enter"
                and-motion-duration="500ms"
                class="w-14 h-14 bg-primary/40 rounded-lg shadow-lg flex items-center justify-center"
              >
                <and-icon name="maximize" size="sm"></and-icon>
              </div>
            </div>

            <div
              class="font-mono text-xs p-4 bg-background-secondary text-foreground-secondary rounded-xl border border-border/50 shadow-inner overflow-x-auto"
            >
              <div class="text-foreground-tertiary">
                &lt;!-- Declarative Animations --&gt;
              </div>
              <div>
                <span class="text-primary">&lt;div</span>
                <span class="text-primary/60"> and-motion</span>=<span
                  class="text-foreground"
                  >"slide-in-left"</span
                >
              </div>
              <div class="pl-5">
                <span class="text-primary/60">and-motion-trigger</span>=<span
                  class="text-foreground"
                  >"enter"</span
                >&gt;
              </div>
              <div class="pl-4">...content</div>
              <div class="text-primary">&lt;/div&gt;</div>
            </div>
          </div>

          <!-- Form Components -->
          <div
            class="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden hover:border-primary/40 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <h4
                class="text-sm font-bold text-primary uppercase tracking-widest"
              >
                Form Controls
              </h4>
              <and-badge variant="outline">and-input</and-badge>
            </div>

            <div
              class="flex flex-col gap-3 p-4 bg-background/50 rounded-xl border border-border/50"
            >
              <and-input
                placeholder="Enter your email..."
                type="email"
              ></and-input>
              <div class="flex items-center gap-3">
                <and-button variant="default" size="sm">Submit</and-button>
                <and-button variant="outline" size="sm">Cancel</and-button>
              </div>
            </div>

            <div
              class="font-mono text-xs p-4 bg-background-secondary text-foreground-secondary rounded-xl border border-border/50 shadow-inner overflow-x-auto"
            >
              <div class="text-primary">
                &lt;and-input
                <span class="text-primary/60">placeholder</span>=<span
                  class="text-foreground"
                  >"email"</span
                >
              </div>
              <div class="pl-5">
                <span class="text-primary/60">type</span>=<span
                  class="text-foreground"
                  >"email"</span
                >
                /&gt;
              </div>
            </div>
          </div>
        </div>

        <!-- Layout System - Full Width -->
        <div
          class="p-6 rounded-3xl bg-gradient-to-br from-background-secondary to-background border border-border relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
          ></div>

          <div class="flex flex-col md:flex-row gap-8 items-start">
            <div class="flex-1 space-y-4">
              <div class="flex items-center gap-3 mb-2">
                <and-icon name="layout" size="md"></and-icon>
                <h3 class="text-xl font-bold font-heading">
                  Attribute-Driven Layout
                </h3>
              </div>
              <p class="text-sm text-foreground-secondary leading-relaxed">
                Pure CSS layout system driven entirely by HTML attributes. No
                classes needed — just add
                <code class="text-primary bg-primary/10 px-1 rounded"
                  >and-layout</code
                >
                and
                <code class="text-primary bg-primary/10 px-1 rounded"
                  >and-text</code
                >
                attributes.
              </p>

              <div
                class="font-mono text-xs p-4 bg-background-secondary text-foreground-secondary rounded-xl border border-border/50 shadow-inner"
              >
                <div>
                  <span class="text-primary">&lt;div</span>
                  <span class="text-primary/60"> and-layout</span>=<span
                    class="text-foreground"
                    >"grid cols:1 cols@md:3 gap:lg"</span
                  >&gt;
                </div>
                <div class="pl-4">
                  <span class="text-primary">&lt;div</span>
                  <span class="text-primary/60"> and-text</span>=<span
                    class="text-foreground"
                    >"h2 weight:bold"</span
                  >&gt;Title<span class="text-primary">&lt;/div&gt;</span>
                </div>
                <div class="text-primary">&lt;/div&gt;</div>
              </div>
            </div>

            <!-- Alert Example -->
            <div class="flex-1 w-full space-y-4">
              <and-alert variant="default">
                <strong>Tip:</strong> All components support Shadow DOM with
                encapsulated styles.
              </and-alert>
              <and-alert variant="destructive">
                <strong>Note:</strong> Full keyboard navigation and ARIA support
                built-in.
              </and-alert>
            </div>
          </div>
        </div>

        <!-- Install CTA -->
        <div
          class="text-center p-6 rounded-2xl bg-background-tertiary border border-border"
        >
          <p class="text-sm text-foreground-secondary mb-3">Quick install:</p>
          <div
            class="font-mono text-sm p-3 bg-background-secondary rounded-xl border border-border/50 inline-block max-w-full overflow-x-auto"
          >
            <span class="text-primary">npm install</span>
            <span class="text-foreground">
              @andersseen/web-components @andersseen/icon @andersseen/motion
              @andersseen/layout</span
            >
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("mock-ui-kit", MockUIKit);

declare global {
  interface HTMLElementTagNameMap {
    "mock-ui-kit": MockUIKit;
  }
}
