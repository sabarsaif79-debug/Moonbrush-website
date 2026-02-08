"use client";

import { useEffect, useRef, useState } from "react";

const logos = [
  { name: "CVS Health", file: "cvs-health.png" },
  { name: "San Diego Padres", file: "san-diego-padres.png" },
  { name: "Karl Strauss", file: "karl-strauss.png" },
  { name: "Buc-ee's", file: "buc-ees.png" },
  { name: "Ministry of Hajj", file: "ministry-hajj-umrah.png" },
  { name: "Indian Gaming Assoc.", file: "indian-gaming-association.png" },
  { name: "ALDI", file: "aldi.png" },
  { name: "UAE Ministry", file: "uae-ministry-industry.png" },
  { name: "Dine Brands", file: "dine-brands.png" },
  { name: "KIPP", file: "kipp.png" },
];

interface LogoOrbitProps {
  visible: boolean;
  showcaseBottom: number;
}

export default function LogoOrbit({ visible, showcaseBottom }: LogoOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const windowHRef = useRef(800);
  const [mounted, setMounted] = useState(false);
  const initialized = useRef(false);
  const showcaseRef = useRef(showcaseBottom);
  const visibleRef = useRef(visible);
  const rafRef = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => { showcaseRef.current = showcaseBottom; }, [showcaseBottom]);
  useEffect(() => { visibleRef.current = visible; }, [visible]);

  useEffect(() => {
    windowHRef.current = window.innerHeight;
    scrollYRef.current = window.scrollY;
    initialized.current = true;
    setMounted(true);
    const onScroll = () => { scrollYRef.current = window.scrollY; };
    const onResize = () => { windowHRef.current = window.innerHeight; };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    let lastTime = performance.now();
    const speed = 0.0003;

    const animate = (time: number) => {
      const dt = (time - lastTime) / 16.67;
      lastTime = time;
      progressRef.current += speed * dt;

      const el = containerRef.current;
      if (!el || !initialized.current) { rafRef.current = requestAnimationFrame(animate); return; }

      const scrollY = scrollYRef.current;
      const wh = windowHRef.current;
      const sb = showcaseRef.current;
      const vis = visibleRef.current;

      /* ── Moon geometry (matches ParallaxMoon.tsx) ── */
      const moveProgress = Math.min(scrollY / 800, 1);
      const moonYvh = 90 + (18 - 90) * moveProgress;
      const scale = 1 + 0.3 * moveProgress;
      const moonRadius = 350 * scale;
      const moonCenterX = window.innerWidth / 2;
      const moonCenterY = (moonYvh / 100) * wh + moonRadius+50;

      /* ── Gentle parabolic path across the moon face ──
         X: linear left-to-right across the moon diameter
         Y: slight downward curve (parabola) — deepest at center
         
         curveDepth: how many px the arc dips at center (bigger = more curve)
         yOffset: how far below moon center the path sits (0 = center, positive = lower)
      */
      const curveDepth = moonRadius * 0.08;
      const yOffset = moonRadius * 0.35;
      const pathHalfWidth = moonRadius * 1.05;

      /* Spacing: logos spread evenly, wrap around */
      const count = logos.length;
      const logoSpan = .95;
      const spacing = logoSpan / (count - .5);

      /* Container opacity */
      const fadeStart = 200;
      const fadeOut = sb <= fadeStart ? Math.max(0, sb / fadeStart) : 1;
      el.style.opacity = String(vis ? fadeOut : 0);

      const children = el.children as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < count; i++) {
        const child = children[i];
        if (!child) continue;

        /* t wraps 0→1 continuously */
        const rawT = (progressRef.current + i * spacing) % 1;

        /* Map t to position: -1 (left edge) to +1 (right edge)
           We extend beyond visible range so logos enter/exit smoothly */
        const extendedT = rawT * 2.5 - 1.5; /* range: -1.5 to 1.5 */

        /* X position: linear across moon */
        const x = moonCenterX + extendedT * pathHalfWidth;

        /* Y position: parabola — dips down at center (extendedT=0) */
        const y = moonCenterY + yOffset + curveDepth * (extendedT * extendedT);

        /* Fade: visible only when within the moon face (-1 to 1) */
        const absT = Math.abs(extendedT);
        let opacity = 0;
        if (absT < 2) {
          opacity = 1 - absT;
          opacity = opacity * opacity * (3 - 2 * opacity);
        }

        const s = 0.85 + 0.15 * Math.max(0, 1 - absT);

        const rotateY = extendedT * 120;

child.style.transform =
  "translate(" + x + "px," + y + "px) translate(-50%,-50%) perspective(800px) rotateY(" + rotateY + "deg) scale(" + s + ")";
        child.style.opacity = String(opacity * 1.85);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        transition: "opacity 0.5s ease",
      }}
    >
      {logos.map((logo) => (
        <img
          key={logo.name}
          src={"/logos/" + logo.file}
          alt={logo.name}
          draggable={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 90,
            width: "auto",
            maxWidth: 100,
            objectFit: "contain",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
              
          }}
        />
      ))}
    </div>
  );
}
