"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "./CountUp";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

// Parse value string like "10B+", "250M+", "<20 min", "30K+"
function parseValue(val: string): {
  prefix: string;
  number: number;
  suffix: string;
  useCountUp: boolean;
} {
  // Match patterns like 10B+, 250M+, 30K+, 98%
  const match = val.match(/^([<>]?)(\d+(?:\.\d+)?)([A-Za-z%+\s]*)$/);
  if (match) {
    return {
      prefix: match[1],
      number: parseFloat(match[2]),
      suffix: match[3],
      useCountUp: true,
    };
  }
  return { prefix: "", number: 0, suffix: val, useCountUp: false };
}

export default function StatCard({
  value,
  label,
  delay = 0,
}: StatCardProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const parsed = parseValue(value);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-8 text-center relative overflow-hidden"
      style={{
        backgroundColor: "var(--t-card-bg)",
        border: "1px solid var(--t-card-border)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-4px) scale(1.02)"
            : "translateY(0) scale(1)"
          : "translateY(30px) scale(0.96)",
        transition: visible
          ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease"
          : "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: hovered
          ? "0 20px 40px -12px var(--t-glow)"
          : "none",
        borderColor: hovered
          ? "var(--t-accent-soft)"
          : "var(--t-card-border)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shimmer line on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, var(--t-accent), transparent)`,
          opacity: hovered ? 0.6 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div
        className="font-display text-[clamp(32px,4vw,48px)] font-bold leading-none mb-3"
        style={{ color: "var(--t-stat-value)" }}
      >
        {parsed.useCountUp && visible ? (
          <CountUp
            end={parsed.number}
            prefix={parsed.prefix}
            suffix={parsed.suffix}
            duration={2.2}
            delay={delay + 0.15}
          />
        ) : (
          value
        )}
      </div>

      <div
        className="font-body text-sm tracking-wide"
        style={{
          color: "var(--t-text-muted)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.6s ease ${delay + 0.3}s, transform 0.6s ease ${delay + 0.3}s`,
        }}
      >
        {label}
      </div>
    </div>
  );
}
