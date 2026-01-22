"use client";
import { NextPage } from "next";
import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/utils/themes";

interface Props {}

const Hero: NextPage<Props> = ({}) => {
  const { theme } = useTheme();
  const themeColors = THEMES[theme];

  const bgClass = theme === "dark" ? "bg-gray-950" : "bg-white";
  const panelBgClass =
    theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-gray-50 border-gray-300";

  return (
    <section className={`w-full ${bgClass} py-20 px-5`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column — Personal Introduction */}
          <div>
            <div
              className={`text-xs uppercase tracking-widest ${themeColors.text.muted} mb-4`}
            >
              Hello, I'm
            </div>

            <h1
              className={`text-6xl font-bold ${themeColors.text.primary} mb-3`}
            >
              GARV THAKRE
            </h1>

            <p className={`text-xl ${themeColors.text.secondary} mb-6`}>
              Software Engineer
            </p>

            <p
              className={`${themeColors.text.secondary} mb-10 leading-relaxed max-w-lg`}
            >
              I design scalable backend systems with a focus on performance,
              reliability, and clean architecture.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex gap-4">
              <button
                className={`px-6 py-2 transition font-medium text-sm ${themeColors.button.primary}`}
              >
                View Projects
              </button>
              <button
                className={`px-6 py-2 transition font-medium text-sm ${themeColors.button.secondary}`}
              >
                Open API Lab
              </button>
            </div>
          </div>

          {/* Right Column — Swagger-Inspired Info Panel */}
          <div className={`${panelBgClass} border rounded-lg p-8`}>
            <div
              className={`text-xs uppercase tracking-widest ${themeColors.text.muted} mb-6`}
            >
              Profile Summary
            </div>

            {/* Technical Focus Points */}
            <div className="mb-8">
              <div
                className={`text-sm ${themeColors.text.secondary} space-y-2`}
              >
                <div className="flex items-start">
                  <span
                    className={`${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    } mr-3`}
                  >
                    →
                  </span>
                  <span>APIs & System Design</span>
                </div>
                <div className="flex items-start">
                  <span
                    className={`${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    } mr-3`}
                  >
                    →
                  </span>
                  <span>Databases & Caching</span>
                </div>
                <div className="flex items-start">
                  <span
                    className={`${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    } mr-3`}
                  >
                    →
                  </span>
                  <span>Real-time & Async Systems</span>
                </div>
              </div>
            </div>

            {/* Base URL */}
            <div className={`mb-8 pb-8 border-b ${themeColors.border}`}></div>

            {/* Endpoint Buttons */}
            <div className="flex flex-col gap-3">
              <button
                className={`flex items-center space-x-2 px-4 py-2 border transition font-mono text-xs justify-center rounded ${
                  theme === "dark"
                    ? "border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900"
                    : "border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
                }`}
              >
                <span className="font-bold">GET</span>
                <span>/profile</span>
              </button>
              <button
                className={`px-4 py-2 border transition font-medium text-xs rounded ${themeColors.button.primary}`}
              >
                Open API Lab
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
