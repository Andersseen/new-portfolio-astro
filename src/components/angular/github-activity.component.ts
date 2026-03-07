import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from "@angular/core";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GitHubContributionsResponse {
  contributions?: ContributionDay[];
  total?: {
    lastYear?: number;
  };
}

const CELL_SIZE = 11;
const CELL_GAP = 3;
const TOTAL = CELL_SIZE + CELL_GAP;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

@Component({
  selector: "app-github-activity",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div
        class="w-full rounded-xl bg-background-tertiary border border-border p-6 animate-pulse"
      >
        <div class="h-4 w-48 bg-border rounded mb-4"></div>
        <div class="h-[100px] bg-border/50 rounded"></div>
      </div>
    } @else if (!error() && hasData()) {
      <div
        class="w-full rounded-xl bg-background-tertiary border border-border p-5 overflow-hidden"
      >
        <div class="flex items-center justify-between mb-4 gap-2">
          <h4 class="text-sm font-semibold text-foreground">
            {{ formattedTotal() }} contributions in the last year
          </h4>
          <a
            [href]="'https://github.com/' + username()"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-primary hover:underline"
            [attr.aria-label]="'Open GitHub profile for ' + username()"
          >
            &#64;{{ username() }}
          </a>
        </div>

        <div class="overflow-x-auto custom-scrollbar -mx-1 px-1 pb-1">
          <svg
            [attr.width]="svgWidth()"
            [attr.height]="svgHeight"
            class="block"
            role="img"
            [attr.aria-label]="ariaLabel()"
          >
            @for (monthLabel of monthLabels(); track monthLabel.x) {
              <text
                [attr.x]="monthLabel.x"
                y="10"
                class="fill-foreground-tertiary"
                font-size="10"
                font-family="var(--font-sans)"
              >
                {{ monthLabel.label }}
              </text>
            }

            @for (week of weeks(); track $index; let weekIdx = $index) {
              @for (day of week.days; track day.date; let dayIdx = $index) {
                <rect
                  [attr.x]="weekIdx * TOTAL"
                  [attr.y]="dayIdx * TOTAL + 18"
                  [attr.width]="CELL_SIZE"
                  [attr.height]="CELL_SIZE"
                  rx="2"
                  ry="2"
                  [class]="getCellClass(day.level)"
                  [style.opacity]="getCellOpacity(day.level)"
                >
                  <title>
                    {{ day.count }} contribution{{
                      day.count !== 1 ? "s" : ""
                    }}
                    on
                    {{ day.date }}
                  </title>
                </rect>
              }
            }
          </svg>
        </div>

        <div
          class="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-foreground-tertiary"
          aria-hidden="true"
        >
          <span>Less</span>
          <span
            class="inline-block w-[11px] h-[11px] rounded-sm bg-border"
          ></span>
          <span
            class="inline-block w-[11px] h-[11px] rounded-sm bg-primary/20"
          ></span>
          <span
            class="inline-block w-[11px] h-[11px] rounded-sm bg-primary/40"
          ></span>
          <span
            class="inline-block w-[11px] h-[11px] rounded-sm bg-primary/70"
          ></span>
          <span
            class="inline-block w-[11px] h-[11px] rounded-sm bg-primary"
          ></span>
          <span>More</span>
        </div>
      </div>
    } @else {
      <div
        class="w-full rounded-xl bg-background-tertiary border border-border p-5"
      >
        <p class="text-sm text-foreground-secondary">
          Unable to load GitHub activity right now.
        </p>
      </div>
    }
  `,
})
export class GitHubActivityComponent {
  readonly username = input.required<string>();

  readonly TOTAL = TOTAL;
  readonly CELL_SIZE = CELL_SIZE;
  readonly svgHeight = 7 * TOTAL + 24;

  readonly weeks = signal<ContributionWeek[]>([]);
  readonly totalContributions = signal(0);
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly hasData = computed(() => this.weeks().length > 0);
  readonly formattedTotal = computed(() =>
    this.totalContributions().toLocaleString(),
  );
  readonly svgWidth = computed(() => this.weeks().length * TOTAL + 2);
  readonly ariaLabel = computed(
    () => `GitHub contribution graph for ${this.username()}`,
  );

  readonly monthLabels = computed(() => {
    const labels: Array<{ label: string; x: number }> = [];
    let lastMonth = -1;

    this.weeks().forEach((week, weekIdx) => {
      const firstDay = week.days[0];
      if (!firstDay) return;

      const month = new Date(firstDay.date).getMonth();
      if (month === lastMonth) return;

      labels.push({ label: MONTHS[month], x: weekIdx * TOTAL });
      lastMonth = month;
    });

    return labels;
  });

  constructor() {
    effect(
      () => {
        const currentUsername = this.username().trim();

        if (!currentUsername) {
          this.loading.set(false);
          this.error.set(true);
          this.weeks.set([]);
          this.totalContributions.set(0);
          return;
        }

        void this.fetchContributions(currentUsername);
      },
      { allowSignalWrites: true },
    );
  }

  getCellClass(level: ContributionDay["level"]): string {
    return level === 0 ? "fill-border" : "fill-primary";
  }

  getCellOpacity(level: ContributionDay["level"]): number {
    switch (level) {
      case 1:
        return 0.25;
      case 2:
        return 0.45;
      case 3:
        return 0.7;
      case 4:
        return 1;
      case 0:
      default:
        return 1;
    }
  }

  private async fetchContributions(username: string): Promise<void> {
    this.loading.set(true);
    this.error.set(false);

    try {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub contributions");
      }

      const payload = (await response.json()) as GitHubContributionsResponse;
      const days = Array.isArray(payload.contributions)
        ? payload.contributions
        : [];

      const groupedWeeks = this.groupByWeeks(days);
      this.weeks.set(groupedWeeks);

      const fallbackTotal = days.reduce((sum, day) => sum + day.count, 0);
      this.totalContributions.set(payload.total?.lastYear ?? fallbackTotal);
    } catch (error) {
      console.error("GitHub contributions fetch error:", error);
      this.error.set(true);
      this.weeks.set([]);
      this.totalContributions.set(0);
    } finally {
      this.loading.set(false);
    }
  }

  private groupByWeeks(days: ContributionDay[]): ContributionWeek[] {
    const grouped: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    for (const day of days) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        grouped.push({ days: currentWeek });
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      grouped.push({ days: currentWeek });
    }

    return grouped;
  }
}
