import { Project } from "@/app/utils/ProjectTypes";

export const campusXProject: Project = {
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
    "Frontend Layer":
      "React 18 with Redux Toolkit for state management, Socket.IO client for real-time updates, React Router for navigation, Firebase SDK for image uploads, TensorFlow.js for client-side AI moderation",

    "Backend Services":
      "Express.js REST API with modular route architecture, MongoDB with Mongoose ODM, Socket.IO server for WebSocket connections, JWT-based authentication middleware, Winston logging system",

    "Real-time Communication":
      "Socket.IO bidirectional event-based communication for notifications, comments, and live updates. User registration system mapping socket IDs to user IDs for targeted message delivery",

    "AI Integration":
      "Google Gemini AI (Vertex AI) for intelligent campus chatbot with contextual responses. TensorFlow.js NSFW.js model for client-side content moderation with 95% accuracy",

    "Payment Processing":
      "DodoPayments API integration with webhook verification for secure payment callbacks. Two-tier payment system: 50% upfront and 50% on completion with status tracking",

    "Storage Layer":
      "MongoDB for user data, posts, comments, opportunities, and applications. Firebase Storage for image hosting with automatic compression",

    "Security & Middleware":
      "Helmet.js for HTTP security headers, CORS configuration, Express rate limiters (100 req/min for auth, 20 req/min for posts), JWT token verification",

    "Deployment":
      "Docker containerization for consistent environments, separate containers for frontend and backend, Docker Compose for orchestration",
  },

  userRoles: [
    "Students: Post anonymously with gender/section visibility, apply for paid opportunities, earn through micro-tasks, interact via comments with real-time notifications",
    "Companies: Create paid opportunities (surveys, tasks, internships), manage applicants with status tracking, process two-stage payments",
    "Admin: Monitor all platform activities, verify payment transactions, manage user authentication status, access comprehensive analytics dashboard",
  ],

  metrics: [
    "90+ RESTful API endpoints across 8 route modules",
    "Real-time WebSocket support for 1000+ concurrent connections",
    "AI content moderation with 95% accuracy rate",
    "Sub-200ms average API response time with pagination",
    "Two-tier payment system with webhook verification",
    "Infinite scroll reducing initial load time by 70%",
  ],

  awards: "Buildspace S5 Participant - July to December 2024",
  
  image: "/Campusx/cx-opp-ui.png",
  liveUrl: "https://becampusx.com",
  githubUrl: "https://github.com/yourusername/becampusx",
  
  gallery: [
    {
      url: "/Campusx/cx-opp-ui.png",
      caption: "Economic Opportunities Dashboard - Students browse paid tasks and internships",
    },
    {
      url: "/Campusx/cx-feed.png",
      caption: "Anonymous Social Feed - Gender/section-based anonymous posting",
    },
    {
      url: "/Campusx/cx-chat.png",
      caption: "Google Gemini AI Chatbot - Context-aware campus information assistant",
    },
  ],

  apiDocumentation: {
    baseUrl: "https://api.becampusx.com",

    authEndpoints: [
      {
        method: "POST",
        path: "/api/auth/signup",
        description: "Register new student account with admission number validation",
        requestBody: {
          admissionNumber: "string (4 digits)",
          email: "string",
          password: "string (hashed with bcrypt)",
          section: "string (CSE/IT/ETC)",
          gender: "string (Male/Female)",
        },
        response: {
          status: 201,
          body: "User object with JWT token in cookie",
        },
        security: "Rate limited: 100 requests/min per IP",
      },
    ],

    postEndpoints: [
      {
        method: "GET",
        path: "/api/post/allpost",
        description: "Fetch paginated feed of all posts with infinite scroll support",
        queryParams: {
          page: "number (default: 1)",
          limit: "number (default: 10)",
        },
        response: {
          status: 200,
          body: {
            posts: "Array of post objects",
            currentPage: "number",
            totalPages: "number",
            hasMore: "boolean",
          },
        },
        middleware: "isAuthenticated",
      },
    ],

    opportunityEndpoints: [
      {
        method: "POST",
        path: "/api/company/create",
        description: "Create new paid opportunity (companies/admins only)",
        requestBody: {
          title: "string",
          description: "string",
          numberOfOpenings: "number",
          isPaid: "boolean",
          amount: "number",
          deadline: "Date",
        },
        response: {
          status: 201,
          body: "Created opportunity with status='open'",
        },
        middleware: "verifyCompanyOrAdmin",
      },
    ],

    realtimeEvents: [
      {
        event: "newComment",
        direction: "Client → Server",
        payload: {
          postId: "string",
          comment: "object",
          postOwnerId: "string",
        },
        description: "Broadcast comment notification to post owner",
        handler: "Creates Notification document, emits event to post owner's socket",
      },
    ],
  },
};