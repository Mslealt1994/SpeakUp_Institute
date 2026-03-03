export type BlogCategory = "founders-log" | "methodology" | "mindset";

interface BaseContent {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

export interface Category extends BaseContent {
  tag?: string;
}

export interface BlogMetadata extends BaseContent {
  date: string; 
  category: BlogCategory;
  image: string; 
  author: string;
  readingTime: number;
  draft: boolean;
  tags: string[];
}