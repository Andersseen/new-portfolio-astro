import type { FunctionalComponent } from "preact";
import { IconMap } from "../IconMap";
import Button from "../ui/Button";

interface AboutData {
  title: string;
  bio: string[];
  philosophy: string;
  goal: string;
  social: { label: string; url: string; color: string }[];
}

interface AboutDetailsProps {
  data: AboutData;
}

const AboutDetails: FunctionalComponent<AboutDetailsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-primary/20 shadow-xl">
          <div className="w-full h-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-4xl text-white font-bold">
            A
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold font-heading mb-2">{data.title}</h3>
          {data.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg text-foreground-secondary leading-relaxed mb-2"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 bg-background-tertiary rounded-xl border border-border/50">
          <h4 className="font-bold text-primary mb-2">My Philosophy</h4>
          <p className="text-sm text-foreground-secondary">{data.philosophy}</p>
        </div>
        <div className="p-4 bg-background-tertiary rounded-xl border border-border/50">
          <h4 className="font-bold text-secondary mb-2">My Goal</h4>
          <p className="text-sm text-foreground-secondary">{data.goal}</p>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="font-bold mb-4">Connect with me</h4>
        <div className="flex gap-4">
          {data.social.map((link, i) => {
            // Simple logic to map label to icon key if possible, or default
            const iconKey = link.label.toLowerCase().includes("linked")
              ? "linkedin"
              : link.label.toLowerCase().includes("twitter")
              ? "twitter"
              : link.label.toLowerCase().includes("git")
              ? "github"
              : "mail";
            // We don't have all icons in IconMap maybe, so we can just use text or generic

            return (
              <Button
                key={i}
                href={link.url}
                variant="ghost"
                className={`text-${link.color} hover:bg-${link.color}/10 gap-2`}
              >
                {link.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutDetails;
