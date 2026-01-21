"use client";
import { NextPage } from "next";
import { useState } from "react";

interface Project {
  id: string;
  badge: "SERVICE" | "API" | "SYSTEM";
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  image: string;
}

const projectsData: Project[] = [
  {
    id: "queue-system",
    badge: "SERVICE",
    title: "Queue Management System",
    description:
      "Handles high-throughput task processing with fault tolerance, atomic locking, and real-time status updates across distributed services.",
    techStack: ["Node.js", "Redis", "PostgreSQL", "WebSocket", "Docker"],
    features: [
      "Distributed locking with Redis",
      "Event-driven processing",
      "Rate-limited public APIs",
      "Structured logging & metrics",
    ],
    image: "/images/queue-system.png",
  },
  {
    id: "api-gateway",
    badge: "API",
    title: "API Gateway & Rate Limiting",
    description:
      "Central entry point for microservices with intelligent routing, rate limiting, and request authentication at scale.",
    techStack: ["Go", "Redis", "PostgreSQL", "gRPC", "Prometheus"],
    features: [
      "Token bucket rate limiting",
      "JWT authentication & refresh flows",
      "Service discovery integration",
      "Request tracing & observability",
    ],
    image: "/images/api-gateway.png",
  },
  {
    id: "real-time-db",
    badge: "SYSTEM",
    title: "Real-time Data Synchronization",
    description:
      "Multi-database sync engine ensuring consistency across MySQL, PostgreSQL, and MongoDB with sub-second latency.",
    techStack: ["Rust", "Kafka", "PostgreSQL", "MongoDB", "MySQL"],
    features: [
      "Change Data Capture (CDC)",
      "Conflict resolution with CRDT",
      "Dead letter queue handling",
      "Exactly-once delivery guarantee",
    ],
    image: "/images/realtime-sync.png",
  },
  {
    id: "monitoring-stack",
    badge: "SYSTEM",
    title: "Distributed Monitoring & Alerting",
    description:
      "Centralized observability platform collecting metrics, logs, and traces from 200+ microservices with automated alerting.",
    techStack: ["Prometheus", "Grafana", "ELK Stack", "Jaeger", "Kubernetes"],
    features: [
      "Time-series database optimization",
      "Custom alert rule engine",
      "Log aggregation & retention",
      "Distributed tracing correlation",
    ],
    image: "/images/monitoring.png",
  },
];

const Projects: NextPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "SERVICE":
        return "border-green-500 text-green-400 bg-green-500 bg-opacity-10";
      case "API":
        return "border-blue-500 text-blue-400 bg-blue-500 bg-opacity-10";
      case "SYSTEM":
        return "border-purple-500 text-purple-400 bg-purple-500 bg-opacity-10";
      default:
        return "border-gray-500 text-gray-400 bg-gray-500 bg-opacity-10";
    }
  };

  return (
    <section className="w-full bg-gray-950 py-20 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Projects
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Selected Backend Projects
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Systems and services I built, focusing on scalability,
            performance, and real-world backend challenges.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="space-y-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-700"
            >
              {/* Project Header with Badge */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-widest border rounded ${getBadgeColor(
                      project.badge,
                    )}`}
                  >
                    {project.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Split Layout: Image + Info */}
              <div className="grid grid-cols-3 gap-6 p-6">
                {/* Left: Image Panel (30-35%) */}
                <div className="col-span-1 bg-gray-800 rounded border border-gray-700 overflow-hidden h-64">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📊</div>
                      <div className="text-xs">Architecture Diagram</div>
                    </div>
                  </div>
                </div>

                {/* Right: Project Info Panel (65-70%) */}
                <div className="col-span-2 flex flex-col justify-between">
                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-400">
                      <span className="text-gray-500">Tech:</span>{" "}
                      {project.techStack.join(" · ")}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-1">
                      {project.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-300 flex items-start"
                        >
                          <span className="text-green-400 mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-800">
                    <button className="px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-gray-900 transition font-medium text-xs">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900 transition font-medium text-xs">
                      API Docs
                    </button>
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 transition font-medium text-xs"
                    >
                      {expandedId === project.id ? "Collapse" : "Architecture"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedId === project.id && (
                <div className="px-6 py-6 border-t border-gray-800 bg-gray-800 bg-opacity-30">
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
