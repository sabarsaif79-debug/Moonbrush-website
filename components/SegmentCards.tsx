"use client";

import { useEffect, useRef, useState } from "react";

const segments = [
  {
    tag: "Enterprise",
    headline: "Intelligence layer, not another tool.",
    description:
      "Layer behavioral intelligence onto your existing data infrastructure. PRISM dynamic personalization. Direct pipeline integration. Compliance built in — HIPAA, SOC 2, ISO 27001, GDPR, CCPA.",
    features: ["PRISM Engine", "Pipeline Integration", "Dedicated Support"],
    cta: "Explore Enterprise",
    accent: "#a78bfa", // violet
  },
  {
    tag: "Mid-Market",
    headline: "Your behavioral science team is ready.",
    description:
      "The complete behavioral workflow — data intake through personalized activation — with dedicated behavioral science, creative, and solutions architect teams. Without the hires.",
    features: ["Full Workflow", "Dedicated Teams", "Multi-Channel"],
    cta: "Explore Mid-Market",
    accent: "#93c5fd", // blue
  },
  {
    tag: "SMB & Startups",
    headline: "Enterprise data. Startup price.",
    description:
      "The same 250M+ consumer graph and behavioral intelligence that powers Fortune 500 campaigns. Flat rate. No per-record pricing. No credit systems. No data science team required.",
    features: ["Flat Rate Access", "BCP Guided Setup", "Full Consumer Graph"],
    cta: "Explore Startups",
    accent: "#67e8f9", // cyan
  },
];

export default function SegmentCards() {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "var(--t-accent-soft, rgba(147,197,253,0.6))",
          marginBottom: 16,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(15px)",
          transition: "all 0.7s ease 0.1s",
        }}
      >
        Built for your scale
      </div>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
        }}
      >
        One platform. Every stage of growth.
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {segments.map((seg, i) => (
          <div
            key={seg.tag}
            style={{
              padding: "36px 28px 32px",
              borderRadius: 16,
              background: "var(--t-card-bg, rgba(255,255,255,0.04))",
              border: "1px solid var(--t-border, rgba(255,255,255,0.08))",
              textAlign: "left",
              position: "relative",
              overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(25px)",
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.12}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = seg.accent + "30";
              e.currentTarget.style.boxShadow = `0 0 40px ${seg.accent}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--t-border, rgba(255,255,255,0.08))";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Subtle top glow */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 200,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${seg.accent}40, transparent)`,
              }}
            />

            {/* Tag */}
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: seg.accent,
                marginBottom: 16,
              }}
            >
              {seg.tag}
            </div>

            {/* Headline */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.2vw, 24px)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 12,
                color: seg.accent,
              }}
            >
              {seg.headline}
            </h3>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--t-text-muted, rgba(255,255,255,0.6))",
                marginBottom: 24,
              }}
            >
              {seg.description}
            </p>

            {/* Feature pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 28,
              }}
            >
              {seg.features.map((f) => (
                <span
                  key={f}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: seg.accent + "10",
                    color: seg.accent,
                    border: `1px solid ${seg.accent}20`,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* CTA link */}
            <a
              href="/verticals"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                color: seg.accent,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "gap 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = "10px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = "6px";
              }}
            >
              {seg.cta}
              <span style={{ fontSize: 16 }}>→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
