"use client";
import { NextPage } from "next";
import { useTheme } from "@/app/context/ThemeContext";
import { THEMES } from "@/app/utils/themes";

const Footer: NextPage = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const themeColors = THEMES[theme];

  const links = [
    { name: "GitHub", href: "https://github.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Email", href: "mailto:garv@example.com" },
  ];

  const footerBgClass =
    theme === "dark" ? "from-gray-900 to-gray-950" : "from-gray-100 to-white";
  const borderClass =
    theme === "dark" ? "border-blue-900/30" : "border-gray-300";
  const gradientLineClass =
    theme === "dark" ? "via-blue-500/30" : "via-gray-300";

  return (
    <footer
      className={`relative bg-gradient-to-b ${footerBgClass} border-t ${borderClass} backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Top accent line */}
        <div
          className={`h-px bg-gradient-to-r from-transparent ${gradientLineClass} to-transparent mb-8`}
        ></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-xl font-bold bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-blue-400 to-cyan-400"
                    : "from-green-600 to-green-700"
                } bg-clip-text text-transparent`}
              >
                GARV THAKRE
              </span>
            </div>
            <p
              className={`text-xs ${themeColors.text.muted} text-center md:text-left`}
            >
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
                className={`text-sm ${themeColors.text.secondary} transition-colors duration-300 group`}
              >
                {theme === "dark" ? (
                  <>
                    <span className="hover:text-blue-400">{link.name}</span>
                    <div className="h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 w-0 group-hover:w-full transition-all duration-300 mt-0.5"></div>
                  </>
                ) : (
                  <>
                    <span className="hover:text-green-700 font-medium">
                      {link.name}
                    </span>
                    <div className="h-0.5 bg-green-600 w-0 group-hover:w-full transition-all duration-300 mt-0.5"></div>
                  </>
                )}
              </a>
            ))}
          </nav>

          {/* Right: Status */}
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
              }`}
            >
              ACTIVE
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`h-px bg-gradient-to-r from-transparent ${gradientLineClass} to-transparent my-6`}
        ></div>

        <div
          className={`flex flex-col sm:flex-row justify-between items-center gap-4 text-xs ${themeColors.text.muted} font-mono`}
        >
          <div className="flex gap-4">
            <span>© {currentYear}</span>
            <span>React · Tailwind · Next.js</span>
          </div>
          <span
            className={theme === "dark" ? "text-gray-600" : "text-gray-500"}
          >
            v1.0
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
