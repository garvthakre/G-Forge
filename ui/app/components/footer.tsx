"use client";
import { NextPage } from "next";

const Footer: NextPage = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "GitHub", href: "https://github.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Email", href: "mailto:garv@example.com" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 border-t border-blue-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                GARV THAKRE
              </span>
            </div>
            <p className="text-xs text-gray-500 text-center md:text-left">
              Backend engineer • API architect • Systems builder
            </p>
          </div>

          {/* Center: Quick Links */}
          <nav className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
              >
                {link.name}
                <div className="h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 w-0 group-hover:w-full transition-all duration-300 mt-0.5"></div>
              </a>
            ))}
          </nav>

          {/* Right: Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border border-green-500/30 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-green-400">ACTIVE</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-6"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
          <div className="flex gap-4">
            <span>© {currentYear}</span>
            <span>React · Tailwind · Next.js</span>
          </div>
          <span className="text-gray-600">v1.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
