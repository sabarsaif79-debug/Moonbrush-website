"use client";

import { useEffect, useRef, useState } from "react";

const layers = [
  {
    number: "04",
    title: "Data Ingestion",
    subtitle: "Governance & Trust Foundation",
    description:
      "First-party, second-party, and third-party data streams. SOC 2, ISO 27001, HIPAA, GDPR, CCPA compliant from day one.",
    color: "#4b5563", // gray
    items: ["CSV / Database / Warehouse", "CRM Integrations", "Privacy & Compliance"],
  },
  {
    number: "03",
    title: "Behavioral Data",
    subtitle: "Identity Resolution",
    description:
      "289M+ consumer profiles. Multi-key identity matching at 98%+ accuracy. Hundreds of behavioral dimensions per individual.",
    color: "#7c3aed", // violet
    items: ["Consumer Graph (289M+)", "Identity Resolution", "Predictive Columns"],
  },
  {
    number: "02",
    title: "Decisioning",
    subtitle: "Modeling Fabric",
    description:
      "181 behavioral models. 342 psychographic scales. Custom models via the Builder. The Playbook engine with 54 dimensions.",
    color: "#6366f1", // indigo
    items: ["Builder (Models & Segments)", "Workshop (12 Lenses)", "Playbook Engine (54 Dimensions)"],
  },
  {
    number: "01",
    title: "Applied Intelligence",
    subtitle: "What the World Sees",
    description:
      "PRISM dynamic personalization. Cross-channel activation via DSP, email, SMS, and direct mail. One-to-one creative at scale.",
    color: "#93c5fd", // blue
    items: ["PRISM (245+ Messaging Atoms)", "Multi-Channel Activation", "1:1 Personalized Creative"],
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeLayer, setActiveLayer] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
          // Stagger layer reveals
          layers.forEach((_, i) => {
            setTimeout(() => setActiveLayer(i), 400 + i * 350);
          });
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
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "var(--t-accent-soft, rgba(147,197,253,0.6))",
            marginBottom: 16,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          Architecture
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 12,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          Four layers of intelligence.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--t-text-muted, rgba(255,255,255,0.55))",
            maxWidth: 500,
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          One unified platform. Get up and running in minutes.
        </p>
      </div>

      {/* Layers stack — builds bottom to top */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[...layers].reverse().map((layer, visualIndex) => {
          const dataIndex = layers.length - 1 - visualIndex;
          const isRevealed = activeLayer >= dataIndex;
          const isHovered = false; // controlled per-element

          return (
            <LayerCard
              key={layer.number}
              layer={layer}
              revealed={isRevealed}
              delay={visualIndex * 0.08}
            />
          );
        })}
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: "center",
          marginTop: 40,
          opacity: activeLayer >= layers.length - 1 ? 1 : 0,
          transform:
            activeLayer >= layers.length - 1
              ? "none"
              : "translateY(10px)",
          transition: "all 0.6s ease",
        }}
      >
        <a
          href="/platform"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 500,
            color: "var(--t-accent, #93c5fd)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          See the full platform →
        </a>
      </div>
    </div>
  );
}

function LayerCard({
  layer,
  revealed,
  delay,
}: {
  layer: (typeof layers)[0];
  revealed: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr",
        gap: 20,
        padding: "20px 24px",
        borderRadius: 14,
        background: hovered
          ? "var(--t-card-bg, rgba(255,255,255,0.06))"
          : "var(--t-card-bg, rgba(255,255,255,0.03))",
        border: `1px solid ${revealed ? layer.color + "25" : "var(--t-border, rgba(255,255,255,0.05))"}`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? "none" : "translateY(20px) scale(0.98)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, background 0.3s ease, border-color 0.3s ease`,
        cursor: "default",
        alignItems: "center",
      }}
    >
      {/* Layer number */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: layer.color,
          opacity: 0.7,
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {layer.number}
      </div>

      {/* Content */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: 6,
            flexWrap: "wrap",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(16px, 1.8vw, 20px)",
              fontWeight: 700,
              color: "var(--t-text-primary, #fff)",
              margin: 0,
            }}
          >
            {layer.title}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--t-text-faint, rgba(255,255,255,0.35))",
            }}
          >
            {layer.subtitle}
          </span>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--t-text-muted, rgba(255,255,255,0.5))",
            margin: "0 0 10px",
            maxHeight: hovered ? 100 : 0,
            overflow: "hidden",
            opacity: hovered ? 1 : 0,
            transition: "all 0.4s ease",
          }}
        >
          {layer.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {layer.items.map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
                background: layer.color + "12",
                color: layer.color,
                border: `1px solid ${layer.color}20`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
