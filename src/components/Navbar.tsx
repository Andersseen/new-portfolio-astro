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
        transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-border/50"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
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
