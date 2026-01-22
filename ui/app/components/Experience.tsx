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
    badge: "Backend Intern",
    role: "Backend Developer",
    company: "Knowforth Tech LLP",
    version: "v2025.2",
    duration: "August 2025 - October 2025",
    stack: ["Node.js", "Express.js", "PostgreSQL", "Swagger"],
    responsibilities: [
      "Contributed to multiple backend projects, primarily ConnectB2B and KFTask",
      "Designed and implemented 90+ RESTful APIs using Node.js and Express",
      "Improved API response time by 35-40% through optimized SQL queries",
      "Integrated Swagger API documentation for clear and interactive API reference",
    ],
    expandedDetails: [
      "Handled 90% of the backend development for ConnectB2B and KFTask projects",
      "Optimized database queries and request handling for better performance",
      "Built scalable RESTful APIs following industry best practices",
      "Implemented comprehensive API documentation using Swagger",
      "Worked with PostgreSQL for efficient data storage and retrieval",
    ],
  },
  {
    id: "exp-2",
    badge: "Participant",
    role: "Full-Stack Developer",
    company: "Buildspace S5",
    version: "v2024.2",
    duration: "July 2024 - December 2024",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Redux", "WebSockets", "AI Integration"],
    responsibilities: [
      "Designed and developed CampusX, an anonymous chat platform for college students",
      "Built full-stack MERN application with Redux for state management",
      "Integrated WebSockets for real-time notifications and messaging",
      "Implemented AI-powered chatbot to address college-related queries",
    ],
    expandedDetails: [
      "Led the complete development lifecycle from ideation to deployment",
      "Focused on user privacy and secure anonymous communication",
      "Gained hands-on experience in full-stack development and AI integration",
      "Implemented real-time web technologies for seamless user experience",
      "Enhanced information accessibility through intelligent chatbot integration",
    ],
  },
  {
    id: "exp-3",
    badge: "Summer Intern",
    role: "Frontend Developer",
    company: "National Institute of Technology, Raipur",
    version: "v2024.1",
    duration: "May 2024 - August 2024",
    stack: ["HTML", "CSS", "JavaScript"],
    responsibilities: [
      "Improved the UI/UX of the official NIT Raipur website",
      "Implemented responsive design using HTML, CSS, and JavaScript",
      "Enhanced user experience through modern web development practices",
      "Collaborated with the web development team on design improvements",
    ],
    expandedDetails: [
      "Redesigned key sections of the official website for better accessibility",
      "Applied modern CSS techniques for responsive and mobile-friendly layouts",
      "Implemented interactive JavaScript features to enhance user engagement",
      "Ensured cross-browser compatibility and optimal performance",
      "Worked closely with stakeholders to align design with institutional branding",
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
