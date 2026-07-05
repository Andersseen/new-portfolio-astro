import {
  LucideGithub,
  LucideGitlab,
  FileText,
  Code2,
  Box,
  Container,
  Layers,
  ArrowRight,
} from "lucide-preact";

const ArrowRightIcon = ArrowRight as any;

export const IconMap: Record<string, any> = {
  github: LucideGithub,
  gitlab: LucideGitlab,
  medium: FileText,
  ts: Code2,
  nx: Box,
  angular: Layers,
  docker: Container,
};

export { ArrowRightIcon };
