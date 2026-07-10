import {
  LucideGithub,
  LucideGitlab,
  FileText,
  Code2,
  Box,
  Container,
  Layers,
  ArrowRight,
  Rss,
} from "lucide-preact";

const ArrowRightIcon = ArrowRight as any;

export const IconMap: Record<string, any> = {
  github: LucideGithub,
  gitlab: LucideGitlab,
  medium: FileText,
  blog: Rss,
  ts: Code2,
  nx: Box,
  angular: Layers,
  docker: Container,
};

export { ArrowRightIcon };
