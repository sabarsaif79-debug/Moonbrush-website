"use client";

import { useState, useEffect } from "react";
import PlatformLayout, {
  useRevealOnScroll,
  RevealGroup,
  GlassCard,
  AnimStat,
  SectionDivider,
} from "@/components/PlatformLayout";

const ACCENT = "#c084fc";

const lensCategories = [
  { id: "01", title: "Channel Engagement & Reachability", models: 12, desc: "Email, SMS, digital ads, mobile/desktop, daypart responsiveness, media saturation.", color: "#93c5fd" },
  { id: "02", title: "Cognitive Style & Behavioral Processing", models: 16, desc: "Information processing, impulse control, complexity tolerance, burnout saturation.", color: "#a78bfa" },
  { id: "03", title: "Decision Style & Trust Dynamics", models: 12, desc: "Research depth, risk tolerance, privacy sensitivity, skepticism, rational vs. emotional.", color: "#c084fc" },
  { id: "04", title: "Emotional & Psychographic Orientation", models: 23, desc: "Emotional sensitivity, nostalgia, hope, frustration tolerance, social validation.", color: "#f0abfc" },
  { id: "05", title: "Environmental, Social & Cultural Context", models: 20, desc: "Geography, cultural affinity, conformity pressure, civic cohesion, social influence.", color: "#6ee7b7" },
  { id: "06", title: "Identity & Self-Concept", models: 16, desc: "Self-perception, aspirational alignment, identity defensiveness, autonomy, resilience.", color: "#fcd34d" },
  { id: "07", title: "Longitudinal Behavior & Trajectory", models: 8, desc: "Behavioral stability, interest momentum, commitment follow-through, future prediction.", color: "#fca5a5" },
  { id: "08", title: "Messaging, Content & Influence Pathways", models: 16, desc: "Urgency, authority, social proof, narrative persuasion, humor sensitivity.", color: "#93c5fd" },
  { id: "09", title: "Motivational Architecture", models: 13, desc: "Drive systems, growth mindset, reward processing, pain avoidance, authenticity.", color: "#a78bfa" },
  { id: "10", title: "Purchase Drivers & Financial Behavior", models: 19, desc: "Impulse buying, brand loyalty, coupon conversion, subscription fatigue, deal hunting.", color: "#6ee7b7" },
  { id: "11", title: "Values, Ideology & Worldview", models: 26, desc: "Ethical consumption, civic engagement, individualism, moral foundations, spirituality.", color: "#fcd34d" },
];

const signalTypes = [
  {
    name: "Boost",
    desc: "Weighted positive signal. If the individual fits the criteria, their score increases proportionally.",
    icon: "↑",
    color: "#6ee7b7",
    example: "Top 75th percentile of SMS engagement → boost score by 2x",
  },
  {
    name: "Gate",
    desc: "Hard prerequisite. The individual must fit the criteria to qualify at all. If not met — excluded.",
    icon: "⊞",
    color: "#fcd34d",
    example: "Must be in income bracket $75k+ → gate requirement",
  },
  {
    name: "Exclude",
    desc: "Inverse of Gate. If the individual fits the criteria, they are removed from the model entirely.",
    icon: "⊘",
    color: "#f87171",
    example: "Existing customers → exclude from acquisition model",
  },
];

const scoringSystems = [
  {
    series: "E-Scores",
    title: "Behavioral Enrichments",
    count: "181",
    range: "0 – 1",
    desc: "Continuous behavioral scores across 11 lens categories. Updated dynamically as new data flows in.",
    color: "#c084fc",
  },
  {
    series: "IN-Scores",
    title: "Identity, Lifestyle & Life Stage",
    count: "Hundreds",
    range: "0 – 6",
    desc: "Three cohorts per dimension: 0–2 (low), 2–4 (moderate), 4–6 (high). Granular refinement within each band.",
    color: "#93c5fd",
  },
  {
    series: "JB-Scores",
    title: "Role & Work Style",
    count: "Hundreds",
    range: "0 – 6",
    desc: "Professional behavior, decision-making patterns, leadership styles derived from job function and digital activity.",
    color: "#6ee7b7",
  },
  {
    series: "BR-Scores",
    title: "Brand & Retailer Affinity",
    count: "Thousands",
    range: "0 – 1",
    desc: "Engagement, loyalty, and purchase history with specific brands. Competitive conquest and look-alike building.",
    color: "#fcd34d",
  },
  {
    series: "L-Scores",
    title: "Interest, Hobby & Lifestyle",
    count: "Hundreds",
    range: "0 – 6",
    desc: "Outdoor recreation, culinary interests, entertainment, travel styles, cultural consumption patterns.",
    color: "#f0abfc",
  },
];

export default function PlatformBuilderPage() {
  const [loaded, setLoaded] = useState(false);
  const [expandedLens, setExpandedLens] = useState<string | null>(null);

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
            The Intelligence Layer
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            <span style={{ color: "var(--t-text)" }}>181 models. 11 lenses. </span>
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #e9d5ff)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Infinite precision.
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
            Build custom behavioral models using any combination of enrichments, identity scores, 
            brand affinities, and intent signals. Every model is immediately available across the entire platform.
          </p>
        </div>

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
          <AnimStat value="181" label="Enrichment models" color={ACCENT} />
          <AnimStat value="11" label="Lens categories" color="#93c5fd" />
          <AnimStat value="1000s" label="Brand scores" color="#6ee7b7" />
          <AnimStat value="∞" label="Custom models" color="#fcd34d" />
        </div>
      </section>

      {/* ─── BUILDER CONTROLS ─── */}
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
                The Builder
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
                Three signal types. Total control.
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
                For every behavioral characteristic, choose how it affects your model. 
                Boost what matters. Gate what&apos;s required. Exclude what doesn&apos;t belong.
              </p>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {signalTypes.map((s, i) => (
            <GlassCard key={s.name} color={s.color} delay={i * 0.15}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: s.color + "15",
                    border: `1px solid ${s.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    color: s.color,
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 700,
                    color: s.color,
                  }}
                >
                  {s.name}
                </div>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--t-text-muted)",
                  marginBottom: 16,
                }}
              >
                {s.desc}
              </p>
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "var(--t-accent-faint)",
                  border: "1px solid var(--t-border)",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "var(--t-text-faint)",
                  fontStyle: "italic",
                }}
              >
                {s.example}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── 11 LENS CATEGORIES ─── */}
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
                Enrichment Engine
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
                11 analytical lenses. Every angle covered.
              </h2>,
            ]}
          </RevealGroup>
        </div>

        {/* Expandable lens cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {lensCategories.map((lens, i) => {
            const isOpen = expandedLens === lens.id;
            return (
              <GlassCard key={lens.id} color={lens.color} delay={i * 0.05} style={{ cursor: "pointer" }}>
                <div
                  onClick={() => setExpandedLens(isOpen ? null : lens.id)}
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontWeight: 800,
                      color: lens.color,
                      opacity: 0.5,
                      minWidth: 36,
                    }}
                  >
                    {lens.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(15px, 1.5vw, 18px)",
                        fontWeight: 700,
                        color: "var(--t-text)",
                      }}
                    >
                      {lens.title}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "4px 12px",
                      borderRadius: 20,
                      background: lens.color + "15",
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: lens.color,
                    }}
                  >
                    {lens.models} models
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: "var(--t-text-faint)",
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    ▾
                  </div>
                </div>
                <div
                  style={{
                    maxHeight: isOpen ? 100 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--t-text-muted)",
                      margin: "14px 0 0 52px",
                    }}
                  >
                    {lens.desc}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ─── SCORING SYSTEMS ─── */}
      <section style={{ padding: "80px clamp(20px,6vw,80px) 120px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#fcd34d" />

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
                  color: "#fcd34d",
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Scoring Taxonomy
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
                Five scoring systems. Complete behavioral DNA.
              </h2>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {scoringSystems.map((ss, i) => (
            <GlassCard key={ss.series} color={ss.color} delay={i * 0.1}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div
                  style={{
                    padding: "4px 12px",
                    borderRadius: 8,
                    background: ss.color + "15",
                    border: `1px solid ${ss.color}25`,
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: ss.color,
                    letterSpacing: 1,
                  }}
                >
                  {ss.series}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--t-text-faint)",
                    letterSpacing: 1,
                  }}
                >
                  Range: {ss.range}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--t-text)",
                  marginBottom: 4,
                }}
              >
                {ss.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 800,
                  color: ss.color,
                  marginBottom: 8,
                }}
              >
                {ss.count}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "var(--t-text-faint)",
                  margin: 0,
                }}
              >
                {ss.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>
    </PlatformLayout>
  );
}
