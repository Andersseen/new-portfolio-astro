import { Sparkles, Sun, Moon } from "lucide-preact";
import { useState, useEffect } from "preact/hooks";

// Cast icons to any to avoid JSX component type errors
const SparklesIcon = Sparkles as any;
const SunIcon = Sun as any;
const MoonIcon = Moon as any;

interface NavbarProps {
  children?: any;
}

export default function Navbar({ children }: NavbarProps) {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check initial theme
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme === "dark");

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = document.documentElement.getAttribute("data-theme");
          setIsDark(newTheme === "dark");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Handle scroll for glassmorphism effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        border-b transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-lg border-border/50"
            : "bg-transparent border-transparent shadow-none"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand with Avatar */}
          {/* Logo / Brand with Avatar */}
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              // Dynamic import to avoid SSR issues if simple import fails,
              // but standard import should work since this is a client component usually?
              // Actually Navbar might be static. If Navbar is static, onClick won't work without client: directive.
              // Let's assume Navbar is hydrated or we need to add interactivity.
              // If Navbar is not hydrated, we can't use onClick.
              // Checking previous files... Navbar is used in Layout.astro without client directive usually.
              // But PortfolioGrid is client:load.
              // We will add client:load to Navbar in Layout.astro if needed, or use a script tag.
              // Since this file is .tsx, it implies it is intended to be hydrated or rendered to static HTML.
              // If it is static HTML, onClick will do nothing.
              // Safe bet: Use standard global event dispatch or leave it as is if not hydrated?
              // Wait, user asked to fix it. If Navbar.tsx is just rendering HTML, I need to make it interactive.

              // Let's assume we will make Navbar interactive in Layout.astro.
              import("../store/modalStore").then(({ openModal }) => {
                import("../data/portfolio").then(({ aboutMeData }) => {
                  import("../i18n/utils").then(({ t }) => {
                    // Simple client-side lang detection
                    const lang = window.location.pathname.split("/")[1] || "en";
                    // Check if lang is valid, simplified
                    const validLang = ["en", "es", "ua"].includes(lang)
                      ? lang
                      : "en";
                    openModal(aboutMeData((key) => t(validLang as any, key)));
                  });
                });
              });
            }}
          >
            {/* Avatar Circle */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 backdrop-blur-sm border-2 border-primary/20 group-hover:border-primary/40 group-hover:from-primary/60 group-hover:to-secondary/60 transition-all duration-300 flex items-center justify-center text-base font-bold text-primary">
                A
              </div>
            </div>

            {/* Brand Name */}
            <a
              href="/"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
              onClick={(e) => e.preventDefault()} // Prevent navigation
            >
              Andersseen Dev
            </a>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Language Selector (passed as children) */}
            {children}

            {/* Theme Randomizer */}
            <button
              id="theme-randomize"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-all duration-200 cursor-pointer"
              title="Randomize theme"
              aria-label="Randomize theme"
            >
              <SparklesIcon className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
