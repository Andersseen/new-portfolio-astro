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
      <p className="text-sm text-foreground-secondary text-center">
        Connect & get in touch
      </p>

      <div className="flex gap-5 justify-center">
        {links.map((link) => {
          const IconComponent = IconMap[link.icon];

          return (
            <div key={link.url} className="flex flex-col items-center gap-2">
              <div
                className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-border bg-background-tertiary text-foreground"
                aria-hidden="true"
              >
                {IconComponent && (
                  <IconComponent
                    className="relative z-10 h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </div>
              <span className="text-xs text-foreground-secondary font-medium">
                {link.label || link.icon}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
