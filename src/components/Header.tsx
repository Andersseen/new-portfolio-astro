import { Sparkles, Sun, Moon } from "lucide-preact";
import { useState, useEffect } from "preact/hooks";

// Cast icons to any to avoid JSX component type errors
const SparklesIcon = Sparkles as any;
const SunIcon = Sun as any;
const MoonIcon = Moon as any;

export default function Header() {
  const [isDark, setIsDark] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center gap-3">
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
  );
}
