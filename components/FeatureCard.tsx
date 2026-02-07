"use client";

import { useEffect, useRef, useState } from "react";
import GlowCard from "./GlowCard";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
  span?: "normal" | "wide" | "tall";
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  span = "normal",
}: FeatureCardProps) {
  const [visible, setVisible] = useState(false);
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
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const gridSpan =
    span === "wide"
      ? "col-span-2"
      : span === "tall"
        ? "row-span-2"
        : "";

  return (
    <div
      ref={ref}
      className={gridSpan}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.95)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      <GlowCard
        className="rounded-2xl h-full"
        style={{
          backgroundColor: "var(--t-card-bg)",
          border: "1px solid var(--t-card-border)",
          padding: span === "wide" ? "40px 48px" : "32px",
        }}
      >
        <div
          className="rounded-xl w-12 h-12 flex items-center justify-center text-xl mb-5"
          style={{
            backgroundColor: "var(--t-accent-faint)",
            color: "var(--t-accent)",
          }}
        >
          {icon}
        </div>

        <h3
          className="font-display text-lg font-bold mb-3"
          style={{ color: "var(--t-text)" }}
        >
          {title}
        </h3>

        <p
          className="font-body text-[14px] leading-[1.7]"
          style={{ color: "var(--t-text-muted)" }}
        >
          {description}
        </p>
      </GlowCard>
    </div>
  );
}
