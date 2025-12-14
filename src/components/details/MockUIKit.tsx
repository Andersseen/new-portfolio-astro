/** @jsxImportSource preact */
import type { FunctionalComponent } from "preact";
import Button from "../ui/Button";

const MockUIKit: FunctionalComponent = () => {
  return (
    <div className="p-4 space-y-10">
      {/* Header Section */}
      <div className="text-center space-y-3 mb-8">
        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary font-heading">
          Web Components System
        </h3>
        <p className="text-foreground-secondary max-w-xl mx-auto text-lg">
          A framework-agnostic UI library built with Lit.
          <span className="block text-sm opacity-80 mt-2">
            Just drop in the script and use custom elements anywhere.
          </span>
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* UI Components Panel */}
        <div className="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden relative group hover:border-accent/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-accent uppercase tracking-widest">
              UI Components
            </h4>
            <span className="text-xs font-mono text-foreground-tertiary bg-background/50 px-2 py-1 rounded">
              .ts
            </span>
          </div>

          <div className="space-y-4">
            {/* Visual Preview */}
            <div className="flex flex-wrap gap-3 items-center p-4 bg-background/50 rounded-xl border border-border/50">
              <Button variant="primary" size="sm" className="rounded-full">
                Primary
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Outline
              </Button>
              <div className="relative w-10 h-6 bg-success rounded-full flex items-center px-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-4 shadow-sm"></div>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner overflow-x-auto">
              <div className="text-blue-400">
                &lt;ui-button <span className="text-purple-400">variant</span>=
                <span className="text-green-400">"primary"</span>&gt;
              </div>
              <div className="pl-4">Click Me</div>
              <div className="text-blue-400">&lt;/ui-button&gt;</div>
              <div className="mt-2 text-blue-400">
                &lt;ui-toggle <span className="text-purple-400">checked</span>{" "}
                /&gt;
              </div>
            </div>
          </div>
        </div>

        {/* Animations Attributes Panel */}
        <div className="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden relative group hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest">
              Animations
            </h4>
            <span className="text-xs font-mono text-foreground-tertiary bg-background/50 px-2 py-1 rounded">
              attribute-based
            </span>
          </div>

          <div className="space-y-4">
            {/* Visual Preview - Animated Boxes (Simulated) */}
            <div className="h-20 flex items-center justify-center gap-6 p-4 bg-background/50 rounded-xl border border-border/50 overflow-hidden">
              <div
                className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg shadow-lg animate-pulse"
                title="intro='fade-in'"
              ></div>
              <div
                className="w-12 h-12 bg-gradient-to-br from-accent to-orange-500 rounded-lg shadow-lg"
                style={{ animation: "bounce 2s infinite" }}
                title="hover='bounce'"
              ></div>
            </div>

            {/* Code Snippet */}
            <div className="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner overflow-x-auto">
              <div className="text-gray-500">
                &lt;!-- Declarative Animations --&gt;
              </div>
              <div>
                <span className="text-blue-400">&lt;div</span>
                <span className="text-yellow-400"> enter</span>=
                <span className="text-green-400">"slide-left"</span>
              </div>
              <div className="pl-9">
                <span className="text-yellow-400">hover</span>=
                <span className="text-green-400">"scale-up"</span>
                <span className="text-blue-400">&gt;</span>
              </div>
              <div className="pl-4">...content</div>
              <div className="text-blue-400">&lt;/div&gt;</div>
            </div>
          </div>
        </div>

        {/* Icon System Panel - Full Width */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-background-secondary to-background border border-border relative overflow-hidden group">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-foreground/5 rounded-lg">
                  <svg
                    className="w-6 h-6 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-heading">
                  Smart Icon System
                </h3>
              </div>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                A dedicated Web Component for icons that handles SVG loading,
                caching, and coloring automatically. No more inline SVGs
                cluttering your markup.
              </p>

              <div className="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner">
                <div>
                  <span className="text-blue-400">&lt;ui-icon</span>
                  <span className="text-purple-400"> name</span>=
                  <span className="text-green-400">"github"</span>
                  <span className="text-purple-400"> size</span>=
                  <span className="text-green-400">"lg"</span>
                  <span className="text-blue-400"> /&gt;</span>
                </div>
              </div>
            </div>

            {/* Icon Grid Preview */}
            <div className="flex-1 w-full grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-background border border-border/50 flex items-center justify-center hover:bg-accent/10 hover:border-accent/50 transition-all cursor-crosshair group/icon"
                >
                  <div
                    className={`w-6 h-6 rounded-md bg-foreground/20 group-hover/icon:bg-accent group-hover/icon:scale-110 transition-all duration-300`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockUIKit;
