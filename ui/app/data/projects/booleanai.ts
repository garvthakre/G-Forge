import { Project } from "@/app/utils/ProjectTypes";

export const booleanAIProject: Project = {
  id: "booleanai",
  badge: "FULL-STACK AI",
  title: "BooleanAI - Smart Electronics Solver",
  description:
    "End-to-end AI solution for solving digital electronics problems. Users draw or upload questions, and the system intelligently identifies problem types (Boolean simplification, K-maps, code conversion, binary arithmetic) and returns structured solutions.",
  
  techStack: [
    "React",
    "Node.js",
    "Express",
    "AI Vision API",
    "Canvas API",
    "Tailwind CSS",
  ],
  
  features: [
    "Multi-format input (drawing + image upload)",
    "AI-driven problem type classification",
    "Dynamic result rendering based on problem type",
    "Rate-limiting and error handling",
    "Cross-device compatible interface",
  ],

  image: "/Booleanai/booleanai-webui.png",
  demoVideo: "/videos/booleanai-demo.mp4",
  liveUrl: "https://your-domain.com/booleanai",
  githubUrl: "https://github.com/yourusername/booleanai",
};