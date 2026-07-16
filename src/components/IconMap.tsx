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
  Code,
  Monitor,
  Palette,
  Cloud,
  Sparkles,
  Zap,
  LayoutGrid,
  Component,
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
  code: Code,
  monitor: Monitor,
  palette: Palette,
  cloud: Cloud,
  sparkles: Sparkles,
  zap: Zap,
  layoutGrid: LayoutGrid,
  component: Component,
};

export { ArrowRightIcon };
