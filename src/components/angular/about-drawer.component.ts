import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import type { OnDestroy } from "@angular/core";
import {
  LucideAngularModule,
  ExternalLink,
  Github,
  BookOpen,
  GitBranch,
  ChevronDown,
} from "lucide-angular";
import { GitHubActivityComponent } from "./github-activity.component";

export interface AboutSocialLink {
  label: string;
  url: string;
  icon: string;
  color: string;
}

export interface AboutData {
  title?: string;
  bio?: string[];
  bioHtml?: string;
  philosophy?: string;
  goal?: string;
  social?: AboutSocialLink[];
}

const CLOSE_ANIMATION_MS = 350;

@Component({
  selector: "app-about-drawer",
  imports: [LucideAngularModule, GitHubActivityComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:keydown.escape)": "onEscape()",
  },
  template: `
    @if (mounted()) {
      <div
        class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        [style.opacity]="visible() ? 1 : 0"
        (click)="close()"
        aria-hidden="true"
      ></div>

      <div
        class="fixed bottom-0 left-0 right-0 z-[61] max-h-[85vh] rounded-t-[2.5rem] overflow-hidden bg-background border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.32,0.72,0,1)]"
        [style.transform]="visible() ? 'translateY(0)' : 'translateY(100%)'"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-drawer-title"
      >
        <div
          class="flex items-center justify-center py-3 border-b border-border bg-background shrink-0"
        >
          <button
            #closeButton
            type="button"
            (click)="close()"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-tertiary hover:text-foreground transition-colors cursor-pointer px-4 py-1.5 rounded-full hover:bg-foreground/5"
            aria-label="Close about drawer"
          >
            <lucide-icon [img]="ChevronDown" class="w-4 h-4"></lucide-icon>
            Close
          </button>
        </div>

        <div class="overflow-y-auto flex-1 custom-scrollbar">
          <div
            class="px-6 sm:px-12 lg:px-20 pt-12 sm:pt-16 pb-8 text-center max-w-3xl mx-auto"
          >
            <h2
              id="about-drawer-title"
              class="text-5xl sm:text-6xl lg:text-7xl font-black font-heading text-foreground tracking-tight leading-none"
            >
              {{ displayTitle() }}
              <span class="text-primary">.</span>
            </h2>
            <p class="mt-4 text-lg text-foreground-tertiary leading-relaxed">
              Full Stack Developer &amp; Designer
            </p>
          </div>

          <div class="px-6 sm:px-12 lg:px-20 pb-8 max-w-4xl mx-auto">
            <div class="max-w-2xl mx-auto text-center">
              @if (data()?.bioHtml) {
                <div
                  class="text-base text-foreground-secondary leading-[1.8]"
                  [innerHTML]="data()?.bioHtml"
                ></div>
              } @else {
                @for (
                  paragraph of bioParagraphs();
                  track $index;
                  let last = $last
                ) {
                  <p
                    class="text-base text-foreground-secondary leading-[1.8] mb-3"
                    [class.mb-0]="last"
                  >
                    {{ paragraph }}
                  </p>
                }
              }
            </div>

            <div class="my-8 border-t border-dashed border-border"></div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
            >
              @if (data()?.philosophy) {
                <div class="text-center sm:text-left">
                  <span
                    class="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary block mb-3"
                  >
                    Philosophy
                  </span>
                  <p
                    class="text-sm italic text-foreground-secondary leading-relaxed"
                  >
                    "{{ data()?.philosophy }}"
                  </p>
                </div>
              }

              @if (data()?.goal) {
                <div class="text-center sm:text-left">
                  <span
                    class="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary block mb-3"
                  >
                    Mission
                  </span>
                  <p class="text-sm text-foreground-secondary leading-relaxed">
                    {{ data()?.goal }}
                  </p>
                </div>
              }
            </div>

            <div class="my-8 border-t border-dashed border-border"></div>

            @if (socialLinks().length > 0) {
              <div class="flex flex-col items-center gap-4">
                <span
                  class="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary"
                >
                  Connect
                </span>
                <div class="flex flex-wrap justify-center gap-3">
                  @for (link of socialLinks(); track link.url) {
                    <a
                      [href]="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2.5 text-sm font-medium px-5 py-2.5 rounded-full border border-border text-foreground-secondary hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
                      [attr.aria-label]="'Open ' + link.label"
                    >
                      <lucide-icon
                        [img]="getIconData(link.icon)"
                        class="w-4 h-4"
                      ></lucide-icon>
                      {{ link.label }}
                    </a>
                  }
                </div>
              </div>
            }

            <div class="my-8 border-t border-dashed border-border"></div>

            <div class="max-w-2xl mx-auto">
              <app-github-activity username="andersseen"></app-github-activity>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class AboutDrawerComponent implements OnDestroy {
  readonly data = input<AboutData | null>(null);
  readonly isOpen = input(false);
  readonly onClose = output<void>();

  readonly visible = signal(false);
  readonly mounted = signal(false);

  readonly displayTitle = computed(() => this.formatTitle(this.data()?.title));
  readonly bioParagraphs = computed(() => this.data()?.bio ?? []);
  readonly socialLinks = computed(() => this.data()?.social ?? []);

  readonly ChevronDown = ChevronDown;
  readonly closeButtonRef =
    viewChild<ElementRef<HTMLButtonElement>>("closeButton");

  private readonly iconMap = {
    github: Github,
    gitlab: GitBranch,
    medium: BookOpen,
  } as const;

  private mountTimer: ReturnType<typeof setTimeout> | null = null;
  private lastActiveElement: HTMLElement | null = null;

  constructor() {
    effect(
      () => {
        const open = this.isOpen();

        if (open) {
          this.openDrawer();
          return;
        }

        this.hideDrawer();
      },
      { allowSignalWrites: true },
    );
  }

  onEscape(): void {
    if (this.visible()) {
      this.close();
    }
  }

  close(): void {
    this.onClose.emit();
  }

  getIconData(iconName: string) {
    return this.iconMap[iconName as keyof typeof this.iconMap] ?? ExternalLink;
  }

  ngOnDestroy(): void {
    this.restoreFocus();
    this.clearMountTimer();
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }

  private openDrawer(): void {
    this.clearMountTimer();
    this.mounted.set(true);

    this.lastActiveElement =
      typeof document !== "undefined"
        ? (document.activeElement as HTMLElement | null)
        : null;

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.visible.set(true);
          this.focusCloseButton();
        });
      });
      return;
    }

    this.visible.set(true);
    this.focusCloseButton();
  }

  private hideDrawer(): void {
    this.visible.set(false);
    this.restoreFocus();

    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }

    if (!this.mounted()) {
      return;
    }

    this.clearMountTimer();
    this.mountTimer = setTimeout(() => {
      this.mounted.set(false);
    }, CLOSE_ANIMATION_MS);
  }

  private clearMountTimer(): void {
    if (!this.mountTimer) {
      return;
    }

    clearTimeout(this.mountTimer);
    this.mountTimer = null;
  }

  private focusCloseButton(): void {
    this.closeButtonRef()?.nativeElement.focus();
  }

  private restoreFocus(): void {
    this.lastActiveElement?.focus();
    this.lastActiveElement = null;
  }

  private formatTitle(title?: string): string {
    const defaultTitle = "Andersseen";
    return (title || defaultTitle).split(",").pop()?.trim() || defaultTitle;
  }
}
