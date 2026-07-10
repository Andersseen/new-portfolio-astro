interface StackItem {
  name: string;
  slug?: string;
}

interface StackCategory {
  name: string;
  items: StackItem[];
}

interface StackDetailsProps {
  data: {
    categories: StackCategory[];
  };
}

const StackDetails = ({ data }: StackDetailsProps) => {
  return (
    <div className="space-y-8">
      {data.categories.map((category, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="text-xl font-bold text-primary">
            {category.name}
          </h3>
          <div and-layout="grid cols:2 cols@md:4 gap:md">
            {category.items.map((item, i) => {
              const slug = item.slug || item.name.toLowerCase();
    
              const iconUrl = `https://cdn.simpleicons.org/${slug}`;

              return (
                <div
                  key={i}
                  and-layout="vertical align:center justify:center"
                  className="group rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                >
                  <div
                    and-layout="horizontal align:center justify:center"
                    className="relative mb-3 h-12 w-12 opacity-80 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                  >
                    <img
                      src={iconUrl}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                
                        (e.target as HTMLImageElement).style.display = "none";
                        (
                          e.target as HTMLImageElement
                        ).parentElement!.classList.remove("grayscale");
                        (
                          e.target as HTMLImageElement
                        ).parentElement!.innerHTML =
                          '<span class="text-2xl font-bold">?</span>';
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StackDetails;
