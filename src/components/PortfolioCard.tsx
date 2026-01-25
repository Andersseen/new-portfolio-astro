import Card from "./Card";
import Button from "./ui/Button";
import { motion } from "motion/react";
import type {
  PortfolioItem,
  SocialLink,
  StackItem,
  ServiceItem,
} from "./PortfolioGrid";
import { IconMap, ArrowRightIcon } from "./IconMap";

interface PortfolioCardProps {
  item: PortfolioItem;
  colSpan: "col-span-1" | "col-span-2";
  onSelect: (id: string) => void;
}

export default function PortfolioCard({
  item,
  colSpan,
  onSelect,
}: PortfolioCardProps) {
  return (
    <div
      data-swapy-item={item.id}
      className="w-full h-full"
      onClick={() => onSelect(item.id)}
    >
      <motion.div layoutId={item.id} className="h-full">
        <Card
          id={item.id}
          title={item.title}
          description={item.description || ""}
          colSpan={colSpan}
          badge={
            item.type === "projects"
              ? "Featured"
              : item.type === "articles"
                ? "Recent"
                : undefined
          }
          badgeColor={
            item.type === "projects"
              ? "primary"
              : item.type === "articles"
                ? "success"
                : "primary"
          }
        >
          {/* Social Links */}
          {item.type === "social" && item.content && (
            <div className="flex gap-4 justify-center mt-4">
              {(item.content as SocialLink[]).map((link) => {
                const IconComponent = IconMap[link.icon];
                return (
                  <Button
                    key={link.url}
                    href={link.url}
                    variant="ghost"
                    size="icon"
                    className={`rounded-xl bg-${link.color}/10 text-${link.color} hover:bg-${link.color}/20 group relative overflow-visible transition-all duration-300 hover:-translate-y-1`}
                    title={link.label || link.icon}
                    aria-label={link.label || `Visit ${link.icon}`}
                  >
                    <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300" />
                    {IconComponent && (
                      <IconComponent
                        className="w-6 h-6 z-10 relative drop-shadow-md"
                        aria-hidden="true"
                      />
                    )}
                  </Button>
                );
              })}
            </div>
          )}

          {/* ... (omitting stack section for brevity) ... */}

          {/* Action Links */}
          {item.type === "projects" && (
            <div className="flex items-center gap-2 text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
              {item.actionLabel || "View More"}
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          )}

          {item.type === "community" && (
            <div className="mt-4 flex flex-col gap-2">
              <div className="text-sm text-foreground-secondary">
                Contributions & Open Source
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-secondary/80 group-hover:text-secondary transition-colors">
                {item.actionLabel || "Contributions"}
                <span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          )}

          {item.type === "design" && (
            <div className="flex items-center gap-2 text-sm font-medium text-accent/80 group-hover:text-accent transition-colors">
              {item.actionLabel || "Gallery"}
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          )}

          {item.type === "articles" && (
            <div className="flex items-center gap-2 text-sm font-medium text-success/80 group-hover:text-success transition-colors">
              {item.actionLabel || "Read more"}
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
