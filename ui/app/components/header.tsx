"use client";

import React from "react";
import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/utils/themes";

const Header = () => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const themeColors = THEMES[theme] ?? THEMES.dark;

  const navItems = ["HOME", "PROJECTS", "EXPERIENCE", "API LAB"];

  const handleNavClick = (item: string) => {
    const sectionId = item.toLowerCase().replace(" ", "-");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headerBgClass =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 border-blue-900/30"
      : "bg-white border-gray-300";

  const headerBorderClass =
    theme === "dark" ? "via-blue-500/30" : "via-gray-300";
  const accentColor = theme === "dark" ? "text-blue-300" : "text-green-700";
  const accentGradient =
    theme === "dark"
      ? "from-blue-400 to-cyan-400"
      : "from-green-600 to-green-700";
  const accentUnderline =
    theme === "dark"
      ? "from-blue-400 to-cyan-400"
      : "from-green-600 to-green-700";

  return (
    <header className={`relative ${headerBgClass} backdrop-blur-sm border-b`}>
      <div className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div
              className={`absolute inset-0 ${
                theme === "dark" ? "bg-blue-500/20" : "bg-green-200/30"
              } rounded-lg blur-md ${
                theme === "dark"
                  ? "group-hover:bg-blue-500/40"
                  : "group-hover:bg-green-200/50"
              } transition-all duration-300`}
            ></div>
            <span
              className={`relative text-2xl font-bold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}
            >
              {`{}`}
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span
              className={`font-bold text-lg ${themeColors.text.primary} group-hover:${accentColor} transition-colors duration-300`}
            >
              GARV THAKRE
            </span>
            <span
              className={`text-xs ${themeColors.text.muted} group-hover:text-green-600 transition-colors duration-300`}
            >
              Developer
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li
                key={item}
                onMouseEnter={() => setHoveredNav(item)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative group"
              >
                <span
                  onClick={() => handleNavClick(item)}
                  className={`text-sm font-semibold ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-blue-300"
                      : "text-gray-600 hover:text-green-700"
                  } cursor-pointer transition-colors duration-300`}
                >
                  {item}
                </span>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${accentUnderline} transition-all duration-300 ${
                    hoveredNav === item ? "w-full" : "w-0"
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 ${
              theme === "dark"
                ? "bg-gray-800/50 border-green-500/30"
                : "bg-green-50 border-green-300"
            } border rounded-lg`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                theme === "dark" ? "bg-green-400" : "bg-green-600"
              } animate-pulse`}
            ></span>
            <span
              className={`text-xs font-semibold ${
                theme === "dark" ? "text-green-400" : "text-green-700"
              } hidden sm:inline`}
            >
              ONLINE
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative group px-3 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
              theme === "dark"
                ? "border border-purple-500/50 text-purple-300 hover:border-purple-400 hover:bg-purple-500/10"
                : "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
            }`}
            title={`Switch to ${theme === "dark" ? "original" : "Dark"} theme`}
          >
            {theme === "dark" ? "🟢 ORIGINAL" : "🌙 DARK"}
          </button>

          <button
            className={`relative group px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              theme === "dark"
                ? "border border-blue-500/50 text-blue-300 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                : "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
            }`}
          >
            <div
              className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === "dark" ? "bg-blue-500/10" : "bg-green-600/20"
              }`}
            ></div>
            <span className="relative">AUTH</span>
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`h-px bg-gradient-to-r from-transparent ${headerBorderClass} to-transparent`}
      ></div>
    </header>
  );
};

export default Header;
