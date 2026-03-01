import { Component, Input, signal } from "@angular/core";
import type { OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
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
];

@Component({
  selector: "app-github-activity",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="loading()"
      class="w-full rounded-xl bg-background-tertiary border border-border p-6 animate-pulse"
    >
      <div class="h-4 w-48 bg-border rounded mb-4"></div>
      <div class="h-[100px] bg-border/50 rounded"></div>
    </div>

    <div
      *ngIf="!loading() && !error() && weeks().length > 0"
      class="w-full rounded-xl bg-background-tertiary border border-border p-5 overflow-hidden"
    >
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-semibold text-foreground">
          {{ totalContributions().toLocaleString() }} contributions in the last
          year
        </h4>
        <a
          [href]="'https://github.com/' + username"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs text-primary hover:underline"
        >
          &#64;{{ username }}
        </a>
      </div>

      <div class="overflow-x-auto custom-scrollbar -mx-1 px-1 pb-1">
        <svg
          [attr.width]="svgWidth()"
          [attr.height]="svgHeight"
          class="block"
          role="img"
          [attr.aria-label]="'GitHub contribution graph for ' + username"
        >
          <!-- Month labels -->
          <text
            *ngFor="let m of monthLabels()"
            [attr.x]="m.x"
            y="10"
            class="fill-foreground-tertiary"
            font-size="10"
            font-family="var(--font-sans)"
          >
            {{ m.label }}
          </text>

          <!-- Contribution cells -->
          <ng-container *ngFor="let week of weeks(); let weekIdx = index">
            <rect
              *ngFor="let day of week.days; let dayIdx = index"
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
                {{ day.count }} contribution{{ day.count !== 1 ? "s" : "" }} on
                {{ day.date }}
              </title>
            </rect>
          </ng-container>
        </svg>
      </div>

      <!-- Legend -->
      <div
        class="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-foreground-tertiary"
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
  `,
})
export class GitHubActivityComponent implements OnInit {
  @Input() username!: string;

  TOTAL = TOTAL;
  CELL_SIZE = CELL_SIZE;

  weeks = signal<ContributionWeek[]>([]);
  totalContributions = signal(0);
  loading = signal(true);
  error = signal(false);

  monthLabels = signal<{ label: string; x: number }[]>([]);
  svgWidth = signal(0);
  readonly svgHeight = 7 * TOTAL + 24;

  ngOnInit() {
    this.fetchContributions();
  }

  async fetchContributions() {
    try {
      const res = await fetch(
        "https://github-contributions-api.jogruber.de/v4/" +
          this.username +
          "?y=last",
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      if (data.contributions && Array.isArray(data.contributions)) {
        const days: ContributionDay[] = data.contributions;
        const grouped: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];

        for (let i = 0; i < days.length; i++) {
          currentWeek.push(days[i]);
          if (currentWeek.length === 7) {
            grouped.push({ days: currentWeek });
            currentWeek = [];
          }
        }
        if (currentWeek.length > 0) {
          grouped.push({ days: currentWeek });
        }

        this.weeks.set(grouped);

        const total =
          data.total?.lastYear ??
          days.reduce((sum: number, d: ContributionDay) => sum + d.count, 0);
        this.totalContributions.set(total);

        // Process months
        const labels: { label: string; x: number }[] = [];
        let lastMonth = -1;
        grouped.forEach((week, weekIdx) => {
          const firstDay = week.days[0];
          if (firstDay) {
            const month = new Date(firstDay.date).getMonth();
            if (month !== lastMonth) {
              labels.push({ label: MONTHS[month], x: weekIdx * TOTAL });
              lastMonth = month;
            }
          }
        });

        this.monthLabels.set(labels);
        this.svgWidth.set(grouped.length * TOTAL + 2);
      }
    } catch (err) {
      console.error("GitHub contributions fetch error:", err);
      this.error.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  getCellClass(level: number): string {
    switch (level) {
      case 0:
        return "fill-border";
      case 1:
      case 2:
      case 3:
      case 4:
        return "fill-primary";
      default:
        return "fill-border";
    }
  }

  getCellOpacity(level: number): number {
    switch (level) {
      case 0:
        return 1;
      case 1:
        return 0.25;
      case 2:
        return 0.45;
      case 3:
        return 0.7;
      case 4:
        return 1;
      default:
        return 1;
    }
  }
}
