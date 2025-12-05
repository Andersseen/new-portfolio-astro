import type { FunctionalComponent } from "preact";
import { IconMap } from "../IconMap";
import Button from "../ui/Button";

interface AboutDetailsProps {
  data: {
    title?: string;
    bio?: string[];
    bioHtml?: string; // New field for GitHub README content
    philosophy?: string;
    goal?: string;
    social?: any[];
  };
}

const AboutDetails = ({ data }: AboutDetailsProps) => {
  return (
    <div className="space-y-6">
      {data.title && (
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {data.title}
        </h2>
      )}

      <div className="prose prose-invert max-w-none text-foreground-secondary">
        {data.bioHtml ? (
          <div dangerouslySetInnerHTML={{ __html: data.bioHtml }} />
        ) : (
          data.bio &&
          data.bio.map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))
        )}
      </div>

      {data.philosophy && (
        <div className="p-4 bg-background-tertiary rounded-xl border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Philosophy
          </h3>
          <p className="italic text-foreground-secondary">
            "{data.philosophy}"
          </p>
        </div>
      )}

      {/* Social links are rendered via SocialCanvas or custom buttons usually */}
      {data.social && (
        <div className="flex flex-wrap gap-4 mt-8">
          {data.social.map((link, i) => (
            <Button
              key={i}
              href={link.url}
              variant="outline"
              size="sm"
              className={`border-${link.color}/30 text-${link.color} hover:bg-${link.color}/10`}
            >
              {link.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutDetails;
