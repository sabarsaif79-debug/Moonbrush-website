"use client";

import { useEffect, useRef, useState } from "react";

const certifications = [
  { label: "SOC 2 Type II", icon: "🛡" },
  { label: "ISO 27001", icon: "🔒" },
  { label: "HIPAA", icon: "🏥" },
  { label: "GDPR", icon: "🇪🇺" },
  { label: "CCPA", icon: "📋" },
];

const integrations = [
  "Klaviyo",
  "Mailchimp",
  "HubSpot",
  "Salesforce",
  "Snowflake",
  "BigQuery",
  "Redshift",
  "S3 / Azure",
];

export default function TrustBand() {
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: 20,
      }}
    >
      {/* Security Card */}
      <div
        style={{
          padding: "32px 28px",
          borderRadius: 16,
          background: "var(--t-card-bg, rgba(255,255,255,0.04))",
          border: "1px solid var(--t-border, rgba(255,255,255,0.08))",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "var(--t-accent-soft, rgba(147,197,253,0.6))",
            marginBottom: 12,
          }}
        >
          Security & Compliance
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 10,
            color: "#4b5563",
          }}
        >
          Enterprise-grade security.
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--t-text-muted, rgba(255,255,255,0.55))",
            marginBottom: 24,
          }}
        >
          Compliance built into every layer — not bolted on. End-to-end encryption for all data in transit and at rest.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {certifications.map((cert) => (
            <div
              key={cert.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                background: "var(--t-bg, rgba(0,0,0,0.2))",
                border: "1px solid var(--t-border, rgba(255,255,255,0.06))",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 500,
                color: "#9ca3af",
              }}
            >
              <span style={{ fontSize: 14 }}>{cert.icon}</span>
              {cert.label}
            </div>
          ))}
        </div>
      </div>

      {/* Integrations Card */}
      <div
        style={{
          padding: "32px 28px",
          borderRadius: 16,
          background: "var(--t-card-bg, rgba(255,255,255,0.04))",
          border: "1px solid var(--t-border, rgba(255,255,255,0.08))",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.35s",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "var(--t-accent-soft, rgba(147,197,253,0.6))",
            marginBottom: 12,
          }}
        >
          Integrations
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 10,
            color: "#6366f1",
          }}
        >
          Seamless connections.
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--t-text-muted, rgba(255,255,255,0.55))",
            marginBottom: 24,
          }}
        >
          Connect with the tools you already use. New integrations scoped and delivered within one week.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: 8,
          }}
        >
          {integrations.map((name) => (
            <div
              key={name}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: "var(--t-bg, rgba(0,0,0,0.2))",
                border: "1px solid var(--t-border, rgba(255,255,255,0.06))",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--t-text-muted, rgba(255,255,255,0.55))",
                textAlign: "center",
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Card */}
      <div
        style={{
          padding: "32px 28px",
          borderRadius: 16,
          background: "var(--t-card-bg, rgba(255,255,255,0.04))",
          border: "1px solid var(--t-border, rgba(255,255,255,0.08))",
          gridColumn: "1 / -1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.5s",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "var(--t-accent-soft, rgba(147,197,253,0.6))",
              marginBottom: 12,
            }}
          >
            Pricing
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 10,
              color: "#3b82f6",
            }}
          >
            Flat-rate access. No per-record fees.
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--t-text-muted, rgba(255,255,255,0.55))",
              margin: 0,
            }}
          >
            No credits, no per-contact charges, no hidden costs. Unlimited access to the full 289M+ consumer graph at a single subscription rate — replacing multiple vendor relationships with one platform.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["No Credits", "No Per-Record Fees", "Unlimited Search"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "var(--t-accent, #93c5fd)",
                color: "var(--t-bg, #0a0a1a)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
