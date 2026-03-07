import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from "@angular/core";
import type { OnInit, OnDestroy } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { LucideAngularModule, Sparkles, Sun, Moon } from "lucide-angular";
import { AboutDrawerComponent } from "./about-drawer.component";
import type { AboutData } from "./about-drawer.component";

type Locale = "en" | "es" | "ua";
const SUPPORTED_LOCALES: readonly Locale[] = ["en", "es", "ua"];

@Component({
  selector: "app-navbar",
  imports: [LucideAngularModule, AboutDrawerComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-in-out"
      [class]="navStateClass()"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div
            class="flex items-center gap-3 group cursor-pointer"
            (click)="toggleAbout($event)"
          >
            <div
              class="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0"
            >
              <div
                class="absolute inset-0 bg-primary/30 backdrop-blur-sm border-2 border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/50 transition-all duration-300 flex items-center justify-center text-sm sm:text-base font-bold text-primary"
              >
                <img
                  ngSrc="/logo.svg"
                  alt="Andersseen Dev Logo"
                  width="40"
                  height="40"
                  fetchpriority="high"
                />
              </div>
            </div>

            <span
              class="hidden sm:block text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors select-none"
            >
              Andersseen Dev
            </span>
          </div>

          <div class="flex items-center gap-2 sm:gap-3">
            <ng-content></ng-content>

            <button
              id="theme-randomize"
              type="button"
              class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
              title="Randomize theme"
              aria-label="Randomize theme"
            >
              <lucide-icon
                [img]="Sparkles"
                class="w-4 h-4 sm:w-5 sm:h-5"
              ></lucide-icon>
            </button>

            <button
              id="theme-toggle"
              type="button"
              class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              @if (isDark()) {
                <lucide-icon
                  [img]="Sun"
                  class="w-4 h-4 sm:w-5 sm:h-5"
                ></lucide-icon>
              } @else {
                <lucide-icon
                  [img]="Moon"
                  class="w-4 h-4 sm:w-5 sm:h-5"
                ></lucide-icon>
              }
            </button>
          </div>
        </div>
      </div>
    </nav>

    <app-about-drawer
      [data]="aboutData()"
      [isOpen]="aboutOpen()"
      (onClose)="handleDrawerClose()"
    ></app-about-drawer>
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly isDark = signal(false);
  readonly isScrolled = signal(false);
  readonly aboutOpen = signal(false);
  readonly aboutData = signal<AboutData | null>(null);

  readonly navStateClass = computed(() =>
    this.isScrolled()
      ? "bg-background/80 backdrop-blur-lg shadow-lg border-border/50 py-2"
      : "bg-transparent border-transparent shadow-none py-4",
  );

  readonly Sparkles = Sparkles;
  readonly Sun = Sun;
  readonly Moon = Moon;

  private observer: MutationObserver | null = null;
  private removeScrollListener: (() => void) | null = null;

  ngOnInit(): void {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    this.syncThemeState();

    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "data-theme") {
          this.syncThemeState();
        }
      }
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onScroll = () => {
      this.isScrolled.set(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    this.removeScrollListener = () => {
      window.removeEventListener("scroll", onScroll);
    };

    onScroll();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;

    this.removeScrollListener?.();
    this.removeScrollListener = null;
  }

  handleDrawerClose(): void {
    this.aboutOpen.set(false);
  }

  async toggleAbout(event: Event): Promise<void> {
    event.preventDefault();

    if (this.aboutData()) {
      this.aboutOpen.set(!this.aboutOpen());
      return;
    }

    try {
      const currentLang = this.resolveCurrentLocale();
      const { t } = await import("../../i18n/utils");
      const { aboutMeData } = await import("../../data/portfolio");
      const item = aboutMeData((key: string) => t(currentLang, key));

      this.aboutData.set((item.details as AboutData) ?? null);
      this.aboutOpen.set(true);
    } catch (error) {
      console.error("Failed to load about data", error);
    }
  }

  private syncThemeState(): void {
    if (typeof document === "undefined") {
      return;
    }

    const currentTheme = document.documentElement.getAttribute("data-theme");
    this.isDark.set(currentTheme === "dark");
  }

  private resolveCurrentLocale(): Locale {
    if (typeof window === "undefined") {
      return "en";
    }

    const langPath = window.location.pathname.split("/")[1] || "en";
    if (this.isLocale(langPath)) {
      return langPath;
    }

    return "en";
  }

  private isLocale(value: string): value is Locale {
    return SUPPORTED_LOCALES.some((locale) => locale === value);
  }
}
