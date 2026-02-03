"use client";
import { NextPage } from "next";
import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/utils/themes";

interface Props {}

const Hero: NextPage<Props> = ({}) => {
  const { theme } = useTheme();
  const themeColors = THEMES[theme] ?? THEMES.dark;

  const bgClass = theme === "dark" ? "bg-gray-950" : "bg-white";
  const panelBgClass =
    theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-gray-50 border-gray-300";

  return (
    <section
      className={`w-full ${bgClass} py-12 sm:py-16 md:py-20 px-4 sm:px-5 relative overflow-hidden`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column — Personal Introduction */}
          <div>
            <div
              className={`text-xs uppercase tracking-widest ${themeColors.text.muted} mb-4 font-semibold`}
            >
              Welcome to my portfolio
            </div>

            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight break-words`}
            >
              GARV THAKRE
            </h1>

            <p
              className={`text-xl sm:text-2xl font-bold ${themeColors.text.secondary} mb-2`}
            >
              Backend & Systems Architect
            </p>

            <p
              className={`${themeColors.text.secondary} mb-6 sm:mb-10 leading-relaxed max-w-lg text-base sm:text-lg`}
            >
              I design scalable backend systems with a focus on performance,
              reliability, and clean architecture. Specializing in distributed
              systems, APIs, and real-time technologies.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                className={`px-6 py-3 transition font-bold text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-950 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105`}
              >
                View Projects
              </button>
              <button
                className={`px-6 py-3 transition font-bold text-sm rounded-lg border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/30`}
              >
                Open API Lab
              </button>
            </div>
          </div>

          {/* Right Column — Swagger-Inspired Info Panel */}
          <div
            className={`${panelBgClass} border rounded-xl p-4 sm:p-6 md:p-8 backdrop-blur-sm`}
          >
            <div
              className={`text-xs uppercase tracking-widest ${themeColors.text.muted} mb-6 font-bold`}
            >
              ✨ Core Competencies
            </div>

            {/* Technical Focus Points */}
            <div className="mb-8">
              <div className={`text-sm space-y-3`}>
                <div className="flex items-start group">
                  <span
                    className={`${
                      theme === "dark" ? "text-cyan-400" : "text-emerald-600"
                    } mr-3 font-bold group-hover:translate-x-1 transition`}
                  >
                    ▸
                  </span>
                  <span className={themeColors.text.secondary}>
                    Scalable APIs & Microservices
                  </span>
                </div>
                <div className="flex items-start group">
                  <span
                    className={`${
                      theme === "dark" ? "text-cyan-400" : "text-emerald-600"
                    } mr-3 font-bold group-hover:translate-x-1 transition`}
                  >
                    ▸
                  </span>
                  <span className={themeColors.text.secondary}>
                    Database Design & Optimization
                  </span>
                </div>
                <div className="flex items-start group">
                  <span
                    className={`${
                      theme === "dark" ? "text-cyan-400" : "text-emerald-600"
                    } mr-3 font-bold group-hover:translate-x-1 transition`}
                  >
                    ▸
                  </span>
                  <span className={themeColors.text.secondary}>
                    Real-time & Async Systems
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={`mb-8 pb-8 border-b ${themeColors.border}`}></div>

            {/* Endpoint Buttons */}
            <div className="flex flex-col gap-3">
              <button
                className={`flex items-center space-x-2 px-4 py-3 border-2 transition font-mono text-xs justify-center rounded-lg ${
                  theme === "dark"
                    ? "border-emerald-500 text-emerald-400 hover:bg-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30"
                    : "border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
                }`}
              >
                <span className="font-bold">GET</span>
                <span>/resume</span>
              </button>
              <button
                className={`px-4 py-3 border-2 transition font-bold text-xs rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/30`}
              >
                Explore API Lab
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
