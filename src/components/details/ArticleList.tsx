import type { FunctionalComponent } from "preact";

interface Article {
  title: string;
  description: string;
  url: string;
}

interface ArticleListProps {
  data: Article[];
}

const ArticleList: FunctionalComponent<ArticleListProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold font-heading mb-4">Latest Insights</h3>
      <div className="space-y-3">
        {data && data.length > 0 ? (
          data.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent hover:bg-background-tertiary transition-all group"
            >
              <div>
                <div className="font-bold text-lg mb-1">{article.title}</div>
                <div className="text-sm text-foreground-secondary">
                  {article.description}
                </div>
              </div>
              <span className="text-accent group-hover:translate-x-1 transition-transform text-xl">
                →
              </span>
            </a>
          ))
        ) : (
          <p className="text-foreground-secondary">
            No articles available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
