import { marked } from "marked";
import Parser from "rss-parser";
import DOMPurify from "isomorphic-dompurify";

const parser = new Parser();

export interface MediumArticle {
  title: string;
  description: string;
  url: string;
  date: string;
}

export async function fetchGitHubReadme(username: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${username}/readme`
    );
    if (!response.ok) throw new Error("Failed to fetch README");
    const data = await response.json();
    const content = atob(data.content);
    const html = await marked(content);
    return DOMPurify.sanitize(html);
  } catch (error) {
    console.error("Error fetching GitHub README:", error);
    return "";
  }
}

export async function fetchMediumArticles(
  username: string
): Promise<MediumArticle[]> {
  try {
    // Medium blocks direct RSS fetch from browser sometimes, but usually ok from server/build time
    // We use a CORS proxy if client-side, but this is intended for build time mostly.
    const feed = await parser.parseURL(`https://medium.com/feed/${username}`);

    return feed.items.slice(0, 4).map((item) => {
      // Simple description cleanup: remove images and take first snippet
      const cleanDesc =
        item["content:encoded"] || item.content || item.description || "";
      const snippet =
        cleanDesc.replace(/<[^>]+>/g, "").substring(0, 100) + "...";

      return {
        title: item.title || "Untitled",
        description: snippet,
        url: item.link || "#",
        date: item.pubDate || "",
      };
    });
  } catch (error) {
    console.error("Error fetching Medium articles:", error);
    return [];
  }
}
