import type { FunctionalComponent } from "preact";

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
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {category.name}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.items.map((item, i) => {
              const slug = item.slug || item.name.toLowerCase();
    
              const iconUrl = `https://cdn.simpleicons.org/${slug}`;

              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="w-12 h-12 mb-3 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110">
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
                  <span className="text-sm font-medium text-foreground-secondary group-hover:text-primary transition-colors">
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
