import { useEffect, useState } from "preact/hooks";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GitHubActivityProps {
  username: string;
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

export default function GitHubActivity({ username }: GitHubActivityProps) {
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
     
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
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

          setWeeks(grouped);
          setTotalContributions(
            data.total?.lastYear ?? days.reduce((sum: number, d: ContributionDay) => sum + d.count, 0)
          );
        }
      } catch (err) {
        console.error("GitHub contributions fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full rounded-xl bg-background-tertiary border border-border p-6 animate-pulse">
        <div className="h-4 w-48 bg-border rounded mb-4" />
        <div className="h-[100px] bg-border/50 rounded" />
      </div>
    );
  }

  if (error || weeks.length === 0) {
    return null; 
  }

  
  const monthLabels: { label: string; x: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIdx) => {
    const firstDay = week.days[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], x: weekIdx * TOTAL });
        lastMonth = month;
      }
    }
  });

  const svgWidth = weeks.length * TOTAL + 2;
  const svgHeight = 7 * TOTAL + 24; 

  return (
    <div className="w-full rounded-xl bg-background-tertiary border border-border p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground">
          {totalContributions.toLocaleString()} contributions in the last year
        </h4>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline"
        >
          @{username}
        </a>
      </div>

      <div className="overflow-x-auto custom-scrollbar -mx-1 px-1 pb-1">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="block"
          role="img"
          aria-label={`GitHub contribution graph for ${username}`}
        >
          {/* Month labels */}
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={m.x}
              y={10}
              className="fill-foreground-tertiary"
              fontSize={10}
              fontFamily="var(--font-sans)"
            >
              {m.label}
            </text>
          ))}

          {/* Contribution cells */}
          {weeks.map((week, weekIdx) =>
            week.days.map((day, dayIdx) => (
              <rect
                key={`${weekIdx}-${dayIdx}`}
                x={weekIdx * TOTAL}
                y={dayIdx * TOTAL + 18}
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx={2}
                ry={2}
                className={getCellClass(day.level)}
                style={{ opacity: getCellOpacity(day.level) }}
              >
                <title>
                  {day.count} contribution{day.count !== 1 ? "s" : ""} on{" "}
                  {day.date}
                </title>
              </rect>
            ))
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-foreground-tertiary">
        <span>Less</span>
        <span className="inline-block w-[11px] h-[11px] rounded-sm bg-border" />
        <span className="inline-block w-[11px] h-[11px] rounded-sm bg-primary/20" />
        <span className="inline-block w-[11px] h-[11px] rounded-sm bg-primary/40" />
        <span className="inline-block w-[11px] h-[11px] rounded-sm bg-primary/70" />
        <span className="inline-block w-[11px] h-[11px] rounded-sm bg-primary" />
        <span>More</span>
      </div>
    </div>
  );
}

function getCellClass(level: number): string {
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

function getCellOpacity(level: number): number {
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
