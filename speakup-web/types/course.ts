import { YouTubePlayerOptions } from "@/hooks/useYoutubeplayer";

export interface Lesson {
  id: string;
  title: string;
  videoData: YouTubePlayerOptions;
}

export type Course = Lesson[];