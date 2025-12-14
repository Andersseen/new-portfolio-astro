import type { FunctionalComponent } from "preact";
import Button from "../ui/Button";

const MockUIKit: FunctionalComponent = () => {
  return (
    <div className="p-4 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Atomic Design System
        </h3>
        <p className="text-foreground-secondary max-w-md mx-auto">
          A scalable, accessible, and theme-able UI kit built with Tailwind CSS
          and React/Preact.
        </p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Buttons Panel */}
        <div className="space-y-4 p-5 rounded-2xl bg-background-tertiary border border-border">
          <h4 className="text-sm font-semibold text-foreground-secondary uppercase tracking-widest mb-4">
            Interactive Elements
          </h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" size="sm">
              Default
            </Button>
            <Button variant="outline" size="sm">
              Outline
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-accent text-white hover:bg-accent/90"
            >
              Accent
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
            <div className="w-10 h-6 bg-border/30 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Typography & Colors */}
        <div className="space-y-4 p-5 rounded-2xl bg-background-tertiary border border-border">
          <h4 className="text-sm font-semibold text-foreground-secondary uppercase tracking-widest mb-4">
            Typography & Colors
          </h4>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-heading">Heading 1</h1>
            <h2 className="text-xl font-semibold font-heading text-primary">
              Heading 2 (Primary)
            </h2>
            <p className="text-sm text-foreground-secondary">
              Body text should be legible, with good contrast and proper
              line-height for readability across all devices.
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="w-8 h-8 rounded-lg bg-primary shadow-sm ring-2 ring-primary/20"></div>
            <div className="w-8 h-8 rounded-lg bg-secondary shadow-sm ring-2 ring-secondary/20"></div>
            <div className="w-8 h-8 rounded-lg bg-accent shadow-sm ring-2 ring-accent/20"></div>
            <div className="w-8 h-8 rounded-lg bg-success shadow-sm ring-2 ring-success/20"></div>
          </div>
        </div>

        {/* Card Component Mockup */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold">Component Architecture</h3>
              <p className="text-sm text-foreground-secondary">
                Built with composability in mind. Components are designed to be
                agnostic, reusable, and easy to maintain.
              </p>
            </div>
            <div className="flex-1 w-full bg-background rounded-lg border border-border p-4 shadow-sm">
              <div className="h-2 w-2/3 bg-border/50 rounded mb-3"></div>
              <div className="h-2 w-full bg-border/30 rounded mb-2"></div>
              <div className="h-2 w-5/6 bg-border/30 rounded mb-2"></div>
              <div className="h-2 w-4/5 bg-border/30 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockUIKit;
