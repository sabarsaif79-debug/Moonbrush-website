"use client";

import { useEffect, useRef, useState } from "react";

export default function CaseHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "28px 32px",
        borderRadius: 16,
        background: "var(--t-card-bg, rgba(255,255,255,0.03))",
        border: "1px solid var(--t-border, rgba(255,255,255,0.08))",
        display: "flex",
        alignItems: "center",
        gap: "clamp(24px, 4vw, 48px)",
        flexWrap: "wrap",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
      }}
    >
      {/* Big stat */}
      <div style={{ flex: "0 0 auto" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--t-accent, #93c5fd)",
          }}
        >
          +9%
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--t-text-faint, rgba(255,255,255,0.4))",
            marginTop: 6,
          }}
        >
          Nationwide
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 60,
          background:
            "linear-gradient(180deg, transparent, var(--t-border, rgba(255,255,255,0.15)), transparent)",
          flexShrink: 0,
        }}
      />

      {/* Copy */}
      <div style={{ flex: "1 1 250px" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 1.8vw, 20px)",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#6366f1",
            marginBottom: 6,
          }}
        >
          In-store foot traffic increase driven by behavioral targeting
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--t-text-muted, rgba(255,255,255,0.5))",
            margin: 0,
          }}
        >
          A rapidly expanding grocery retailer turned consumer hesitation into brand loyalty through one of the largest hyperlocal behavioral campaigns in U.S. retail.
        </p>
      </div>

      {/* CTA */}
      <a
        href="/case-studies"
        style={{
          flex: "0 0 auto",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--t-accent, #93c5fd)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          whiteSpace: "nowrap",
          transition: "gap 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = "10px";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = "6px";
        }}
      >
        Read case study
        <span style={{ fontSize: 15 }}>→</span>
      </a>
    </div>
  );
}
