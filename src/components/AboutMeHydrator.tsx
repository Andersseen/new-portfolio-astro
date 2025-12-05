import { useEffect } from "preact/hooks";
import { aboutMeStore } from "../store/modalStore";
import type { PortfolioItem } from "./PortfolioGrid";

export default function AboutMeHydrator({ item }: { item: PortfolioItem }) {
  useEffect(() => {
    aboutMeStore.set(item);
  }, [item]);

  return null;
}
