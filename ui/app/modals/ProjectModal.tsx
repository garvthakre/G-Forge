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

// EndpointCard Component
interface EndpointCardProps {
  endpoint: any;
  theme: string;
  themeColors: any;
}

const EndpointCard: React.FC<EndpointCardProps> = ({
  endpoint,
  theme,
  themeColors,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return theme === "dark"
          ? "text-green-400 border-green-500"
          : "text-green-600 border-green-500";
      case "POST":
        return theme === "dark"
          ? "text-blue-400 border-blue-500"
          : "text-blue-600 border-blue-500";
      case "PUT":
        return theme === "dark"
          ? "text-orange-400 border-orange-500"
          : "text-orange-600 border-orange-500";
      case "PATCH":
        return theme === "dark"
          ? "text-purple-400 border-purple-500"
          : "text-purple-600 border-purple-500";
      case "DELETE":
        return theme === "dark"
          ? "text-red-400 border-red-500"
          : "text-red-600 border-red-500";
      default:
        return theme === "dark"
          ? "text-gray-400 border-gray-500"
          : "text-gray-600 border-gray-500";
    }
  };

  return (
    <div
      className={`rounded-lg border overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-300"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-4 flex items-center justify-between transition ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase rounded border-2 ${getMethodColor(
              endpoint.method
            )} flex-shrink-0`}
          >
            {endpoint.method}
          </span>
          <code
            className={`font-mono text-sm ${themeColors.text.primary} truncate`}
          >
            {endpoint.path}
          </code>
        </div>
        <span
          className={`text-xl ${themeColors.text.secondary} flex-shrink-0 ml-2`}
        >
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          className={`p-4 border-t space-y-4 ${
            theme === "dark"
              ? "border-gray-700 bg-gray-750"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          {/* Description */}
          {endpoint.description && (
            <div>
              <h4
                className={`text-xs font-bold ${themeColors.text.muted} uppercase mb-2`}
              >
                Description
              </h4>
              <p className={`text-sm ${themeColors.text.secondary}`}>
                {endpoint.description}
              </p>
            </div>
          )}

          {/* Request Body */}
          {endpoint.requestBody && (
            <div>
              <h4
                className={`text-xs font-bold ${themeColors.text.muted} uppercase mb-2`}
              >
                Request Body
              </h4>
              <div
                className={`p-3 rounded font-mono text-xs overflow-x-auto ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-300"
                    : "bg-gray-900 text-gray-200"
                }`}
              >
                <pre className="whitespace-pre-wrap break-all">
                  {JSON.stringify(endpoint.requestBody, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Query Params */}
          {endpoint.queryParams && (
            <div>
              <h4
                className={`text-xs font-bold ${themeColors.text.muted} uppercase mb-2`}
              >
                Query Parameters
              </h4>
              <div
                className={`p-3 rounded font-mono text-xs overflow-x-auto ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-300"
                    : "bg-gray-900 text-gray-200"
                }`}
              >
                <pre className="whitespace-pre-wrap break-all">
                  {JSON.stringify(endpoint.queryParams, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Response */}
          {endpoint.response && (
            <div>
              <h4
                className={`text-xs font-bold ${themeColors.text.muted} uppercase mb-2`}
              >
                Response
              </h4>
              <div
                className={`p-3 rounded space-y-2 ${
                  theme === "dark" ? "bg-gray-900" : "bg-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded ${
                      endpoint.response.status === 200 ||
                      endpoint.response.status === 201
                        ? "bg-green-500 bg-opacity-20 text-green-400"
                        : "bg-red-500 bg-opacity-20 text-red-400"
                    }`}
                  >
                    {endpoint.response.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {endpoint.response.status === 200
                      ? "OK"
                      : endpoint.response.status === 201
                      ? "Created"
                      : "Error"}
                  </span>
                </div>
                {endpoint.response.body && (
                  <div className="font-mono text-xs text-gray-300 overflow-x-auto">
                    <pre className="whitespace-pre-wrap break-all">
                      {typeof endpoint.response.body === "string"
                        ? endpoint.response.body
                        : JSON.stringify(endpoint.response.body, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Middleware */}
          {endpoint.middleware && (
            <div
              className={`flex items-start gap-2 p-3 rounded border ${
                theme === "dark"
                  ? "bg-purple-500 bg-opacity-10 border-purple-500 border-opacity-30"
                  : "bg-purple-50 border-purple-200"
              }`}
            >
              <span className="text-lg">🛡️</span>
              <div>
                <h4
                  className={`text-xs font-bold uppercase mb-1 ${
                    theme === "dark" ? "text-purple-300" : "text-purple-700"
                  }`}
                >
                  Middleware
                </h4>
                <code
                  className={`text-xs ${
                    theme === "dark" ? "text-purple-200" : "text-purple-600"
                  }`}
                >
                  {endpoint.middleware}
                </code>
              </div>
            </div>
          )}

          {/* Security */}
          {endpoint.security && (
            <div
              className={`flex items-start gap-2 p-3 rounded border ${
                theme === "dark"
                  ? "bg-yellow-500 bg-opacity-10 border-yellow-500 border-opacity-30"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <span className="text-lg">⚠️</span>
              <div>
                <h4
                  className={`text-xs font-bold uppercase mb-1 ${
                    theme === "dark" ? "text-yellow-300" : "text-yellow-700"
                  }`}
                >
                  Security
                </h4>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-yellow-200" : "text-yellow-600"
                  }`}
                >
                  {endpoint.security}
                </p>
              </div>
            </div>
          )}

          {/* Authorization */}
          {endpoint.authorization && (
            <div
              className={`flex items-start gap-2 p-3 rounded border ${
                theme === "dark"
                  ? "bg-red-500 bg-opacity-10 border-red-500 border-opacity-30"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span className="text-lg">🔒</span>
              <div>
                <h4
                  className={`text-xs font-bold uppercase mb-1 ${
                    theme === "dark" ? "text-red-300" : "text-red-700"
                  }`}
                >
                  Authorization
                </h4>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-red-200" : "text-red-600"
                  }`}
                >
                  {endpoint.authorization}
                </p>
              </div>
            </div>
          )}

          {/* Additional Info Tags */}
          <div className="flex flex-wrap gap-2">
            {endpoint.realtime && (
              <span
                className={`px-2 py-1 text-xs rounded border ${
                  theme === "dark"
                    ? "bg-cyan-500 bg-opacity-10 border-cyan-500 text-cyan-300"
                    : "bg-cyan-50 border-cyan-300 text-cyan-700"
                }`}
              >
                ⚡ {endpoint.realtime}
              </span>
            )}
            {endpoint.validation && (
              <span
                className={`px-2 py-1 text-xs rounded border ${
                  theme === "dark"
                    ? "bg-blue-500 bg-opacity-10 border-blue-500 text-blue-300"
                    : "bg-blue-50 border-blue-300 text-blue-700"
                }`}
              >
                ✓ {endpoint.validation}
              </span>
            )}
            {endpoint.integration && (
              <span
                className={`px-2 py-1 text-xs rounded border ${
                  theme === "dark"
                    ? "bg-green-500 bg-opacity-10 border-green-500 text-green-300"
                    : "bg-green-50 border-green-300 text-green-700"
                }`}
              >
                🔗 {endpoint.integration}
              </span>
            )}
            {endpoint.logic && (
              <span
                className={`px-2 py-1 text-xs rounded border ${
                  theme === "dark"
                    ? "bg-purple-500 bg-opacity-10 border-purple-500 text-purple-300"
                    : "bg-purple-50 border-purple-300 text-purple-700"
                }`}
              >
                🧠 {endpoint.logic}
              </span>
            )}
          </div>

          {/* Notes */}
          {endpoint.notes && (
            <div
              className={`text-xs ${themeColors.text.secondary} italic pl-3 border-l-2 ${
                theme === "dark" ? "border-cyan-500" : "border-green-500"
              }`}
            >
              💡 {endpoint.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// RealtimeEventCard Component
interface RealtimeEventCardProps {
  event: any;
  theme: string;
  themeColors: any;
}

const RealtimeEventCard: React.FC<RealtimeEventCardProps> = ({
  event,
  theme,
  themeColors,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDirectionColor = (direction: string) => {
    if (direction.includes("→")) {
      if (direction.startsWith("Client")) {
        return theme === "dark"
          ? "text-blue-400 border-blue-500"
          : "text-blue-600 border-blue-500";
      } else {
        return theme === "dark"
          ? "text-green-400 border-green-500"
          : "text-green-600 border-green-500";
      }
    }
    return theme === "dark"
      ? "text-gray-400 border-gray-500"
      : "text-gray-600 border-gray-500";
  };

  return (
    <div
      className={`rounded-lg border overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-300"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-4 flex items-center justify-between transition ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase rounded border-2 ${getDirectionColor(
              event.direction
            )} flex-shrink-0`}
          >
            {event.direction}
          </span>
          <code
            className={`font-mono text-sm ${themeColors.text.primary} truncate`}
          >
            {event.event}
          </code>
        </div>
        <span
          className={`text-xl ${themeColors.text.secondary} flex-shrink-0 ml-2`}
        >
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          className={`p-4 border-t space-y-4 ${
            theme === "dark"
              ? "border-gray-700 bg-gray-750"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          {/* Description */}
          <div>
            <h4
              className={`text-xs font-bold ${themeColors.text.muted} uppercase mb-2`}
            >
              Description
            </h4>
            <p className={`text-sm ${themeColors.text.secondary}`}>
              {event.description}
            </p>
          </div>

          {/* Payload */}
          {event.payload && (
            <div>
              <h4
                className={`text-xs font-bold ${themeColors.text.muted} uppercase mb-2`}
              >
                Payload
              </h4>
              <div
                className={`p-3 rounded font-mono text-xs overflow-x-auto ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-300"
                    : "bg-gray-900 text-gray-200"
                }`}
              >
                <pre className="whitespace-pre-wrap break-all">
                  {typeof event.payload === "string"
                    ? event.payload
                    : JSON.stringify(event.payload, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Handler Logic */}
          {event.handler && (
            <div
              className={`text-xs ${themeColors.text.secondary} italic pl-3 border-l-2 ${
                theme === "dark" ? "border-cyan-500" : "border-green-500"
              }`}
            >
              🔧 Handler: {event.handler}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onNavigate,
  hasPrevious = false,
  hasNext = false,
}) => {
  const { theme } = useTheme();
  const themeColors = THEMES[theme];
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
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

  // Handle arrow keys for image navigation (only in lightbox)
  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (isLightboxOpen && project.gallery && project.gallery.length > 1) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentImageIndex((prev) =>
            prev === 0 ? project.gallery!.length - 1 : prev - 1
          );
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setCurrentImageIndex((prev) =>
            prev === project.gallery!.length - 1 ? 0 : prev + 1
          );
        }
      } else if (!isLightboxOpen && onNavigate) {
        // Navigate between projects when NOT in lightbox
        if (e.key === "ArrowLeft" && hasPrevious) {
          e.preventDefault();
          onNavigate("prev");
        } else if (e.key === "ArrowRight" && hasNext) {
          e.preventDefault();
          onNavigate("next");
        }
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleArrowKeys);
    }
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, [
    isOpen,
    isLightboxOpen,
    project.gallery,
    onNavigate,
    hasPrevious,
    hasNext,
  ]);

  // Reset to overview tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab("overview");
      setCurrentImageIndex(0);
      setIsLightboxOpen(false);
    }
  }, [isOpen, project.id]); // Added project.id to reset when project changes

  // Touch handlers for swipe gesture
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLightboxOpen && project.gallery && project.gallery.length > 1) {
      if (isLeftSwipe) {
        // Swipe left - next image
        setCurrentImageIndex((prev) =>
          prev === project.gallery!.length - 1 ? 0 : prev + 1
        );
      }
      if (isRightSwipe) {
        // Swipe right - previous image
        setCurrentImageIndex((prev) =>
          prev === 0 ? project.gallery!.length - 1 : prev - 1
        );
      }
    }
  };

  if (!isOpen) return null;

  const modalBg =
    theme === "dark" ? "bg-gray-900 bg-opacity-95" : "bg-white bg-opacity-95";
  const contentBg =
    theme === "dark"
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";
  const tabActiveBg =
    theme === "dark"
      ? "bg-cyan-500 bg-opacity-20 border-cyan-500"
      : "bg-green-100 border-green-600";
  const tabInactiveBg =
    theme === "dark"
      ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
      : "bg-gray-100 border-gray-300 hover:bg-gray-200";

  const getBadgeColor = (badge: string) => {
    if (theme === "dark") {
      switch (badge) {
        case "SERVICE":
          return "border-green-500 text-green-400 bg-green-500 bg-opacity-10";
        case "API":
          return "border-blue-500 text-blue-400 bg-blue-500 bg-opacity-10";
        case "SYSTEM":
          return "border-purple-500 text-purple-400 bg-purple-500 bg-opacity-10";
        case "FULL-STACK PLATFORM":
          return "border-pink-500 text-pink-400 bg-pink-500 bg-opacity-10";
        case "FULL-STACK AI":
          return "border-amber-500 text-amber-400 bg-amber-500 bg-opacity-10";
        case "FULL-STACK":
          return "border-cyan-500 text-cyan-400 bg-cyan-500 bg-opacity-10";
        case "BLOCKCHAIN":
          return "border-orange-500 text-orange-400 bg-orange-500 bg-opacity-10";
        default:
          return "border-gray-500 text-gray-400 bg-gray-500 bg-opacity-10";
      }
    } else {
      return "border-green-600 text-green-700 bg-green-50";
    }
  };

  const galleryImages = project.gallery || [];
  const hasGallery = galleryImages.length > 0;

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 animate-fadeIn"
        style={{ backdropFilter: "blur(8px)" }}
      >
        {/* Backdrop */}
        <div className={`absolute inset-0 ${modalBg}`} onClick={onClose}></div>

        {/* Previous Project Button - Hidden on mobile, visible on desktop */}
        {hasPrevious && onNavigate && (
          <button
            onClick={() => onNavigate("prev")}
            className={`hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900 shadow-lg shadow-cyan-500/20"
                : "bg-white border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white shadow-lg"
            }`}
            aria-label="Previous project"
            title="Previous project (←)"
          >
            <span className="text-2xl">←</span>
          </button>
        )}

        {/* Next Project Button - Hidden on mobile, visible on desktop */}
        {hasNext && onNavigate && (
          <button
            onClick={() => onNavigate("next")}
            className={`hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900 shadow-lg shadow-cyan-500/20"
                : "bg-white border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white shadow-lg"
            }`}
            aria-label="Next project"
            title="Next project (→)"
          >
            <span className="text-2xl">→</span>
          </button>
        )}

        {/* Modal Container - Full screen on mobile, constrained on desktop */}
        <div
          className={`relative ${contentBg} w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-6xl sm:rounded-xl shadow-2xl overflow-hidden border-0 sm:border-2 ${themeColors.border} animate-slideUp flex flex-col`}
        >
          {/* Sticky Header */}
          <div
            className={`flex-shrink-0 ${contentBg} border-b ${themeColors.border} px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between backdrop-blur-sm z-20`}
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 mr-2">
              <span
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest border rounded ${getBadgeColor(
                  project.badge
                )} flex-shrink-0`}
              >
                {/* Icon */}
                {(() => {
                  const IconComponent = getBadgeIcon(project.badge);
                  return <IconComponent size={14} className="sm:w-4 sm:h-4" />;
                })()}

                {/* Full text in modal - abbreviated on small screens */}
                <span className="hidden xs:inline sm:hidden">
                  {getAbbreviatedBadge(project.badge)}
                </span>
                <span className="hidden sm:inline">{project.badge}</span>
              </span>
              <h2
                className={`text-base sm:text-xl font-bold ${themeColors.text.primary} truncate`}
              >
                {project.title}
              </h2>
            </div>

            {/* Mobile Navigation Buttons - Only on mobile */}
            <div className="flex md:hidden items-center gap-2 mr-2">
              {hasPrevious && onNavigate && (
                <button
                  onClick={() => onNavigate("prev")}
                  className={`w-8 h-8 flex items-center justify-center rounded transition ${
                    theme === "dark"
                      ? "bg-gray-700 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900"
                      : "bg-gray-200 text-green-700 hover:bg-green-600 hover:text-white"
                  }`}
                  aria-label="Previous project"
                >
                  ←
                </button>
              )}
              {hasNext && onNavigate && (
                <button
                  onClick={() => onNavigate("next")}
                  className={`w-8 h-8 flex items-center justify-center rounded transition ${
                    theme === "dark"
                      ? "bg-gray-700 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900"
                      : "bg-gray-200 text-green-700 hover:bg-green-600 hover:text-white"
                  }`}
                  aria-label="Next project"
                >
                  →
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className={`${themeColors.text.secondary} hover:${themeColors.text.primary} transition text-3xl sm:text-2xl font-bold w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0`}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Hero Image/Video Section */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : project.demoVideo ? (
                <video
                  src={project.demoVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className={`text-center ${themeColors.text.muted}`}>
                    <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">🚀</div>
                    <div className="text-sm sm:text-lg">Project Showcase</div>
                  </div>
                </div>
              )}
              {project.awards && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <div
                    className={`${
                      theme === "dark"
                        ? "bg-yellow-500 bg-opacity-20 border-yellow-500"
                        : "bg-yellow-100 border-yellow-400"
                    } border-2 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-2xl sm:text-4xl shadow-lg animate-bounce`}
                  >
                    🏆
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Navigation - Static (not sticky) */}
            <div
              className={`${contentBg} border-b ${themeColors.border} px-4 sm:px-6 py-2 sm:py-3 flex gap-2 overflow-x-auto hide-scrollbar flex-shrink-0`}
            >
              {[
                { id: "overview", label: "Overview" },
                { id: "architecture", label: "Architecture" },
                { id: "api", label: "API & Endpoints" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg border-2 transition whitespace-nowrap flex-shrink-0 min-h-[44px] sm:min-h-[36px] ${
                    activeTab === tab.id ? tabActiveBg : tabInactiveBg
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 min-h-[300px]">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                  {/* Main Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Description */}
                      <div>
                        <h3
                          className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-3`}
                        >
                          About This Project
                        </h3>
                        <p
                          className={`${themeColors.text.secondary} leading-relaxed text-sm sm:text-base`}
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3
                          className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-3`}
                        >
                          Key Features
                        </h3>
                        <ul className="space-y-2 sm:space-y-2.5">
                          {project.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className={`${themeColors.text.secondary} flex items-start text-sm sm:text-base`}
                            >
                              <span
                                className={`${
                                  theme === "dark"
                                    ? "text-cyan-400"
                                    : "text-green-600"
                                } mr-2 sm:mr-3 font-bold text-base sm:text-lg flex-shrink-0`}
                              >
                                ✓
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Inline Image Carousel - Only if gallery exists */}
                      {hasGallery && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3
                              className={`text-base sm:text-lg font-bold ${themeColors.text.primary}`}
                            >
                              Project Screenshots
                            </h3>
                            <button
                              onClick={() => {
                                setCurrentImageIndex(0);
                                setIsLightboxOpen(true);
                              }}
                              className={`text-xs sm:text-sm font-semibold ${
                                theme === "dark"
                                  ? "text-cyan-400 hover:text-cyan-300"
                                  : "text-green-600 hover:text-green-700"
                              } transition`}
                            >
                              View All ({galleryImages.length})
                            </button>
                          </div>

                          {/* Thumbnail Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                            {galleryImages.slice(0, 6).map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setCurrentImageIndex(idx);
                                  setIsLightboxOpen(true);
                                }}
                                className={`aspect-video rounded-lg overflow-hidden border-2 transition group ${
                                  theme === "dark"
                                    ? "border-gray-600 hover:border-cyan-500"
                                    : "border-gray-300 hover:border-green-600"
                                }`}
                              >
                                <div className="relative w-full h-full">
                                  <img
                                    src={img.url}
                                    alt={img.caption}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                  />
                                  {/* Overlay on hover */}
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                      🔍
                                    </span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Show more button if more than 6 images */}
                          {galleryImages.length > 6 && (
                            <button
                              onClick={() => {
                                setCurrentImageIndex(0);
                                setIsLightboxOpen(true);
                              }}
                              className={`mt-3 w-full py-3 rounded-lg border-2 font-semibold text-sm transition ${
                                theme === "dark"
                                  ? "border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:bg-opacity-20"
                                  : "border-green-600 text-green-700 hover:bg-green-50"
                              }`}
                            >
                              View All {galleryImages.length} Screenshots
                            </button>
                          )}
                        </div>
                      )}

                      {/* Technical Highlights */}
                      {project.highlights && (
                        <div>
                          <h3
                            className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-3`}
                          >
                            Technical Highlights
                          </h3>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight, idx) => (
                              <li
                                key={idx}
                                className={`${themeColors.text.secondary} flex items-start text-sm sm:text-base`}
                              >
                                <span
                                  className={`${
                                    theme === "dark"
                                      ? "text-blue-400"
                                      : "text-green-600"
                                  } mr-2 sm:mr-3 flex-shrink-0`}
                                >
                                  →
                                </span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* User Roles */}
                      {project.userRoles && (
                        <div>
                          <h3
                            className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-3`}
                          >
                            User Roles & Capabilities
                          </h3>
                          <div className="space-y-2 sm:space-y-3">
                            {project.userRoles.map((role, idx) => (
                              <div
                                key={idx}
                                className={`p-3 sm:p-4 rounded-lg border ${
                                  theme === "dark"
                                    ? "bg-gray-700 bg-opacity-30 border-gray-600"
                                    : "bg-gray-50 border-gray-300"
                                }`}
                              >
                                <p
                                  className={`${themeColors.text.secondary} text-sm sm:text-base`}
                                >
                                  {role}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Awards */}
                      {project.awards && (
                        <div
                          className={`p-4 sm:p-5 rounded-lg border-2 ${
                            theme === "dark"
                              ? "bg-yellow-500 bg-opacity-10 border-yellow-500"
                              : "bg-yellow-50 border-yellow-400"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-3xl sm:text-4xl">🏆</span>
                            <div>
                              <h4
                                className={`font-bold text-sm sm:text-base ${
                                  theme === "dark"
                                    ? "text-yellow-300"
                                    : "text-yellow-700"
                                }`}
                              >
                                Award Winner
                              </h4>
                              <p
                                className={`text-xs sm:text-sm ${
                                  theme === "dark"
                                    ? "text-yellow-200"
                                    : "text-yellow-600"
                                }`}
                              >
                                {project.awards}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-4 sm:space-y-6">
                      {/* Tech Stack */}
                      <div
                        className={`p-4 sm:p-5 rounded-lg border ${
                          theme === "dark"
                            ? "bg-gray-700 bg-opacity-30 border-gray-600"
                            : "bg-gray-50 border-gray-300"
                        }`}
                      >
                        <h3
                          className={`text-xs sm:text-sm font-bold ${themeColors.text.primary} mb-3 uppercase tracking-wide`}
                        >
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${
                                theme === "dark"
                                  ? "bg-gray-600 text-gray-200"
                                  : "bg-white text-gray-700 border border-gray-300"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      {project.metrics && (
                        <div
                          className={`p-4 sm:p-5 rounded-lg border ${
                            theme === "dark"
                              ? "bg-gray-700 bg-opacity-30 border-gray-600"
                              : "bg-gray-50 border-gray-300"
                          }`}
                        >
                          <h3
                            className={`text-xs sm:text-sm font-bold ${themeColors.text.primary} mb-3 uppercase tracking-wide`}
                          >
                            Impact & Metrics
                          </h3>
                          <div className="space-y-3 sm:space-y-4">
                            {project.metrics.map((metric, idx) => (
                              <div key={idx}>
                                <p
                                  className={`text-xs sm:text-sm ${
                                    theme === "dark"
                                      ? "text-cyan-300"
                                      : "text-green-700"
                                  } font-semibold`}
                                >
                                  {metric}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Architecture Tab */}
              {activeTab === "architecture" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Architecture Diagram Placeholder */}
                  <div
                    className={`w-full h-64 sm:h-96 rounded-lg border-2 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-100 border-gray-300"
                    } flex items-center justify-center`}
                  >
                    <div
                      className={`text-center ${themeColors.text.muted} p-4`}
                    >
                      <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">
                        📐
                      </div>
                      <div className="text-sm sm:text-lg font-semibold mb-2">
                        System Architecture
                      </div>
                      <div className="text-xs sm:text-sm">
                        Interactive diagram showing component relationships
                      </div>
                    </div>
                  </div>

                  {/* Architecture Details */}
                  {project.architecture && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {Array.isArray(project.architecture)
                        ? project.architecture.map((item, idx) => (
                            <div
                              key={idx}
                              className={`p-3 sm:p-4 rounded-lg border ${
                                theme === "dark"
                                  ? "bg-gray-700 bg-opacity-30 border-gray-600"
                                  : "bg-gray-50 border-gray-300"
                              }`}
                            >
                              <p
                                className={`${themeColors.text.secondary} text-sm sm:text-base`}
                              >
                                {item}
                              </p>
                            </div>
                          ))
                        : Object.entries(project.architecture).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className={`p-3 sm:p-4 rounded-lg border ${
                                  theme === "dark"
                                    ? "bg-gray-700 bg-opacity-30 border-gray-600"
                                    : "bg-gray-50 border-gray-300"
                                }`}
                              >
                                <h4
                                  className={`text-xs sm:text-sm font-bold ${themeColors.text.primary} mb-2 uppercase`}
                                >
                                  {key}
                                </h4>
                                <p
                                  className={`text-xs sm:text-sm ${themeColors.text.secondary}`}
                                >
                                  {value}
                                </p>
                              </div>
                            )
                          )}
                    </div>
                  )}
                </div>
              )}

              {/* API & Endpoints Tab */}
              {activeTab === "api" && project.apiDocumentation && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Base URL Section */}
                  <div
                    className={`p-4 rounded-lg border ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🌐</span>
                      <h3
                        className={`text-sm font-bold ${themeColors.text.primary} uppercase tracking-wide`}
                      >
                        Base URL
                      </h3>
                    </div>
                    <code
                      className={`font-mono text-sm ${
                        theme === "dark" ? "text-cyan-300" : "text-blue-700"
                      }`}
                    >
                      {project.apiDocumentation.baseUrl}
                    </code>
                  </div>

                  {/* Authentication Endpoints */}
                  {project.apiDocumentation.authEndpoints && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🔐</span>
                        <h3
                          className={`text-lg font-bold ${themeColors.text.primary}`}
                        >
                          Authentication & Authorization
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {project.apiDocumentation.authEndpoints.map(
                          (endpoint, idx) => (
                            <EndpointCard
                              key={idx}
                              endpoint={endpoint}
                              theme={theme}
                              themeColors={themeColors}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Post Endpoints */}
                  {project.apiDocumentation.postEndpoints && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">📝</span>
                        <h3
                          className={`text-lg font-bold ${themeColors.text.primary}`}
                        >
                          Posts & Social Feed
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {project.apiDocumentation.postEndpoints.map(
                          (endpoint, idx) => (
                            <EndpointCard
                              key={idx}
                              endpoint={endpoint}
                              theme={theme}
                              themeColors={themeColors}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Comment Endpoints */}
                  {project.apiDocumentation.commentEndpoints && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">💬</span>
                        <h3
                          className={`text-lg font-bold ${themeColors.text.primary}`}
                        >
                          Comments & Interactions
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {project.apiDocumentation.commentEndpoints.map(
                          (endpoint, idx) => (
                            <EndpointCard
                              key={idx}
                              endpoint={endpoint}
                              theme={theme}
                              themeColors={themeColors}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Opportunity Endpoints */}
                  {project.apiDocumentation.opportunityEndpoints && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">💼</span>
                        <h3
                          className={`text-lg font-bold ${themeColors.text.primary}`}
                        >
                          Economic Opportunities
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {project.apiDocumentation.opportunityEndpoints.map(
                          (endpoint, idx) => (
                            <EndpointCard
                              key={idx}
                              endpoint={endpoint}
                              theme={theme}
                              themeColors={themeColors}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Payment Endpoints */}
                  {project.apiDocumentation.paymentEndpoints && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">💳</span>
                        <h3
                          className={`text-lg font-bold ${themeColors.text.primary}`}
                        >
                          Payment Processing
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {project.apiDocumentation.paymentEndpoints.map(
                          (endpoint, idx) => (
                            <EndpointCard
                              key={idx}
                              endpoint={endpoint}
                              theme={theme}
                              themeColors={themeColors}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Real-time Events */}
                  {project.apiDocumentation.realtimeEvents && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">⚡</span>
                        <h3
                          className={`text-lg font-bold ${themeColors.text.primary}`}
                        >
                          Real-time WebSocket Events
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {project.apiDocumentation.realtimeEvents.map(
                          (event, idx) => (
                            <RealtimeEventCard
                              key={idx}
                              event={event}
                              theme={theme}
                              themeColors={themeColors}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Admin Endpoints */}
                  {project.apiDocumentation.adminEndpoints && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">👑</span>
                        <h3
                          className={`text-lg font-bold ${themeColors.text.primary}`}
                        >
                          Admin Dashboard
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {project.apiDocumentation.adminEndpoints.map(
                          (endpoint, idx) => (
                            <EndpointCard
                              key={idx}
                              endpoint={endpoint}
                              theme={theme}
                              themeColors={themeColors}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Fallback for projects without API documentation */}
              {activeTab === "api" && !project.apiDocumentation && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Key Endpoints */}
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-4`}
                      >
                        Key Endpoints
                      </h3>
                      <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                        {[
                          {
                            method: "GET",
                            path: "/api/status",
                            color: "green",
                          },
                          {
                            method: "POST",
                            path: "/api/resource",
                            color: "blue",
                          },
                          {
                            method: "PATCH",
                            path: "/api/resource/:id",
                            color: "purple",
                          },
                          {
                            method: "DELETE",
                            path: "/api/resource/:id",
                            color: "red",
                          },
                        ].map((endpoint, idx) => (
                          <div
                            key={idx}
                            className={`p-3 sm:p-4 rounded border ${
                              theme === "dark"
                                ? "bg-gray-700 border-gray-600"
                                : "bg-gray-50 border-gray-300"
                            }`}
                          >
                            <span
                              className={`${
                                endpoint.color === "green"
                                  ? "text-green-400"
                                  : endpoint.color === "blue"
                                  ? "text-blue-400"
                                  : endpoint.color === "purple"
                                  ? "text-purple-400"
                                  : "text-red-400"
                              } font-bold`}
                            >
                              {endpoint.method}
                            </span>{" "}
                            <span
                              className={`${themeColors.text.secondary} break-all`}
                            >
                              {endpoint.path}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Request/Response Example */}
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-4`}
                      >
                        Example Request
                      </h3>
                      <div
                        className={`p-3 sm:p-4 rounded-lg border font-mono text-xs ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-gray-300"
                            : "bg-gray-900 border-gray-700 text-gray-200"
                        } overflow-x-auto`}
                      >
                        <pre className="whitespace-pre-wrap break-all">{`{
  "name": "string",
  "description": "string",
  "status": "active"
}`}</pre>
                      </div>

                      <h3
                        className={`text-base sm:text-lg font-bold ${themeColors.text.primary} mb-4 mt-6`}
                      >
                        Example Response
                      </h3>
                      <div
                        className={`p-3 sm:p-4 rounded-lg border font-mono text-xs ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700 text-gray-300"
                            : "bg-gray-900 border-gray-700 text-gray-200"
                        } overflow-x-auto`}
                      >
                        <pre className="whitespace-pre-wrap break-all">{`{
  "id": "123",
  "name": "string",
  "description": "string",
  "status": "active",
  "createdAt": "2025-01-15T10:00:00Z"
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Action Bar - Not sticky on mobile */}
          <div
            className={`flex-shrink-0 ${contentBg} border-t-2 ${themeColors.border} px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap gap-2 sm:gap-3 backdrop-blur-sm`}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition text-center min-h-[44px] sm:min-h-0 flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/50"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg"
                }`}
              >
                🚀 Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 sm:py-2 rounded-lg border-2 font-semibold text-xs sm:text-sm transition text-center min-h-[44px] sm:min-h-0 flex items-center justify-center ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="inline-block mr-2">📁</span>
                GitHub
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 sm:py-2 rounded-lg border-2 font-semibold text-xs sm:text-sm transition text-center min-h-[44px] sm:min-h-0 flex items-center justify-center ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="inline-block mr-2">📁</span>
                Repository
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 sm:py-2 rounded-lg border-2 font-semibold text-xs sm:text-sm transition text-center min-h-[44px] sm:min-h-0 flex items-center justify-center ${
                  theme === "dark"
                    ? "border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:bg-opacity-20"
                    : "border-green-600 text-green-700 hover:bg-green-50"
                }`}
              >
                <span className="inline-block mr-2">▶️</span>
                Demo
              </a>
            )}
            {project.links &&
              Object.entries(project.links).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 sm:py-2 rounded-lg border-2 font-semibold text-xs sm:text-sm transition text-center min-h-[44px] sm:min-h-0 flex items-center justify-center ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-400 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* Lightbox for Gallery Images */}
      {isLightboxOpen && hasGallery && (
        <div
          className="fixed inset-0 z-[60] bg-black bg-opacity-95 flex flex-col animate-fadeIn"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between p-4 sm:p-6">
            <div
              className={`${themeColors.text.primary} font-semibold text-sm sm:text-base`}
            >
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="text-white text-3xl sm:text-2xl font-bold w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center"
              aria-label="Close lightbox"
            >
              ×
            </button>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-12 relative">
            <img
              src={galleryImages[currentImageIndex].url}
              alt={galleryImages[currentImageIndex].caption}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />

            {/* Navigation Arrows - Larger touch targets on mobile */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? galleryImages.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-4 sm:p-3 rounded-full transition text-xl sm:text-base min-w-[56px] min-h-[56px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === galleryImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-4 sm:p-3 rounded-full transition text-xl sm:text-base min-w-[56px] min-h-[56px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Caption */}
          <div className="p-4 sm:p-6 text-center">
            <p className="text-white text-sm sm:text-base">
              {galleryImages[currentImageIndex].caption}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              Swipe or use arrow keys to navigate • Press ESC to close
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme === "dark" ? "#1f2937" : "#f3f4f6"};
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === "dark" ? "#4b5563" : "#9ca3af"};
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === "dark" ? "#6b7280" : "#6b7280"};
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default ProjectModal;