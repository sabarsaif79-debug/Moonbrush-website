"use client";

import { ReactNode } from "react";

interface CardDeckProps {
  children: ReactNode[];
}

export default function CardDeck({ children }: CardDeckProps) {
  const total = children.length;

  const elements: ReactNode[] = [];

  children.forEach((child, i) => {
    const isLast = i === total - 1;

    elements.push(
      <div
        key={`card-${i}`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: (i + 1) * 10,
          background: "var(--t-bg, #0b0b14)",
          boxShadow: isLast
            ? "none"
            : i > 0
              ? "0 -10px 40px rgba(0,0,0,0.8)"
              : "none",
        }}
      >
        {child}
      </div>
    );

    elements.push(
      <div
        key={`spacer-${i}`}
        style={{ height: "50vh" }}
      />
    );
  });

  return <div>{elements}</div>;
}
