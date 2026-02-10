"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";
import ThemedSection from "@/components/ThemedSection";
import ThemeToggle from "@/components/ThemeToggle";

interface PlatformLayoutProps {
  children: ReactNode;
  accentColor: string;
}

/* ── Scroll-triggered reveal hook ── */
export function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ── Staggered children reveal ── */
export function RevealGroup({
  children,
  className,
  style,
  stagger = 0.1,
  direction = "up",
}: {
  children: ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  direction?: "up" | "left" | "right";
}) {
  const { ref, visible } = useRevealOnScroll(0.1);

  const getTransform = (d: string) => {
    if (d === "left") return "translateX(-40px)";
    if (d === "right") return "translateX(40px)";
    return "translateY(30px)";
  };

  return (
    <div ref={ref} className={className} style={style}>
      {(children as ReactNode[]).map((child, i) => (
        <div
          key={i}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : getTransform(direction),
            transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/* ── Animated stat counter ── */
export function AnimStat({
  value,
  label,
  color,
  suffix = "",
  prefix = "",
}: {
  value: string;
  label: string;
  color: string;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, visible } = useRevealOnScroll(0.2);

  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display, Syne, sans-serif)",
          fontSize: "clamp(32px, 4vw, 52px)",
          fontWeight: 800,
          color: "var(--t-stat-value, " + color + ")",
          lineHeight: 1,
        }}
      >
        {prefix}{value}{suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--font-body, Outfit, sans-serif)",
          fontSize: 12,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "var(--t-text-muted)",
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Glass card component ── */
export function GlassCard({
  children,
  color = "#93c5fd",
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  color?: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useRevealOnScroll(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        padding: "32px 28px",
        borderRadius: 16,
        background: "var(--t-card-bg)",
        border: "1px solid var(--t-card-border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color + "35";
        e.currentTarget.style.boxShadow = `0 0 30px ${color}15`;
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {children}
    </div>
  );
}

/* ── Section divider ── */
export function SectionDivider({ color = "#93c5fd" }: { color?: string }) {
  return (
    <div
      style={{
        width: 60,
        height: 1,
        margin: "0 auto",
        background: `linear-gradient(90deg, transparent, var(--t-accent-soft, ${color}60), transparent)`,
      }}
    />
  );
}

/* ── Inner layout (needs theme context) ── */
function PlatformInner({
  children,
  accentColor,
}: {
  children: ReactNode;
  accentColor: string;
}) {
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <ThemedSection>
      <div
        style={{
          minHeight: "100vh",
          overflowX: "clip",
          fontFamily: "var(--font-body)",
          color: "var(--t-text)",
          position: "relative",
        }}
      >
        {/* Nav */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            backgroundColor: theme === "dark"
              ? "rgba(6,6,15,0.85)"
              : "rgba(250,251,252,0.85)",
            borderBottom: "1px solid var(--t-border)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(-100%)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            style={{
              maxWidth: 1300,
              margin: "0 auto",
              padding: "0 clamp(20px, 6vw, 80px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 56,
            }}
          >
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                color: "var(--t-text-muted)",
                fontFamily: "var(--font-body, Outfit, sans-serif)",
                fontSize: 13,
                letterSpacing: 1,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--t-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--t-text-muted)";
              }}
            >
              <span style={{ fontSize: 18 }}>←</span>
              <span className="hidden sm:inline">Back to Home</span>
            </Link>

            <span
              className="hidden sm:inline"
              style={{
                fontFamily: "var(--font-body, Outfit, sans-serif)",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "var(--t-text)",
              }}
            >
              Moonbrush
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <ThemeToggle />
              <Link
                href="https://meetings-na2.hubspot.com/adam-syed/moonbrushdemo"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body, Outfit, sans-serif)",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "8px 14px",
                  borderRadius: 8,
                  background: "var(--t-btn-bg)",
                  color: "var(--t-btn-text)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--t-shadow-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {children}

          {/* Footer */}
          <div style={{ position: "relative", zIndex: 10 }}>
            <Footer />
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}

/* ── Main Layout ── */
export default function PlatformLayout({
  children,
  accentColor,
}: PlatformLayoutProps) {
  return (
    <ThemeProvider>
      <PlatformInner accentColor={accentColor}>
        {children}
      </PlatformInner>
    </ThemeProvider>
  );
}
