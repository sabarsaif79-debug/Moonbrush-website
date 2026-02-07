"use client";

import { useEffect, useRef, useState } from "react";

interface CaseStudyProps {
  title: string;
  subtitle: string;
  description: string;
  stat1: string;
  stat1Label: string;
  stat2: string;
  stat2Label: string;
  delay?: number;
}

export default function CaseStudy({
  title,
  subtitle,
  description,
  stat1,
  stat1Label,
  stat2,
  stat2Label,
  delay = 0,
}: CaseStudyProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Subtle 3D tilt based on cursor position
  const rotateX = hovered ? (mouse.y - 0.5) * -6 : 0;
  const rotateY = hovered ? (mouse.x - 0.5) * 6 : 0;

  return (
    <div
      ref={ref}
      className="rounded-2xl p-10 relative overflow-hidden"
      style={{
        backgroundColor: "var(--t-card-bg)",
        border: "1px solid var(--t-card-border)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${hovered ? -6 : 0}px)`
          : "perspective(800px) translateY(40px) scale(0.95)",
        transition: visible
          ? "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease"
          : "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: hovered
          ? "0 25px 50px -16px var(--t-glow), 0 0 0 1px var(--t-accent-faint)"
          : "none",
        borderColor: hovered
          ? "var(--t-accent-soft)"
          : "var(--t-card-border)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMouse({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, var(--t-accent-faint), transparent 40%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Top accent shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent 10%, var(--t-accent) 50%, transparent 90%)`,
          opacity: hovered ? 0.7 : 0.2,
          transition: "opacity 0.5s ease",
        }}
      />

      <div className="relative">
        <div
          className="font-body text-[11px] tracking-[3px] uppercase mb-4"
          style={{
            color: "var(--t-accent-soft)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.6s ease ${delay + 0.15}s, transform 0.6s ease ${delay + 0.15}s`,
          }}
        >
          {title}
        </div>

        <h3
          className="font-display text-[22px] font-bold leading-[1.3] mb-4"
          style={{
            color: "var(--t-text)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.6s ease ${delay + 0.25}s, transform 0.6s ease ${delay + 0.25}s`,
          }}
        >
          {subtitle}
        </h3>

        <p
          className="font-body text-[15px] leading-[1.7] mb-8"
          style={{
            color: "var(--t-text-muted)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.6s ease ${delay + 0.35}s, transform 0.6s ease ${delay + 0.35}s`,
          }}
        >
          {description}
        </p>

        {/* Stats row */}
        <div
          className="flex gap-8 pt-6"
          style={{
            borderTop: "1px solid var(--t-card-border)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.6s ease ${delay + 0.45}s, transform 0.6s ease ${delay + 0.45}s`,
          }}
        >
          <div>
            <div
              className="font-display text-[28px] font-bold leading-none mb-1"
              style={{
                color: "var(--t-stat-value)",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transformOrigin: "left bottom",
              }}
            >
              {stat1}
            </div>
            <div
              className="font-body text-[12px] tracking-wide"
              style={{ color: "var(--t-text-faint)" }}
            >
              {stat1Label}
            </div>
          </div>
          <div>
            <div
              className="font-display text-[28px] font-bold leading-none mb-1"
              style={{
                color: "var(--t-stat-value)",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
                transformOrigin: "left bottom",
              }}
            >
              {stat2}
            </div>
            <div
              className="font-body text-[12px] tracking-wide"
              style={{ color: "var(--t-text-faint)" }}
            >
              {stat2Label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
