import { Project } from "../../utils/ProjectTypes";

export const collabGPTProject: Project = {
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
        notes:
          "Token must be included in Authorization header for protected routes",
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
        notes:
          "Automatically creates Pinecone namespace and processes PDF into vector embeddings",
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
          title: "string (optional)",
          model: "string (optional)",
        },
        response: {
          status: 201,
          body: {
            _id: "string",
            userId: "string",
            documentId: "string | null",
            title: "string",
            model: "string",
            createdAt: "Date",
          },
        },
      },
    ],

    queryEndpoints: [
      {
        method: "POST",
        path: "/api/query",
        description: "Query document with RAG-powered AI response",
        middleware: "protect",
        requestBody: {
          documentId: "string (required)",
          query: "string (required)",
          spaceId: "string (optional)",
          chatId: "string (optional)",
          model: "string (optional)",
        },
        response: {
          status: 200,
          body: {
            answer: "string (AI-generated response)",
            success: "boolean",
          },
        },
        integration:
          "Pinecone vector search + LangChain RetrievalQAChain + Groq LLM",
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
          documentId: "string (required)",
        },
        response: {
          status: 201,
          body: {
            message: "Space created successfully",
            spaceId: "string",
            accessToken: "UUID string",
          },
        },
      },
    ],
  },
};
