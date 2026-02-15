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
  apiDocumentation?: ApiDocumentation;
}

export interface GalleryImage {
  url: string;
  caption: string;
}

export interface ApiDocumentation {
  baseUrl: string;
  authEndpoints?: ApiEndpoint[];
  postEndpoints?: ApiEndpoint[];
  commentEndpoints?: ApiEndpoint[];
  opportunityEndpoints?: ApiEndpoint[];
  paymentEndpoints?: ApiEndpoint[];
  realtimeEvents?: RealtimeEvent[];
  adminEndpoints?: ApiEndpoint[];
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  requestBody?: any;
  queryParams?: any;
  response?: {
    status: number;
    body: any;
  };
  middleware?: string;
  security?: string;
  authorization?: string;
  validation?: string;
  realtime?: string;
  integration?: string;
  logic?: string;
  notes?: string;
  headers?: any;
  events?: any;
  handler?: string;
}

export interface RealtimeEvent {
  event: string;
  direction: string;
  payload?: any;
  description: string;
  handler: string;
}