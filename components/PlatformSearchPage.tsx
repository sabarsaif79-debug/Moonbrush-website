"use client";

import { useState, useEffect } from "react";
import PlatformLayout, {
  useRevealOnScroll,
  RevealGroup,
  GlassCard,
  AnimStat,
  SectionDivider,
} from "@/components/PlatformLayout";

const ACCENT = "#6ee7b7";

const filterCategories = [
  {
    title: "Personal",
    color: "#93c5fd",
    filters: ["Gender", "Age range", "Income range", "Net worth", "Education", "Marital status", "Household composition", "Homeownership", "State / Zip"],
  },
  {
    title: "Professional",
    color: "#c084fc",
    filters: ["Job title", "Seniority", "Department", "Company name", "Revenue", "Company size", "Industry", "SIC / NAICS"],
  },
  {
    title: "Behavioral",
    color: "#6ee7b7",
    filters: ["181 enrichment scores", "Configurable thresholds", "Top percentile targeting", "Channel engagement", "Decision dynamics", "Emotional orientation"],
  },
  {
    title: "Intent",
    color: "#fcd34d",
    filters: ["Active purchase intent", "Search behavior signals", "Comparison shopping", "Category-specific browsing", "Thousands of topics"],
  },
  {
    title: "Brand & Lifestyle",
    color: "#f0abfc",
    filters: ["Brand engagement", "Retailer affinity", "Purchase history", "Interest indicators", "Hobby patterns", "Lifestyle affinities"],
  },
  {
    title: "Custom",
    color: "#fca5a5",
    filters: ["Builder models", "Custom segments", "Score thresholds", "Nested combinations", "Layered targeting"],
  },
];

const profileSections = [
  {
    label: "Demographics",
    items: ["Name, age, gender", "Marital status, household", "Income, net worth, education"],
    color: "#93c5fd",
  },
  {
    label: "Professional",
    items: ["Job title, seniority, department", "Company, size, revenue, industry", "Business email, LinkedIn URL"],
    color: "#c084fc",
  },
  {
    label: "Contact",
    items: ["Personal phone, mobile, direct", "Personal & business email", "Full mailing addresses"],
    color: "#6ee7b7",
  },
  {
    label: "Behavioral Profile",
    items: ["All 181 enrichment scores", "Identity & lifestyle scores", "Brand affinities, intent signals"],
    color: "#fcd34d",
  },
  {
    label: "Digital Activity",
    items: ["Real-time behavior feed", "Recent browsing & engagement", "Validation of data accuracy"],
    color: "#f0abfc",
  },
];

const workshopLenses = [
  "Channel Engagement", "Cognitive Style", "Decision Dynamics",
  "Emotional Orientation", "Environmental Context", "Identity & Self-Concept",
  "Longitudinal Behavior", "Messaging Pathways", "Motivational Architecture",
  "Purchase Drivers", "Values & Worldview", "Raw Data",
];

const pricingComparison = [
  { provider: "Traditional data lists", cost: "$5k–$10k+/mo", model: "Per-record + contact fees", depth: "Basic demographics" },
  { provider: "Moonbrush", cost: "Flat rate", model: "Unlimited access", depth: "Full behavioral intelligence" },
];

export default function PlatformSearchPage() {
  const [loaded, setLoaded] = useState(false);

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
            Search & Workshop
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
            <span style={{ color: "var(--t-text)" }}>289M+ profiles. </span>
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #a7f3d0)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Zero per-record fees.
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
            Search the entire U.S. consumer graph with behavioral, intent, and brand affinity filters. 
            Drill into any individual&apos;s complete behavioral profile. Unlimited. Flat rate.
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
          <AnimStat value="289M+" label="Consumer profiles" color={ACCENT} />
          <AnimStat value="6" label="Filter categories" color="#c084fc" />
          <AnimStat value="12" label="Workshop lenses" color="#fcd34d" />
          <AnimStat value="$0" label="Per-record cost" color="#f0abfc" />
        </div>
      </section>

      {/* ─── SEARCH FILTERS ─── */}
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
                Consumer Graph Search
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
                Six dimensions. Unlimited discovery.
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
                Every filter combines with every other filter. Custom models from the Builder 
                appear as search criteria instantly. No credits. No limits.
              </p>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {filterCategories.map((cat, i) => (
            <GlassCard key={cat.title} color={cat.color} delay={i * 0.08}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  color: cat.color,
                  marginBottom: 14,
                }}
              >
                {cat.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {cat.filters.map((f) => (
                  <span
                    key={f}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 20,
                      background: "var(--t-card-bg)",
                      border: "1px solid var(--t-card-border)",
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "var(--t-text-muted)",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── WORKSHOP ─── */}
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
                The Workshop
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
                Where audiences live, breathe, and are understood.
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
                The central workspace for exploring, analyzing, and activating audiences. 
                12 analytical lenses provide instant behavioral overviews against national averages.
              </p>,
            ]}
          </RevealGroup>
        </div>

        {/* Workshop lenses grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 60,
          }}
        >
          {workshopLenses.map((lens, i) => {
            const rv = useRevealOnScroll(0.1);
            return (
              <div
                key={lens}
                ref={rv.ref}
                style={{
                  padding: "10px 20px",
                  borderRadius: 12,
                  background: "var(--t-card-bg)",
                  border: "1px solid rgba(192,132,252,0.15)",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--t-text-muted)",
                  opacity: rv.visible ? 1 : 0,
                  transform: rv.visible ? "none" : "translateY(12px)",
                  transition: `all 0.5s ease ${i * 0.05}s`,
                }}
              >
                {lens}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── INDIVIDUAL PROFILES ─── */}
      <section style={{ padding: "80px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
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
                Individual Profiles
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
                Drill into any person. See everything.
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
                10 years in the making. A capability no competitor can match — down-to-the-individual 
                behavioral insight that goes far beyond contact data.
              </p>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {profileSections.map((sec, i) => (
            <GlassCard key={sec.label} color={sec.color} delay={i * 0.1}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 700,
                  color: sec.color,
                  marginBottom: 14,
                }}
              >
                {sec.label}
              </div>
              {sec.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 0",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--t-text-muted)",
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: sec.color,
                      flexShrink: 0,
                      opacity: 0.6,
                    }}
                  />
                  {item}
                </div>
              ))}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── PRICING COMPARISON ─── */}
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
                Pricing Model
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
                Replace multiple vendors with one platform.
              </h2>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
          {pricingComparison.map((p, i) => (
            <GlassCard
              key={p.provider}
              color={i === 1 ? ACCENT : "rgba(255,255,255,0.2)"}
              delay={i * 0.15}
              style={i === 1 ? { border: `1px solid ${ACCENT}35`, background: `linear-gradient(135deg, ${ACCENT}10, rgba(255,255,255,0.03))` } : {}}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 700,
                  color: i === 1 ? ACCENT : "var(--t-text-muted)",
                  marginBottom: 20,
                }}
              >
                {p.provider}
              </div>
              {[
                { label: "Cost", value: p.cost },
                { label: "Model", value: p.model },
                { label: "Depth", value: p.depth },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--t-border)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--t-text-faint)" }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: i === 1 ? "var(--t-text)" : "var(--t-text-muted)",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </GlassCard>
          ))}
        </div>
      </section>
    </PlatformLayout>
  );
}
