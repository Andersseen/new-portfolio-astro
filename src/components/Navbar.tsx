
import { Sparkles, Sun, Moon } from "lucide-preact";
import { useState, useEffect } from "preact/hooks";


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
    
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme === "dark");

    
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
            ? "bg-background/80 backdrop-blur-lg shadow-lg border-border/50 py-2"
            : "bg-transparent border-transparent shadow-none py-4"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {}
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              import("../store/modalStore").then(
                ({ openModal, aboutMeStore }) => {
                  import("../i18n/utils").then(({ t, getTranslation }) => {
                    const lang = window.location.pathname.split("/")[1] || "en";
                    const currentLang = ["en", "es", "ua"].includes(lang)
                      ? lang
                      : "en";

                    const hydratedItem = aboutMeStore.get();

                    import("../data/portfolio").then(({ aboutMeData }) => {
                      openModal(
                        aboutMeData((key) => t(currentLang as any, key)),
                      );
                    });
                  });
                },
              );
            }}
          >
            {}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm border-2 border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/50 transition-all duration-300 flex items-center justify-center text-sm sm:text-base font-bold text-primary">
                <img src="/logo.svg" alt="Andersseen Dev Logo" width="40" height="40" fetchPriority="high" />
              </div>
            </div>

            {}
            <a
              href="/"
              className="hidden sm:block text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors"
              onClick={(e) => e.preventDefault()} 
            >
              Andersseen Dev
            </a>
          </div>

          {}
          <div className="flex items-center gap-2 sm:gap-3">
            {}
            {children}

            {}
            <button
              id="theme-randomize"
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
              title="Randomize theme"
              aria-label="Randomize theme"
            >
              <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {}
            <button
              id="theme-toggle"
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? (
                <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
