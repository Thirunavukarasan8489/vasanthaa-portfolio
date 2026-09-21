export type ProjectCategory = "written" | "voice-over" | "on-camera";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  industry: string;
  contentType: string;
  year: string;
  client?: string;
  goal?: string;
  featured?: boolean;
  coverImage?: string;
  // For written works:
  writtenExcerpt?: string;
  fullContent?: string[];
  keyHighlights?: string[];
  // For voice-over works:
  audioSrc?: string;
  duration?: string;
  language?: string;
  accent?: string;
  tone?: string;
  // For on-camera works:
  videoPoster?: string;
  videoDuration?: string;
  roleDescription?: string;
  // External link fallback
  originalLink?: string;
}
