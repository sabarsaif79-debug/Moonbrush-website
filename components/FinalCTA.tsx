"use client";

import { useEffect, useRef, useState } from "react";

export default function FinalCTA() {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "100px clamp(20px, 6vw, 80px)",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--t-glow, rgba(147,197,253,0.05)) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle particle dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "var(--t-accent, #93c5fd)",
            opacity: 0.15 + Math.random() * 0.15,
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-particle {
          from { transform: translateY(0px); }
          to { transform: translateY(-12px); }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 16,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(25px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          Ready to transform your marketing performance?
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.7,
            color: "var(--t-text-muted, rgba(255,255,255,0.55))",
            maxWidth: 520,
            margin: "0 auto 40px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
          }}
        >
          Join CVS, Aldi, and leading brands already driving unprecedented results with behavioral intelligence.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}
        >
          <a
            href="https://meetings-na2.hubspot.com/adam-syed/moonbrushdemo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              padding: "16px 40px",
              borderRadius: 10,
              background: "var(--t-btn-bg, #93c5fd)",
              color: "var(--t-btn-text, #0a0a1a)",
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.3s ease",
              boxShadow: "var(--t-shadow, 0 0 30px rgba(147,197,253,0.2))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "var(--t-shadow-hover, 0 0 50px rgba(147,197,253,0.35))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "var(--t-shadow, 0 0 30px rgba(147,197,253,0.2))";
            }}
          >
            Book a Demo
          </a>

          <a
            href="/contact"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 500,
              padding: "16px 40px",
              borderRadius: 10,
              background: "transparent",
              color: "var(--t-text, #fff)",
              textDecoration: "none",
              display: "inline-block",
              border: "1px solid var(--t-border, rgba(255,255,255,0.15))",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor =
                "var(--t-accent, #93c5fd)";
              e.currentTarget.style.color =
                "var(--t-accent, #93c5fd)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "var(--t-border, rgba(255,255,255,0.15))";
              e.currentTarget.style.color =
                "var(--t-text, #fff)";
            }}
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
}
