"use client";

import { useEffect, useState } from "react";

interface ParallaxMoonProps {
  heroLoaded: boolean;
  glowColor?: string;
  showcaseBottom?: number;
}

export default function ParallaxMoon({
  heroLoaded,
  glowColor = "rgb(255, 255, 255)",
  showcaseBottom = 999,
}: ParallaxMoonProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moveMaxScroll = 800;
  const moveProgress = Math.min(scrollY / moveMaxScroll, 1);

  const startY = 90;
  const endY = 18;
  const moonY = startY + (endY - startY) * moveProgress;

  const startScale = 1;
  const endScale = 1.3;
  const scale = startScale + (endScale - startScale) * moveProgress;

  const glowProgress = Math.min(Math.max((scrollY - 600) / 400, 0), 1);

  // Fade moon out as showcase zone nears top of viewport
  const fadeStart = 300;
  const fadeOut =
    showcaseBottom <= fadeStart
      ? Math.max(0, showcaseBottom / fadeStart)
      : 1;
  const moonOpacity = heroLoaded ? fadeOut : 0;

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: `${moonY}vh`,
        transform: `translateX(-50%) scale(${scale})`,
        zIndex: 1,
        opacity: moonOpacity,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 700,
          height: 700,
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: `0 0 ${50 * glowProgress}px ${1 * glowProgress}px ${glowColor}`,
        }}
      >
        <video
          src="/moon-cropped.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "120%",
            height: "120%",
            objectFit: "cover",
            marginTop: "-5%",
            marginLeft: "-0%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: glowProgress * 0.55,
            transition: "background 0.8s ease, opacity 0.5s ease",
            mixBlendMode: "soft-light",
          }}
        />
      </div>
    </div>
  );
}
