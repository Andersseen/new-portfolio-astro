import type { FunctionalComponent } from "preact";
import { ArrowUpRight } from "lucide-preact";

interface Article {
  title: string;
  description: string;
  url: string;
}

interface ArticleLabels {
  heading: string;
  viewMore: string;
  noArticles: string;
}

interface ArticleListProps {
  data: {
    articles: Article[];
    labels: ArticleLabels;
    viewMoreUrl: string;
  };
}

const ArticleList: FunctionalComponent<ArticleListProps> = ({ data }) => {
  const { articles, labels, viewMoreUrl } = data;
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold font-heading mb-4">{labels.heading}</h3>
      <div className="space-y-3">
        {articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-background-tertiary transition-all group"
            >
              <div>
                <div className="font-bold text-lg mb-1">{article.title}</div>
                <div className="text-sm text-foreground-secondary">
                  {article.description}
                </div>
              </div>
              <span className="text-primary group-hover:translate-x-1 transition-transform text-xl">
                →
              </span>
            </a>
          ))
        ) : (
          <p className="text-foreground-secondary">
            {labels.noArticles}
          </p>
        )}
      </div>

      {viewMoreUrl && (
        <div className="pt-4 border-t border-border">
          <a
            href={viewMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-foreground transition-colors group"
          >
            {labels.viewMore}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
