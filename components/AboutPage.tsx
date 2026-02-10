"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PlatformLayout, {
  useRevealOnScroll,
  RevealGroup,
  GlassCard,
  AnimStat,
  SectionDivider,
} from "@/components/PlatformLayout";

const ACCENT = "#fcd34d";

const timeline = [
  {
    year: "2016",
    title: "Political Origins",
    desc: "Moonbrush begins as a political campaign data company — where behavioral intelligence is not optional, it's survival. Every voter touchpoint must resonate on a deeply personal level. The behavioral thesis is born.",
  },
  {
    year: "2018",
    title: "Consumer Graph Foundations",
    desc: "The 289M+ consumer graph takes shape. First-party, second-party, and third-party data streams are aggregated into a single behavioral intelligence layer covering the entire U.S. population.",
  },
  {
    year: "2020",
    title: "Behavioral Model Library",
    desc: "181 proprietary enrichment models are developed across 11 behavioral lenses — from emotional responsiveness to decision dynamics to motivational architecture. Each model dual-layered: rules-based baseline + adaptive ML.",
  },
  {
    year: "2022",
    title: "Commercial Expansion",
    desc: "The same behavioral intelligence that won campaigns enters the commercial market. Enterprise brands, agencies, and mid-market companies gain access to political-grade behavioral targeting.",
  },
  {
    year: "2024",
    title: "PRISM Engine",
    desc: "Dynamic creative personalization launches — generating thousands of individually-tailored creative variants from a single input asset. 130+ messaging atoms. Every dimension adapted to individual psychology.",
  },
  {
    year: "2026",
    title: "Global Intelligence",
    desc: "International expansion underway. Alternative credit scoring for the unbanked. Insurance underwriting in emerging markets. Behavioral intelligence goes global.",
  },
];

const thesisPillars = [
  {
    title: "Demographics Are Insufficient",
    desc: "Age, income, and location cannot explain why two identical demographic profiles respond completely differently to the same message. The difference is behavioral — rooted in psychology, not spreadsheets.",
    color: "#93c5fd",
  },
  {
    title: "The Iceberg Below the Surface",
    desc: "Every competitor provides the tip: demographics, firmographics, basic intent. Moonbrush reveals the 90% below — psychographics, emotional drivers, decision styles, motivational architecture, and hundreds more behavioral dimensions.",
    color: "#c084fc",
  },
  {
    title: "Intelligence Drives Action",
    desc: "Behavioral intelligence is only valuable if it translates into action. Every model connects directly to audience targeting, creative personalization, and messaging optimization. A score is not just an insight — it's an activation lever.",
    color: "#6ee7b7",
  },
  {
    title: "Not a Channel — An Intelligence Layer",
    desc: "Moonbrush doesn't compete with marketing tools. It powers them. The platform makes every connected channel more effective by feeding it behavioral intelligence that transforms generic outreach into personalized communication.",
    color: "#fcd34d",
  },
];

const numbers = [
  { value: "289M+", label: "US consumer profiles", color: "#93c5fd" },
  { value: "181", label: "Behavioral enrichment models", color: "#c084fc" },
  { value: "10B+", label: "Daily signals ingested", color: "#6ee7b7" },
  { value: "2,574", label: "Brand affinity scores", color: "#fcd34d" },
  { value: "7,000+", label: "Intent topic signals", color: "#f0abfc" },
  { value: "342", label: "Psychographic insight scales", color: "#fca5a5" },
  { value: "999+", label: "Pre-built audience playbooks", color: "#93c5fd" },
  { value: "245+", label: "PRISM messaging atoms", color: "#c084fc" },
];

const teams = [
  {
    title: "Behavioral Science",
    desc: "Interprets behavioral data, designs targeting strategies, translates profiles into creative briefs, and advises on audience psychology. Available to every client.",
    color: "#c084fc",
  },
  {
    title: "Data Science",
    desc: "Handles behavioral modeling, audience segmentation, predictive analytics, Playbook optimization, and continuous performance analysis.",
    color: "#93c5fd",
  },
  {
    title: "Solutions Architecture",
    desc: "Manages complete integration with existing MarTech and AdTech stacks. New CRM integrations scoped and built within one week.",
    color: "#6ee7b7",
  },
  {
    title: "Creative Implementation",
    desc: "Translates behavioral intelligence into campaign creative — ensuring insights about psychology, preferences, and messaging resonance are reflected in deployed assets.",
    color: "#fcd34d",
  },
];

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <PlatformLayout accentColor={ACCENT}>
      {/* HERO */}
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "140px clamp(20px,6vw,80px) 60px",
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
              color: "var(--t-accent)",
              opacity: 0.7,
              marginBottom: 20,
            }}
          >
            About Moonbrush
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 850,
              margin: "0 auto",
              color: "var(--t-text)",
            }}
          >
            10 years in the making.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #fcd34d, #fca5a5, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Born from politics. Built for everyone.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.6vw, 19px)",
              lineHeight: 1.75,
              color: "var(--t-text-muted)",
              maxWidth: 640,
              margin: "24px auto 0",
            }}
          >
            Moonbrush started where outcomes are immediate and unforgiving — political campaigns.
            The behavioral intelligence thesis was proven in elections, then brought to commercial
            marketing to solve the same fundamental problem: demographics don&apos;t predict behavior.
          </p>
        </div>
      </section>

      {/* THE THESIS */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color={ACCENT} />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 50 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--t-text)",
              marginBottom: 16,
            }}
          >
            The behavioral intelligence thesis.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {thesisPillars.map((p, i) => (
            <GlassCard key={p.title} color={p.color} delay={i * 0.08}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: p.color,
                  marginBottom: 10,
                }}
              >
                {p.title}
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
                {p.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#c084fc" />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 50 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--t-text)",
            }}
          >
            A decade of behavioral intelligence.
          </h2>
        </div>

        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, var(--t-accent-soft), transparent)",
            }}
          />

          {timeline.map((t, i) => (
            <div
              key={t.year}
              style={{
                display: "flex",
                gap: 24,
                paddingLeft: 0,
                marginBottom: 40,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 40,
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 4,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "var(--t-accent)",
                    boxShadow: "0 0 12px var(--t-accent-soft)",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--t-accent)",
                    letterSpacing: 2,
                    marginBottom: 6,
                  }}
                >
                  {t.year}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--t-text)",
                    marginBottom: 6,
                  }}
                >
                  {t.title}
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
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#6ee7b7" />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 50 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--t-text)",
            }}
          >
            Platform by the numbers.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
          }}
        >
          {numbers.map((n, i) => (
            <div
              key={n.label}
              style={{
                padding: "24px 16px",
                borderRadius: 12,
                background: "var(--t-card-bg)",
                border: "1px solid var(--t-card-border)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 800,
                  color: n.color,
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {n.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "var(--t-text-faint)",
                }}
              >
                {n.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEDICATED TEAMS */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#93c5fd" />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 50 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--t-text)",
              marginBottom: 16,
            }}
          >
            Your teams. Built in.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--t-text-muted)",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Every Moonbrush client gets access to dedicated support teams that would cost $500K–$1M+ annually to hire in-house.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {teams.map((t, i) => (
            <GlassCard key={t.title} color={t.color}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: t.color,
                  marginBottom: 10,
                }}
              >
                {t.title}
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
                {t.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* COMPLIANCE */}
      <section style={{ padding: "60px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <GlassCard color={ACCENT} style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--t-text)",
              marginBottom: 12,
            }}
          >
            Compliance as Standard
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--t-text-muted)",
              maxWidth: 600,
              margin: "0 auto 16px",
            }}
          >
            HIPAA, SOC 2, ISO 27001, GDPR, and CCPA compliance maintained across the entire platform.
            Not tiered. Not add-on. Every customer, every plan level.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
            {["HIPAA", "SOC 2", "ISO 27001", "GDPR", "CCPA"].map((cert) => (
              <span
                key={cert}
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  background: ACCENT + "12",
                  border: `1px solid ${ACCENT}25`,
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: ACCENT,
                  letterSpacing: 1,
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: "60px clamp(20px,6vw,80px) 120px", textAlign: "center" }}>
        <Link
          href="https://meetings-na2.hubspot.com/adam-syed/moonbrushdemo"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 36px",
            borderRadius: 10,
            background: "var(--t-btn-bg)",
            color: "var(--t-btn-text)",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Book a Demo →
        </Link>
      </section>
    </PlatformLayout>
  );
}
