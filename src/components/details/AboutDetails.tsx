import type { FunctionalComponent } from "preact";
import { IconMap } from "../IconMap";
import Button from "../ui/Button";
import GitHubActivity from "./GitHubActivity";

interface AboutDetailsProps {
  data: {
    title?: string;
    bio?: string[];
    bioHtml?: string;
    philosophy?: string;
    goal?: string;
    social?: any[];
  };
}

const AboutDetails = ({ data }: AboutDetailsProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Large Sileo-style heading */}
      {data.title && (
        <h2 className="text-4xl sm:text-5xl font-black font-heading text-foreground tracking-tight leading-none mt-2">
          {data.title.split(",").pop()?.trim() || data.title}
          <span className="text-primary">.</span>
        </h2>
      )}

      {/* Bio */}
      <div className="mt-6 max-w-lg mx-auto">
        {data.bioHtml ? (
          <div
            className="text-sm sm:text-base text-foreground-secondary leading-[1.8]"
            dangerouslySetInnerHTML={{ __html: data.bioHtml }}
          />
        ) : (
          data.bio &&
          data.bio.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-sm sm:text-base text-foreground-secondary leading-[1.8] mb-3 last:mb-0"
            >
              {paragraph}
            </p>
          ))
        )}
      </div>

      {/* Dotted separator */}
      <div className="w-full my-6 border-t border-dashed border-border" />

      {/* Philosophy quote */}
      {data.philosophy && (
        <>
          <p className="text-sm sm:text-base italic text-foreground-tertiary leading-relaxed max-w-md mx-auto">
            "{data.philosophy}"
          </p>
          <div className="w-full my-6 border-t border-dashed border-border" />
        </>
      )}

      {/* Goal section */}
      {data.goal && (
        <>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary mb-2">
            Mission
          </span>
          <p className="text-sm text-foreground-secondary leading-relaxed max-w-md mx-auto">
            {data.goal}
          </p>
          <div className="w-full my-6 border-t border-dashed border-border" />
        </>
      )}

      {/* Social links — Sileo pill buttons */}
      {data.social && (
        <div className="flex flex-col items-center gap-3">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary">
            Connect
          </span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {data.social.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-border text-foreground-secondary hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Dotted separator */}
      <div className="w-full my-6 border-t border-dashed border-border" />

      {/* GitHub Activity */}
      <div className="w-full">
        <GitHubActivity username="andersseen" />
      </div>
    </div>
  );
};

export default AboutDetails;
