"use client";

import { useState, useEffect } from "react";

interface MoonProps {
  size?: number;
}

export default function Moon({ size = 320 }: MoonProps) {
  const [rot, setRot] = useState(0);

  useEffect(() => {
    let frame: number;
    const spin = () => {
      setRot((r) => r + 0.08);
      frame = requestAnimationFrame(spin);
    };
    spin();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="rounded-full relative overflow-hidden"
      style={{
        width: size,
        height: size,
        boxShadow:
          "0 0 80px 20px rgba(147,197,253,0.15), 0 0 200px 60px rgba(147,197,253,0.05), inset -30px -10px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Base surface */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(220,220,230,1) 0%, rgba(180,180,195,1) 30%, rgba(140,140,160,1) 60%, rgba(90,90,110,1) 100%)",
        }}
      />

      {/* Rotating crater layer */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -size * 0.5,
          width: size * 2,
          height: size * 2,
          transform: `rotate(${rot}deg)`,
          background: `
            radial-gradient(circle at 20% 30%, rgba(0,0,0,0.12) 0%, transparent 8%),
            radial-gradient(circle at 55% 20%, rgba(0,0,0,0.1) 0%, transparent 12%),
            radial-gradient(circle at 70% 60%, rgba(0,0,0,0.15) 0%, transparent 10%),
            radial-gradient(circle at 35% 70%, rgba(0,0,0,0.08) 0%, transparent 6%),
            radial-gradient(circle at 80% 25%, rgba(0,0,0,0.1) 0%, transparent 7%),
            radial-gradient(circle at 15% 55%, rgba(0,0,0,0.12) 0%, transparent 9%),
            radial-gradient(circle at 45% 45%, rgba(0,0,0,0.06) 0%, transparent 15%),
            radial-gradient(circle at 60% 80%, rgba(0,0,0,0.1) 0%, transparent 8%),
            radial-gradient(circle at 25% 85%, rgba(0,0,0,0.09) 0%, transparent 6%),
            radial-gradient(circle at 90% 45%, rgba(0,0,0,0.11) 0%, transparent 10%)
          `,
        }}
      />

      {/* Atmosphere glow */}
      <div
        className="absolute rounded-full"
        style={{
          inset: -4,
          background:
            "radial-gradient(circle at 30% 30%, rgba(200,210,255,0.1) 0%, transparent 60%)",
          boxShadow: "inset 8px 4px 20px rgba(255,255,255,0.08)",
        }}
      />

      {/* Shadow overlay */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "inset -20px -8px 40px rgba(0,0,0,0.5), inset 6px 4px 20px rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}
