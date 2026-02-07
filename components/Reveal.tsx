"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "blur"
  | "clip-up"
  | "clip-left";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  once?: boolean;
  threshold?: number;
  distance?: number;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
}

const getHiddenStyles = (
  variant: RevealVariant,
  distance: number
): CSSProperties => {
  switch (variant) {
    case "fade-up":
      return { opacity: 0, transform: `translateY(${distance}px)` };
    case "fade-down":
      return { opacity: 0, transform: `translateY(-${distance}px)` };
    case "fade-left":
      return { opacity: 0, transform: `translateX(${distance}px)` };
    case "fade-right":
      return { opacity: 0, transform: `translateX(-${distance}px)` };
    case "scale":
      return { opacity: 0, transform: "scale(0.92)" };
    case "blur":
      return { opacity: 0, filter: "blur(12px)", transform: `translateY(${distance * 0.4}px)` };
    case "clip-up":
      return { clipPath: "inset(100% 0 0 0)" };
    case "clip-left":
      return { clipPath: "inset(0 100% 0 0)" };
    default:
      return { opacity: 0, transform: `translateY(${distance}px)` };
  }
};

const getVisibleStyles = (variant: RevealVariant): CSSProperties => {
  switch (variant) {
    case "fade-up":
    case "fade-down":
    case "fade-left":
    case "fade-right":
      return { opacity: 1, transform: "translate(0)" };
    case "scale":
      return { opacity: 1, transform: "scale(1)" };
    case "blur":
      return { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" };
    case "clip-up":
    case "clip-left":
      return { clipPath: "inset(0 0 0 0)" };
    default:
      return { opacity: 1, transform: "translate(0)" };
  }
};

const getTransition = (
  variant: RevealVariant,
  duration: number,
  delay: number
): string => {
  // Premium spring-inspired cubic-bezier
  const spring = "cubic-bezier(0.16, 1, 0.3, 1)";
  const smooth = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  const d = `${duration}s`;
  const del = `${delay}s`;

  switch (variant) {
    case "blur":
      return `opacity ${d} ${spring} ${del}, filter ${d} ${smooth} ${del}, transform ${d} ${spring} ${del}`;
    case "clip-up":
    case "clip-left":
      return `clip-path ${duration * 1.2}s ${spring} ${del}`;
    default:
      return `opacity ${d} ${spring} ${del}, transform ${d} ${spring} ${del}`;
  }
};

export default function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  variant = "fade-up",
  once = true,
  threshold = 0.12,
  distance = 40,
  className = "",
  style = {},
  stagger = 0,
}: RevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const totalDelay = delay + stagger;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: "opacity, transform, filter, clip-path",
        ...(visible
          ? {
              ...getVisibleStyles(variant),
              transition: getTransition(variant, duration, totalDelay),
            }
          : getHiddenStyles(variant, distance)),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
