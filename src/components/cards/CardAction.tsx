import { ArrowRightIcon } from "../IconMap";

interface CardActionProps {
  label: string;
  className?: string;
}

export default function CardAction({ label, className = "" }: CardActionProps) {
  return (
    <div
      className={`flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors ${className}`}
    >
      {label}
      <span className="group-hover:translate-x-1 transition-transform">
        <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
      </span>
    </div>
  );
}
