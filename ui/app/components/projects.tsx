"use client";
import { NextPage } from "next";
import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/utils/themes";

interface Project {
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
  image: string;
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
}

const projectsData: Project[] = [
  {
    id: "ai-rag-pdf-app",
    badge: "SYSTEM",
    title: "AI-Powered PDF RAG Chat",
    description:
      "Intelligent document interaction platform enabling multi-user collaboration and contextual AI conversations with PDFs using retrieval-augmented generation and vector embeddings.",
    techStack: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Pinecone",
      "Groq API",
      "Hugging Face",
      "JWT",
    ],
    features: [
      "Multi-model AI chat with LLAMA & Mixtral via Groq",
      "Real-time collaborative spaces for shared PDF discussions",
      "Vector-based semantic search using Pinecone embeddings",
      "Collection management for structured multi-document queries",
    ],
    image: "/images/ai-rag-pdf-app.png",
  },
  {
    id: "campusx",
    badge: "FULL-STACK PLATFORM",
    title: "CampusX - Anonymous Social & Economic Opportunities Platform",
    description:
      "A full-stack anonymous social networking platform for students featuring real-time chat, AI-powered moderation, economic opportunities marketplace, and integrated payment processing with multi-role architecture.",
    techStack: [
      "React",
      "Redux Toolkit",
      "Node.js/Express",
      "MongoDB",
      "Socket.IO",
      "Google Gemini AI",
      "TensorFlow.js (NSFW.js)",
      "Firebase Storage",
      "DodoPayments API",
      "JWT Auth",
      "Docker",
    ],
    features: [
      "Real-time notifications & live chat with Socket.IO",
      "AI-powered content moderation (NSFW detection)",
      "Multi-tier user system (Students, Companies, Admin)",
      "Integrated payment gateway with webhook processing",
      "Economic opportunities marketplace with application tracking",
      "Infinite scroll & lazy loading for performance",
      "Google Gemini AI chatbot for campus information",
      "Rate limiting & security middleware (Helmet, CORS)",
      "Structured logging with Winston",
      "Image upload with Firebase Storage",
      "Anonymous posting with profile verification system",
    ],
    highlights: [
      "Handles payment workflows with first/second payment tracking",
      "Real-time WebSocket connections for instant notifications",
      "AI content moderation preventing inappropriate uploads",
      "Scalable architecture with pagination & infinite scroll",
      "Type-safe Redux state management with RTK Query",
      "Comprehensive error handling & validation",
    ],
    architecture: {
      frontend: "React 18 with Redux Toolkit, React Router, Socket.IO client",
      backend: "Express.js with MongoDB, Socket.IO server, JWT authentication",
      ai: "Google Gemini AI for chatbot, TensorFlow.js for image moderation",
      payments: "DodoPayments integration with webhook verification",
      realtime: "Socket.IO for notifications, comments, and live updates",
      storage: "Firebase for image uploads, MongoDB for all data persistence",
    },
    userRoles: [
      "Students: Post anonymously, apply for opportunities, earn through tasks",
      "Companies: Create paid opportunities, manage applicants, process payments",
      "Admin: Monitor all activities, verify payments, manage platform",
    ],
    image: "/images/becampusx.png",
    liveUrl: "https://becampusx.com", // Add your actual URL
    githubUrl: "https://github.com/yourusername/becampusx", // Add your repo URL
  },

  {
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
    image: "/images/booleanai-demo.png",
    demoVideo: "/videos/booleanai-demo.mp4",
    liveUrl: "https://your-domain.com/booleanai",
    githubUrl: "https://github.com/yourusername/booleanai",
  },
  {
    id: "queue-management-system",
    badge: "FULL-STACK",
    title: "Queueflex - Multi-Service Queue Management Platform",
    description:
      "A microservices-based queue management system enabling real-time customer flow management across multiple service providers with role-based access control and distributed authentication.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Python Flask",
      "Node.js",
      "gRPC",
      "SQLite",
      "JWT",
      "Docker",
    ],
    features: [
      "Microservices architecture with gRPC inter-service communication",
      "JWT-based distributed authentication across 3 services",
      "Role-based access control (Admin, Provider, Client)",
      "Real-time queue position tracking with automatic recalculation",
      "Service capacity management with configurable limits",
      "Multi-tenant provider dashboard with service isolation",
      "RESTful APIs with request interceptors and token validation",
      "Position-aware queuing system with status management",
    ],
    architecture: [
      "Auth Service (Node.js + gRPC): Centralized authentication with JWT verification",
      "Admin Service (Python Flask): Service CRUD operations and provider management",
      "Queue Service (Python Flask): Queue operations with service integration",
      "Frontend (Next.js): Responsive UI with role-based routing",
    ],
    highlights: [
      "Cross-language microservices communication using Protocol Buffers",
      "Atomic queue operations with automatic position recalculation",
      "Service-specific capacity enforcement and status filtering",
      "Secure token propagation across service boundaries",
    ],
    metrics: [
      "3 independent microservices with gRPC integration",
      "Support for unlimited concurrent service providers",
      "Real-time queue updates with <100ms latency",
      "Role-based filtering reducing API response size by 60%",
    ],
    image: "/images/queueflex.png",
    github: "https://github.com/yourusername/queueflex",
    demo: "https://queueflex-demo.vercel.app",
  },
  {
    id: "tribal-land-registry",
    badge: "BLOCKCHAIN",
    title: "Decentralized Tribal Land Registry",
    description:
      "Web3 land governance system combining blockchain immutability, AI-powered document analysis, and GPS verification to establish transparent, tamper-proof tribal land ownership records.",
    techStack: [
      "Solidity",
      "React.js",
      "Hardhat",
      "IPFS/Pinata",
      "Express.js",
      "TailwindCSS",
    ],
    features: [
      "Smart contract-based trustless verification workflow",
      "AI-OCR extraction of survey numbers and boundaries",
      "Real-time GPS coordinate tracing for field verification",
      "Automated area tolerance matching algorithm",
      "Decentralized document storage on IPFS",
    ],
    image: "/images/tribal-land-registry.png",
    awards: "IIIT Naya Raipur Hackathon Runner-Up",
    links: {
      demo: "https://youtu.be/m40BFgn-Oqo",
    },
  },
  {
    id: "gemledger",
    badge: "BLOCKCHAIN",
    title: "GemLedger: Diamond Supply Chain Tracker",
    description:
      "Blockchain-based supply chain platform providing end-to-end diamond traceability with cryptographic proof of authenticity, enabling transparent ownership transfers across mining, processing, certification, and retail stages.",
    techStack: [
      "Solidity",
      "React.js",
      "Node.js",
      "MongoDB",
      "Ethereum",
      "IPFS",
      "Hardhat",
    ],
    features: [
      "Immutable on-chain diamond registry",
      "Role-based access for 5 supply chain actors",
      "Decentralized image storage via IPFS",
      "Tamper-proof digital certification",
    ],
    image: "/images/gemledger.png",
    awards: "IIT Bhilai Fintech Hackathon Winner",
  },
  {
    id: "sheshield",
    badge: "FULL-STACK",
    title: "SheShield - Woman Safety Platform",
    description:
      "Emergency response application featuring intelligent threat detection through continuous gesture monitoring, location-based safety zones, and instant alert dispatching to emergency contacts.",
    techStack: ["React.js", "Express.js", "MongoDB", "Twilio", "JWT", "Vite"],
    features: [
      "Whiteboard gesture recognition for discrete SOS",
      "Real-time location tracking & safe zone alerts",
      "Timer-based wellness checks with auto-escalation",
      "Twilio-powered emergency SMS broadcasting",
    ],
    image: "/images/sheshield.png",
  },
];

const Projects: NextPage = () => {
  const { theme } = useTheme();
  const themeColors = THEMES[theme] ?? THEMES.dark;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getBadgeColor = (badge: string) => {
    if (theme === "dark") {
      switch (badge) {
        case "SERVICE":
          return "border-green-500 text-green-400 bg-green-500 bg-opacity-10";
        case "API":
          return "border-blue-500 text-blue-400 bg-blue-500 bg-opacity-10";
        case "SYSTEM":
          return "border-purple-500 text-purple-400 bg-purple-500 bg-opacity-10";
        case "FULL-STACK PLATFORM":
          return "border-pink-500 text-pink-400 bg-pink-500 bg-opacity-10";
        case "FULL-STACK AI":
          return "border-amber-500 text-amber-400 bg-amber-500 bg-opacity-10";
        case "FULL-STACK":
          return "border-cyan-500 text-cyan-400 bg-cyan-500 bg-opacity-10";
        case "BLOCKCHAIN":
          return "border-orange-500 text-orange-400 bg-orange-500 bg-opacity-10";
        default:
          return "border-gray-500 text-gray-400 bg-gray-500 bg-opacity-10";
      }
    } else {
      switch (badge) {
        case "SERVICE":
          return "border-green-600 text-green-700 bg-green-50";
        case "API":
          return "border-blue-600 text-blue-700 bg-blue-50";
        case "SYSTEM":
          return "border-purple-600 text-purple-700 bg-purple-50";
        case "FULL-STACK PLATFORM":
          return "border-pink-600 text-pink-700 bg-pink-50";
        case "FULL-STACK AI":
          return "border-amber-600 text-amber-700 bg-amber-50";
        case "FULL-STACK":
          return "border-cyan-600 text-cyan-700 bg-cyan-50";
        case "BLOCKCHAIN":
          return "border-orange-600 text-orange-700 bg-orange-50";
        default:
          return "border-gray-600 text-gray-700 bg-gray-50";
      }
    }
  };

  const bgClass = theme === "dark" ? "bg-gray-950" : "bg-white";
  const panelBgClass =
    theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-gray-50 border-gray-300";
  const panelHoverClass =
    theme === "dark" ? "hover:border-gray-700" : "hover:border-green-400";

  return (
    <section className={`w-full ${bgClass} py-20 px-5`}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div
            className={`text-xs uppercase tracking-widest ${themeColors.text.muted} mb-3`}
          >
            Projects
          </div>
          <h2 className={`text-4xl font-bold ${themeColors.text.primary} mb-3`}>
            Selected Backend Projects
          </h2>
          <p className={`${themeColors.text.secondary} max-w-2xl`}>
            Systems and services I built, focusing on scalability, performance,
            and real-world backend challenges.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="space-y-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className={`${panelBgClass} border rounded-lg overflow-hidden transition-all duration-200 ${panelHoverClass} relative`}
            >
              {/* Winner Cup Badge - Top Right Corner */}
              {project.awards && (
                <div className="absolute top-4 right-4 z-10">
                  <div
                    className={`text-3xl drop-shadow-lg ${
                      theme === "dark"
                        ? "bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30"
                        : "bg-yellow-100 border border-yellow-300"
                    } rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform`}
                  >
                    🏆
                  </div>
                </div>
              )}
              {/* Project Header with Badge */}
              <div className={`px-6 pt-6 pb-4 border-b ${themeColors.border}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-widest border rounded ${getBadgeColor(
                      project.badge,
                    )}`}
                  >
                    {project.badge}
                  </span>
                  <h3
                    className={`text-xl font-bold ${themeColors.text.primary}`}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Split Layout: Image + Info */}
              <div className="grid grid-cols-3 gap-6 p-6">
                {/* Left: Image Panel (30-35%) */}
                <div
                  className={`col-span-1 ${panelBgClass} rounded border overflow-hidden h-64`}
                >
                  <div
                    className={`w-full h-full ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-gray-800 to-gray-900"
                        : "bg-gradient-to-br from-gray-100 to-white"
                    } flex items-center justify-center`}
                  >
                    <div
                      className={`text-center ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      <div className="text-4xl mb-2">📊</div>
                      <div className="text-xs">Architecture Diagram</div>
                    </div>
                  </div>
                </div>

                {/* Right: Project Info Panel (65-70%) */}
                <div className="col-span-2 flex flex-col justify-between">
                  {/* Description */}
                  <div className="mb-4">
                    <p
                      className={`${themeColors.text.secondary} text-sm leading-relaxed`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className={`text-xs ${themeColors.text.secondary}`}>
                      <span className={themeColors.text.muted}>Tech:</span>{" "}
                      {project.techStack.join(" · ")}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-1">
                      {project.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className={`text-sm ${themeColors.text.secondary} flex items-start`}
                        >
                          <span
                            className={`${
                              theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                            } mr-2`}
                          >
                            •
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div
                    className={`flex gap-3 pt-4 border-t ${themeColors.border}`}
                  >
                    <button
                      className={`px-4 py-2 transition font-medium text-xs rounded ${
                        theme === "dark"
                          ? "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-gray-900"
                          : "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      View Details
                    </button>
                    <button
                      className={`px-4 py-2 transition font-medium text-xs rounded ${
                        theme === "dark"
                          ? "border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900"
                          : "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      API Docs
                    </button>
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className={`px-4 py-2 transition font-medium text-xs rounded ${
                        theme === "dark"
                          ? "border border-gray-600 text-gray-300 hover:bg-gray-700"
                          : "border border-gray-400 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {expandedId === project.id ? "Collapse" : "Architecture"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedId === project.id && (
                <div
                  className={`px-6 py-6 border-t ${themeColors.border} ${
                    theme === "dark"
                      ? "bg-gray-800 bg-opacity-30"
                      : "bg-green-50 bg-opacity-50"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left: Endpoints */}
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                        Key Endpoints
                      </div>
                      <div className="space-y-2 font-mono text-xs text-gray-400">
                        <div>
                          <span className="text-green-400">GET</span> /status
                        </div>
                        <div>
                          <span className="text-blue-400">POST</span> /task
                        </div>
                        <div>
                          <span className="text-purple-400">PATCH</span>{" "}
                          /task/:id
                        </div>
                        <div>
                          <span className="text-red-400">DELETE</span> /task/:id
                        </div>
                      </div>
                    </div>

                    {/* Right: Architecture Notes */}
                    <div>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                        Architecture Highlights
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-300 flex items-start">
                          <span className="text-blue-400 mr-2">→</span>
                          <span>Horizontally scalable microservice</span>
                        </li>
                        <li className="text-sm text-gray-300 flex items-start">
                          <span className="text-blue-400 mr-2">→</span>
                          <span>Event-driven with message queue</span>
                        </li>
                        <li className="text-sm text-gray-300 flex items-start">
                          <span className="text-blue-400 mr-2">→</span>
                          <span>99.9% uptime in production</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
