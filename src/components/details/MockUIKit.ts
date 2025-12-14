import { LitElement, html } from "lit";
import "../ui/LitButton"; // Ensure ui-button is registered

export default class MockUIKit extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="p-4 space-y-10">
        <!-- Header Section -->
        <div class="text-center space-y-3 mb-8">
          <h3
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary font-heading"
          >
            Web Components System
          </h3>
          <p class="text-foreground-secondary max-w-xl mx-auto text-lg">
            A framework-agnostic UI library built with Lit.
            <span class="block text-sm opacity-80 mt-2">
              Just drop in the script and use custom elements anywhere.
            </span>
          </p>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- UI Components Panel -->
          <div
            class="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden relative group hover:border-accent/40 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <h4
                class="text-sm font-bold text-accent uppercase tracking-widest"
              >
                UI Components
              </h4>
              <span
                class="text-xs font-mono text-foreground-tertiary bg-background/50 px-2 py-1 rounded"
              >
                .ts
              </span>
            </div>

            <div class="space-y-4">
              <!-- Visual Preview -->
              <div
                class="flex flex-wrap gap-3 items-center p-4 bg-background/50 rounded-xl border border-border/50"
              >
                <ui-button variant="primary" size="sm" class="rounded-full">
                  Primary
                </ui-button>
                <ui-button variant="outline" size="sm" class="rounded-full">
                  Outline
                </ui-button>
                <div
                  class="relative w-10 h-6 bg-success rounded-full flex items-center px-1 cursor-pointer"
                >
                  <div
                    class="w-4 h-4 bg-white rounded-full translate-x-4 shadow-sm"
                  ></div>
                </div>
              </div>

              <!-- Code Snippet -->
              <div
                class="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner overflow-x-auto"
              >
                <div class="text-blue-400">
                  &lt;ui-button <span class="text-purple-400">variant</span>=
                  <span class="text-green-400">"primary"</span>&gt;
                </div>
                <div class="pl-4">Click Me</div>
                <div class="text-blue-400">&lt;/ui-button&gt;</div>
                <div class="mt-2 text-blue-400">
                  &lt;ui-toggle <span class="text-purple-400">checked</span>{"
                  "} /&gt;
                </div>
              </div>
            </div>
          </div>

          <!-- Animations Attributes Panel -->
          <div
            class="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden relative group hover:border-primary/40 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <h4
                class="text-sm font-bold text-primary uppercase tracking-widest"
              >
                Animations
              </h4>
              <span
                class="text-xs font-mono text-foreground-tertiary bg-background/50 px-2 py-1 rounded"
              >
                attribute-based
              </span>
            </div>

            <div class="space-y-4">
              <!-- Visual Preview - Animated Boxes (Simulated) -->
              <div
                class="h-20 flex items-center justify-center gap-6 p-4 bg-background/50 rounded-xl border border-border/50 overflow-hidden"
              >
                <div
                  class="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg shadow-lg animate-pulse"
                  title="intro='fade-in'"
                ></div>
                <div
                  class="w-12 h-12 bg-gradient-to-br from-accent to-orange-500 rounded-lg shadow-lg"
                  style="animation: bounce 2s infinite"
                  title="hover='bounce'"
                ></div>
              </div>

              <!-- Code Snippet -->
              <div
                class="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner overflow-x-auto"
              >
                <div class="text-gray-500">
                  &lt;!-- Declarative Animations --&gt;
                </div>
                <div>
                  <span class="text-blue-400">&lt;div</span>
                  <span class="text-yellow-400"> enter</span>=
                  <span class="text-green-400">"slide-left"</span>
                </div>
                <div class="pl-9">
                  <span class="text-yellow-400">hover</span>=
                  <span class="text-green-400">"scale-up"</span>
                  <span class="text-blue-400">&gt;</span>
                </div>
                <div class="pl-4">...content</div>
                <div class="text-blue-400">&lt;/div&gt;</div>
              </div>
            </div>
          </div>

          <!-- Icon System Panel - Full Width -->
          <div
            class="md:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-background-secondary to-background border border-border relative overflow-hidden group"
          >
            <!-- Decorative background glow -->
            <div
              class="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
            ></div>

            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-3 mb-2">
                  <div class="p-2 bg-foreground/5 rounded-lg">
                    <svg
                      class="w-6 h-6 text-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold font-heading">
                    Smart Icon System
                  </h3>
                </div>
                <p class="text-sm text-foreground-secondary leading-relaxed">
                  A dedicated Web Component for icons that handles SVG loading,
                  caching, and coloring automatically. No more inline SVGs
                  cluttering your markup.
                </p>

                <div
                  class="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner"
                >
                  <div>
                    <span class="text-blue-400">&lt;ui-icon</span>
                    <span class="text-purple-400"> name</span>=
                    <span class="text-green-400">"github"</span>
                    <span class="text-purple-400"> size</span>=
                    <span class="text-green-400">"lg"</span>
                    <span class="text-blue-400"> /&gt;</span>
                  </div>
                </div>
              </div>

              <!-- Icon Grid Preview -->
              <div class="flex-1 w-full grid grid-cols-4 gap-3">
                ${[1, 2, 3, 4, 5, 6, 7, 8].map(
                  (i) => html`
                    <div
                      class="aspect-square rounded-xl bg-background border border-border/50 flex items-center justify-center hover:bg-accent/10 hover:border-accent/50 transition-all cursor-crosshair group/icon"
                    >
                      <div
                        class="w-6 h-6 rounded-md bg-foreground/20 group-hover/icon:bg-accent group-hover/icon:scale-110 transition-all duration-300"
                      ></div>
                    </div>
                  `
                )}
              </div>
            </div>
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
