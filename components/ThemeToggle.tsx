"use client";

import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        position: "relative",
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "1px solid rgba(147, 197, 253, 0.2)",
        background: "rgba(147, 197, 253, 0.08)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor =
          "rgba(147, 197, 253, 0.4)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor =
          "rgba(147, 197, 253, 0.2)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Sun icon (shown in dark mode → click to go light) */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          opacity: isDark ? 1 : 0,
          transform: isDark
            ? "rotate(0deg) scale(1)"
            : "rotate(-90deg) scale(0.5)",
          transition:
            "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon (shown in light mode → click to go dark) */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          opacity: isDark ? 0 : 1,
          transform: isDark
            ? "rotate(90deg) scale(0.5)"
            : "rotate(0deg) scale(1)",
          transition:
            "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
