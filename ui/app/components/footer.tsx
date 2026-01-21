"use client";
import { NextPage } from "next";

const Footer: NextPage = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = "2026-01-21";

  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Zone 1: Portfolio Info */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Portfolio Info
            </div>
            <h3 className="text-lg font-bold text-white mb-2">GARV THAKRE</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Backend engineer focused on scalable systems, APIs, and
              production-grade infrastructure.
            </p>
            <div className="text-xs text-gray-500 font-mono">
              Portfolio v1.0
            </div>
          </div>

          {/* Zone 2: Quick Links */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Navigation
            </div>
            <nav className="space-y-2">
              <a
                href="#projects"
                className="text-sm text-gray-300 hover:text-blue-400 transition font-mono"
              >
                /projects
              </a>
              <a
                href="#experience"
                className="text-sm text-gray-300 hover:text-blue-400 transition font-mono"
              >
                /experience
              </a>
              <a
                href="#credentials"
                className="text-sm text-gray-300 hover:text-blue-400 transition font-mono"
              >
                /credentials
              </a>
              <a
                href="#contact"
                className="text-sm text-gray-300 hover:text-blue-400 transition font-mono"
              >
                /contact
              </a>
            </nav>
          </div>

          {/* Zone 3: Maintainer & Contact */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              Maintainer
            </div>
            <div className="mb-4">
              <div className="text-sm font-bold text-white mb-1">
                GARV THAKRE
              </div>
              <div className="text-xs text-gray-400">Backend Engineer</div>
            </div>
            <div className="mb-3">
              <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Contact
              </div>
              <a
                href="mailto:garv@example.com"
                className="text-sm text-gray-300 hover:text-green-400 transition"
              >
                garv@example.com
              </a>
            </div>
            <div className="text-xs font-mono text-gray-500 mt-3">
              <span className="text-blue-400">POST</span> /contact
            </div>
          </div>

          {/* Zone 4: Social & Code */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              External Links
            </div>
            <nav className="space-y-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-green-400 transition"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-blue-400 transition"
              >
                LinkedIn
              </a>
              <a
                href="https://blog.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-purple-400 transition"
              >
                Blog
              </a>
              <a
                href="https://api.example.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-yellow-400 transition"
              >
                API Docs
              </a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Zone 5: System Metadata (Bottom Bar) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-500 font-mono">
          <div className="flex flex-col md:flex-row gap-4">
            <span>© {currentYear} GARV</span>
            <span className="hidden md:inline">—</span>
            <span>Built with React · Tailwind · Next.js</span>
            <span className="hidden md:inline">—</span>
            <span>MIT License</span>
          </div>
          <div className="text-gray-600">Last updated: {lastUpdated}</div>
        </div>
      </div>

      {/* Optional Status Bar */}
      <div className="bg-gray-900 border-t border-gray-800 px-5 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span>System operational</span>
          </div>
          <div className="text-gray-600">Portfolio API v1.0</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
