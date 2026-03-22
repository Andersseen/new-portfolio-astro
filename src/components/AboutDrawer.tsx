import { useState, useEffect, useRef } from "preact/hooks";
import {
  X,
  ExternalLink,
  Github,
  BookOpen,
  GitBranch,
  ChevronDown,
  User,
} from "lucide-preact";
import GitHubActivity from "./details/GitHubActivity";

const ExternalLinkIcon = ExternalLink as any;
const GithubIcon = Github as any;
const BookOpenIcon = BookOpen as any;
const GitBranchIcon = GitBranch as any;
const ChevronDownIcon = ChevronDown as any;
const UserIcon = User as any;

interface AboutData {
  title?: string;
  bio?: string[];
  bioHtml?: string;
  philosophy?: string;
  goal?: string;
  social?: { label: string; url: string; icon: string; color: string }[];
}

interface AboutDrawerProps {
  data: AboutData;
  isOpen: boolean;
  onClose: () => void;
}

const socialIconMap: Record<string, any> = {
  github: GithubIcon,
  gitlab: GitBranchIcon,
  medium: BookOpenIcon,
  blog: UserIcon,
};

export default function AboutDrawer({
  data,
  isOpen,
  onClose,
}: AboutDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);

      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      document.body.style.overflow = "";
      const timer = setTimeout(() => setMounted(false), 350);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={onClose}
      />

      {}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 z-[61] max-h-[85vh] rounded-t-[2.5rem] overflow-hidden bg-background border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="flex items-center justify-center py-3 border-b border-border bg-background shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-tertiary hover:text-foreground transition-colors cursor-pointer px-4 py-1.5 rounded-full hover:bg-foreground/5"
          >
            <ChevronDownIcon className="w-4 h-4" />
            Close
          </button>
        </div>
        {}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {}
          <div className="px-6 sm:px-12 lg:px-20 pt-12 sm:pt-16 pb-8 text-center max-w-3xl mx-auto">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-heading text-foreground tracking-tight leading-none">
              {(data.title || "Andersseen").split(",").pop()?.trim() ||
                "Andersseen"}
              <span className="text-primary">.</span>
            </h2>
            <p className="mt-4 text-lg text-foreground-tertiary leading-relaxed">
              Full Stack Developer &amp; Designer
            </p>
          </div>

          {}
          <div className="px-6 sm:px-12 lg:px-20 pb-8 max-w-4xl mx-auto">
            {}
            <div className="max-w-2xl mx-auto text-center">
              {data.bioHtml ? (
                <div
                  className="text-base text-foreground-secondary leading-[1.8]"
                  dangerouslySetInnerHTML={{ __html: data.bioHtml }}
                />
              ) : (
                data.bio?.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base text-foreground-secondary leading-[1.8] mb-3 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))
              )}
            </div>

            {}
            <div className="my-8 border-t border-dashed border-border" />

            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {data.philosophy && (
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary block mb-3">
                    Philosophy
                  </span>
                  <p className="text-sm italic text-foreground-secondary leading-relaxed">
                    "{data.philosophy}"
                  </p>
                </div>
              )}
              {data.goal && (
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary block mb-3">
                    Mission
                  </span>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {data.goal}
                  </p>
                </div>
              )}
            </div>

            {}
            <div className="my-8 border-t border-dashed border-border" />

            {}
            {data.social && data.social.length > 0 && (
              <div className="flex flex-col items-center gap-4">
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground-tertiary">
                  Connect
                </span>
                <div className="flex flex-wrap justify-center gap-3">
                  {data.social.map((link, i) => {
                    const Icon = socialIconMap[link.icon] || ExternalLinkIcon;
                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-sm font-medium px-5 py-2.5 rounded-full border border-border text-foreground-secondary hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {}
            <div className="my-8 border-t border-dashed border-border" />

            {}
            <div className="max-w-2xl mx-auto">
              <GitHubActivity username="andersseen" />
            </div>
          </div>
        </div>

        {}
      </div>
    </>
  );
}
