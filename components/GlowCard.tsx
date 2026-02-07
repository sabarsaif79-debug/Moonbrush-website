"use client";

import { useRef, useState, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowSize?: number;
  tilt?: boolean;
  borderOnHover?: boolean;
}

export default function GlowCard({
  children,
  className = "",
  style = {},
  glowSize = 500,
  tilt = true,
  borderOnHover = true,
}: GlowCardProps) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const rotateX = tilt && hovered ? (mouse.y - 0.5) * -8 : 0;
  const rotateY = tilt && hovered ? (mouse.x - 0.5) * 8 : 0;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${hovered ? -4 : 0}px)`,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease",
        boxShadow: hovered
          ? "0 20px 40px -12px var(--t-glow)"
          : "none",
        borderColor: hovered && borderOnHover
          ? "var(--t-accent-soft)"
          : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setMouse({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(${glowSize}px circle at ${mouse.x * 100}% ${mouse.y * 100}%, var(--t-accent-faint), transparent 40%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Border glow gradient on hover */}
      {borderOnHover && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            padding: 1,
            background: `radial-gradient(${glowSize * 0.8}px circle at ${mouse.x * 100}% ${mouse.y * 100}%, var(--t-accent-soft), transparent 40%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
