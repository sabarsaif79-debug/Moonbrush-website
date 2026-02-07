"use client";

import { useRef, useState, useCallback, ReactNode, useEffect } from "react";

interface ScrollCarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  gap?: number;
  showNav?: boolean;
}

export default function ScrollCarousel({
  children,
  autoPlay = false,
  autoPlayInterval = 4000,
  gap = 24,
  showNav = true,
}: ScrollCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const checkBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkBounds, { passive: true });
    checkBounds();
    return () => el.removeEventListener("scroll", checkBounds);
  }, [checkBounds]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const cardWidth = el.children[0]?.clientWidth || 300;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      }
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, gap]);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.children[0]?.clientWidth || 300;
    el.scrollBy({
      left: dir === "next" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: 60,
          background: `linear-gradient(to right, var(--t-bg), transparent)`,
          opacity: canPrev ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{
          width: 60,
          background: `linear-gradient(to left, var(--t-bg), transparent)`,
          opacity: canNext ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{
          gap,
          scrollSnapType: "x mandatory",
          paddingBottom: 8,
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            style={{
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Nav arrows */}
      {showNav && (
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid var(--t-card-border)",
              background: "var(--t-card-bg)",
              cursor: canPrev ? "pointer" : "default",
              opacity: canPrev ? 1 : 0.3,
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8L10 13"
                stroke="var(--t-text-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("next")}
            disabled={!canNext}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid var(--t-card-border)",
              background: "var(--t-card-bg)",
              cursor: canNext ? "pointer" : "default",
              opacity: canNext ? 1 : 0.3,
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3L11 8L6 13"
                stroke="var(--t-text-muted)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
