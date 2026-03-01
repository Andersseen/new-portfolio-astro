import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  effect,
  ElementRef,
  ViewChild,
  HostListener,
  importProvidersFrom,
} from "@angular/core";
import type { OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  LucideAngularModule,
  ExternalLink,
  Github,
  BookOpen,
  GitBranch,
  ChevronDown,
} from "lucide-angular";
import { GitHubActivityComponent } from "./github-activity.component";

export interface AboutData {
  title?: string;
  bio?: string[];
  bioHtml?: string;
  philosophy?: string;
  goal?: string;
  social?: { label: string; url: string; icon: string; color: string }[];
}

@Component({
  selector: "app-about-drawer",
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GitHubActivityComponent],
  template: `
    <ng-container *ngIf="mounted()">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        [style.opacity]="visible() ? 1 : 0"
        (click)="close()"
      ></div>

      <!-- Drawer -->
      <div
        class="fixed bottom-0 left-0 right-0 z-[61] max-h-[85vh] rounded-t-[2.5rem] overflow-hidden bg-background border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.32,0.72,0,1)]"
        [style.transform]="visible() ? 'translateY(0)' : 'translateY(100%)'"
      >
        <div
          class="flex items-center justify-center py-3 border-b border-border bg-background shrink-0"
        >
          <button
            (click)="close()"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-tertiary hover:text-foreground transition-colors cursor-pointer px-4 py-1.5 rounded-full hover:bg-foreground/5"
          >
            <lucide-icon [img]="ChevronDown" class="w-4 h-4"></lucide-icon>
            Close
          </button>
        </div>

        <!-- Content -->
        <div class="overflow-y-auto flex-1 custom-scrollbar">
          <!-- Header -->
          <div
            class="px-6 sm:px-12 lg:px-20 pt-12 sm:pt-16 pb-8 text-center max-w-3xl mx-auto"
          >
            <h2
              class="text-5xl sm:text-6xl lg:text-7xl font-black font-heading text-foreground tracking-tight leading-none"
            >
              {{ formatTitle(data?.title) }}
              <span class="text-primary">.</span>
            </h2>
            <p class="mt-4 text-lg text-foreground-tertiary leading-relaxed">
              Full Stack Developer &amp; Designer
            </p>
          </div>

          <!-- Body -->
          <div class="px-6 sm:px-12 lg:px-20 pb-8 max-w-4xl mx-auto">
            <!-- Bio -->
            <div class="max-w-2xl mx-auto text-center">
              <ng-container *ngIf="data?.bioHtml; else bioText">
                <div
                  class="text-base text-foreground-secondary leading-[1.8]"
                  [innerHTML]="data?.bioHtml"
                ></div>
              </ng-container>
              <ng-template #bioText>
                <p
                  *ngFor="let paragraph of data?.bio; let last = last"
                  class="text-base text-foreground-secondary leading-[1.8] mb-3"
                  [class.mb-0]="last"
                >
                  {{ paragraph }}
                </p>
              </ng-template>
            </div>

            <!-- Separator -->
            <div class="my-8 border-t border-dashed border-border"></div>

            <!-- Philosophy & Mission -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
            >
              <div *ngIf="data?.philosophy" class="text-center sm:text-left">
                <span
                  class="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary block mb-3"
                >
                  Philosophy
                </span>
                <p
                  class="text-sm italic text-foreground-secondary leading-relaxed"
                >
                  "{{ data?.philosophy }}"
                </p>
              </div>

              <div *ngIf="data?.goal" class="text-center sm:text-left">
                <span
                  class="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary block mb-3"
                >
                  Mission
                </span>
                <p class="text-sm text-foreground-secondary leading-relaxed">
                  {{ data?.goal }}
                </p>
              </div>
            </div>

            <!-- Separator -->
            <div class="my-8 border-t border-dashed border-border"></div>

            <!-- Social Links -->
            <div
              *ngIf="data?.social?.length"
              class="flex flex-col items-center gap-4"
            >
              <span
                class="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary"
              >
                Connect
              </span>
              <div class="flex flex-wrap justify-center gap-3">
                <a
                  *ngFor="let link of data?.social"
                  [href]="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2.5 text-sm font-medium px-5 py-2.5 rounded-full border border-border text-foreground-secondary hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
                >
                  <lucide-icon
                    [img]="getIconData(link.icon)"
                    class="w-4 h-4"
                  ></lucide-icon>
                  {{ link.label }}
                </a>
              </div>
            </div>

            <!-- Separator -->
            <div class="my-8 border-t border-dashed border-border"></div>

            <!-- GitHub Activity -->
            <div class="max-w-2xl mx-auto">
              <app-github-activity username="andersseen"></app-github-activity>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export class AboutDrawerComponent implements OnDestroy {
  @Input() data: AboutData | null = null;
  @Output() onClose = new EventEmitter<void>();

  private _isOpen = false;
  @Input()
  set isOpen(value: boolean) {
    if (this._isOpen === value) return;
    this._isOpen = value;

    if (value) {
      this.mounted.set(true);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden";
      }

      // Delay to allow DOM update before animating
      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => this.visible.set(true));
        });
      } else {
        setTimeout(() => this.visible.set(true), 50);
      }
    } else {
      this.visible.set(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }

      this.mountTimer = setTimeout(() => {
        this.mounted.set(false);
      }, 350) as any;
    }
  }
  get isOpen() {
    return this._isOpen;
  }

  visible = signal(false);
  mounted = signal(false);
  private mountTimer?: number;

  @HostListener("document:keydown.escape")
  onEscape() {
    if (this.visible()) {
      this.close();
    }
  }

  readonly ChevronDown = ChevronDown;

  close() {
    this.onClose.emit();
  }

  formatTitle(title?: string): string {
    const defaultTitle = "Andersseen";
    return (title || defaultTitle).split(",").pop()?.trim() || defaultTitle;
  }

  getIconData(iconName: string): any {
    const map: Record<string, any> = {
      github: Github,
      gitlab: GitBranch,
      medium: BookOpen,
    };
    return map[iconName] || ExternalLink;
  }

  ngOnDestroy() {
    if (this.mountTimer) clearTimeout(this.mountTimer);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }
}
