"use client";

import { useEffect, useRef, useState } from "react";

interface CardContent {
  icon: string;
  title: string;
  description: string;
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
  description,
  color,
}: CardContent) {
  return (
    <div
      style={{
        position: "relative",
        padding: "52px 44px 48px",
        borderRadius: 16,
        background:
          "linear-gradient(135deg, " +
          color +
          "15 0%, rgba(6, 6, 15, 0.35) 50%, " +
          color +
          "08 100%)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        border:
          "1px solid rgba(255, 255, 255, 0.06)",
        borderTop: "1px solid " + color + "50",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box" as const,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, " +
            color +
            ", transparent)",
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
      <div
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: 28,
            color: color,
            width: 56,
            height: 56,
            lineHeight: "56px",
            borderRadius: 12,
            background: color + "10",
            border: "1px solid " + color + "20",
          }}
        >
          {icon}
        </span>
      </div>
      <h3
        style={{
          fontFamily:
            "var(--font-display, Syne, sans-serif)",
          fontSize: 26,
          fontWeight: 700,
          color: "#ffffff",
          textShadow:
            "0 5px 8px rgba(0,0,0,0.5), " +
            "0 0 30px rgba(0,0,0,0.3)",
          marginBottom: 14,
          lineHeight: 1.2,
          textAlign: "center",
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          width: 40,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, " +
            color +
            "60, transparent)",
          margin: "0 auto 18px",
        }}
      />
      <p
        style={{
          fontFamily:
            "var(--font-body, Outfit, sans-serif)",
          fontSize: 15,
          color: "rgba(255, 255, 255, 0.75)",
          textShadow:
            "0 5px 6px rgba(0,0,0,0.4), " +
            "0 0 20px rgba(0,0,0,0.2)",
          lineHeight: 1.75,
          margin: 0,
          textAlign: "center",
        }}
      >
        {description}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: 28,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background:
                i === 1 ? color : color + "30",
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
        width: "min(500px, 85vw)",
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
