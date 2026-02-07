"use client";

import { useEffect, useRef, useState } from "react";

const aboveWater = [
  "Age & income",
  "Contact data",
  "Basic intent signals",
  "Job title & company size",
];

const belowWater = [
  { label: "Psychographic profiles", desc: "Values, attitudes, motivations" },
  { label: "Decision dynamics", desc: "How they evaluate & choose" },
  { label: "Emotional orientation", desc: "What resonates & what repels" },
  { label: "Purchase psychology", desc: "Impulse, loyalty, price sensitivity" },
  { label: "Values & worldview", desc: "Moral foundations, ideology, culture" },
  { label: "Channel resonance", desc: "Where, when, and how to reach them" },
  { label: "Conversion playbooks", desc: "The scientific formula for action" },
  { label: "Dynamic creative (PRISM)", desc: "1:1 personalized variants at scale" },
];

export default function IcebergSection() {
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "clamp(40px, 6vw, 80px)",
        alignItems: "center",
        maxWidth: 1200,
        margin: "0 auto",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* Iceberg Visual */}
      <div
        style={{
          flex: "0 0 auto",
          width: "clamp(260px, 30vw, 360px)",
          position: "relative",
        }}
      >
        <svg
          viewBox="0 0 300 500"
          style={{
            width: "100%",
            height: "auto",
            overflow: "visible",
          }}
        >
          {/* Water line */}
          <line
            x1="0" y1="140" x2="300" y2="140"
            stroke="var(--t-accent, #93c5fd)"
            strokeWidth="1"
            strokeDasharray="6 4"
            opacity="0.5"
          />

          {/* Tip — above waterline */}
          <polygon
            points="150,20 200,140 100,140"
            fill="var(--t-card-bg, rgba(255,255,255,0.08))"
            stroke="var(--t-border, rgba(255,255,255,0.15))"
            strokeWidth="1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(-20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          />
          <text
            x="150" y="95"
            textAnchor="middle"
            fill="var(--t-text-faint, rgba(255,255,255,0.5))"
            fontSize="10"
            fontFamily="var(--font-body)"
            letterSpacing="1"
          >
            DEMOGRAPHICS
          </text>

          {/* Mass — below waterline */}
          <polygon
            points="80,142 220,142 260,300 270,400 230,470 70,470 30,400 40,300"
            fill="var(--t-accent, #93c5fd)"
            opacity={visible ? 0.12 : 0}
            style={{
              transition: "opacity 1.2s ease 0.6s",
            }}
          />
          <polygon
            points="80,142 220,142 260,300 270,400 230,470 70,470 30,400 40,300"
            fill="none"
            stroke="var(--t-accent, #93c5fd)"
            strokeWidth="1.5"
            opacity={visible ? 0.4 : 0}
            style={{
              transition: "opacity 1s ease 0.8s",
            }}
          />

          {/* Glow inside */}
          <ellipse
            cx="150" cy="320" rx="80" ry="100"
            fill="var(--t-accent, #93c5fd)"
            opacity={visible ? 0.06 : 0}
            style={{
              transition: "opacity 1.5s ease 1s",
              filter: "blur(30px)",
            }}
          />

          {/* Label */}
          <text
            x="150" y="300"
            textAnchor="middle"
            fill="var(--t-accent, #93c5fd)"
            fontSize="10"
            fontFamily="var(--font-body)"
            letterSpacing="1.5"
            opacity={visible ? 0.8 : 0}
            style={{ transition: "opacity 1s ease 1s" }}
          >
            BEHAVIORAL
          </text>
          <text
            x="150" y="315"
            textAnchor="middle"
            fill="var(--t-accent, #93c5fd)"
            fontSize="10"
            fontFamily="var(--font-body)"
            letterSpacing="1.5"
            opacity={visible ? 0.8 : 0}
            style={{ transition: "opacity 1s ease 1s" }}
          >
            INTELLIGENCE
          </text>

          {/* Water gradient overlay */}
          <defs>
            <linearGradient id="waterFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--t-bg, #0a0a1a)" stopOpacity="0" />
              <stop offset="26%" stopColor="var(--t-bg, #0a0a1a)" stopOpacity="0" />
              <stop offset="29%" stopColor="var(--t-accent, #93c5fd)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--t-accent, #93c5fd)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="300" height="500" fill="url(#waterFade)" pointerEvents="none" />
        </svg>
      </div>

      {/* Content Side */}
      <div style={{ flex: "1 1 400px", minWidth: 300 }}>
        {/* Header */}
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
            transition: "all 0.7s ease 0.3s",
          }}
        >
          Competitive Edge
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
            transition: "all 0.7s ease 0.4s",
          }}
        >
          Go below the surface.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--t-text-muted, rgba(255,255,255,0.6))",
            marginBottom: 32,
            maxWidth: 500,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(15px)",
            transition: "all 0.7s ease 0.5s",
          }}
        >
          Traditional providers give you the tip of the iceberg — age, income, location. Moonbrush reveals the 90% that actually drives conversion.
        </p>

        {/* Above waterline */}
        <div
          style={{
            marginBottom: 24,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--t-text-faint, rgba(255,255,255,0.35))",
              marginBottom: 10,
            }}
          >
            What everyone has
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {aboveWater.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  padding: "5px 12px",
                  borderRadius: 6,
                  background: "var(--t-card-bg, rgba(255,255,255,0.04))",
                  border: "1px solid var(--t-border, rgba(255,255,255,0.08))",
                  color: "var(--t-text-faint, rgba(255,255,255,0.4))",
                  textDecoration: "line-through",
                  textDecorationColor: "var(--t-text-faint, rgba(255,255,255,0.2))",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, var(--t-accent, #93c5fd) 0%, transparent 70%)",
            opacity: 0.2,
            marginBottom: 24,
          }}
        />

        {/* Below waterline */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--t-accent, #93c5fd)",
              marginBottom: 12,
              opacity: 0.7,
            }}
          >
            What Moonbrush reveals
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 8,
            }}
          >
            {belowWater.map((item, i) => (
              <div
                key={item.label}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "var(--t-card-bg, rgba(255,255,255,0.04))",
                  border: "1px solid var(--t-accent, #93c5fd)",
                  borderColor: "rgba(147, 197, 253, 0.15)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(10px)",
                  transition: `all 0.5s ease ${0.9 + i * 0.07}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--t-text-primary, #fff)",
                    marginBottom: 2,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--t-text-faint, rgba(255,255,255,0.4))",
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
