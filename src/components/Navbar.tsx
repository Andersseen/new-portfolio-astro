import { Sparkles, Sun, Moon } from "lucide-preact";
import { useState, useEffect } from "preact/hooks";
import type { Language } from "../i18n/config";
import AboutDrawer from "./AboutDrawer";

const SparklesIcon = Sparkles as any;
const SunIcon = Sun as any;
const MoonIcon = Moon as any;

interface NavbarProps {
  children?: any;
}

export default function Navbar({ children }: NavbarProps) {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutData, setAboutData] = useState<any>(null);
  const [aboutLabel, setAboutLabel] = useState("Open about me");

  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDark(theme === "dark");

    import("../i18n/utils").then(({ t }) => {
      const lang = window.location.pathname.split("/")[1] || "en";
      const currentLang = ["en", "es", "ua"].includes(lang) ? lang : "en";
      setAboutLabel(t(currentLang as Language, "a11y.openAbout"));
    });

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
    <>
      <nav
        className={`
        fixed top-0 left-0 right-0 z-50
        border-b transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "bg-background-secondary/80 backdrop-blur-lg shadow-sm border-border/50 py-2"
            : "bg-transparent border-transparent shadow-none py-4"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {}
            <button
              type="button"
              className="flex items-center gap-3 group cursor-pointer bg-transparent border-none p-0"
              aria-label={aboutLabel}
              onClick={(e) => {
                e.preventDefault();
                if (aboutData) {
                  setAboutOpen(!aboutOpen);
                } else {
                  import("../i18n/utils").then(({ t }) => {
                    const lang = window.location.pathname.split("/")[1] || "en";
                    const currentLang = ["en", "es", "ua"].includes(lang)
                      ? lang
                      : "en";
                    import("../data/portfolio").then(({ aboutMeData }) => {
                      const item = aboutMeData((key: string) =>
                        t(currentLang as any, key),
                      );
                      setAboutData(item.details);
                      setAboutOpen(true);
                    });
                  });
                }
              }}
            >
              {}
              {/* The logo is painted through a CSS mask so it follows the
                  foreground token in every theme instead of staying black. */}
              <span
                aria-hidden="true"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background shadow-sm ring-1 ring-border group-hover:ring-foreground/30 transition-shadow duration-300 shrink-0"
              >
                <span className="logo-mark block w-[55%] h-[55%] bg-foreground" />
              </span>

              {}
              <span className="hidden sm:block text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors select-none">
                Andersseen Dev
              </span>
            </button>

            {}
            <div className="flex items-center gap-2 sm:gap-3">
              {}
              {children}

              {}
              <button
                id="theme-randomize"
                className="flex items-center justify-center min-w-11 min-h-11 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
                title="Randomize theme"
                aria-label="Randomize theme"
              >
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {}
              <button
                id="theme-toggle"
                className="flex items-center justify-center min-w-11 min-h-11 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
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

      {/* About Me Drawer — outside nav to avoid backdrop-blur breaking fixed positioning */}
      <AboutDrawer
        data={aboutData || {}}
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />
    </>
  );
}
