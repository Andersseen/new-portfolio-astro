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


const ArrowRightIcon = ArrowRight as any;


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
