"use client";
import { NextPage } from "next";
import { useState } from "react";

interface Experience {
  id: string;
  badge: "ROLE" | "CONTRIBUTION" | "OSS";
  role: string;
  company: string;
  version: string;
  duration: string;
  stack: string[];
  responsibilities: string[];
  expandedDetails: string[];
}

const experienceData: Experience[] = [
  {
    id: "exp-1",
    badge: "ROLE",
    role: "Senior Backend Engineer",
    company: "TechCorp Inc.",
    version: "v2024.1",
    duration: "Jan 2024 – Present",
    stack: ["Node.js", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes"],
    responsibilities: [
      "Architected microservices handling 100k+ daily requests",
      "Optimized database queries reducing P99 latency by 40%",
      "Implemented distributed caching layer improving throughput by 60%",
      "Led on-call rotation for 99.99% uptime SLA",
    ],
    expandedDetails: [
      "Led migration from monolith to service-based architecture",
      "Designed event-driven system using Kafka for real-time data processing",
      "Introduced observability stack with structured logging and distributed tracing",
      "Mentored 3 junior engineers on system design and best practices",
    ],
  },
  {
    id: "exp-2",
    badge: "ROLE",
    role: "Backend Engineer",
    company: "StartupX",
    version: "v2023.2",
    duration: "Aug 2023 – Dec 2024",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "AWS"],
    responsibilities: [
      "Built REST APIs from scratch handling payment processing",
      "Designed database schema for multi-tenant SaaS platform",
      "Implemented webhook system for third-party integrations",
      "Reduced API response time from 800ms to 120ms through optimization",
    ],
    expandedDetails: [
      "Implemented database connection pooling and query optimization",
      "Designed idempotent webhook handlers for reliable integrations",
      "Built rate limiting and authentication middleware",
      "Established code review standards and testing practices",
    ],
  },
  {
    id: "exp-3",
    badge: "CONTRIBUTION",
    role: "Backend Systems Consultant",
    company: "Open Source Contributions",
    version: "v2022.3",
    duration: "Jun 2022 – Present",
    stack: ["Go", "Rust", "C++", "Protocol Buffers"],
    responsibilities: [
      "Contributed to core Redis modules for distributed caching",
      "Improved PostgreSQL query planner performance by 15%",
      "Published distributed systems research and articles",
      "Reviewed 50+ pull requests in open source communities",
    ],
    expandedDetails: [
      "Authored Go library for stream processing with 2k+ GitHub stars",
      "Collaborated with international team on distributed consensus",
      "Maintained long-term performance benchmarking suite",
      "Mentored open source contributors from various backgrounds",
    ],
  },
  {
    id: "exp-4",
    badge: "ROLE",
    role: "Junior Backend Developer",
    company: "Digital Solutions Ltd.",
    version: "v2021.1",
    duration: "Feb 2021 – Jul 2023",
    stack: ["Node.js", "Express", "MongoDB", "AWS S3"],
    responsibilities: [
      "Developed REST APIs for internal tools and customer-facing services",
      "Implemented authentication and authorization layers",
      "Participated in incident response and production debugging",
      "Improved test coverage from 40% to 85% across codebase",
    ],
    expandedDetails: [
      "Implemented CI/CD pipelines using GitHub Actions",
      "Designed scalable file storage solution using S3",
      "Created monitoring dashboards for service metrics",
      "Documented API specifications and deployment procedures",
    ],
  },
];

const Experience: NextPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "ROLE":
        return "border-blue-500 text-blue-400 bg-blue-500 bg-opacity-10";
      case "CONTRIBUTION":
        return "border-green-500 text-green-400 bg-green-500 bg-opacity-10";
      case "OSS":
        return "border-purple-500 text-purple-400 bg-purple-500 bg-opacity-10";
      default:
        return "border-gray-500 text-gray-400 bg-gray-500 bg-opacity-10";
    }
  };

  return (
    <section className="w-full bg-gray-950 py-20 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            Experience
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            Professional Experience
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Backend systems I've worked on, maintained, and scaled over time.
          </p>
        </div>

        {/* Experience Stack */}
        <div className="space-y-4">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="bg-gray-900 border border-gray-800 rounded-lg transition-all duration-200 hover:border-gray-700"
            >
              {/* Entry Header */}
              <button
                onClick={() => toggleExpand(exp.id)}
                className="w-full px-6 py-5 text-left hover:bg-gray-800 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-widest border rounded ${getBadgeColor(
                        exp.badge,
                      )}`}
                    >
                      {exp.badge}
                    </span>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {exp.role} — {exp.company}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Version: {exp.version}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-lg flex-shrink-0">
                    {expandedId === exp.id ? "−" : "+"}
                  </span>
                </div>
              </button>

              {/* Metadata Row */}
              <div className="px-6 py-3 border-t border-gray-800 bg-gray-800 bg-opacity-30">
                <div className="flex flex-col gap-2 text-xs text-gray-400">
                  <div>
                    <span className="text-gray-500">Duration:</span>{" "}
                    {exp.duration}
                  </div>
                  <div>
                    <span className="text-gray-500">Stack:</span>{" "}
                    {exp.stack.join(" · ")}
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="px-6 py-5 border-t border-gray-800">
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-300 flex items-start"
                    >
                      <span className="text-blue-400 mr-3">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expandable Details */}
              {expandedId === exp.id && (
                <div className="px-6 py-5 border-t border-gray-800 bg-gray-800 bg-opacity-20">
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                      Expanded Details
                    </div>
                    <ul className="space-y-2">
                      {exp.expandedDetails.map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-300 flex items-start"
                        >
                          <span className="text-green-400 mr-3">→</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t border-gray-800 flex gap-3">
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-gray-900 transition font-medium text-xs"
                >
                  {expandedId === exp.id ? "Collapse Details" : "View Details"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
