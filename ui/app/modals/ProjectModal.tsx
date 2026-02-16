"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../utils/themes";
import { Project } from "../utils/ProjectTypes";
import { getBadgeIcon, getAbbreviatedBadge } from "./BadgeIcons";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (direction: "prev" | "next") => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

type TabType = "overview" | "architecture" | "api";

// ─── EndpointCard Component ────────────────────────────────────────────────
interface EndpointCardProps {
  endpoint: any;
  theme: string;
  themeColors: any;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ endpoint, theme, themeColors }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMethodMeta = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":    return { bg: "bg-emerald-500/15 border-emerald-500/60 text-emerald-400", dot: "bg-emerald-400" };
      case "POST":   return { bg: "bg-blue-500/15 border-blue-500/60 text-blue-400", dot: "bg-blue-400" };
      case "PUT":    return { bg: "bg-amber-500/15 border-amber-500/60 text-amber-400", dot: "bg-amber-400" };
      case "PATCH":  return { bg: "bg-purple-500/15 border-purple-500/60 text-purple-400", dot: "bg-purple-400" };
      case "DELETE": return { bg: "bg-red-500/15 border-red-500/60 text-red-400", dot: "bg-red-400" };
      case "GRPC":   return { bg: "bg-cyan-500/15 border-cyan-500/60 text-cyan-400", dot: "bg-cyan-400" };
      case "FUNCTION": return { bg: "bg-pink-500/15 border-pink-500/60 text-pink-400", dot: "bg-pink-400" };
      default:       return { bg: "bg-gray-500/15 border-gray-500/60 text-gray-400", dot: "bg-gray-400" };
    }
  };

  const methodMeta = getMethodMeta(endpoint.method);
  const panelBg = theme === "dark" ? "bg-gray-800/60 border-gray-700/80" : "bg-white border-gray-200";
  const expandedBg = theme === "dark" ? "bg-gray-900/60" : "bg-gray-50";

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-200 ${panelBg} ${isExpanded ? "shadow-lg" : ""}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-3.5 flex items-center justify-between gap-3 transition-colors ${
          theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`px-2.5 py-1 text-[11px] font-black uppercase tracking-widest rounded-md border ${methodMeta.bg} flex-shrink-0 font-mono`}>
            {endpoint.method}
          </span>
          <code className={`font-mono text-sm ${themeColors.text.primary} truncate`}>{endpoint.path}</code>
          {endpoint.description && (
            <span className={`hidden lg:block text-xs ${themeColors.text.muted} truncate flex-1`}>
              — {endpoint.description}
            </span>
          )}
        </div>
        <span className={`text-base ${themeColors.text.muted} flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className={`px-4 pb-4 pt-3 border-t ${theme === "dark" ? "border-gray-700/60" : "border-gray-200"} ${expandedBg} space-y-4`}>
          
          {endpoint.description && (
            <p className={`text-sm ${themeColors.text.secondary} leading-relaxed`}>{endpoint.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {endpoint.requestBody && (
              <div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${themeColors.text.muted} mb-2 flex items-center gap-1.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
                  Request Body
                </div>
                <div className={`p-3 rounded-lg font-mono text-xs overflow-x-auto ${theme === "dark" ? "bg-gray-950 text-gray-300" : "bg-gray-900 text-gray-200"}`}>
                  <pre className="whitespace-pre-wrap break-all">{JSON.stringify(endpoint.requestBody, null, 2)}</pre>
                </div>
              </div>
            )}

            {endpoint.response && (
              <div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${themeColors.text.muted} mb-2 flex items-center gap-1.5`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                    endpoint.response.status === 200 || endpoint.response.status === 201 ? "bg-emerald-400" : "bg-red-400"
                  }`}></span>
                  Response {endpoint.response.status}
                </div>
                <div className={`p-3 rounded-lg font-mono text-xs overflow-x-auto ${theme === "dark" ? "bg-gray-950 text-gray-300" : "bg-gray-900 text-gray-200"}`}>
                  <pre className="whitespace-pre-wrap break-all">
                    {typeof endpoint.response.body === "string"
                      ? endpoint.response.body
                      : JSON.stringify(endpoint.response.body, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {endpoint.queryParams && (
            <div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${themeColors.text.muted} mb-2 flex items-center gap-1.5`}>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"></span>
                Query Parameters
              </div>
              <div className={`p-3 rounded-lg font-mono text-xs ${theme === "dark" ? "bg-gray-950 text-gray-300" : "bg-gray-900 text-gray-200"}`}>
                <pre className="whitespace-pre-wrap break-all">{JSON.stringify(endpoint.queryParams, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* Tags Row */}
          <div className="flex flex-wrap gap-2">
            {endpoint.middleware && (
              <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border ${
                theme === "dark" ? "bg-purple-500/10 border-purple-500/40 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700"
              }`}>
                🛡️ <span className="font-mono">{endpoint.middleware}</span>
              </span>
            )}
            {endpoint.security && (
              <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border ${
                theme === "dark" ? "bg-amber-500/10 border-amber-500/40 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-700"
              }`}>
                ⚠️ {endpoint.security}
              </span>
            )}
            {endpoint.authorization && (
              <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border ${
                theme === "dark" ? "bg-red-500/10 border-red-500/40 text-red-300" : "bg-red-50 border-red-200 text-red-700"
              }`}>
                🔒 {endpoint.authorization}
              </span>
            )}
            {endpoint.realtime && (
              <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border ${
                theme === "dark" ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300" : "bg-cyan-50 border-cyan-200 text-cyan-700"
              }`}>
                ⚡ {endpoint.realtime}
              </span>
            )}
            {endpoint.validation && (
              <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border ${
                theme === "dark" ? "bg-blue-500/10 border-blue-500/40 text-blue-300" : "bg-blue-50 border-blue-200 text-blue-700"
              }`}>
                ✓ {endpoint.validation}
              </span>
            )}
            {endpoint.integration && (
              <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border ${
                theme === "dark" ? "bg-green-500/10 border-green-500/40 text-green-300" : "bg-green-50 border-green-200 text-green-700"
              }`}>
                🔗 {endpoint.integration}
              </span>
            )}
          </div>

          {(endpoint.logic || endpoint.notes || endpoint.handler) && (
            <div className={`text-xs ${themeColors.text.secondary} pl-3 border-l-2 ${
              theme === "dark" ? "border-cyan-500/50" : "border-green-400"
            } space-y-1`}>
              {endpoint.logic && <p>🧠 <span className="italic">{endpoint.logic}</span></p>}
              {endpoint.notes && <p>💡 <span className="italic">{endpoint.notes}</span></p>}
              {endpoint.handler && <p>🔧 <span className="italic">{endpoint.handler}</span></p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── RealtimeEventCard Component ───────────────────────────────────────────
const RealtimeEventCard: React.FC<{ event: any; theme: string; themeColors: any }> = ({ event, theme, themeColors }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isClientToServer = event.direction?.startsWith("Client");
  const dirBg = isClientToServer
    ? (theme === "dark" ? "bg-blue-500/15 border-blue-500/60 text-blue-400" : "bg-blue-50 border-blue-300 text-blue-700")
    : (theme === "dark" ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-400" : "bg-emerald-50 border-emerald-300 text-emerald-700");
  const panelBg = theme === "dark" ? "bg-gray-800/60 border-gray-700/80" : "bg-white border-gray-200";

  return (
    <div className={`rounded-xl border overflow-hidden ${panelBg}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-3.5 flex items-center justify-between gap-3 transition-colors ${
          theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${dirBg} flex-shrink-0`}>
            {event.direction}
          </span>
          <code className={`font-mono text-sm ${themeColors.text.primary} truncate`}>{event.event}</code>
        </div>
        <span className={`text-base ${themeColors.text.muted} flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>▾</span>
      </button>
      {isExpanded && (
        <div className={`px-4 pb-4 pt-3 border-t ${theme === "dark" ? "border-gray-700/60 bg-gray-900/60" : "border-gray-200 bg-gray-50"} space-y-3`}>
          <p className={`text-sm ${themeColors.text.secondary}`}>{event.description}</p>
          {event.payload && (
            <div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${themeColors.text.muted} mb-1.5`}>Payload</div>
              <div className={`p-3 rounded-lg font-mono text-xs ${theme === "dark" ? "bg-gray-950 text-gray-300" : "bg-gray-900 text-gray-200"}`}>
                <pre className="whitespace-pre-wrap break-all">
                  {typeof event.payload === "string" ? event.payload : JSON.stringify(event.payload, null, 2)}
                </pre>
              </div>
            </div>
          )}
          {event.handler && (
            <p className={`text-xs italic ${themeColors.text.secondary} pl-3 border-l-2 ${theme === "dark" ? "border-cyan-500/50" : "border-green-400"}`}>
              🔧 {event.handler}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Architecture Node Component ──────────────────────────────────────────
const ArchitectureCard: React.FC<{ label: string; value: string; theme: string; themeColors: any; index: number }> = ({
  label, value, theme, themeColors, index
}) => {
  const [isOpen, setIsOpen] = useState(index < 2);

  const icons: Record<string, string> = {
    "frontend": "🖥️", "backend": "⚙️", "database": "🗄️", "auth": "🔐",
    "real-time": "⚡", "payment": "💳", "cache": "🚀", "storage": "📦",
    "security": "🛡️", "deployment": "🐳", "queue": "📋", "api": "🌐",
    "service": "🔧", "data": "📊", "system": "🔄", "layer": "📐",
    "flow": "→", "communication": "📡", "design": "🏗️",
  };

  const getIcon = (l: string) => {
    const lower = l.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (lower.includes(key)) return icon;
    }
    return "◈";
  };

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-200 ${
      theme === "dark"
        ? `bg-gray-800/50 border-gray-700/60 ${isOpen ? "border-cyan-500/30" : ""}`
        : `bg-white border-gray-200 ${isOpen ? "border-green-400/60" : ""}`
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left transition-colors ${
          theme === "dark" ? "hover:bg-gray-700/40" : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{getIcon(label)}</span>
          <span className={`font-bold text-sm ${themeColors.text.primary} uppercase tracking-wide`}>{label}</span>
        </div>
        <span className={`text-base ${themeColors.text.muted} transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>
      {isOpen && (
        <div className={`px-4 pb-4 pt-1 border-t ${theme === "dark" ? "border-gray-700/40" : "border-gray-100"}`}>
          <p className={`text-sm ${themeColors.text.secondary} leading-relaxed`}>{value}</p>
        </div>
      )}
    </div>
  );
};

// ─── API Section Heading ──────────────────────────────────────────────────
const ApiSectionHeading: React.FC<{ emoji: string; title: string; count: number; theme: string; themeColors: any }> = ({
  emoji, title, count, theme, themeColors
}) => (
  <div className="flex items-center gap-3 mb-4">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
      theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-gray-100 border border-gray-200"
    }`}>{emoji}</div>
    <div>
      <h3 className={`text-base font-bold ${themeColors.text.primary}`}>{title}</h3>
      <span className={`text-xs ${themeColors.text.muted}`}>{count} endpoint{count !== 1 ? "s" : ""}</span>
    </div>
  </div>
);

// ─── Main ProjectModal Component ──────────────────────────────────────────
const ProjectModal: React.FC<ProjectModalProps> = ({
  project, isOpen, onClose, onNavigate, hasPrevious = false, hasNext = false,
}) => {
  const { theme } = useTheme();
  const themeColors = THEMES[theme];
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) setIsLightboxOpen(false);
        else onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isLightboxOpen, onClose]);

  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (isLightboxOpen && project.gallery && project.gallery.length > 1) {
        if (e.key === "ArrowLeft") { e.preventDefault(); setCurrentImageIndex(prev => prev === 0 ? project.gallery!.length - 1 : prev - 1); }
        else if (e.key === "ArrowRight") { e.preventDefault(); setCurrentImageIndex(prev => prev === project.gallery!.length - 1 ? 0 : prev + 1); }
      } else if (!isLightboxOpen && onNavigate) {
        if (e.key === "ArrowLeft" && hasPrevious) { e.preventDefault(); onNavigate("prev"); }
        else if (e.key === "ArrowRight" && hasNext) { e.preventDefault(); onNavigate("next"); }
      }
    };
    if (isOpen) document.addEventListener("keydown", handleArrowKeys);
    return () => document.removeEventListener("keydown", handleArrowKeys);
  }, [isOpen, isLightboxOpen, project.gallery, onNavigate, hasPrevious, hasNext]);

  useEffect(() => {
    if (isOpen) { setActiveTab("overview"); setCurrentImageIndex(0); setIsLightboxOpen(false); }
  }, [isOpen, project.id]);

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (isLightboxOpen && project.gallery && project.gallery.length > 1) {
      if (distance > minSwipeDistance) setCurrentImageIndex(prev => prev === project.gallery!.length - 1 ? 0 : prev + 1);
      if (distance < -minSwipeDistance) setCurrentImageIndex(prev => prev === 0 ? project.gallery!.length - 1 : prev - 1);
    }
  };

  if (!isOpen) return null;

  const modalBg = theme === "dark" ? "bg-gray-900/95" : "bg-white/95";
  const contentBg = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const tabActiveBg = theme === "dark" ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-green-100 border-green-600 text-green-800";
  const tabInactiveBg = theme === "dark" ? "bg-gray-700/50 border-gray-600 text-gray-400 hover:bg-gray-600/50" : "bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200";

  const getBadgeColor = (badge: string) => {
    if (theme === "dark") {
      const map: Record<string, string> = {
        "SERVICE": "border-green-500 text-green-400 bg-green-500/10",
        "API": "border-blue-500 text-blue-400 bg-blue-500/10",
        "SYSTEM": "border-purple-500 text-purple-400 bg-purple-500/10",
        "FULL-STACK PLATFORM": "border-pink-500 text-pink-400 bg-pink-500/10",
        "FULL-STACK AI": "border-amber-500 text-amber-400 bg-amber-500/10",
        "FULL-STACK": "border-cyan-500 text-cyan-400 bg-cyan-500/10",
        "BLOCKCHAIN": "border-orange-500 text-orange-400 bg-orange-500/10",
      };
      return map[badge] ?? "border-gray-500 text-gray-400 bg-gray-500/10";
    }
    return "border-green-600 text-green-700 bg-green-50";
  };

  const galleryImages = project.gallery || [];
  const hasGallery = galleryImages.length > 0;
  const api = project.apiDocumentation;

  // Collect all endpoint sections
  const endpointSections = api ? [
    { key: "authEndpoints",           emoji: "🔐", title: "Authentication" },
    { key: "documentEndpoints",       emoji: "📄", title: "Documents" },
    { key: "chatEndpoints",           emoji: "💬", title: "Chat Sessions" },
    { key: "queryEndpoints",          emoji: "🔍", title: "Query / RAG" },
    { key: "spaceEndpoints",          emoji: "🏠", title: "Collaborative Spaces" },
    { key: "messageEndpoints",        emoji: "✉️", title: "Messages" },
    { key: "postEndpoints",           emoji: "📝", title: "Posts & Feed" },
    { key: "commentEndpoints",        emoji: "💬", title: "Comments" },
    { key: "opportunityEndpoints",    emoji: "💼", title: "Opportunities" },
    { key: "paymentEndpoints",        emoji: "💳", title: "Payments" },
    { key: "adminEndpoints",          emoji: "👑", title: "Admin" },
    { key: "providerEndpoints",       emoji: "🏢", title: "Provider" },
    { key: "publicEndpoints",         emoji: "🌐", title: "Public" },
    { key: "queueEndpoints",          emoji: "📋", title: "Queue Operations" },
    { key: "internalOperations",      emoji: "⚙️", title: "Internal Functions" },
    { key: "diamondEndpoints",        emoji: "💎", title: "Diamond Supply Chain" },
    { key: "smartContractFunctions",  emoji: "⛓️", title: "Smart Contract Functions" },
    { key: "realtimeEvents",          emoji: "⚡", title: "WebSocket Events", isRealtime: true },
  ] : [];

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <div className={`absolute inset-0 ${modalBg}`} onClick={onClose}></div>

        {/* Desktop prev/next */}
        {hasPrevious && onNavigate && (
          <button onClick={() => onNavigate("prev")}
            className={`hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
              theme === "dark" ? "bg-gray-800 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900 shadow-lg shadow-cyan-500/20"
              : "bg-white border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white shadow-lg"}`}
          >←</button>
        )}
        {hasNext && onNavigate && (
          <button onClick={() => onNavigate("next")}
            className={`hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
              theme === "dark" ? "bg-gray-800 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900 shadow-lg shadow-cyan-500/20"
              : "bg-white border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white shadow-lg"}`}
          >→</button>
        )}

        {/* Modal Container */}
        <div className={`relative ${contentBg} w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-6xl sm:rounded-2xl shadow-2xl overflow-hidden border-0 sm:border-2 ${themeColors.border} flex flex-col`}
          style={{ animation: "slideUp 0.25s ease-out" }}>

          {/* Header */}
          <div className={`flex-shrink-0 ${contentBg} border-b ${themeColors.border} px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between backdrop-blur-sm z-20`}>
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 mr-2">
              <span className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest border rounded-lg ${getBadgeColor(project.badge)} flex-shrink-0`}>
                {(() => { const I = getBadgeIcon(project.badge); return <I size={14} className="sm:w-4 sm:h-4" />; })()}
                <span className="hidden xs:inline sm:hidden">{getAbbreviatedBadge(project.badge)}</span>
                <span className="hidden sm:inline">{project.badge}</span>
              </span>
              <h2 className={`text-base sm:text-xl font-bold ${themeColors.text.primary} truncate`}>{project.title}</h2>
            </div>
            <div className="flex md:hidden items-center gap-2 mr-2">
              {hasPrevious && onNavigate && (
                <button onClick={() => onNavigate("prev")} className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${theme === "dark" ? "bg-gray-700 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900" : "bg-gray-200 text-green-700 hover:bg-green-600 hover:text-white"}`}>←</button>
              )}
              {hasNext && onNavigate && (
                <button onClick={() => onNavigate("next")} className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${theme === "dark" ? "bg-gray-700 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900" : "bg-gray-200 text-green-700 hover:bg-green-600 hover:text-white"}`}>→</button>
              )}
            </div>
            <button onClick={onClose} className={`${themeColors.text.secondary} hover:${themeColors.text.primary} transition text-3xl sm:text-2xl font-bold w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0`}>×</button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Hero */}
            <div className="relative w-full h-48 sm:h-64 md:h-72 bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0 overflow-hidden">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="eager" />
              ) : project.demoVideo ? (
                <video src={project.demoVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className={`text-center ${themeColors.text.muted}`}><div className="text-6xl mb-4">🚀</div><div className="text-lg">Project Showcase</div></div>
                </div>
              )}
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none"></div>
              {project.awards && (
                <div className="absolute top-3 right-3">
                  <div className={`${theme === "dark" ? "bg-yellow-500/20 border-yellow-500/50" : "bg-yellow-100 border-yellow-400"} border-2 rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg`}>🏆</div>
                </div>
              )}
            </div>

            {/* Tab Navigation */}
            <div className={`${contentBg} border-b ${themeColors.border} px-4 sm:px-6 py-2.5 flex gap-2 overflow-x-auto hide-scrollbar flex-shrink-0`}>
              {[
                { id: "overview",      label: "Overview",        icon: "◉" },
                { id: "architecture",  label: "Architecture",     icon: "◈" },
                { id: "api",           label: "API & Endpoints",  icon: "◊" },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg border-2 transition whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 min-h-[40px] ${activeTab === tab.id ? tabActiveBg : tabInactiveBg}`}>
                  <span className="text-xs">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6">

              {/* ── OVERVIEW TAB ────────────────────── */}
              {activeTab === "overview" && (
                <div className="space-y-6 sm:space-y-8" style={{ animation: "fadeIn 0.2s ease-out" }}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-3`}>About</h3>
                        <p className={`${themeColors.text.secondary} leading-relaxed text-sm sm:text-base`}>{project.description}</p>
                      </div>

                      <div>
                        <h3 className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-3`}>Key Features</h3>
                        <ul className="space-y-2">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className={`${themeColors.text.secondary} flex items-start text-sm sm:text-base`}>
                              <span className={`${theme === "dark" ? "text-cyan-400" : "text-green-600"} mr-3 font-bold text-lg flex-shrink-0`}>✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Screenshot thumbnails */}
                      {hasGallery && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className={`text-base sm:text-lg font-bold ${themeColors.text.primary}`}>Screenshots</h3>
                            <button onClick={() => { setCurrentImageIndex(0); setIsLightboxOpen(true); }}
                              className={`text-xs sm:text-sm font-semibold ${theme === "dark" ? "text-cyan-400 hover:text-cyan-300" : "text-green-600 hover:text-green-700"} transition`}>
                              View all ({galleryImages.length}) →
                            </button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                            {galleryImages.slice(0, 6).map((img, idx) => (
                              <button key={idx} onClick={() => { setCurrentImageIndex(idx); setIsLightboxOpen(true); }}
                                className={`aspect-video rounded-xl overflow-hidden border-2 transition group ${theme === "dark" ? "border-gray-600 hover:border-cyan-500" : "border-gray-300 hover:border-green-600"}`}>
                                <div className="relative w-full h-full">
                                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.highlights && (
                        <div>
                          <h3 className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-3`}>Technical Highlights</h3>
                          <ul className="space-y-2">
                            {project.highlights.map((h, idx) => (
                              <li key={idx} className={`${themeColors.text.secondary} flex items-start text-sm sm:text-base`}>
                                <span className={`${theme === "dark" ? "text-blue-400" : "text-green-600"} mr-3 flex-shrink-0`}>→</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.userRoles && (
                        <div>
                          <h3 className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-3`}>User Roles</h3>
                          <div className="space-y-3">
                            {project.userRoles.map((role, idx) => (
                              <div key={idx} className={`p-4 rounded-xl border ${theme === "dark" ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                <p className={`${themeColors.text.secondary} text-sm`}>{role}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.awards && (
                        <div className={`p-4 sm:p-5 rounded-xl border-2 ${theme === "dark" ? "bg-yellow-500/10 border-yellow-500/40" : "bg-yellow-50 border-yellow-400"}`}>
                          <div className="flex items-center gap-3">
                            <span className="text-4xl">🏆</span>
                            <div>
                              <h4 className={`font-bold text-sm ${theme === "dark" ? "text-yellow-300" : "text-yellow-700"}`}>Award Winner</h4>
                              <p className={`text-xs ${theme === "dark" ? "text-yellow-200" : "text-yellow-600"}`}>{project.awards}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                      <div className={`p-4 sm:p-5 rounded-xl border ${theme === "dark" ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                        <h3 className={`text-xs font-bold ${themeColors.text.primary} mb-3 uppercase tracking-wide`}>Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-lg ${theme === "dark" ? "bg-gray-600 text-gray-200" : "bg-white text-gray-700 border border-gray-300"}`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.metrics && (
                        <div className={`p-4 sm:p-5 rounded-xl border ${theme === "dark" ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                          <h3 className={`text-xs font-bold ${themeColors.text.primary} mb-3 uppercase tracking-wide`}>Metrics</h3>
                          <div className="space-y-2.5">
                            {project.metrics.map((metric, idx) => (
                              <p key={idx} className={`text-xs ${theme === "dark" ? "text-cyan-300" : "text-green-700"} font-medium leading-relaxed`}>
                                • {metric}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── ARCHITECTURE TAB ──────────────────────── */}
              {activeTab === "architecture" && (
                <div className="space-y-6" style={{ animation: "fadeIn 0.2s ease-out" }}>
                  {project.architecture ? (
                    <>
                      {/* Visual flow header */}
                      <div className={`relative rounded-2xl overflow-hidden border ${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" : "bg-gradient-to-br from-slate-50 to-gray-100 border-gray-200"} p-6`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${theme === "dark" ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-300"}`}>🏗️</div>
                          <div>
                            <h3 className={`text-lg font-bold ${themeColors.text.primary}`}>System Architecture</h3>
                            <p className={`text-sm ${themeColors.text.muted}`}>
                              {Object.keys(project.architecture).length} components · Click to expand
                            </p>
                          </div>
                        </div>
                        {/* Tech stack pills */}
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 8).map((tech, i) => (
                            <span key={i} className={`px-3 py-1 text-xs rounded-full font-mono ${
                              theme === "dark" ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300" : "bg-green-50 border border-green-200 text-green-700"
                            }`}>{tech}</span>
                          ))}
                          {project.techStack.length > 8 && (
                            <span className={`px-3 py-1 text-xs rounded-full ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                              +{project.techStack.length - 8} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Architecture components */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(Array.isArray(project.architecture)
                          ? project.architecture.map((item, i) => [String(i), item] as [string, string])
                          : Object.entries(project.architecture)
                        ).map(([key, value], idx) => (
                          <ArchitectureCard
                            key={key}
                            label={key}
                            value={value as string}
                            theme={theme}
                            themeColors={themeColors}
                            index={idx}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className={`flex flex-col items-center justify-center py-20 ${themeColors.text.muted}`}>
                      <div className="text-6xl mb-4">📐</div>
                      <p className="text-base font-semibold">Architecture details not available</p>
                      <p className="text-sm mt-1">Check the project repository for diagrams</p>
                    </div>
                  )}
                </div>
              )}

              {/* ── API TAB ──────────────────────────────── */}
              {activeTab === "api" && (
                <div className="space-y-8" style={{ animation: "fadeIn 0.2s ease-out" }}>
                  {api ? (
                    <>
                      {/* Base URL */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl border ${theme === "dark" ? "bg-gray-800/60 border-gray-700" : "bg-blue-50 border-blue-200"}`}>
                        <div className="text-2xl">🌐</div>
                        <div>
                          <div className={`text-[10px] font-bold uppercase tracking-widest ${themeColors.text.muted} mb-0.5`}>Base URL</div>
                          <code className={`font-mono text-sm font-bold ${theme === "dark" ? "text-cyan-300" : "text-blue-700"}`}>{api.baseUrl}</code>
                        </div>
                      </div>

                      {/* Render all endpoint sections */}
                      {endpointSections.map(({ key, emoji, title, isRealtime }) => {
                        const endpoints = (api as any)[key];
                        if (!endpoints || !Array.isArray(endpoints) || endpoints.length === 0) return null;
                        return (
                          <div key={key}>
                            <ApiSectionHeading emoji={emoji} title={title} count={endpoints.length} theme={theme} themeColors={themeColors} />
                            <div className="space-y-2.5">
                              {endpoints.map((ep: any, idx: number) =>
                                isRealtime
                                  ? <RealtimeEventCard key={idx} event={ep} theme={theme} themeColors={themeColors} />
                                  : <EndpointCard key={idx} endpoint={ep} theme={theme} themeColors={themeColors} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="space-y-6">
                      {/* Fallback */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h3 className={`text-base font-bold ${themeColors.text.primary} mb-4`}>Key Endpoints</h3>
                          <div className="space-y-2 font-mono text-sm">
                            {[{ m: "GET", p: "/api/status", c: "text-emerald-400" }, { m: "POST", p: "/api/resource", c: "text-blue-400" }, { m: "PATCH", p: "/api/resource/:id", c: "text-purple-400" }, { m: "DELETE", p: "/api/resource/:id", c: "text-red-400" }].map((e, i) => (
                              <div key={i} className={`p-3.5 rounded-xl border ${theme === "dark" ? "bg-gray-700/40 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                                <span className={`${e.c} font-bold`}>{e.m}</span>{" "}
                                <span className={themeColors.text.secondary}>{e.p}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-base font-bold ${themeColors.text.primary} mb-4`}>Example Response</h3>
                          <div className={`p-4 rounded-xl border font-mono text-xs ${theme === "dark" ? "bg-gray-900 border-gray-700 text-gray-300" : "bg-gray-900 border-gray-700 text-gray-200"}`}>
                            <pre>{`{\n  "id": "123",\n  "status": "active",\n  "createdAt": "2025-01-15T10:00:00Z"\n}`}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={`flex-shrink-0 ${contentBg} border-t-2 ${themeColors.border} px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap gap-2 sm:gap-3`}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition text-center flex items-center justify-center gap-2 ${
                  theme === "dark" ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/40" : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg"
                }`}>🚀 Live Demo</a>
            )}
            {(project.githubUrl || project.github) && (
              <a href={project.githubUrl || project.github} target="_blank" rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl border-2 font-semibold text-xs sm:text-sm transition text-center flex items-center justify-center gap-2 ${
                  theme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}>📁 GitHub</a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl border-2 font-semibold text-xs sm:text-sm transition text-center flex items-center justify-center gap-2 ${
                  theme === "dark" ? "border-cyan-500 text-cyan-400 hover:bg-cyan-500/20" : "border-green-600 text-green-700 hover:bg-green-50"
                }`}>▶️ Demo</a>
            )}
            {project.links && Object.entries(project.links).map(([key, url]) => (
              <a key={key} href={url as string} target="_blank" rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 rounded-xl border-2 font-semibold text-xs sm:text-sm transition text-center flex items-center justify-center ${
                  theme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}>{key.charAt(0).toUpperCase() + key.slice(1)}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && hasGallery && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          style={{ animation: "fadeIn 0.2s ease-out" }}>
          <div className="flex items-center justify-between p-4 sm:p-6">
            <div className={`${themeColors.text.primary} font-semibold text-sm`}>{currentImageIndex + 1} / {galleryImages.length}</div>
            <button onClick={() => setIsLightboxOpen(false)} className="text-white text-3xl font-bold w-10 h-10 flex items-center justify-center">×</button>
          </div>
          <div className="flex-1 flex items-center justify-center px-4 sm:px-12 relative">
            <img src={galleryImages[currentImageIndex].url} alt={galleryImages[currentImageIndex].caption} className="max-w-full max-h-full object-contain" loading="lazy" />
            {galleryImages.length > 1 && (
              <>
                <button onClick={() => setCurrentImageIndex(p => p === 0 ? galleryImages.length - 1 : p - 1)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition text-xl min-w-[56px] min-h-[56px] flex items-center justify-center">←</button>
                <button onClick={() => setCurrentImageIndex(p => p === galleryImages.length - 1 ? 0 : p + 1)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition text-xl min-w-[56px] min-h-[56px] flex items-center justify-center">→</button>
              </>
            )}
          </div>
          <div className="p-4 sm:p-6 text-center">
            <p className="text-white text-sm">{galleryImages[currentImageIndex].caption}</p>
            <p className="text-gray-500 text-xs mt-1">Swipe or use arrow keys · ESC to close</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${theme === "dark" ? "#111827" : "#f9fafb"}; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${theme === "dark" ? "#374151" : "#d1d5db"}; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${theme === "dark" ? "#4b5563" : "#9ca3af"}; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
};

export default ProjectModal;