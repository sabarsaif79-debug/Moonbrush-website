"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParallaxLayer({
  children,
  speed = 0.15,
  className = "",
  style = {},
}: ParallaxLayerProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Only calculate when in/near viewport
      if (rect.top < windowH + 200 && rect.bottom > -200) {
        const center = rect.top + rect.height / 2 - windowH / 2;
        setOffset(center * speed);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translateY(${offset}px)`,
        willChange: "transform",
        transition: "transform 0.1s linear",
      }}
    >
      {children}
    </div>
  );
}
