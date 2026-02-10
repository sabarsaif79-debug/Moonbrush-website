"use client";

import { useState, useEffect } from "react";
import PlatformLayout, {
  useRevealOnScroll,
  RevealGroup,
  GlassCard,
  AnimStat,
  SectionDivider,
} from "@/components/PlatformLayout";

const ACCENT = "#fcd34d";

const playbookDimensions = [
  {
    category: "Activation",
    count: 25,
    options: "380+",
    color: "#fcd34d",
    examples: ["Channel", "Offer Type", "Incentive Type", "Frequency Cap", "Daypart Targeting", "Attention Window", "Journey Stage", "Device Priority", "Geo-Targeting", "Bidding Strategy", "Sequencing", "Landing Experience"],
  },
  {
    category: "Creative",
    count: 20,
    options: "374+",
    color: "#c084fc",
    examples: ["Visual Style", "Tone of Voice", "Format Type", "Color Strategy", "Typography Style", "CTA Style", "Personalization Level", "Motion Strategy", "Copy Length", "Social Proof Display"],
  },
  {
    category: "Messaging",
    count: 9,
    options: "245+",
    color: "#93c5fd",
    examples: ["Motivation Driver", "Objection Handling", "Narrative Framework", "Decision Style Match", "Emotional Temperature", "Proof Type", "Risk Posture", "Reciprocity Frame", "CTA Style"],
  },
];

const messagingAtoms = [
  { name: "Motivation", desc: "What drives the individual to act", examples: "Exclusivity, achievement, discovery, security, belonging, autonomy", color: "#fcd34d" },
  { name: "Objection Handling", desc: "Pre-emptive responses to resistance points", examples: "Price, trust, effort, timing, switching costs, risk, quality", color: "#f87171" },
  { name: "Proof Type", desc: "Evidence the individual finds persuasive", examples: "Statistics, testimonials, expert endorsement, case studies, guarantees", color: "#6ee7b7" },
  { name: "Decision Style", desc: "How the individual processes decisions", examples: "Analytical, emotional, social, authority-driven, experiential", color: "#93c5fd" },
  { name: "Emotional Temperature", desc: "Calibrating emotional intensity", examples: "Calm reassurance, warm excitement, urgent energy, cool logic", color: "#c084fc" },
  { name: "Risk Posture", desc: "Degree of risk mitigation needed", examples: "Low risk tolerance → heavy guarantees, high → bold propositions", color: "#f0abfc" },
  { name: "CTA Style", desc: "Conversion approach tailored to behavior", examples: "Direct, soft, social, scarcity, curiosity, value-first", color: "#fca5a5" },
];

const channels = [
  { name: "DSP / Programmatic", desc: "Real-time, one-to-one targeting at scale. Display, CTV/OTT, mobile, affiliate networks.", icon: "📡", color: "#93c5fd" },
  { name: "Email Marketing", desc: "Behavioral segmentation driving message personalization, send timing, and subject lines.", icon: "✉️", color: "#c084fc" },
  { name: "SMS", desc: "Targeted, behaviorally personalized text messages with optimized timing and tone.", icon: "💬", color: "#6ee7b7" },
  { name: "Direct Mail", desc: "One-to-one personalized physical mail through variable-data printing partnerships.", icon: "📮", color: "#fcd34d" },
];

const bcpSteps = [
  { step: "01", title: "Answer behavioral questions", desc: "Describe your product, service, or campaign goals through a guided questionnaire." },
  { step: "02", title: "AI recommends characteristics", desc: "Moonbrush's AI maps your answers to specific enrichment scores, intent signals, and identity indicators." },
  { step: "03", title: "Auto-create models", desc: "The BCP output feeds directly into the Builder, creating models and segments automatically." },
  { step: "04", title: "Activate immediately", desc: "Audiences are instantly available for search, workshop analysis, playbook execution, and channel deployment." },
];

export default function PlatformActivationPage() {
  const [loaded, setLoaded] = useState(false);
  const [openDim, setOpenDim] = useState<string | null>("Activation");

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
            From Intelligence to Impact
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 850,
              margin: "0 auto",
            }}
          >
            <span style={{ color: "var(--t-text)" }}>Login to activation </span>
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #fef3c7)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              in under 20 minutes.
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
            The Playbook engine analyzes every individual across 54 dimensions, PRISM generates 
            thousands of creative variants, and the activation layer deploys across every channel simultaneously.
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
          <AnimStat value="54" label="Playbook dimensions" color={ACCENT} />
          <AnimStat value="1,000+" label="Dimension options" color="#c084fc" />
          <AnimStat value="130+" label="Messaging atoms" color="#6ee7b7" />
          <AnimStat value="4" label="Activation channels" color="#93c5fd" />
        </div>
      </section>

      {/* ─── PLAYBOOK ENGINE ─── */}
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
                The Playbook Engine
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
                54 dimensions. 1,000+ options. One optimal path.
              </h2>,
              <p
                key="p"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--t-text-muted)",
                  maxWidth: 640,
                  margin: "0 auto",
                }}
              >
                The Playbook takes any audience and determines the optimal way to separate individuals 
                into behavioral cohorts for messaging, creative, and activation — not a suggestion, a directive.
              </p>,
            ]}
          </RevealGroup>
        </div>

        {/* Dimension categories — expandable */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {playbookDimensions.map((dim, i) => {
            const isOpen = openDim === dim.category;
            return (
              <GlassCard key={dim.category} color={dim.color} delay={i * 0.12}>
                <div
                  onClick={() => setOpenDim(isOpen ? null : dim.category)}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 20 }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 40,
                      fontWeight: 800,
                      color: dim.color,
                      lineHeight: 1,
                      minWidth: 60,
                    }}
                  >
                    {dim.count}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--t-text)",
                      }}
                    >
                      {dim.category} Dimensions
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "var(--t-text-faint)",
                        marginTop: 2,
                      }}
                    >
                      {dim.options} options across {dim.count} dimensions
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 18,
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
                    maxHeight: isOpen ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 20,
                      paddingTop: 16,
                      borderTop: "1px solid var(--t-border)",
                    }}
                  >
                    {dim.examples.map((ex) => (
                      <span
                        key={ex}
                        style={{
                          padding: "6px 14px",
                          borderRadius: 20,
                          background: dim.color + "12",
                          border: `1px solid ${dim.color}25`,
                          fontFamily: "var(--font-body)",
                          fontSize: 12,
                          fontWeight: 500,
                          color: dim.color,
                        }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ─── BCP QUESTIONNAIRE ─── */}
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
                Behavioral Customer Profile
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
                From brief to behavioral model in minutes.
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
                The BCP replaces traditional ICPs with AI-powered behavioral profiling. 
                Describe your goals — Moonbrush does the rest.
              </p>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {bcpSteps.map((s, i) => (
            <GlassCard key={s.step} color="#6ee7b7" delay={i * 0.12}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#6ee7b7",
                  opacity: 0.4,
                  marginBottom: 12,
                }}
              >
                {s.step}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--t-text)",
                  marginBottom: 8,
                }}
              >
                {s.title}
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
                {s.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── PRISM ENGINE ─── */}
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
                PRISM Engine
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
                One creative in. Thousands of variants out.
              </h2>,
              <p
                key="p"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--t-text-muted)",
                  maxWidth: 640,
                  margin: "0 auto",
                }}
              >
                PRISM takes your creative, your brand guidelines, and your target audience — then generates 
                thousands of personalized variants, each mapped to individual behavioral profiles using 130+ messaging atoms.
              </p>,
            ]}
          </RevealGroup>
        </div>

        {/* Messaging atoms */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {messagingAtoms.map((atom, i) => (
            <GlassCard key={atom.name} color={atom.color} delay={i * 0.08}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: atom.color,
                  marginBottom: 6,
                }}
              >
                {atom.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--t-text-muted)",
                  marginBottom: 12,
                }}
              >
                {atom.desc}
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: "var(--t-accent-faint)",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "var(--t-text-faint)",
                  lineHeight: 1.5,
                }}
              >
                {atom.examples}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── ACTIVATION CHANNELS ─── */}
      <section style={{ padding: "80px clamp(20px,6vw,80px) 120px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#93c5fd" />

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
                  color: "#93c5fd",
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Activation Channels
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
                Deploy everywhere. Personalize everything.
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
                Moonbrush is not a channel — it powers every channel. Seamless deployment of enriched, 
                segmented, and personalized audiences with complete lineage tracking.
              </p>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {channels.map((ch, i) => (
            <GlassCard key={ch.name} color={ch.color} delay={i * 0.12}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{ch.icon}</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 19,
                  fontWeight: 700,
                  color: "var(--t-text)",
                  marginBottom: 8,
                }}
              >
                {ch.name}
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
                {ch.desc}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Lineage callout */}
        <GlassCard color="#93c5fd" delay={0.5} style={{ marginTop: 30, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 700,
              color: "#93c5fd",
              marginBottom: 8,
            }}
          >
            Full Lineage Tracking
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--t-text-muted)",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Complete audit trail showing origin, transformations, and segmentation history 
            of every audience sent to a destination. Full transparency and reproducibility.
          </p>
        </GlassCard>
      </section>
    </PlatformLayout>
  );
}
