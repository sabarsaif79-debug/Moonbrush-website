"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "word" | "line";
  delay?: number;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  highlight?: string;
  highlightStyle?: React.CSSProperties;
}

export default function TextReveal({
  children,
  as: Tag = "h2",
  mode = "word",
  delay = 0,
  staggerDelay = 0.04,
  className = "",
  style = {},
  highlight = "",
  highlightStyle = {},
}: TextRevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const words = children.split(" ");

  return (
    // @ts-ignore
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        display: "flex",
        flexWrap: "wrap",
        gap: "0 0.3em",
        overflow: "hidden",
      }}
    >
      {words.map((word, i) => {
        const isHighlight = highlight && word.includes(highlight);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              paddingBottom: 4,
            }}
          >
            <span
              style={{
                display: "inline-block",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0) rotate(0deg)"
                  : "translateY(110%) rotate(3deg)",
                transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}s`,
                ...(isHighlight ? highlightStyle : {}),
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
