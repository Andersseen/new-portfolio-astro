import type { PortfolioItem } from "../PortfolioGrid";
import ArticlesCardContent from "./ArticlesCardContent";
import CommunityCardContent from "./CommunityCardContent";
import DesignCardContent from "./DesignCardContent";
import ProjectsCardContent from "./ProjectsCardContent";
import ServicesCardContent from "./ServicesCardContent";
import SocialCardContent from "./SocialCardContent";
import StackCardContent from "./StackCardContent";

interface CardContentRendererProps {
  item: PortfolioItem;
}

export default function CardContentRenderer({
  item,
}: CardContentRendererProps) {
  switch (item.type) {
    case "projects":
      return <ProjectsCardContent item={item} />;
    case "social":
      return <SocialCardContent item={item} />;
    case "services":
      return <ServicesCardContent item={item} />;
    case "stack":
      return <StackCardContent item={item} />;
    case "articles":
      return <ArticlesCardContent item={item} />;
    case "community":
      return <CommunityCardContent item={item} />;
    case "design":
      return <DesignCardContent item={item} />;
    default:
      return null;
  }
}
