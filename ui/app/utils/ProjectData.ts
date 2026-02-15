import { Project } from "./ProjectTypes";

/**
 * Example of how to structure project data with all optional fields
 * including gallery images for the modal
 */

export const exampleProjectWithGallery: Project = {
  id: "campusx-full-example",
  badge: "FULL-STACK PLATFORM",
  title: "CampusX - Complete Example",
  description:
    "This is a full example showing all possible fields for a project, including gallery images that will display in the modal's gallery tab.",
  
  // Basic Required Fields
  techStack: [
    "React",
    "Redux Toolkit",
    "Node.js/Express",
    "MongoDB",
    "Socket.IO",
  ],
  
  features: [
    "Real-time chat and notifications",
    "AI-powered content moderation",
    "Multi-role authentication system",
    "Payment gateway integration",
  ],

  // Optional: Main hero image (shows at top of modal)
  image: "/projects/campusx/hero.png",

  // Optional: Video demo (alternative to image)
  demoVideo: "/videos/campusx-demo.mp4",

  // Optional: Technical highlights
  highlights: [
    "Handles 1000+ concurrent WebSocket connections",
    "AI moderation with 95% accuracy",
    "Zero-downtime deployment with Docker",
    "Sub-100ms API response times",
  ],

  // Optional: Architecture details (can be object or array)
  architecture: {
    frontend: "React 18 with Redux Toolkit, React Router, Socket.IO client",
    backend: "Express.js with MongoDB, Socket.IO server, JWT authentication",
    ai: "Google Gemini AI for chatbot, TensorFlow.js for image moderation",
    realtime: "Socket.IO for notifications, comments, and live updates",
  },
  // OR as an array:
  // architecture: [
  //   "Frontend: React with Redux Toolkit",
  //   "Backend: Node.js + Express + MongoDB",
  //   "Real-time: Socket.IO for live updates",
  // ],

  // Optional: User roles
  userRoles: [
    "Students: Post anonymously, apply for opportunities, earn through tasks",
    "Companies: Create paid opportunities, manage applicants, process payments",
    "Admin: Monitor all activities, verify payments, manage platform",
  ],

  // Optional: Project metrics
  metrics: [
    "3 microservices with gRPC communication",
    "Support for unlimited service providers",
    "Real-time updates with <100ms latency",
    "60% reduction in API response size",
  ],

  // Optional: Award information
  awards: "Winner of XYZ Hackathon 2024",

  // Optional: External links
  liveUrl: "https://becampusx.com",
  githubUrl: "https://github.com/username/campusx",
  // OR use the generic links object:
  links: {
    documentation: "https://docs.campusx.com",
    demo: "https://youtu.be/demo-video",
  },

  // Optional: Gallery images (shows in Gallery tab)
  gallery: [
    {
      url: "/projects/campusx/dashboard.png",
      caption: "Main Dashboard - Overview of opportunities and posts",
    },
    {
      url: "/projects/campusx/chat.png",
      caption: "Real-time Chat Interface with Socket.IO",
    },
    {
      url: "/projects/campusx/opportunities.png",
      caption: "Economic Opportunities Marketplace",
    },
    {
      url: "/projects/campusx/admin-panel.png",
      caption: "Admin Panel for Content Moderation",
    },
    {
      url: "/projects/campusx/payment-flow.png",
      caption: "Integrated Payment Processing Workflow",
    },
    {
      url: "/projects/campusx/ai-chatbot.png",
      caption: "Google Gemini AI Chatbot for Campus Info",
    },
  ],
};

/**
 * Minimal example with only required fields
 */
export const minimalProjectExample: Project = {
  id: "minimal-project",
  badge: "SYSTEM",
  title: "Minimal Project Example",
  description: "This shows the minimum required fields for a project.",
  techStack: ["React", "Node.js", "MongoDB"],
  features: [
    "Basic CRUD operations",
    "User authentication",
    "RESTful API",
  ],
};

/**
 * Tips for adding images:
 * 
 * 1. Place images in /public folder:
 *    /public/projects/your-project-name/image.png
 * 
 * 2. Reference them with leading slash:
 *    image: "/projects/your-project-name/hero.png"
 * 
 * 3. For gallery, add 4-8 images showing different features:
 *    - Dashboard/main interface
 *    - Key feature demonstrations
 *    - Admin panels (if applicable)
 *    - Mobile responsive views
 *    - Architecture diagrams
 *    - Data visualizations
 * 
 * 4. Keep captions concise but descriptive:
 *    Good: "Real-time Chat Interface with Socket.IO"
 *    Bad: "Screenshot of the chat page"
 * 
 * 5. Image optimization:
 *    - Use WebP format when possible
 *    - Compress images (aim for <500KB each)
 *    - Recommended dimensions: 1920x1080 or 1280x720
 */