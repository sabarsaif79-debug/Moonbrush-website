"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

interface HorizontalScrollProps {
  children: ReactNode[];
  /** Optional dot nav labels */
  labels?: string[];
}

export default function HorizontalScroll({
  children,
  labels,
}: HorizontalScrollProps) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const total = children.length;

  /* Snap to slide */
  const goTo = (i: number) => {
    if (i < 0 || i >= total) return;
    setActive(i);
  };

  /* Touch swipe */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && active < total - 1) goTo(active + 1);
      if (dx > 0 && active > 0) goTo(active - 1);
    }
  };

  /* Mouse drag */
  const mouseStart = useRef(0);
  const dragging = useRef(false);
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStart.current = e.clientX;
    dragging.current = true;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.clientX - mouseStart.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && active < total - 1) goTo(active + 1);
      if (dx > 0 && active > 0) goTo(active - 1);
    }
  };

  /* Wheel (horizontal or vertical) */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let canSwipe = true;
    const onWheel = (e: WheelEvent) => {
      if (!canSwipe) return;
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.deltaY;
      if (Math.abs(delta) < 20) return;
      canSwipe = false;
      if (delta > 0 && active < total - 1)
        setActive((p) => Math.min(p + 1, total - 1));
      else if (delta < 0 && active > 0)
        setActive((p) => Math.max(p - 1, 0));
      setTimeout(() => {
        canSwipe = true;
      }, 600);
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active, total]);

  return (
    <div
      ref={trackRef}
      style={{ position: "relative", overflow: "hidden" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Slide track */}
      <div
        style={{
          display: "flex",
          width: `${total * 100}%`,
          transform: `translateX(-${(active / total) * 100}%)`,
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          cursor: "grab",
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            style={{
              width: `${100 / total}%`,
              flexShrink: 0,
              padding: "0 clamp(20px, 4vw, 60px)",
              boxSizing: "border-box",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 40,
          alignItems: "center",
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={labels?.[i] || `Slide ${i + 1}`}
            style={{
              width: active === i ? 32 : 10,
              height: 10,
              borderRadius: 5,
              border: "none",
              background:
                active === i
                  ? "var(--t-accent, #93c5fd)"
                  : "var(--t-text-faint, rgba(255,255,255,0.2))",
              cursor: "pointer",
              transition: "all 0.4s ease",
              opacity: active === i ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {/* Labels if provided */}
      {labels && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginTop: 12,
          }}
        >
          {labels.map((label, i) => (
            <button
              key={label}
              onClick={() => goTo(i)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color:
                  active === i
                    ? "var(--t-accent, #93c5fd)"
                    : "var(--t-text-faint, rgba(255,255,255,0.4))",
                transition: "color 0.3s ease",
                padding: "4px 0",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Arrow hints */}
      {active > 0 && (
        <button
          onClick={() => goTo(active - 1)}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "var(--t-card-bg, rgba(255,255,255,0.05))",
            border: "1px solid var(--t-border, rgba(255,255,255,0.1))",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--t-text-primary, #fff)",
            fontSize: 18,
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            zIndex: 5,
          }}
        >
          ‹
        </button>
      )}
      {active < total - 1 && (
        <button
          onClick={() => goTo(active + 1)}
          aria-label="Next"
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "var(--t-card-bg, rgba(255,255,255,0.05))",
            border: "1px solid var(--t-border, rgba(255,255,255,0.1))",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--t-text-primary, #fff)",
            fontSize: 18,
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            zIndex: 5,
          }}
        >
          ›
        </button>
      )}
    </div>
  );
}
