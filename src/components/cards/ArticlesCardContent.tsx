import type { PortfolioItem } from "../PortfolioGrid";
import CardAction from "./CardAction";

interface ArticlePreviewItem {
  title?: string;
  description?: string;
}

interface ArticlePreviewDetails {
  articles?: ArticlePreviewItem[];
  labels?: {
    heading?: string;
    noArticles?: string;
    blogMessage?: string;
  };
  viewMoreUrl?: string;
}

interface ArticlesCardContentProps {
  item: PortfolioItem;
}

const normalizeArticleDetails = (details: unknown) => {
  if (Array.isArray(details)) {
    return {
      articles: details as ArticlePreviewItem[],
      heading: "",
      noArticles: "No articles available right now.",
      blogMessage: "",
      viewMoreUrl: "#",
    };
  }

  if (details && typeof details === "object") {
    const record = details as ArticlePreviewDetails;
    return {
      articles: Array.isArray(record.articles) ? record.articles : [],
      heading: record.labels?.heading || "",
      noArticles:
        record.labels?.noArticles || "No articles available right now.",
      blogMessage: record.labels?.blogMessage || "",
      viewMoreUrl: record.viewMoreUrl || "#",
    };
  }

  return {
    articles: [] as ArticlePreviewItem[],
    heading: "",
    noArticles: "No articles available right now.",
    blogMessage: "",
    viewMoreUrl: "#",
  };
};

export default function ArticlesCardContent({
  item,
}: ArticlesCardContentProps) {
  const articlePreview = normalizeArticleDetails(item.details);

  return (
    <div className="mt-2 mb-1 flex min-h-0 flex-1 flex-col">
      <div className="flex-1 min-h-0 space-y-2 overflow-hidden">
        {articlePreview.heading && articlePreview.articles.length > 0 && (
          <p className="text-[11px] uppercase tracking-[0.12em] text-foreground-tertiary">
            {articlePreview.heading}
          </p>
        )}

        {articlePreview.articles.length > 0 ? (
          articlePreview.articles.slice(0, 2).map((article, i: number) => (
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

        {articlePreview.blogMessage && (
          <div className="mt-4 pt-3 border-t border-border/40">
            <p className="text-xs text-foreground-secondary leading-relaxed mb-2">
              {articlePreview.blogMessage}
            </p>
            <a
              href={articlePreview.viewMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {articlePreview.viewMoreUrl.replace("https://", "")}
            </a>
          </div>
        )}
      </div>

      <CardAction label={item.actionLabel || "Read more"} className="mt-2" />
    </div>
  );
}
