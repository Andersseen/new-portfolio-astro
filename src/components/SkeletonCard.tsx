import type { PortfolioItem } from "./PortfolioGrid";

interface SkeletonCardProps {
  colSpan?: string;
}

export default function SkeletonCard({ colSpan }: SkeletonCardProps) {
  return (
    <div
      className={`h-full w-full rounded-3xl bg-background-secondary border border-border/50 overflow-hidden relative ${
        colSpan === "col-span-2" ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent skeleton-shimmer" />
      <div className="p-6 h-full flex flex-col gap-4">
        <div className="w-1/3 h-6 bg-foreground/5 rounded-lg" />
        <div className="w-2/3 h-4 bg-foreground/5 rounded-lg" />
        <div className="flex-1" />
        <div className="w-full h-24 bg-foreground/5 rounded-xl" />
      </div>
    </div>
  );
}
