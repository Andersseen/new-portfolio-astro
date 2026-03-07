import type { PortfolioItem, StackItem } from "../PortfolioGrid";

interface StackCardContentProps {
  item: PortfolioItem;
}

export default function StackCardContent({ item }: StackCardContentProps) {
  const stack = Array.isArray(item.content)
    ? (item.content as StackItem[])
    : [];

  if (stack.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-2 mb-3">
      {stack.map((tech, i: number) => (
        <span
          key={`${tech.name}-${i}`}
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
  );
}
