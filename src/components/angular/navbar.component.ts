import { Component, signal, importProvidersFrom } from "@angular/core";
import type { OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Sparkles, Sun, Moon } from "lucide-angular";
import { AboutDrawerComponent } from "./about-drawer.component";
import type { AboutData } from "./about-drawer.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AboutDrawerComponent],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-in-out"
      [ngClass]="{
        'bg-background/80 backdrop-blur-lg shadow-lg border-border/50 py-2':
          isScrolled(),
        'bg-transparent border-transparent shadow-none py-4': !isScrolled(),
      }"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <!-- Logo & Brand -->
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
                  src="/logo.svg"
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

          <!-- Actions -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Language Selector (passed as children) -->
            <ng-content></ng-content>

            <!-- Theme Randomizer -->
            <button
              id="theme-randomize"
              class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
              title="Randomize theme"
              aria-label="Randomize theme"
            >
              <lucide-icon
                [img]="Sparkles"
                class="w-4 h-4 sm:w-5 sm:h-5"
              ></lucide-icon>
            </button>

            <!-- Theme Toggle -->
            <button
              id="theme-toggle"
              class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <lucide-icon
                *ngIf="isDark()"
                [img]="Sun"
                class="w-4 h-4 sm:w-5 sm:h-5"
              ></lucide-icon>
              <lucide-icon
                *ngIf="!isDark()"
                [img]="Moon"
                class="w-4 h-4 sm:w-5 sm:h-5"
              ></lucide-icon>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- About Me Drawer -->
    <app-about-drawer
      [data]="aboutData()"
      [isOpen]="aboutOpen()"
      (onClose)="aboutOpen.set(false)"
    ></app-about-drawer>
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  isDark = signal(false);
  isScrolled = signal(false);
  aboutOpen = signal(false);
  aboutData = signal<AboutData | null>(null);

  readonly Sparkles = Sparkles;
  readonly Sun = Sun;
  readonly Moon = Moon;

  private observer?: MutationObserver;
  private scrollListener?: () => void;

  ngOnInit() {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const theme = document.documentElement.getAttribute("data-theme");
      this.isDark.set(theme === "dark");

      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "data-theme") {
            const newTheme =
              document.documentElement.getAttribute("data-theme");
            this.isDark.set(newTheme === "dark");
          }
        });
      });

      this.observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      this.scrollListener = () => {
        this.isScrolled.set(window.scrollY > 20);
      };
      window.addEventListener("scroll", this.scrollListener);

      // Initial trigger
      this.scrollListener();
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.scrollListener && typeof window !== "undefined") {
      window.removeEventListener("scroll", this.scrollListener);
    }
  }

  async toggleAbout(e: Event) {
    e.preventDefault();
    if (this.aboutData()) {
      this.aboutOpen.set(!this.aboutOpen());
    } else {
      try {
        const { t } = await import("../../i18n/utils");
        const langPath = window.location.pathname.split("/")[1] || "en";
        const currentLang = ["en", "es", "ua"].includes(langPath)
          ? langPath
          : "en";

        const { aboutMeData } = await import("../../data/portfolio");
        const item = aboutMeData((key: string) => t(currentLang as any, key));

        this.aboutData.set(item.details);
        this.aboutOpen.set(true);
      } catch (err) {
        console.error("Failed to load about data", err);
      }
    }
  }
}
