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
          badgeColor="primary"
        >
          {/* Projects preview list */}
          {item.type === "projects" && item.details && Array.isArray(item.details) && (
            <div className="flex flex-col gap-2.5 mt-1 mb-3">
              {(item.details as any[]).slice(0, 3).map((project: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background-tertiary/60 border border-border/50"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate flex-1">
                    {project.title}
                  </span>
                  <div className="flex gap-1.5 shrink-0">
                    {(project.tech as string[])?.slice(0, 2).map((t: string, j: number) => (
                      <span
                        key={j}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Social Links — enhanced layout */}
          {item.type === "social" && item.content && (
            <div className="flex flex-col items-center gap-5 mt-2">
              <p className="text-sm text-foreground-tertiary text-center">
                Connect & get in touch
              </p>
              <div className="flex gap-5 justify-center">
                {(item.content as SocialLink[]).map((link) => {
                  const IconComponent = IconMap[link.icon];
                  return (
                    <div key={link.url} className="flex flex-col items-center gap-2">
                      <Button
                        href={link.url}
                        variant="ghost"
                        size="icon"
                        className="rounded-xl w-12 h-12 bg-primary/8 text-foreground-secondary hover:bg-primary/15 hover:text-primary group relative overflow-visible transition-all duration-300 hover:-translate-y-1"
                        title={link.label || link.icon}
                        aria-label={link.label || `Visit ${link.icon}`}
                      >
                        <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300" />
                        {IconComponent && (
                          <IconComponent
                            className="w-6 h-6 z-10 relative"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                      <span className="text-xs text-foreground-tertiary font-medium">
                        {link.label || link.icon}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Links */}
          {/* Service preview pills */}
          {item.type === "services" && item.content && (
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {(item.content as ServiceItem[]).map((s, i) => (
                <span
                  key={i}
                  className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
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
                  className="text-sm text-foreground-secondary truncate border-l-2 border-primary/30 pl-3"
                >
                  {article.title}
                </div>
              ))}
            </div>
          )}

          {/* Design gallery hint */}
          {item.type === "design" && (
            <div className="flex gap-3 mt-2 mb-3">
              <div className="w-16 h-16 rounded-xl bg-primary/5 border border-primary/15" />
              <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/15" />
              <div className="w-16 h-16 rounded-xl bg-primary/15 border border-primary/15" />
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
              <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                {item.actionLabel || "Contributions"}
                <span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          )}

          {item.type === "design" && (
            <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
              {item.actionLabel || "Gallery"}
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          )}

          {item.type === "articles" && (
            <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
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
