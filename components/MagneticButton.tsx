"use client";

import { useRef, useState, ReactNode, CSSProperties } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  strength?: number;
  as?: "a" | "button";
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  style = {},
  strength = 0.3,
  as,
}: MagneticButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setHovered(false);
  };

  const Tag = as || (href ? "a" : "button");

  const mergedStyle: CSSProperties = {
    ...style,
    display: "inline-block",
    transform: `translate(${offset.x}px, ${offset.y}px) scale(${hovered ? 1.03 : 1})`,
    transition: hovered
      ? "transform 0.15s ease-out"
      : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    // @ts-ignore
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      className={className}
      style={mergedStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </Tag>
  );
}
