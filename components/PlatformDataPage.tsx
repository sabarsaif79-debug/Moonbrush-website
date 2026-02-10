"use client";

import { useState, useEffect } from "react";
import PlatformLayout, {
  useRevealOnScroll,
  RevealGroup,
  GlassCard,
  AnimStat,
  SectionDivider,
} from "@/components/PlatformLayout";

const ACCENT = "#93c5fd";

const dataSources = [
  {
    tag: "First-Party",
    title: "Proprietary Collection",
    desc: "Cookies, pixels, and direct tracking mechanisms that capture digital behavior patterns, browsing activity, engagement metrics, and conversion signals across the web.",
    icon: "◈",
    color: "#93c5fd",
  },
  {
    tag: "Second-Party",
    title: "Cooperative Networks",
    desc: "Transactional data from loyalty programs, purchase behavior from retail cooperatives, and contact-level enrichments from co-op networks — every swipe, scan, and signup.",
    icon: "◇",
    color: "#c084fc",
  },
  {
    tag: "Third-Party",
    title: "External Enrichment",
    desc: "Credit bureau data, government records, education history, professional registrations, digital activity tracking, and social platform behavior patterns.",
    icon: "○",
    color: "#6ee7b7",
  },
];

const matchKeys = [
  {
    keys: "3+",
    label: "Strict",
    accuracy: "98%+",
    desc: "Ideal for audience enrichment where one-to-one accuracy is critical.",
    color: "#6ee7b7",
  },
  {
    keys: "2",
    label: "Balanced",
    accuracy: "High",
    desc: "Broader coverage for behavioral trend analysis and audience understanding.",
    color: "#fcd34d",
  },
  {
    keys: "1",
    label: "Broad",
    accuracy: "Wide",
    desc: "Maximum coverage for broad behavioral pattern identification across large populations.",
    color: "#f87171",
  },
];

const compliance = [
  { icon: "🔒", label: "SOC 2 Type II", desc: "Continuous security monitoring" },
  { icon: "🛡️", label: "ISO 27001", desc: "Information security management" },
  { icon: "🏥", label: "HIPAA", desc: "Healthcare data protection" },
  { icon: "🇪🇺", label: "GDPR", desc: "EU data privacy regulation" },
  { icon: "🌴", label: "CCPA", desc: "California consumer privacy" },
  { icon: "🔐", label: "End-to-End Encryption", desc: "Data in transit and at rest" },
];

const intakeMethods = [
  { title: "CSV Upload", desc: "Auto-detects columns and maps to Moonbrush's schema", icon: "📄" },
  { title: "SQL Databases", desc: "Direct connections for automated, recurring sync", icon: "🗄️" },
  { title: "Data Warehouses", desc: "Snowflake, BigQuery, Redshift integration", icon: "🏗️" },
  { title: "Object Stores", desc: "S3, Azure Blob for unstructured data", icon: "☁️" },
  { title: "CRM Integrations", desc: "New integrations scoped within one week", icon: "🔗" },
];

const predictiveExamples = [
  "Subscriber status (active vs. lapsed)",
  "Lifetime value (LTV) as numeric score",
  "High-value donor flag",
  "Customer tier classification",
  "Churn risk indicator",
];

export default function PlatformDataPage() {
  const [loaded, setLoaded] = useState(false);
  const hero = useRevealOnScroll(0.1);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <PlatformLayout accentColor={ACCENT}>
      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "140px clamp(20px,6vw,80px) 80px",
        }}
      >
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ACCENT,
              opacity: 0.7,
              marginBottom: 20,
            }}
          >
            The Foundation
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display, Syne, sans-serif)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            <span style={{ color: "var(--t-text)" }}>
              Data infrastructure{" "}
            </span>
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #e0e7ff)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              built for depth.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.6vw, 19px)",
              lineHeight: 1.75,
              color: "var(--t-text-muted)",
              maxWidth: 600,
              margin: "24px auto 0",
            }}
          >
            10 billion signals flow through the platform daily — enriching 289M+ individual profiles 
            with hundreds of behavioral dimensions. Not sample data. Not modeled estimates. Living intelligence.
          </p>
        </div>

        {/* Stat anchors */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 32,
            maxWidth: 700,
            width: "100%",
            marginTop: 60,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
          }}
        >
          <AnimStat value="10B+" label="Daily signals" color={ACCENT} />
          <AnimStat value="289M+" label="US profiles" color="#c084fc" />
          <AnimStat value="300+" label="Data points per person" color="#6ee7b7" />
          <AnimStat value="98%+" label="Match accuracy" color="#fcd34d" />
        </div>

        {/* Scroll cue */}
        <div
          style={{
            marginTop: 80,
            opacity: loaded ? 0.3 : 0,
            transition: "opacity 1.5s ease 2s",
          }}
        >
          <div
            style={{
              width: 1,
              height: 50,
              margin: "0 auto",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
              animation: "plat-pulse 2s ease-in-out infinite",
            }}
          />
          <style>{`@keyframes plat-pulse { 0%,100% { opacity:0.3; transform:scaleY(0.8) } 50% { opacity:0.7; transform:scaleY(1) } }`}</style>
        </div>
      </section>

      {/* ─── THE CONSUMER GRAPH ─── */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color={ACCENT} />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 60 }}>
          <RevealGroup stagger={0.12} direction="up">
            {[
              <div
                key="tag"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: ACCENT,
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Consumer Graph
              </div>,
              <h2
                key="h2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                289 million people. Hundreds of dimensions each.
              </h2>,
              <p
                key="p"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--t-text-muted)",
                  maxWidth: 620,
                  margin: "0 auto",
                }}
              >
                Each profile aggregates data from first-party, second-party, and third-party streams — 
                enriched with proprietary behavioral models, identity scores, lifestyle indicators, 
                and real-time digital activity signals.
              </p>,
            ]}
          </RevealGroup>
        </div>

        {/* Data sources */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {dataSources.map((src, i) => (
            <GlassCard key={src.tag} color={src.color} delay={i * 0.12}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 24, color: src.color }}>{src.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: src.color,
                      opacity: 0.7,
                    }}
                  >
                    {src.tag}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--t-text)",
                    }}
                  >
                    {src.title}
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--t-text-muted)",
                  margin: 0,
                }}
              >
                {src.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── DATA INTAKE ─── */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#c084fc" />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 60 }}>
          <RevealGroup stagger={0.12} direction="up">
            {[
              <div
                key="tag"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "#c084fc",
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Data Intake
              </div>,
              <h2
                key="h2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Your data in. Our intelligence out.
              </h2>,
              <p
                key="p"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--t-text-muted)",
                  maxWidth: 620,
                  margin: "0 auto",
                }}
              >
                Multiple pathways to onboard your existing customer data — from simple CSV uploads 
                to enterprise-grade warehouse connections. Self-service simplicity with enterprise-grade depth.
              </p>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {intakeMethods.map((m, i) => (
            <GlassCard key={m.title} color="#c084fc" delay={i * 0.08}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{m.icon}</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--t-text)",
                  marginBottom: 6,
                }}
              >
                {m.title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--t-text-faint)",
                  margin: 0,
                }}
              >
                {m.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── IDENTITY RESOLUTION ─── */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#6ee7b7" />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 60 }}>
          <RevealGroup stagger={0.12} direction="up">
            {[
              <div
                key="tag"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "#6ee7b7",
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Identity Resolution
              </div>,
              <h2
                key="h2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Multi-key matching. 98%+ accuracy.
              </h2>,
              <p
                key="p"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--t-text-muted)",
                  maxWidth: 620,
                  margin: "0 auto",
                }}
              >
                Map your customer records to the 289M consumer graph using a configurable multi-key system. 
                You control the trade-off between precision and coverage.
              </p>,
            ]}
          </RevealGroup>
        </div>

        {/* Match key cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {matchKeys.map((mk, i) => (
            <GlassCard key={mk.keys} color={mk.color} delay={i * 0.15}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 40,
                      fontWeight: 800,
                      color: mk.color,
                      lineHeight: 1,
                    }}
                  >
                    {mk.keys}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "var(--t-text-muted)",
                      marginLeft: 8,
                    }}
                  >
                    keys
                  </span>
                </div>
                <div
                  style={{
                    padding: "4px 14px",
                    borderRadius: 20,
                    background: mk.color + "15",
                    border: `1px solid ${mk.color}30`,
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: mk.color,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {mk.label}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--t-text)",
                  marginBottom: 6,
                }}
              >
                {mk.accuracy} accuracy
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--t-text-faint)",
                  margin: 0,
                }}
              >
                {mk.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── PREDICTIVE COLUMNS ─── */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#fcd34d" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: 40,
            marginTop: 60,
            alignItems: "center",
          }}
        >
          <RevealGroup stagger={0.12} direction="left">
            {[
              <div
                key="tag"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "#fcd34d",
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Predictive Columns
              </div>,
              <h2
                key="h2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Your data becomes a nationwide lens.
              </h2>,
              <p
                key="p"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--t-text-muted)",
                }}
              >
                Designate any unique data point as a &quot;predictive column&quot; — and Moonbrush uses 300+ 
                data points per individual to predict how the rest of the country maps against your 
                client-specific characteristics.
              </p>,
            ]}
          </RevealGroup>

          <GlassCard color="#fcd34d" delay={0.3}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#fcd34d",
                opacity: 0.7,
                marginBottom: 16,
              }}
            >
              Common Predictive Columns
            </div>
            {predictiveExamples.map((ex, i) => (
              <div
                key={ex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: i < predictiveExamples.length - 1
                    ? "1px solid var(--t-border)"
                    : "none",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#fcd34d",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--t-text-muted)",
                  }}
                >
                  {ex}
                </span>
              </div>
            ))}
          </GlassCard>
        </div>
      </section>

      {/* ─── COMPLIANCE ─── */}
      <section style={{ padding: "80px clamp(20px,6vw,80px) 120px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color={ACCENT} />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 60 }}>
          <RevealGroup stagger={0.12} direction="up">
            {[
              <div
                key="tag"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: ACCENT,
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Compliance & Governance
              </div>,
              <h2
                key="h2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Built into every layer. Not bolted on.
              </h2>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {compliance.map((c, i) => (
            <GlassCard key={c.label} color={ACCENT} delay={i * 0.08}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--t-text)",
                  marginBottom: 4,
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "var(--t-text-faint)",
                }}
              >
                {c.desc}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </PlatformLayout>
  );
}
