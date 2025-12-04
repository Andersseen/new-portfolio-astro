import {
  Github,
  Gitlab,
  FileText,
  Code2,
  Box,
  Container,
  Layers,
  ArrowRight,
} from "lucide-preact";

// Cast icons to any to avoid JSX component type errors
const ArrowRightIcon = ArrowRight as any;

// Map icon names to Lucide components
export const IconMap: Record<string, any> = {
  github: Github,
  gitlab: Gitlab,
  medium: FileText,
  ts: Code2,
  nx: Box,
  angular: Layers,
  docker: Container,
};

export { ArrowRightIcon };
