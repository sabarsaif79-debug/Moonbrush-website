"use client";

import { useEffect, useRef, useState } from "react";

interface CapPillProps {
  label: string;
  delay?: number;
}

export default function CapPill({ label, delay = 0 }: CapPillProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay * 1000 + 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className="font-body text-[13px] tracking-[0.5px] py-[10px] px-5 rounded-full inline-block cursor-default"
      style={{
        color: hovered ? "var(--t-btn-text)" : "var(--t-accent)",
        border: "1px solid var(--t-card-border)",
        backgroundColor: hovered
          ? "var(--t-accent)"
          : "var(--t-accent-faint)",
        opacity: visible ? 1 : 0,
        // Spring overshoot: scale goes to 1.08 then settles to 1
        transform: visible
          ? hovered
            ? "translateY(-2px) scale(1.04)"
            : "translateY(0) scale(1)"
          : "translateY(12px) scale(0.85)",
        transition: visible
          ? "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          : `opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s, background-color 0.5s ease ${delay}s`,
        boxShadow: hovered
          ? "0 4px 15px -3px var(--t-glow)"
          : "none",
        borderColor: hovered
          ? "var(--t-accent)"
          : "var(--t-card-border)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  );
}
