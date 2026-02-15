"use client";
import { NextPage } from "next";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../utils/themes";
import ProjectModal from "../modals/ProjectModal";
import { Project } from "../utils/ProjectTypes";
import { getBadgeIcon, getAbbreviatedBadge } from "../modals/BadgeIcons";

const projectsData: Project[] = [
 
{
  id: "ai-rag-pdf-app",
  badge: "SYSTEM",
  title: "CollabGPT - AI-Powered PDF RAG Chat",
  description:
    "Intelligent document interaction platform enabling multi-user collaboration and contextual AI conversations with PDFs using retrieval-augmented generation and vector embeddings.",
  
  techStack: [
    "React.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Pinecone",
    "Groq API",
    "LangChain",
    "Hugging Face",
    "JWT",
    "Multer",
  ],
  
  features: [
    "Multi-model AI chat with LLAMA & Mixtral via Groq",
    "Real-time collaborative spaces for shared PDF discussions",
    "Vector-based semantic search using Pinecone embeddings",
    "Individual and collaborative chat management",
  ],

  highlights: [
    "RAG pipeline with 800-token chunks and 100-token overlap for optimal context",
    "Sentence-transformers/all-MiniLM-L6-v2 embeddings (384 dimensions)",
    "Serverless vector database with cosine similarity search",
    "JWT-based authentication with protected routes",
    "Automatic document namespace isolation in Pinecone",
    "Support for multiple Groq LLM models with dynamic switching",
  ],

  architecture: {
    "Frontend Layer": 
      "React 18 with functional components, React Router for navigation, Axios for HTTP requests, JWT token management in localStorage, responsive UI with Tailwind CSS",

    "Backend API": 
      "Express.js REST API with modular route architecture (auth, documents, chat, spaces, query), JWT middleware for authentication, Multer for file upload handling, error handling middleware with development/production modes",

    "Document Processing Pipeline": 
      "PDFLoader extracts text from uploaded PDFs → RecursiveCharacterTextSplitter creates 800-character chunks with 100-char overlap → Hugging Face embeddings (all-MiniLM-L6-v2) generate 384-dimensional vectors → Vectors stored in Pinecone with unique namespace per document",

    "Vector Database": 
      "Pinecone serverless index on AWS (us-east-1) with cosine similarity metric, 384-dimensional vectors, namespace-based document isolation, automatic index creation if not exists, PineconeStore integration with LangChain",

    "RAG Query Flow": 
      "User query → Embedding generation via Hugging Face → Similarity search in Pinecone (top-4 results) → Context assembly from retrieved chunks → Groq LLM with RetrievalQAChain → Contextualized answer → Chat history storage in MongoDB",

    "LLM Integration": 
      "Groq API via LangChain ChatGroq, configurable model selection (LLAMA3-70B, LLAMA3-8B, Mixtral-8x7B, Gemma-7B), temperature control (0.1-0.7), centralized llmService for model management",

    "Authentication System": 
      "JWT tokens with 1-hour expiration, bcrypt password hashing (10 rounds), protected middleware wraps authenticated routes, user sessions persisted in MongoDB, token verification on every protected request",

    "Collaborative Spaces": 
      "UUID-based access tokens for space sharing, member management with creator/member roles, space-scoped chat history, document-level permission validation, multi-user concurrent access support",

    "Data Persistence": 
      "MongoDB stores: User accounts, Document metadata, Chat sessions, Chat messages, Collaborative spaces, Space memberships. Indexed collections for performance (userId, chatId, spaceId)",
  },

  userRoles: [
    "Individual Users: Upload PDFs, create personal chats, query documents with AI, switch between Groq models, view chat history, manage document library",
    
    "Space Creators: Create collaborative spaces for shared documents, generate access tokens for invitations, manage space members, configure space settings, moderate space activities",
    
    "Space Members: Join spaces via access token, participate in collaborative discussions, view shared chat history, query shared documents, contribute to space conversations",
  ],

  metrics: [
    "384-dimensional vector embeddings for semantic search",
    "800-character chunks with 100-char overlap for context preservation",
    "Top-4 similarity search for accurate retrieval",
    "Sub-second query response times with Pinecone",
    "Support for unlimited concurrent users in spaces",
    "JWT tokens with automatic 1-hour expiration",
    "5 concurrent embedding requests (maxConcurrency: 5)",
  ],

  image: "/CollabGPT/collabgpt-mockup.png",
  
  // Add gallery images if you have them
  gallery: [
    {
      url: "/CollabGPT/upload-interface.png",
      caption: "PDF Upload Interface - Drag & drop or browse files",
    },
    {
      url: "/CollabGPT/chat-interface.png",
      caption: "AI Chat Interface with RAG-powered responses",
    },
    {
      url: "/CollabGPT/space-collaboration.png",
      caption: "Collaborative Space with multiple users",
    },
    {
      url: "/CollabGPT/model-selection.png",
      caption: "Dynamic LLM model selection (LLAMA, Mixtral, Gemma)",
    },
  ],

  apiDocumentation: {
    baseUrl: "https://api.collabgpt.com",

    authEndpoints: [
      {
        method: "POST",
        path: "/api/signup",
        description: "Register new user account with encrypted password",
        requestBody: {
          name: "string",
          email: "string (unique)",
          password: "string (min 6 characters)",
        },
        response: {
          status: 201,
          body: {
            message: "User registered successfully",
            user: { _id: "string", name: "string", email: "string" },
            token: "JWT string (expires in 1h)",
          },
        },
        security: "Password hashed with bcrypt (10 rounds)",
        notes: "Returns JWT token automatically after registration",
      },
      {
        method: "POST",
        path: "/api/login",
        description: "Authenticate user and receive JWT token",
        requestBody: {
          email: "string",
          password: "string",
        },
        response: {
          status: 200,
          body: {
            message: "Login successful",
            token: "JWT string",
            user: { _id: "string", name: "string", email: "string" },
          },
        },
        security: "bcrypt password verification",
        notes: "Token must be included in Authorization header for protected routes",
      },
      {
        method: "GET",
        path: "/api/user/me",
        description: "Get current authenticated user profile",
        middleware: "protect (JWT verification)",
        response: {
          status: 200,
          body: {
            _id: "string",
            name: "string",
            email: "string",
          },
        },
        authorization: "Requires valid JWT token in Authorization header",
      },
    ],

    documentEndpoints: [
      {
        method: "POST",
        path: "/api/upload",
        description: "Upload PDF document and process with RAG pipeline",
        requestBody: {
          file: "PDF file (multipart/form-data)",
        },
        response: {
          status: 200,
          body: {
            message: "Document uploaded and processed",
            document: {
              _id: "string",
              title: "string",
              filename: "string",
              indexName: "string",
              namespace: "string (doc-{timestamp})",
              processedChunks: "number",
              totalChunks: "number",
              uploadDate: "Date",
            },
          },
        },
        middleware: "Multer file upload",
        notes: "Automatically creates Pinecone namespace and processes PDF into vector embeddings. Chunks: 800 chars with 100 overlap",
      },
      {
        method: "GET",
        path: "/api/documents",
        description: "Retrieve all uploaded documents",
        response: {
          status: 200,
          body: [
            {
              _id: "string",
              title: "string",
              filename: "string",
              uploadDate: "Date",
              processedChunks: "number",
            },
          ],
        },
        notes: "Returns documents sorted by upload date (newest first)",
      },
    ],

    chatEndpoints: [
      {
        method: "POST",
        path: "/api/chat/create",
        description: "Create new individual chat session",
        middleware: "protect",
        requestBody: {
          documentId: "string (ObjectId, optional)",
          title: "string (optional, default: 'Chat {date}')",
          model: "string (optional, default: llama-3.1-8b-instant)",
        },
        response: {
          status: 201,
          body: {
            _id: "string",
            userId: "string",
            documentId: "string | null",
            title: "string",
            model: "string",
            isActive: "boolean",
            lastMessageAt: "Date",
            createdAt: "Date",
          },
        },
        notes: "Creates chat with or without specific document. Supports model selection from Groq options",
      },
      {
        method: "GET",
        path: "/api/chat/user",
        description: "Get all chats for authenticated user",
        middleware: "protect",
        response: {
          status: 200,
          body: [
            {
              _id: "string",
              title: "string",
              documentId: { title: "string", filename: "string" },
              lastMessageAt: "Date",
            },
          ],
        },
        notes: "Returns chats sorted by last activity (newest first)",
      },
      {
        method: "GET",
        path: "/api/chat/chat/:chatId",
        description: "Get specific chat with all messages",
        middleware: "protect",
        response: {
          status: 200,
          body: {
            chat: { _id: "string", title: "string", documentId: "object" },
            messages: [
              {
                _id: "string",
                type: "question | answer",
                content: "string",
                timestamp: "Date",
              },
            ],
          },
        },
        authorization: "User must own the chat",
      },
      {
        method: "PATCH",
        path: "/api/chat/chat/:chatId",
        description: "Update chat metadata (title, last activity)",
        middleware: "protect",
        requestBody: {
          title: "string (optional)",
        },
        response: {
          status: 200,
          body: { _id: "string", title: "string", lastMessageAt: "Date" },
        },
        authorization: "User must own the chat",
      },
      {
        method: "DELETE",
        path: "/api/chat/chat/:chatId",
        description: "Delete chat and all associated messages",
        middleware: "protect",
        response: {
          status: 200,
          body: { message: "Chat deleted successfully" },
        },
        authorization: "User must own the chat",
        notes: "Cascading delete removes all ChatMessage documents",
      },
    ],

    queryEndpoints: [
      {
        method: "POST",
        path: "/api/query",
        description: "Query document with RAG-powered AI response",
        middleware: "protect",
        requestBody: {
          documentId: "string (ObjectId, required)",
          query: "string (required)",
          spaceId: "string (ObjectId, optional)",
          chatId: "string (ObjectId, optional)",
          model: "string (optional, e.g., 'llama3-70b-8192')",
        },
        response: {
          status: 200,
          body: {
            answer: "string (AI-generated response)",
            success: "boolean",
            messagesSaved: "boolean",
            debug: {
              questionSaved: "boolean",
              answerSaved: "boolean",
              spaceId: "string | null",
              chatId: "string | null",
              userId: "string",
            },
          },
        },
        logic: "1) Validate space/chat access → 2) Query Pinecone for top-4 similar chunks → 3) Assemble context from chunks → 4) RetrievalQAChain with Groq LLM → 5) Save Q&A to chat history",
        integration: "Pinecone vector search + LangChain RetrievalQAChain + Groq LLM",
        notes: "Automatically saves conversation history if chatId or spaceId provided. Updates chat lastMessageAt timestamp",
      },
    ],

    spaceEndpoints: [
      {
        method: "POST",
        path: "/api/spaces/create",
        description: "Create collaborative space for shared document access",
        middleware: "protect",
        requestBody: {
          name: "string (required)",
          description: "string (optional)",
          documentId: "string (ObjectId, required)",
        },
        response: {
          status: 201,
          body: {
            message: "Space created successfully",
            spaceId: "string",
            accessToken: "UUID string",
          },
        },
        validation: "Document must exist before space creation",
        notes: "Creator automatically added as first member. Access token used for invitations",
      },
      {
        method: "POST",
        path: "/api/spaces/join",
        description: "Join existing space using access token",
        middleware: "protect",
        requestBody: {
          accessToken: "string (UUID)",
        },
        response: {
          status: 200,
          body: {
            message: "Joined space successfully",
            spaceId: "string",
          },
        },
        validation: "Valid access token required. Prevents duplicate memberships",
      },
      {
        method: "GET",
        path: "/api/spaces",
        description: "Get all spaces where user is a member",
        middleware: "protect",
        response: {
          status: 200,
          body: {
            spaces: [
              {
                _id: "string",
                name: "string",
                description: "string",
                documentId: { title: "string", filename: "string" },
                createdBy: { name: "string" },
                members: ["userId1", "userId2"],
                createdAt: "Date",
              },
            ],
          },
        },
        notes: "Sorted by creation date (newest first)",
      },
      {
        method: "GET",
        path: "/api/spaces/:id",
        description: "Get specific space details with members",
        middleware: "protect",
        response: {
          status: 200,
          body: {
            space: {
              _id: "string",
              name: "string",
              documentId: { title: "string", filename: "string" },
              members: [{ _id: "string", name: "string", email: "string" }],
              createdBy: { name: "string", email: "string" },
              accessToken: "string",
            },
          },
        },
        authorization: "User must be a space member",
      },
    ],

    messageEndpoints: [
      {
        method: "POST",
        path: "/api/chat/save",
        description: "Save message to chat or space history (legacy endpoint)",
        middleware: "protect",
        requestBody: {
          chatId: "string (ObjectId, optional)",
          spaceId: "string (ObjectId, optional)",
          type: "string (question | answer | system | user | bot)",
          content: "string",
        },
        response: {
          status: 201,
          body: {
            _id: "string",
            userId: "string",
            type: "string",
            content: "string",
            timestamp: "Date",
          },
        },
        notes: "Updates chat lastActivity if chatId provided. Requires either chatId or spaceId",
      },
      {
        method: "GET",
        path: "/api/chat/:spaceId",
        description: "Get chat history for space or individual chat",
        queryParams: {
          chatId: "string (optional)",
        },
        response: {
          status: 200,
          body: [
            {
              _id: "string",
              userId: { name: "string", email: "string" },
              type: "string",
              content: "string",
              timestamp: "Date",
            },
          ],
        },
        notes: "Returns messages sorted by timestamp (oldest first). Filters by chatId if provided, otherwise by spaceId",
      },
    ],
  },
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
        "Google Gemini AI (Vertex AI) for intelligent campus chatbot with contextual responses. TensorFlow.js NSFW.js model for client-side content moderation with 95% accuracy, preventing inappropriate image uploads before submission",

      "Payment Processing":
        "DodoPayments API integration with webhook verification for secure payment callbacks. Two-tier payment system: 50% upfront (first payment) and 50% on completion (second payment) with status tracking in MongoDB",

      "Storage Layer":
        "MongoDB for user data, posts, comments, opportunities, and applications. Firebase Storage for image hosting with automatic compression. Redis-like structure for session management",

      "Security & Middleware":
        "Helmet.js for HTTP security headers, CORS configuration with trusted origins, Express rate limiters (100 req/min for auth, 20 req/min for posts), JWT token verification, express-mongo-sanitize for NoSQL injection prevention",

      Deployment:
        "Docker containerization for consistent environments, separate containers for frontend and backend, Docker Compose for orchestration, environment-based configuration management",
    },
    userRoles: [
      "Students: Post anonymously with gender/section visibility, apply for paid opportunities, earn through micro-tasks, interact via comments with real-time notifications, access AI chatbot for campus queries",

      "Companies: Create paid opportunities (surveys, tasks, internships), manage applicants with status tracking (applied → shortlisted → selected → rejected), process two-stage payments, view detailed applicant profiles and proof of work",

      "Admin: Monitor all platform activities across social and economic features, verify payment transactions from webhook callbacks, manage user authentication status, access comprehensive analytics dashboard, moderate content and user reports",
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
        caption:
          "Economic Opportunities Dashboard - Students browse paid tasks and internships",
      },
      {
        url: "/Campusx/cx-feed.png",
        caption:
          "Anonymous Social Feed - Gender/section-based anonymous posting with AI moderation",
      },
      {
        url: "/Campusx/cx-chat.png",
        caption:
          "Google Gemini AI Chatbot - Context-aware campus information assistant",
      },
    ],
    apiDocumentation: {
      baseUrl: "https://api.becampusx.com",

      authEndpoints: [
        {
          method: "POST",
          path: "/api/auth/signup",
          description:
            "Register new student account with admission number validation",
          requestBody: {
            admissionNumber: "string (4 digits, year format)",
            email: "string",
            password: "string (hashed with bcrypt)",
            section: "string (CSE/IT/ETC/etc)",
            gender: "string (Male/Female)",
          },
          response: {
            status: 201,
            body: "User object with JWT token in cookie",
          },
          security: "Rate limited: 100 requests/min per IP",
          notes:
            "Auto-calculates graduation year from admission number. Sets JWT cookie with 30-day expiry",
        },
        {
          method: "POST",
          path: "/api/auth/signin",
          description: "Authenticate user and establish session",
          requestBody: {
            email: "string",
            password: "string",
          },
          response: {
            status: 200,
            body: "User object (password excluded) with JWT token",
          },
          security: "Rate limited: 100 requests/min per IP",
        },
        {
          method: "POST",
          path: "/api/auth/logout",
          description: "Clear JWT session cookie",
          middleware: "isAuthenticated",
          response: {
            status: 200,
            body: "{ message: 'Signout Success' }",
          },
        },
      ],

      postEndpoints: [
        {
          method: "GET",
          path: "/api/post/allpost",
          description:
            "Fetch paginated feed of all posts with infinite scroll support",
          queryParams: {
            page: "number (default: 1)",
            limit: "number (default: 10)",
          },
          response: {
            status: 200,
            body: {
              posts: "Array of post objects with populated user data",
              currentPage: "number",
              totalPages: "number",
              hasMore: "boolean",
            },
          },
          middleware: "isAuthenticated",
          notes:
            "Returns reversed array (newest first). Populates user gender, section, profilePicture, year, isAuthenticated",
        },
        {
          method: "POST",
          path: "/api/post/addpost",
          description: "Create new anonymous post with optional image",
          requestBody: {
            text: "string (required)",
            postImage: "string (Firebase Storage URL, optional)",
          },
          response: {
            status: 201,
            body: "Created post object",
          },
          middleware: "isAuthenticated, postLimiter (20 req/min)",
          security: "Client-side NSFW detection before upload",
          notes:
            "Image uploaded to Firebase Storage first, then URL saved in MongoDB",
        },
        {
          method: "POST",
          path: "/api/post/delete/:postId",
          description: "Delete post and all associated comments",
          response: {
            status: 200,
            body: "{ message: 'Post and its comments deleted successfully' }",
          },
          middleware: "isAuthenticated",
          authorization: "Only post author can delete",
          notes:
            "Cascading delete removes all comments via Comment.deleteMany()",
        },
      ],

      commentEndpoints: [
        {
          method: "GET",
          path: "/api/comment/all/:postId",
          description: "Fetch all comments for a specific post",
          response: {
            status: 200,
            body: "Array of comments with populated user (section, gender, profilePicture)",
          },
          notes: "Sorted by createdAt descending (newest first)",
        },
        {
          method: "POST",
          path: "/api/comment/add/:postId",
          description:
            "Add comment to post and trigger real-time notification",
          requestBody: {
            text: "string",
            userId: "string (ObjectId)",
          },
          response: {
            status: 201,
            body: "Created comment object",
          },
          realtime: "Emits 'newComment' Socket.IO event to post owner",
          notes:
            "Creates Notification document and sends WebSocket event if post owner is online",
        },
        {
          method: "POST",
          path: "/api/comment/delete/:commentId",
          description: "Delete own comment",
          requestBody: {
            userId: "string (ObjectId)",
          },
          response: {
            status: 200,
            body: "{ message: 'Comment deleted successfully' }",
          },
          authorization: "Only comment author can delete",
        },
      ],

      opportunityEndpoints: [
        {
          method: "POST",
          path: "/api/company/create",
          description:
            "Create new paid opportunity (companies/admins only)",
          requestBody: {
            title: "string",
            description: "string",
            numberOfOpenings: "number (min: 1)",
            isPaid: "boolean",
            amount: "number (required if isPaid=true)",
            deadline: "Date (must be future)",
            proofOfWork: "{ screenshot: string, link: string }",
            type: "string (engagement/survey/academic/development/etc)",
          },
          response: {
            status: 201,
            body: "Created opportunity with status='open'",
          },
          middleware: "verifyCompanyOrAdmin",
          validation:
            "Deadline must be future date, amount required for paid opportunities",
        },
        {
          method: "GET",
          path: "/api/company/myopportunities/:id",
          description:
            "Get all opportunities created by specific company with applicant details",
          queryParams: {
            page: "number",
            limit: "number",
            sort: "string (default: '-createdAt')",
          },
          response: {
            status: 200,
            body: {
              opportunities:
                "Array with populated applicants and selectedCandidates",
              currentPage: "number",
              totalPages: "number",
              hasMore: "boolean",
              totalCount: "number",
            },
          },
          middleware: "verifyCompanyOrAdmin",
          notes:
            "Populates applicants.userId and selectedCandidates.userId with full user data",
        },
        {
          method: "POST",
          path: "/api/applicants/opportunities/:id/apply",
          description:
            "Student applies for opportunity with cover letter and proof",
          requestBody: {
            coverLetter: "string",
            proofOfWork: "{ screenshot: string, link: string }",
          },
          response: {
            status: 200,
            body: "{ message: 'Application submitted successfully', application: Applicant }",
          },
          middleware: "verifyToken",
          validation:
            "Checks: opportunity is open, deadline not passed, no duplicate application",
          notes:
            "Creates Applicant document and adds userId to opportunity.applicants array",
        },
        {
          method: "PUT",
          path: "/api/company/applicants/status/:opportunityId/:userId",
          description: "Update applicant status in hiring pipeline",
          requestBody: {
            status: "string (applied/shortlisted/selected/rejected)",
          },
          response: {
            status: 200,
            body: "{ message: 'Applicant status updated successfully', opportunity }",
          },
          middleware: "verifyCompanyOrAdmin",
          authorization: "Only opportunity creator or admin",
          notes: "If status=selected, adds to selectedCandidates array",
        },
      ],

      paymentEndpoints: [
        {
          method: "GET",
          path: "/api/company/payments/opportunity/:oppId",
          description:
            "Generate payment link for opportunity (1st or 2nd payment)",
          response: {
            status: 200,
            body: {
              link: "string (DodoPayments checkout URL)",
              company: "string",
              message: "string",
              paymentLevel: "string (1 or 2)",
            },
          },
          logic:
            "If firstPayment.status=false → Level 1 (50% upfront). If firstPayment.status=true → Level 2 (remaining 50%)",
          integration: "DodoPayments API with Twilio for SMS notifications",
          notes:
            "Stores oppId and paymentLevel in payment metadata for webhook processing",
        },
        {
          method: "POST",
          path: "/webhook/dodo-payments",
          description: "Handle payment webhook callbacks from DodoPayments",
          headers: {
            "webhook-id": "string",
            "webhook-signature": "string",
            "webhook-timestamp": "string",
          },
          events: {
            "payment.succeeded":
              "Updates MongoDB: firstPayment or secondPayment status to true with timestamp",
            "payment.cancelled": "Logs warning in Winston logger",
            "payment.failed": "Logs error in Winston logger",
          },
          security:
            "Webhook signature verification using StandardWebhooks library",
          notes:
            "15-second window limit for replay attack prevention. Uses raw body parser",
        },
      ],

      realtimeEvents: [
        {
          event: "register",
          direction: "Client → Server",
          payload: "userId (string)",
          description:
            "Register socket connection with user ID for targeted notifications",
          handler: "Stores mapping: users[userId] = socketId",
        },
        {
          event: "newComment",
          direction: "Client → Server",
          payload: {
            postId: "string",
            comment: "{ text, userId, userGender, userSection }",
            postOwnerId: "string",
          },
          description: "Broadcast comment notification to post owner",
          handler:
            "Creates Notification document, emits 'notification' event to post owner's socket",
        },
        {
          event: "notification",
          direction: "Server → Client",
          payload: {
            message: "string",
            postId: "string",
          },
          description: "Real-time notification delivery to connected client",
          handler: "Client displays notification toast/banner",
        },
        {
          event: "disconnect",
          direction: "Client → Server",
          description: "Cleanup socket mapping on client disconnect",
          handler: "Removes userId from users object",
        },
      ],

      adminEndpoints: [
        {
          method: "GET",
          path: "/api/admin/getAllUsers",
          description: "Paginated list of all platform users",
          queryParams: {
            page: "number",
            limit: "number (default: 6)",
          },
          middleware: "verifyAdmin",
          response: {
            status: 200,
            body: {
              users: "Array",
              currentPage: "number",
              totalPages: "number",
              hasMore: "boolean",
            },
          },
        },
        {
          method: "GET",
          path: "/api/admin/getAllOpp",
          description:
            "All opportunities across all companies for admin dashboard",
          middleware: "verifyAdmin",
          notes:
            "Used for platform-wide opportunity monitoring and analytics",
        },
        {
          method: "GET",
          path: "/api/admin/getAllCompany",
          description: "Paginated list of all registered companies",
          middleware: "verifyAdmin",
          queryParams: {
            page: "number",
            limit: "number (default: 6)",
          },
        },
      ],
    },
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
    image: "/Booleanai/booleanai-webui.png",
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
    image: "/QueueFlex/queueflex-landing.png",
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
    image: "/Landregisteryapp/landregistry.png",
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
    image: "/gemledger/gemledger.png",
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
    image: "/Sheshield/sheshield.png",
  },
];

const Projects: NextPage = () => {
  const { theme } = useTheme();
  const themeColors = THEMES[theme] ?? THEMES.dark;
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);

  const handleNavigate = (direction: "prev" | "next") => {
    if (selectedProjectIndex === null) return;

    if (direction === "prev" && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    } else if (
      direction === "next" &&
      selectedProjectIndex < projectsData.length - 1
    ) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    }
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
    <>
      <section
        className={`w-full ${bgClass} py-12 sm:py-16 md:py-20 px-4 sm:px-5`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <div
              className={`text-xs uppercase tracking-widest ${themeColors.text.muted} mb-3`}
            >
              Projects
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold ${themeColors.text.primary} mb-3`}
            >
              Selected Backend Projects
            </h2>
            <p className={`${themeColors.text.secondary} max-w-2xl`}>
              Systems and services I built, focusing on scalability,
              performance, and real-world backend challenges.
            </p>
          </div>

          {/* Projects Stack */}
          <div className="space-y-6">
            {projectsData.map((project, index) => (
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
                <div
                  className={`px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-3 sm:pb-4 border-b ${themeColors.border}`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    {/* Badge - Responsive: Icon only on mobile, Icon + Text on desktop */}
                    <div
                      className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-1 text-xs font-bold uppercase tracking-widest border rounded ${getBadgeColor(
                        project.badge
                      )} flex-shrink-0 group relative`}
                      title={project.badge} // Tooltip for mobile
                    >
                      {/* Icon */}
                      {(() => {
                        const IconComponent = getBadgeIcon(project.badge);
                        return (
                          <IconComponent
                            size={16}
                            className="flex-shrink-0"
                          />
                        );
                      })()}

                      {/* Text - Hidden on mobile, shown on sm+ screens */}
                      <span className="hidden sm:inline whitespace-nowrap">
                        {getAbbreviatedBadge(project.badge)}
                      </span>

                      {/* Mobile Tooltip - Shows full badge name on tap/hover */}
                      <span className="sm:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        {project.badge}
                      </span>
                    </div>

                    <h3
                      className={`text-base sm:text-lg md:text-xl font-bold ${themeColors.text.primary} break-words flex-1 min-w-0`}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  {/* Description */}
                  <div className="mb-4">
                    <p
                      className={`${themeColors.text.secondary} text-sm leading-relaxed break-words`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div
                      className={`text-xs ${themeColors.text.secondary} break-words`}
                    >
                      <span className={themeColors.text.muted}>Tech:</span>{" "}
                      {project.techStack.join(" · ")}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-1">
                      {project.features.slice(0, 4).map((feature, idx) => (
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
                    className={`flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t ${themeColors.border}`}
                  >
                    <button
                      onClick={() => setSelectedProjectIndex(index)}
                      className={`px-4 py-2 transition font-medium text-xs rounded ${
                        theme === "dark"
                          ? "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-gray-900"
                          : "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProjectIndex(index);
                      }}
                      className={`px-4 py-2 transition font-medium text-xs rounded ${
                        theme === "dark"
                          ? "border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900"
                          : "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      Architecture
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 transition font-medium text-xs rounded text-center ${
                          theme === "dark"
                            ? "border border-gray-600 text-gray-300 hover:bg-gray-700"
                            : "border border-gray-400 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProjectIndex !== null && (
        <ProjectModal
          project={projectsData[selectedProjectIndex]}
          isOpen={selectedProjectIndex !== null}
          onClose={() => setSelectedProjectIndex(null)}
          onNavigate={handleNavigate}
          hasPrevious={selectedProjectIndex > 0}
          hasNext={selectedProjectIndex < projectsData.length - 1}
        />
      )}
    </>
  );
};

export default Projects;