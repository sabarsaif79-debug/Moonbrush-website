"use client";

import { useEffect, useRef, useState } from "react";

interface CardContent {
  icon: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
  capabilities: string[];
  differentiator: string;
  color: string;
}

interface ShowcaseFlipProps {
  cards: CardContent[];
  activeIndex: number;
  visible: boolean;
}

function CardFace({
  icon,
  title,
  stat,
  statLabel,
  description,
  capabilities,
  differentiator,
  color,
}: CardContent) {
  return (
    <div
      style={{
        position: "relative",
        padding: "44px 40px 36px",
        borderRadius: 16,
        background:
          "linear-gradient(135deg, " +
          color +
          "15 0%, rgba(6, 6, 15, 0.35) 50%, " +
          color +
          "08 100%)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderTop: "1px solid " + color + "50",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box" as const,
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, " + color + ", transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -6,
          left: "15%",
          right: "15%",
          height: 14,
          background:
            "linear-gradient(90deg, transparent, " +
            color +
            "40, transparent)",
          filter: "blur(12px)",
        }}
      />
      {/* Radial glow behind stat */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: 120,
          background:
            "radial-gradient(ellipse at center top, " +
            color +
            "12 0%, transparent 70%)",
          pointerEvents: "none",
          
        }}
      />

      {/* ── Anchoring Stat ── */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div
          style={{
            fontFamily: "var(--font-display, Syne, sans-serif)",
            fontSize: "clamp(42px, 6vw, 56px)",
            fontWeight: 800,
            color: color,
            lineHeight: 1,
            letterSpacing: "-2px",
            //textShadow: `0 0 40px ${color}50, 0 0 80px ${color}25`,
            textShadow: "0 0 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)",
          }}
        >
          {stat}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body, Outfit, sans-serif)",
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: color,
            opacity: 0.7,
            marginTop: 4,
            textShadow: "0 0 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)",
          }}
        >
          {statLabel}
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        style={{
          width: 40,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, " +
            color +
            "60, transparent)",
          margin: "16px auto 18px",
        }}
      />

      {/* ── Title ── */}
      <h3
        style={{
          fontFamily: "var(--font-display, Syne, sans-serif)",
          fontSize: "clamp(20px, 2.5vw, 26px)",
          fontWeight: 700,
          color: "#ffffff",
          textShadow:
            "0 5px 8px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.3)",
          marginBottom: 12,
          lineHeight: 1.2,
          textAlign: "center",
          letterSpacing: "-0.3px",
          
        }}
      >
        {title}
      </h3>

      {/* ── Description ── */}
      <p
        style={{
          fontFamily: "var(--font-body, Outfit, sans-serif)",
          fontSize: 14,
          color: "rgba(255, 255, 255, 0.7)",
          textShadow:
            "0 5px 6px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.2)",
          lineHeight: 1.7,
          margin: "0 auto 20px",
          textAlign: "center",
          maxWidth: 420,
        }}
      >
        {description}
      </p>

      {/* ── Capability Pills ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 18,
        }}
      >
        {capabilities.map((cap) => (
          <span
            key={cap}
            style={{
              fontFamily: "var(--font-body, Outfit, sans-serif)",
              fontSize: 11,
              fontWeight: 900,
              padding: "5px 14px",
              borderRadius: 20,
              background: color + "15",
              color: color,
              border: `1px solid ${color}30`,
              letterSpacing: 0.3,
              textShadow: "0 0 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)",
              
            }}
          >
            {cap}
          </span>
        ))}
      </div>

      {/* ── Differentiator ── */}
      <p
        style={{
          fontFamily: "var(--font-body, Outfit, sans-serif)",
          fontSize: 13,
          color: "rgb(245, 239, 239)",
          textAlign: "center",
          lineHeight: 1.5,
          margin: 0,
          fontStyle: "italic",
          textShadow: "0 0 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)",
        }}
      >
        {differentiator}
      </p>

      {/* ── Card progress dots ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 20,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: i === 1 ? color : color + "30",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ShowcaseFlip({
  cards,
  activeIndex,
  visible,
}: ShowcaseFlipProps) {
  const [displayIndex, setDisplayIndex] =
    useState(activeIndex);
  const [phase, setPhase] = useState<
    "idle" | "out" | "in"
  >("idle");
  const pendingIndex = useRef(activeIndex);

  useEffect(() => {
    pendingIndex.current = activeIndex;

    if (phase !== "idle") return;
    if (activeIndex === displayIndex) return;

    setPhase("out");
  }, [activeIndex, displayIndex, phase]);

  const handleTransitionEnd = () => {
    if (phase === "out") {
      setDisplayIndex(pendingIndex.current);
      setPhase("in");
    } else if (phase === "in") {
      setPhase("idle");
      if (pendingIndex.current !== displayIndex) {
        requestAnimationFrame(() => {
          setPhase("out");
        });
      }
    }
  };

  const getScale = () => {
    if (phase === "out") return "scaleX(0)";
    return "scaleX(1)";
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(520px, 88vw)",
        zIndex: 5,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: getScale(),
          transition:
            phase === "idle"
              ? "none"
              : "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "center center",
        }}
      >
        <CardFace {...cards[displayIndex]} />
      </div>
    </div>
  );
}
