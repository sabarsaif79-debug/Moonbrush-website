"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── feature data ─── */
const features = [
  {
    id: "behavior",
    label: "Behavior",
    title: "Map the signals that matter.",
    description:
      "Real-time behavioral intelligence surfaces the intent, attention, and emotional triggers behind every interaction — so your models see people, not noise.",
    bullets: [
      "10B+ daily signals captured & enriched",
      "Live behavioral pulse across channels",
      "Intent-graph with causal attribution",
    ],
  },
  {
    id: "personalize",
    label: "Personalize",
    title: "Speak to the individual at scale.",
    description:
      "Deep psychographic profiles power 1:1 messaging that adapts in real time — turning generic outreach into resonant, human conversations.",
    bullets: [
      "Psychographic persona maps with drivers & objections",
      "Dynamic message thermostat per cohort",
      "Creative guidance, not stale demographics",
    ],
  },
  {
    id: "segment",
    label: "Segment",
    title: "Find the audiences no one else sees.",
    description:
      "Go beyond age and income. Build living segments from behavioral cohorts, cultural signals, and memetic forecasts that evolve as the world does.",
    bullets: [
      "250M+ consumer graph, always updating",
      "Behavioral cohort builder with drill-through",
      "Export-ready segments in under 20 minutes",
    ],
  },
];

/* ─── mock platform visuals (pure CSS) ─── */
function BehaviorVisual() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Simulated dashboard header */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, opacity: 0.5 }}>
        {[60, 80, 50].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 8,
              borderRadius: 4,
              background: "var(--t-accent)",
              opacity: 0.3 + i * 0.15,
            }}
          />
        ))}
      </div>

      {/* Signal bars */}
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 90, marginBottom: 20 }}>
        {[0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6, 1, 0.35, 0.75, 0.55, 0.85].map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h * 100}%`,
              borderRadius: 3,
              background: `linear-gradient(to top, var(--t-accent), var(--t-accent-soft))`,
              opacity: 0.4 + h * 0.5,
              animation: `barPulse 2s ease-in-out ${i * 0.15}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Node graph */}
      <svg width="100%" height="80" viewBox="0 0 300 80" fill="none" style={{ opacity: 0.6 }}>
        <line x1="30" y1="20" x2="90" y2="50" stroke="var(--t-accent)" strokeWidth="1.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="90" y1="50" x2="180" y2="25" stroke="var(--t-accent)" strokeWidth="1.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1.2s" repeatCount="indefinite" />
        </line>
        <line x1="180" y1="25" x2="260" y2="55" stroke="var(--t-accent)" strokeWidth="1.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="8" dur="0.8s" repeatCount="indefinite" />
        </line>
        {[
          [30, 20],
          [90, 50],
          [180, 25],
          [260, 55],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="12" fill="var(--t-card-bg)" stroke="var(--t-accent)" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="4" fill="var(--t-accent)" opacity="0.8">
              <animate attributeName="r" values="3;5;3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Live pulse indicator */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 10,
          color: "var(--t-accent)",
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#4ade80",
            animation: "livePulse 1.5s ease infinite",
          }}
        />
        Live
      </div>
    </div>
  );
}

function PersonalizeVisual() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Profile card */}
      <div
        style={{
          display: "flex",
          gap: 14,
          alignItems: "center",
          padding: "12px 16px",
          borderRadius: 10,
          border: "1px solid var(--t-card-border)",
          background: "var(--t-bg)",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--t-accent), var(--t-accent-soft))",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t-text)", marginBottom: 3 }}>
            Persona: Cultural Explorer
          </div>
          <div style={{ fontSize: 10, color: "var(--t-text-muted)" }}>
            Cohort 7A · 89% match · Active
          </div>
        </div>
        <div
          style={{
            padding: "4px 10px",
            borderRadius: 20,
            background: "rgba(74, 222, 128, 0.12)",
            color: "#4ade80",
            fontSize: 10,
            fontWeight: 600,
          }}
        >
          High Intent
        </div>
      </div>

      {/* Psychographic bars */}
      {[
        { label: "Openness", value: 0.92 },
        { label: "Brand Trust", value: 0.78 },
        { label: "Price Sensitivity", value: 0.34 },
        { label: "Social Proof", value: 0.86 },
      ].map((item, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              marginBottom: 4,
              color: "var(--t-text-muted)",
            }}
          >
            <span>{item.label}</span>
            <span style={{ color: "var(--t-accent)", fontWeight: 600 }}>
              {Math.round(item.value * 100)}
            </span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: "var(--t-card-border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${item.value * 100}%`,
                height: "100%",
                borderRadius: 2,
                background: `linear-gradient(90deg, var(--t-accent), var(--t-accent-soft))`,
                animation: `barGrow 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s both`,
              }}
            />
          </div>
        </div>
      ))}

      {/* Message recommendation */}
      <div
        style={{
          marginTop: 14,
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px dashed var(--t-accent)",
          borderColor: "var(--t-accent-faint)",
          opacity: 0.75,
        }}
      >
        <div
          style={{
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            color: "var(--t-accent)",
            marginBottom: 4,
            fontWeight: 600,
          }}
        >
          Recommended Hook
        </div>
        <div style={{ fontSize: 11, color: "var(--t-text-muted)", lineHeight: 1.5 }}>
          &ldquo;Join the community redefining how fans experience game day&rdquo;
        </div>
      </div>
    </div>
  );
}

function SegmentVisual() {
  const segments = [
    { label: "Cultural Explorers", pct: 34, color: "#93c5fd" },
    { label: "Value Seekers", pct: 28, color: "#a78bfa" },
    { label: "Brand Loyalists", pct: 22, color: "#6ee7b7" },
    { label: "Other", pct: 16, color: "#fbbf24" },
  ];

  let accum = 0;
  const slices = segments.map((s) => {
    const start = accum;
    accum += s.pct;
    return { ...s, start, end: accum };
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Donut + legend */}
      <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 16 }}>
        <svg width="90" height="90" viewBox="0 0 90 90" style={{ flexShrink: 0 }}>
          {slices.map((s, i) => {
            const circumference = 2 * Math.PI * 32;
            const dashLength = (s.pct / 100) * circumference;
            const dashOffset = -((s.start / 100) * circumference);
            return (
              <circle
                key={i}
                cx="45"
                cy="45"
                r="32"
                fill="none"
                stroke={s.color}
                strokeWidth="10"
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 45 45)"
                style={{
                  opacity: 0.85,
                  animation: `donutReveal 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s both`,
                }}
              />
            );
          })}
          <text
            x="45"
            y="43"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 14, fontWeight: 700, fill: "var(--t-text)" }}
          >
            250M+
          </text>
          <text
            x="45"
            y="56"
            textAnchor="middle"
            style={{ fontSize: 7, fill: "var(--t-text-muted)" }}
          >
            consumers
          </text>
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {segments.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: s.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "var(--t-text-muted)" }}>{s.label}</span>
              <span style={{ color: "var(--t-text)", fontWeight: 600, marginLeft: "auto" }}>
                {s.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {["Gen Z", "High Intent", "Southwest", "Mobile-first", "New-to-brand"].map((tag, i) => (
          <div
            key={i}
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              fontSize: 9,
              fontWeight: 500,
              border: "1px solid var(--t-card-border)",
              color: i < 3 ? "var(--t-accent)" : "var(--t-text-faint)",
              background: i < 3 ? "var(--t-accent-faint)" : "transparent",
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Export bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          borderRadius: 8,
          background: "var(--t-bg)",
          border: "1px solid var(--t-card-border)",
        }}
      >
        <span style={{ fontSize: 10, color: "var(--t-text-muted)" }}>
          1.2M records matched
        </span>
        <div
          style={{
            padding: "4px 12px",
            borderRadius: 5,
            background: "var(--t-accent)",
            color: "var(--t-bg)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          Export Segment
        </div>
      </div>
    </div>
  );
}

const visuals = [BehaviorVisual, PersonalizeVisual, SegmentVisual];

/* ─── main component ─── */
export default function ProductFeatures() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CYCLE_MS = 6000;
  const TICK_MS = 50;

  // Scroll trigger
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle
  const startCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let p = 0;

    progressRef.current = setInterval(() => {
      p += TICK_MS / CYCLE_MS;
      setProgress(Math.min(p, 1));
    }, TICK_MS);

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
      p = 0;
      setProgress(0);
    }, CYCLE_MS);
  }, []);

  useEffect(() => {
    if (visible && !isHovering) startCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [visible, isHovering, startCycle]);

  const selectFeature = (i: number) => {
    setActive(i);
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    // Restart cycle
    if (!isHovering) startCycle();
  };

  const ActiveVisual = visuals[active];
  const feat = features[active];

  // 3D tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "100px clamp(20px, 6vw, 80px)",
        maxWidth: 1300,
        margin: "0 auto",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes barPulse {
          0% { opacity: 0.4; }
          100% { opacity: 0.85; }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }
        @keyframes barGrow {
          from { width: 0%; }
        }
        @keyframes donutReveal {
          from { stroke-dasharray: 0 201; }
        }
        @keyframes featureSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes visualFadeIn {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .pf-showcase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .pf-showcase {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>

      {/* Section header */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "var(--t-accent-soft)",
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          Product Features
        </div>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 48,
            color: "var(--t-text)",
          }}
        >
          Three views.{" "}
          <span style={{ color: "var(--t-accent)" }}>One truth.</span>
        </h2>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 40,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}
      >
        {features.map((f, i) => (
          <button
            key={f.id}
            onClick={() => selectFeature(i)}
            style={{
              flex: 1,
              padding: "16px 0 14px",
              background: "none",
              border: "none",
              borderBottom: "2px solid var(--t-card-border)",
              cursor: "pointer",
              position: "relative",
              transition: "color 0.3s ease",
              color: i === active ? "var(--t-accent)" : "var(--t-text-muted)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {f.label}

            {/* Progress fill under active tab */}
            {i === active && (
              <div
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  height: 2,
                  width: `${progress * 100}%`,
                  background: "var(--t-accent)",
                  borderRadius: 1,
                  transition: `width ${TICK_MS}ms linear`,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Feature showcase */}
      <div
        className="pf-showcase"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}
      >
        {/* Left: text content */}
        <div
          key={`text-${active}`}
          style={{
            animation: "featureSlideIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(24px, 2.5vw, 34px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 16,
              color: "var(--t-text)",
            }}
          >
            {feat.title}
          </h3>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--t-text-muted)",
              marginBottom: 28,
            }}
          >
            {feat.description}
          </p>

          {/* Bullet points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {feat.bullets.map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  animation: `featureSlideIn 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s both`,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "var(--t-accent-faint)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8L6.5 11.5L13 4.5"
                      stroke="var(--t-accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: "var(--t-text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/platform"
            style={{
              display: "inline-block",
              marginTop: 32,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "var(--t-accent)",
              textDecoration: "none",
              borderBottom: "1px solid var(--t-accent)",
              paddingBottom: 2,
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Explore {feat.label} →
          </a>
        </div>

        {/* Right: visual mock */}
        <div
          ref={cardRef}
          key={`visual-${active}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: 800,
          }}
        >
          <div
            style={{
              background: "var(--t-card-bg)",
              border: "1px solid var(--t-card-border)",
              borderRadius: 16,
              padding: "28px 24px",
              minHeight: 360,
              position: "relative",
              overflow: "hidden",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovering
                ? "transform 0.1s ease-out, box-shadow 0.3s ease"
                : "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
              boxShadow: isHovering
                ? "var(--t-shadow-hover)"
                : "var(--t-shadow)",
              animation: "visualFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {/* Subtle gradient glow */}
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: `radial-gradient(circle, var(--t-glow) 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            <ActiveVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
