"use client";
import { NextPage } from "next";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../utils/themes";
import ProjectModal from "../modals/ProjectModal";
import { Project } from "../utils/ProjectTypes";
import { getBadgeIcon, getAbbreviatedBadge } from "../modals/BadgeIcons";
import { ALL_PROJECTS } from "../data";

const Projects: NextPage = () => {
  const { theme } = useTheme();
  const themeColors = THEMES[theme] ?? THEMES.dark;
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const handleNavigate = (direction: "prev" | "next") => {
    if (selectedProjectIndex === null) return;

    if (direction === "prev" && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    } else if (
      direction === "next" &&
      selectedProjectIndex < ALL_PROJECTS.length - 1
    ) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    }
  };

  const getBadgeColor = (badge: string) => {
    if (theme === "dark") {
      const badgeColors: Record<string, string> = {
        "SERVICE": "border-green-500 text-green-400 bg-green-500 bg-opacity-10",
        "API": "border-blue-500 text-blue-400 bg-blue-500 bg-opacity-10",
        "SYSTEM": "border-purple-500 text-purple-400 bg-purple-500 bg-opacity-10",
        "FULL-STACK PLATFORM": "border-pink-500 text-pink-400 bg-pink-500 bg-opacity-10",
        "FULL-STACK AI": "border-amber-500 text-amber-400 bg-amber-500 bg-opacity-10",
        "FULL-STACK": "border-cyan-500 text-cyan-400 bg-cyan-500 bg-opacity-10",
        "BLOCKCHAIN": "border-orange-500 text-orange-400 bg-orange-500 bg-opacity-10",
      };
      return badgeColors[badge] ?? "border-gray-500 text-gray-400 bg-gray-500 bg-opacity-10";
    } else {
      const badgeColors: Record<string, string> = {
        "SERVICE": "border-green-600 text-green-700 bg-green-50",
        "API": "border-blue-600 text-blue-700 bg-blue-50",
        "SYSTEM": "border-purple-600 text-purple-700 bg-purple-50",
        "FULL-STACK PLATFORM": "border-pink-600 text-pink-700 bg-pink-50",
        "FULL-STACK AI": "border-amber-600 text-amber-700 bg-amber-50",
        "FULL-STACK": "border-cyan-600 text-cyan-700 bg-cyan-50",
        "BLOCKCHAIN": "border-orange-600 text-orange-700 bg-orange-50",
      };
      return badgeColors[badge] ?? "border-gray-600 text-gray-700 bg-gray-50";
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
            {ALL_PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className={`${panelBgClass} border rounded-lg overflow-hidden transition-all duration-200 ${panelHoverClass} relative`}
              >
                {/* Award Badge - Top Right Corner */}
                {project.awards && (
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`text-3xl drop-shadow-lg ${
                        theme === "dark"
                          ? "bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30"
                          : "bg-yellow-100 border border-yellow-300"
                      } rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform`}
                      title={project.awards}
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
                    {/* Responsive Badge */}
                    <div
                      className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-1 text-xs font-bold uppercase tracking-widest border rounded ${getBadgeColor(
                        project.badge
                      )} flex-shrink-0 group relative`}
                      title={project.badge}
                    >
                      {(() => {
                        const IconComponent = getBadgeIcon(project.badge);
                        return (
                          <IconComponent
                            size={16}
                            className="flex-shrink-0"
                          />
                        );
                      })()}

                      <span className="hidden sm:inline whitespace-nowrap">
                        {getAbbreviatedBadge(project.badge)}
                      </span>

                      {/* Mobile Tooltip */}
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
                      onClick={() => setSelectedProjectIndex(index)}
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
          project={ALL_PROJECTS[selectedProjectIndex]}
          isOpen={selectedProjectIndex !== null}
          onClose={() => setSelectedProjectIndex(null)}
          onNavigate={handleNavigate}
          hasPrevious={selectedProjectIndex > 0}
          hasNext={selectedProjectIndex < ALL_PROJECTS.length - 1}
        />
      )}
    </>
  );
};

export default Projects;