import type { FunctionalComponent } from "preact";

interface DesignItem {
  image: string;
  title: string;
}

interface DesignGalleryProps {
  data: {
    items: DesignItem[];
  };
}

const DesignGallery: FunctionalComponent<DesignGalleryProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.items.map((item, index) => (
        <div key={index} className="space-y-2 group cursor-pointer">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <p className="text-sm font-medium text-center text-foreground-secondary group-hover:text-primary transition-colors">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DesignGallery;
