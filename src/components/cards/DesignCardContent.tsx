import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";
import { IconMap } from "../IconMap";

interface DesignPackage {
  title: string;
  description?: string;
}

interface DesignCardContentProps {
  item: PortfolioItem;
}

const PACKAGE_ICONS: Record<string, string> = {
  "web-components": "component",
  icon: "sparkles",
  motion: "zap",
  layout: "layoutGrid",
};

export default function DesignCardContent({ item }: DesignCardContentProps) {
  const packages = Array.isArray(item.details)
    ? (item.details as DesignPackage[])
    : [];

  return (
    <>
      <div and-layout="vertical gap:xxs" className="mt-1 mb-2">
        {packages.slice(0, 3).map((pkg, i) => {
          const slug = pkg.title?.split("/")[1] || "";
          const Icon = IconMap[PACKAGE_ICONS[slug]] || IconMap["component"];
          return (
            <div
              key={pkg.title || i}
              and-layout="horizontal align:center gap:xs"
              className="rounded-lg border border-border/50 bg-background-tertiary/60 px-2.5 py-1"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-primary/10 text-primary shrink-0">
                <Icon className="w-3 h-3" aria-hidden="true" />
              </span>
              <span className="text-xs sm:text-sm font-medium font-mono text-foreground truncate flex-1">
                {pkg.title}
              </span>
            </div>
          );
        })}
      </div>
      <CardAction label={item.actionLabel || "Explore"} />
    </>
  );
}
