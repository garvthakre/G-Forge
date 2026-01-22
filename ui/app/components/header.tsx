"use client";

import React from "react";
import { useState } from "react";

const Header = () => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = ["HOME", "PROJECTS", "EXPERIENCE", "API LAB"];

  return (
    <header className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 border-b border-blue-900/30 backdrop-blur-sm">
      <div className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md group-hover:bg-blue-500/40 transition-all duration-300"></div>
            <span className="relative text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {`{}`}
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-lg text-gray-100 group-hover:text-blue-300 transition-colors duration-300">
              GARV THAKRE
            </span>
            <span className="text-xs text-gray-500 group-hover:text-cyan-400/70 transition-colors duration-300">
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
                <span className="text-sm font-semibold text-gray-400 hover:text-blue-300 cursor-pointer transition-colors duration-300">
                  {item}
                </span>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${
                    hoveredNav === item ? "w-full" : "w-0"
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border border-green-500/30 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-green-400 hidden sm:inline">
              ONLINE
            </span>
          </div>
          <button className="relative group px-4 py-2 text-sm font-semibold text-blue-300 border border-blue-500/50 rounded-lg hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">AUTH</span>
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    </header>
  );
};

export default Header;
