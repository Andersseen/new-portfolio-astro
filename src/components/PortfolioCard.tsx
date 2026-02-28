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
          {/* Service preview pills */}
          {item.type === "services" && item.content && (
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {(item.content as ServiceItem[]).map((s, i) => (
                <span
                  key={i}
                  className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r ${s.gradient} text-white/90`}
                >
                  {s.text}
                </span>
              ))}
            </div>
          )}

          {/* Stack preview icons */}
          {item.type === "stack" && item.content && (
            <div className="flex flex-wrap gap-3 mt-2 mb-3">
              {(item.content as StackItem[]).map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary bg-background-tertiary px-3 py-1.5 rounded-lg"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${tech.icon}`}
                    alt={tech.name}
                    width={16}
                    height={16}
                    className="opacity-80"
                  />
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          {/* Articles preview list */}
          {item.type === "articles" && item.details && Array.isArray(item.details) && (
            <div className="flex flex-col gap-2 mt-2 mb-3">
              {(item.details as any[]).slice(0, 3).map((article: any, i: number) => (
                <div
                  key={i}
                  className="text-sm text-foreground-secondary truncate border-l-2 border-success/40 pl-3"
                >
                  {article.title}
                </div>
              ))}
            </div>
          )}

          {/* Design gallery hint */}
          {item.type === "design" && (
            <div className="flex gap-3 mt-2 mb-3">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-border" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 border border-border" />
            </div>
          )}

          {/* Action links */}
          {item.type === "projects" && (
            <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
              {item.actionLabel || "View More"}
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          )}

          {item.type === "community" && (
            <div className="mt-3 flex flex-col gap-2">
              <div className="text-sm text-foreground-secondary">
                Contributions & Open Source
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary/80 group-hover:text-secondary transition-colors">
                {item.actionLabel || "Contributions"}
                <span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          )}

          {item.type === "design" && (
            <div className="flex items-center gap-2 text-sm font-semibold text-accent/80 group-hover:text-accent transition-colors">
              {item.actionLabel || "Gallery"}
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          )}

          {item.type === "articles" && (
            <div className="flex items-center gap-2 text-sm font-semibold text-success/80 group-hover:text-success transition-colors">
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
