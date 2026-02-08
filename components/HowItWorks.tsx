"use client";

import { useEffect, useRef, useState } from "react";

const layers = [
  {
    number: "04",
    title: "Data Ingestion",
    subtitle: "Governance & Trust Foundation",
    description:
      "First-party, second-party, and third-party data streams. SOC 2, ISO 27001, HIPAA, GDPR, CCPA compliant from day one.",
    color: "#4b5563",
    items: ["CSV / Database / Warehouse", "CRM Integrations", "Privacy & Compliance"],
  },
  {
    number: "03",
    title: "Behavioral Data",
    subtitle: "Identity Resolution",
    description:
      "289M+ consumer profiles. Multi-key identity matching at 98%+ accuracy. Hundreds of behavioral dimensions per individual.",
    color: "#7c3aed",
    items: ["Consumer Graph (289M+)", "Identity Resolution", "Predictive Columns"],
  },
  {
    number: "02",
    title: "Decisioning",
    subtitle: "Modeling Fabric",
    description:
      "181 behavioral models across 11 lens categories. Custom models via the Builder. The Playbook engine with 54 dimensions and 1,000+ options.",
    color: "#6366f1",
    items: ["Builder (Models & Segments)", "Workshop (12 Lenses)", "Playbook Engine (54 Dimensions)"],
  },
  {
    number: "01",
    title: "Applied Intelligence",
    subtitle: "What the World Sees",
    description:
      "PRISM dynamic personalization. Cross-channel activation via DSP, email, SMS, and direct mail. One-to-one creative at scale.",
    color: "#3b82f6",
    items: ["PRISM (130+ Messaging Atoms)", "Multi-Channel Activation", "1:1 Personalized Creative"],
  },
];

/* ─── Ping-Pong Video ─── */
function PingPongVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const directionRef = useRef<"forward" | "backward">("forward");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      directionRef.current = "backward";
      const step = () => {
        if (!video) return;
        video.currentTime = Math.max(0, video.currentTime - 0.033);
        if (video.currentTime <= 0.05) {
          directionRef.current = "forward";
          video.currentTime = 0;
          video.play();
          return;
        }
        rafRef.current = requestAnimationFrame(step);
      };
      video.pause();
      rafRef.current = requestAnimationFrame(step);
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="/clockwise.mp4"
      autoPlay
      muted
      playsInline
      style={{
        width: "100%",
        height: "auto",
        borderRadius: 16,
        display: "block",
      }}
    />
  );
}

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

      {/* Two-column: Cards + Video */}
      <div
        className="hiw-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          alignItems: "center",
        }}
      >
        {/* Left: Layer cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[...layers].reverse().map((layer, visualIndex) => {
            const dataIndex = layers.length - 1 - visualIndex;
            const isRevealed = activeLayer >= dataIndex;

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

        {/* Right: Ping-pong video */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            minHeight: 300,
          }}
        >
          <PingPongVideo />
        </div>
      </div>

      {/* Responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .hiw-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

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
    /* Outer wrapper — fixed height, never moves */
    <div
      style={{
        height: 72,
        position: "relative",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "none" : "translateY(20px) scale(0.98)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {/* Inner card — absolute, scales without affecting layout */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: hovered ? 10 : 1,
          display: "grid",
          gridTemplateColumns: "44px 1fr",
          gap: 14,
          padding: "12px 16px",
          borderRadius: 10,
          background: hovered
            ? "var(--t-card-bg, rgba(255,255,255,0.06))"
            : "var(--t-card-bg, rgba(255,255,255,0.03))",
          border: `1px solid ${revealed ? layer.color + "25" : "var(--t-border, rgba(255,255,255,0.05))"}`,
          cursor: "default",
          alignItems: "center",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          boxShadow: hovered
            ? `0 0 24px ${layer.color}20, 0 0 48px ${layer.color}12`
            : "none",
          transition:
            "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease",
          overflow: "hidden",
        }}
      >
        {/* Layer number */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 700,
            color: layer.color,
            opacity: hovered ? 1 : 0.7,
            textAlign: "center",
            lineHeight: 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {layer.number}
        </div>

        {/* Content */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginBottom: 4,
              flexWrap: "wrap",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(13px, 1.4vw, 16px)",
                fontWeight: 700,
                color: layer.color,
                margin: 0,
              }}
            >
              {layer.title}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "var(--t-text-faint, rgba(255,255,255,0.35))",
              }}
            >
              {layer.subtitle}
            </span>
          </div>

          {/* Description — visible on hover */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              lineHeight: 1.5,
              color: layer.color,
              margin: 0,
              opacity: hovered ? 0.75 : 0,
              maxHeight: hovered ? 60 : 0,
              overflow: "hidden",
              transition:
                "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {layer.description}
          </p>

          {/* Tags — hidden on hover */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              opacity: hovered ? 0 : 1,
              maxHeight: hovered ? 0 : 40,
              overflow: "hidden",
              transition:
                "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {layer.items.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "2px 8px",
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
    </div>
  );
}
