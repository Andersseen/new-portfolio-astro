import Card from "./Card";
import Button from "./ui/Button";
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
  onSelect: (id: string, rect: DOMRect) => void;
}

interface ArticlePreviewItem {
  title?: string;
  description?: string;
}

interface ArticlePreviewDetails {
  articles?: ArticlePreviewItem[];
  labels?: {
    heading?: string;
    noArticles?: string;
  };
}

const normalizeArticleDetails = (details: unknown) => {
  if (Array.isArray(details)) {
    return {
      articles: details as ArticlePreviewItem[],
      heading: "",
      noArticles: "No articles available right now.",
    };
  }

  if (details && typeof details === "object") {
    const record = details as ArticlePreviewDetails;
    return {
      articles: Array.isArray(record.articles) ? record.articles : [],
      heading: record.labels?.heading || "",
      noArticles:
        record.labels?.noArticles || "No articles available right now.",
    };
  }

  return {
    articles: [] as ArticlePreviewItem[],
    heading: "",
    noArticles: "No articles available right now.",
  };
};

export default function PortfolioCard({
  item,
  colSpan,
  onSelect,
}: PortfolioCardProps) {
  const articlePreview =
    item.type === "articles" ? normalizeArticleDetails(item.details) : null;

  const handleClick = (e: any) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    onSelect(item.id, rect);
  };

  return (
    <div
      data-swapy-item={item.id}
      className="w-full h-full cursor-pointer"
      onClick={handleClick}
    >
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
        {item.type === "projects" &&
          item.details &&
          Array.isArray(item.details) && (
            <div className="flex flex-col gap-2.5 mt-1 mb-3">
              {(item.details as any[])
                .slice(0, 3)
                .map((project: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background-tertiary/60 border border-border/50"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground truncate flex-1">
                      {project.title}
                    </span>
                    <div className="flex gap-1.5 shrink-0">
                      {(project.tech as string[])
                        ?.slice(0, 2)
                        .map((t: string, j: number) => (
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

        {item.type === "social" && item.content && (
          <div className="flex flex-col items-center gap-5 mt-2">
            <p className="text-sm text-foreground-tertiary text-center">
              Connect & get in touch
            </p>
            <div className="flex gap-5 justify-center">
              {(item.content as SocialLink[]).map((link) => {
                const IconComponent = IconMap[link.icon];
                return (
                  <div
                    key={link.url}
                    className="flex flex-col items-center gap-2"
                  >
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

        {item.type === "articles" && articlePreview && (
          <div className="mt-2 mb-1 flex min-h-0 flex-1 flex-col">
            <div className="flex-1 min-h-0 space-y-2 overflow-hidden">
              {articlePreview.heading && articlePreview.articles.length > 0 && (
                <p className="text-[11px] uppercase tracking-[0.12em] text-foreground-tertiary">
                  {articlePreview.heading}
                </p>
              )}

              {articlePreview.articles.length > 0 ? (
                articlePreview.articles
                  .slice(0, 2)
                  .map((article, i: number) => (
                    <div
                      key={`${article.title || "article"}-${i}`}
                      className="rounded-lg border border-border/60 bg-background-tertiary/55 px-3 py-2"
                    >
                      <div className="flex gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {article.title || `Article ${i + 1}`}
                          </p>
                          {article.description && (
                            <p className="mt-1 text-xs text-foreground-secondary line-clamp-1">
                              {article.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-foreground-secondary">
                  {articlePreview.noArticles}
                </p>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
              {item.actionLabel || "Read more"}
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
        )}

        {item.type === "design" && (
          <div className="flex gap-3 mt-2 mb-3">
            <div className="w-16 h-16 rounded-xl bg-primary/5 border border-primary/15" />
            <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/15" />
            <div className="w-16 h-16 rounded-xl bg-primary/15 border border-primary/15" />
          </div>
        )}

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
      </Card>
    </div>
  );
}
