export type BlogCategory = "founders-log" | "methodology" | "mindset";

export interface BlogMetadata {
  title: string;
  description: string;
  date: string; 
  category: BlogCategory;
  image: string;
  author: string;
  readingTime?: number;
  draft: boolean;
  slug: string;
  tags: string[];
}