export const THEMES = {
  dark: {
    name: "dark",
    bg: {
      primary: "bg-gray-950",
      secondary: "bg-gray-900",
      tertiary: "bg-gray-800",
      hover: "hover:bg-gray-800",
    },
    text: {
      primary: "text-gray-100",
      secondary: "text-gray-400",
      muted: "text-gray-500",
    },
    border: "border-gray-800",
    accent: {
      primary: "border-blue-500/50 text-blue-300",
      bg: "bg-blue-500/10",
      hover: "hover:border-blue-400 hover:bg-blue-500/20",
    },
    button: {
      primary:
        "border border-blue-500/50 text-blue-300 hover:border-blue-400 hover:bg-blue-500/10",
      secondary:
        "border border-green-500/50 text-green-400 hover:border-green-400 hover:bg-green-500/10",
    },
    badge: {
      blue: "border-blue-500 text-blue-400 bg-blue-500 bg-opacity-10",
      green: "border-green-500 text-green-400 bg-green-500 bg-opacity-10",
      purple: "border-purple-500 text-purple-400 bg-purple-500 bg-opacity-10",
    },
  },
  swagger: {
    name: "swagger",
    bg: {
      primary: "bg-white",
      secondary: "bg-gray-50",
      tertiary: "bg-gray-100",
      hover: "hover:bg-gray-50",
    },
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
      muted: "text-gray-500",
    },
    border: "border-gray-300",
    accent: {
      primary: "border-green-600 text-green-700",
      bg: "bg-green-50",
      hover: "hover:border-green-700 hover:bg-green-100",
    },
    button: {
      primary:
        "border border-green-600 text-green-700 hover:bg-green-600 hover:text-white",
      secondary:
        "border border-green-600 text-green-700 hover:bg-green-50 hover:border-green-700",
    },
    badge: {
      blue: "border-green-600 text-green-700 bg-green-50",
      green: "border-green-600 text-green-700 bg-green-50",
      purple: "border-green-600 text-green-700 bg-green-50",
    },
  },
};

export type ThemeName = keyof typeof THEMES;
export type ThemeObject = (typeof THEMES)[ThemeName];
