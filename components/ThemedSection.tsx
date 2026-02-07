"use client";

import { useTheme } from "./ThemeContext";
import { ReactNode } from "react";

const lightVars: Record<string, string> = {
  "--t-bg": "#fafbfc",
  "--t-text": "#1a1a2e",
  "--t-text-muted": "rgba(26, 26, 46, 0.55)",
  "--t-text-faint": "rgba(26, 26, 46, 0.4)",
  "--t-accent": "#2563eb",
  "--t-accent-soft": "rgba(37, 99, 235, 0.5)",
  "--t-accent-faint": "rgba(37, 99, 235, 0.08)",
  "--t-border": "rgba(37, 99, 235, 0.08)",
  "--t-card-bg": "rgba(37, 99, 235, 0.04)",
  "--t-card-border": "rgba(37, 99, 235, 0.1)",
  "--t-glow": "rgba(37, 99, 235, 0.04)",
  "--t-btn-bg": "#2563eb",
  "--t-btn-text": "#ffffff",
  "--t-shadow": "0 0 30px rgba(37, 99, 235, 0.15)",
  "--t-shadow-hover": "0 0 50px rgba(37, 99, 235, 0.25)",
  "--t-stat-value": "#2563eb",
};

const darkVars: Record<string, string> = {
  "--t-bg": "#06060f",
  "--t-text": "rgba(255, 255, 255, 0.92)",
  "--t-text-muted": "rgba(255, 255, 255, 0.5)",
  "--t-text-faint": "rgba(255, 255, 255, 0.4)",
  "--t-accent": "#93c5fd",
  "--t-accent-soft": "rgba(147, 197, 253, 0.5)",
  "--t-accent-faint": "rgba(147, 197, 253, 0.06)",
  "--t-border": "rgba(147, 197, 253, 0.06)",
  "--t-card-bg": "rgba(255, 255, 255, 0.03)",
  "--t-card-border": "rgba(255, 255, 255, 0.06)",
  "--t-glow": "rgba(147, 197, 253, 0.04)",
  "--t-btn-bg": "#93c5fd",
  "--t-btn-text": "#06060f",
  "--t-shadow": "0 0 30px rgba(147, 197, 253, 0.2)",
  "--t-shadow-hover": "0 0 50px rgba(147, 197, 253, 0.35)",
  "--t-stat-value": "#93c5fd",
};

export default function ThemedSection({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useTheme();
  const vars = theme === "light" ? lightVars : darkVars;

  return (
    <div
      data-theme={theme}
      style={{
        ...(vars as React.CSSProperties),
        backgroundColor: "var(--t-bg)",
        color: "var(--t-text)",
        position: "relative",
        zIndex: 5,
        transition:
          "background-color 0.5s ease, color 0.5s ease",
      }}
    >
      {children}
    </div>
  );
}
