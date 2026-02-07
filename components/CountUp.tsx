"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Easeout quint for that premium deceleration feel
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

export default function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  delay = 0,
  className = "",
  style = {},
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutQuint(progress);
      setCount(eased * end);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [end, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          setTimeout(() => animate(), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, delay, started]);

  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toLocaleString();

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}
