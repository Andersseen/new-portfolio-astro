import Button from "../ui/Button";
import type { PortfolioItem, SocialLink } from "../PortfolioGrid";
import { IconMap } from "../IconMap";

interface SocialCardContentProps {
  item: PortfolioItem;
}

export default function SocialCardContent({ item }: SocialCardContentProps) {
  const links = Array.isArray(item.content)
    ? (item.content as SocialLink[])
    : [];

  if (links.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-5 mt-2">
      <p className="text-sm text-foreground-tertiary text-center">
        Connect & get in touch
      </p>

      <div className="flex gap-5 justify-center">
        {links.map((link) => {
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
  );
}
