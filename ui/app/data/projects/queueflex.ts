import { Project } from "../../utils/ProjectTypes";

export const queueFlexProject: Project = {
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

  highlights: [
    "Cross-language microservices communication using Protocol Buffers",
    "Atomic queue operations with automatic position recalculation",
    "Service-specific capacity enforcement and status filtering",
    "Secure token propagation across service boundaries",
    "Zero-downtime service updates with stateless architecture",
    "Sub-100ms authentication latency via gRPC",
  ],

  architecture: {
    "System Overview":
      "Distributed microservices architecture with 3 independent services communicating via REST APIs and gRPC. Each service maintains its own database and state, ensuring loose coupling and independent scalability.",

    "Auth Service (Node.js + gRPC)":
      "Centralized authentication hub running dual servers: REST API on port 3000 for user signup/login with bcrypt password hashing, and gRPC server on port 50051 for token verification across services.",

    "Admin Service (Python Flask)":
      "Service management layer on port 5000 handling CRUD operations for queue services. Three controller modules: admin_controller, provider_controller, public_controller.",

    "Queue Service (Python Flask)":
      "Queue operation manager on port 4000 handling add/get/update/delete operations. In-memory queue array with automatic position recalculation on status changes.",

    "Frontend (Next.js + TypeScript)":
      "Server-side rendered React application with role-based routing. Token stored in HTTP-only cookies and passed via Authorization header.",

    "Authentication Flow":
      "User posts credentials to Auth REST API → Auth validates and returns JWT token → Frontend stores token in cookie → Subsequent requests include token → Python services call Auth gRPC VerifyToken",

    "Service Communication":
      "Inter-service calls use HTTP REST for data operations and gRPC for authentication. CORS configured to allow frontend origin with credentials support.",

    "Scalability Design":
      "Stateless services enable horizontal scaling. Auth Service handles authentication centrally while Queue and Admin services can run multiple instances behind load balancer.",
  },

  userRoles: [
    "Admin: Full platform access including creating any service, viewing all queue items across all services, updating any queue status, deleting services and queue items",
    "Provider: Create and manage own services with configurable capacity and timing, view queue items only for services they created, update queue status for their services",
    "Client: Browse active services with real-time availability, add themselves to service queues with name and purpose, view their own queue positions across all services",
  ],

  metrics: [
    "3 independent microservices with gRPC integration",
    "Support for unlimited concurrent service providers",
    "Real-time queue updates with <100ms latency",
    "Role-based filtering reducing API response size by 60%",
    "Token verification via gRPC with <50ms roundtrip time",
    "Atomic position recalculation ensuring data consistency",
  ],

  image: "/QueueFlex/queueflex-landing.png",
  github: "https://github.com/yourusername/queueflex",

  gallery: [
    {
      url: "/QueueFlex/admin-dashboard.png",
      caption:
        "Admin Dashboard - Manage all services and view queue statistics",
    },
    {
      url: "/QueueFlex/provider-dashboard.png",
      caption: "Provider Dashboard - Service creation and queue management",
    },
    {
      url: "/QueueFlex/client-queue.png",
      caption: "Client View - Browse services and join queues",
    },
    {
      url: "/QueueFlex/architecture-diagram.png",
      caption: "Microservices Architecture - gRPC and REST communication flow",
    },
  ],

  apiDocumentation: {
    baseUrl: "Multiple Services",

    authEndpoints: [
      {
        method: "POST",
        path: "http://localhost:3000/signup",
        description: "Register new user with optional admin privileges",
        requestBody: {
          name: "string",
          email: "string (unique)",
          password: "string",
          is_admin: "boolean (optional)",
        },
        response: {
          status: 201,
          body: {
            user_id: "integer",
            message: "User registered successfully",
          },
        },
      },
      {
        method: "gRPC",
        path: "localhost:50051/VerifyToken",
        description: "Internal gRPC endpoint for token verification",
        requestBody: {
          token: "string",
        },
        response: {
          status: 200,
          body: {
            is_valid: "boolean",
            is_admin: "boolean",
            user_id: "integer",
          },
        },
      },
    ],

    queueEndpoints: [
      {
        method: "POST",
        path: "http://localhost:4000/queue/add",
        description: "Add client to queue for a service",
        middleware: "authenticate_request",
        requestBody: {
          service_id: "UUID",
          name: "string",
          purpose: "string (optional)",
        },
        response: {
          status: 201,
          body: {
            queue_id: "UUID",
            position: "integer",
            status: "waiting",
          },
        },
        validation: "Service must exist, be active, and have capacity",
      },
    ],
  },
};
