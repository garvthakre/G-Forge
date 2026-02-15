export interface Project {
  id: string;
  badge:
    | "SERVICE"
    | "API"
    | "SYSTEM"
    | "FULL-STACK PLATFORM"
    | "FULL-STACK AI"
    | "FULL-STACK"
    | "BLOCKCHAIN";
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  image?: string;
  highlights?: string[];
  architecture?: { [key: string]: string } | string[];
  userRoles?: string[];
  demoVideo?: string;
  liveUrl?: string;
  githubUrl?: string;
  awards?: string;
  links?: { [key: string]: string };
  metrics?: string[];
  github?: string;
  demo?: string;
  gallery?: GalleryImage[];
}

export interface GalleryImage {
  url: string;
  caption: string;
}