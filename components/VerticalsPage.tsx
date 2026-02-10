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

const ACCENT = "#c084fc";

const verticals = [
  {
    id: "retail",
    eyebrow: "Retail & E-Commerce",
    title: "Know your shoppers before they know themselves.",
    color: "#93c5fd",
    desc: "Behavioral intelligence transforms retail from broad segment blasting to individual-level personalization. Understand purchase drivers, brand affinities, channel preferences, and emotional triggers for every shopper in your database — and millions more who look like your best customers.",
    useCases: [
      "Competitive conquest — target competitor brand shoppers with behaviorally-matched messaging",
      "Lapsed customer reactivation using churn prediction and motivational profiling",
      "Personalized direct mail through DG3 partnership — every piece unique to the recipient",
      "Cross-sell and upsell powered by lifestyle affinity and purchase trajectory models",
      "Seasonal campaign optimization using behavioral daypart and channel preference data",
      "LTV prediction across the full consumer graph to find high-value lookalikes nationwide",
    ],
    keyModels: ["Brand Affinity (2,574 BR-Scores)", "Purchase Drivers", "Impulse vs. Deliberation", "Channel Engagement", "Deal Sensitivity", "Subscription Fatigue"],
    platforms: ["Klaviyo", "Shopify", "HubSpot", "DSPs", "Direct Mail (DG3)", "SMS"],
  },
  {
    id: "finance",
    eyebrow: "Financial Services",
    title: "Risk, trust, and decision style — scored for every individual.",
    color: "#6ee7b7",
    desc: "Financial decisions are deeply behavioral. Risk tolerance, trust dynamics, decision velocity, and financial anxiety all drive how individuals evaluate financial products. Moonbrush's behavioral models capture these dimensions at individual level — enabling personalization that generic demographic targeting cannot achieve.",
    useCases: [
      "Alternative credit scoring using behavioral signals for underbanked populations",
      "Product recommendation based on risk posture, financial anxiety, and decision style",
      "Advisor matching using communication preference and trust dynamic profiles",
      "Retention campaigns targeting at-risk accounts with behaviorally-personalized messaging",
      "Compliance-safe personalization — HIPAA, SOC 2, ISO 27001, GDPR, CCPA built in",
      "Wealth management prospect identification using lifestyle, net worth, and aspiration models",
    ],
    keyModels: ["Risk Tolerance", "Financial Anxiety", "Trust Dynamics", "Decision Velocity", "Privacy Sensitivity", "Authority Responsiveness"],
    platforms: ["Salesforce", "HubSpot", "DSPs", "Email", "Direct Mail", "SMS"],
  },
  {
    id: "healthcare",
    eyebrow: "Healthcare",
    title: "Patient engagement driven by behavioral science, not assumptions.",
    color: "#f87171",
    desc: "Healthcare marketing requires both behavioral depth and regulatory compliance. Moonbrush delivers both — HIPAA-compliant behavioral intelligence that understands health-seeking behaviors, wellness engagement, preventive care adoption, and the emotional and cognitive factors that drive healthcare decisions.",
    useCases: [
      "Patient acquisition using health vitality spectrum and care-seeking behavior models",
      "Preventive care campaign targeting based on wellness engagement and health anxiety scores",
      "Provider communication optimization — match messaging tone to patient cognitive style",
      "Clinical trial recruitment using behavioral profiles to identify qualified, willing participants",
      "Chronic condition management outreach personalized to individual motivational drivers",
      "Health plan enrollment campaigns using decision style and information processing models",
    ],
    keyModels: ["Health Vitality Spectrum", "Care-Seeking Behavior", "Cognitive Load Tolerance", "Emotional Sensitivity", "Authority Trust", "Information Processing Style"],
    platforms: ["Epic integrations", "Salesforce Health Cloud", "DSPs", "Direct Mail", "Email"],
  },
  {
    id: "political",
    eyebrow: "Political & Advocacy",
    title: "Born from politics. Built for behavioral persuasion.",
    color: "#fcd34d",
    desc: "Moonbrush originated in political campaign data — this is where the behavioral intelligence thesis was proven. Voting is emotional. Political decisions are driven by values, fears, aspirations, and community identity. The platform captures exactly these dimensions for every voter in the graph.",
    useCases: [
      "Persuadable voter identification using emotional responsiveness and value system models",
      "Issue-specific micro-targeting — healthcare voters get healthcare messaging, economy voters get economy messaging",
      "Block walking optimization with individual-level talking points at every door",
      "Phone bank scripts tailored to each voter's communication style and decision dynamics",
      "Consistent cross-channel narrative tracking — mail, digital, canvass, phone all reinforcing",
      "Real-time sentiment shift detection through digital behavior monitoring",
    ],
    keyModels: ["Civic Identity Spectrum", "Moral Foundation Center of Gravity", "Emotional Responsiveness", "Value Systems", "Community Interaction", "Information Trust"],
    platforms: ["DSPs", "Direct Mail (1:1 via DG3)", "Phone Banks", "Canvassing Lists", "SMS", "Email"],
  },
  {
    id: "agencies",
    eyebrow: "Marketing Agencies",
    title: "Prove your value with outcomes, not promises.",
    color: "#f0abfc",
    desc: "Client skepticism is at an all-time high. AI is commoditizing basic execution. Agencies need genuine differentiation. Moonbrush gives agencies an embedded behavioral science team, data science team, and a platform that delivers measurable behavioral targeting results no competing agency can match.",
    useCases: [
      "Client kickoff meetings using BCP to demonstrate immediate behavioral targeting value",
      "Cross-client behavioral intelligence — scale expertise across your portfolio without scaling headcount",
      "Pitch differentiation with Workshop lens analysis and behavioral audience breakdowns",
      "Campaign performance uplift through scientific Playbook activation formulas",
      "White-label behavioral micro-cohorting and personalized creative for client campaigns",
      "Measurable ROI proof — behavioral campaigns vs. demographic campaigns, side by side",
    ],
    keyModels: ["Full 181 E-Score library", "BCP Questionnaire", "Workshop 12-Lens Analysis", "Playbook Engine", "Custom Builder Models"],
    platforms: ["All major DSPs", "Email platforms", "SMS", "Direct Mail", "Client CRM integrations (1 week)"],
  },
  {
    id: "nonprofit",
    eyebrow: "Nonprofits & Advocacy",
    title: "Turn donors into lifelong supporters.",
    color: "#fca5a5",
    desc: "Donor behavior is driven by emotional connection, values alignment, and trust. Moonbrush's behavioral models capture the psychological drivers behind giving — enabling nonprofits to personalize outreach, predict donor lifetime value, reactivate lapsed supporters, and find new donors who share the behavioral DNA of their best contributors.",
    useCases: [
      "High-value donor lookalike modeling using LTV as predictive column across 289M profiles",
      "Lapsed donor reactivation with motivational profiling and personalized re-engagement",
      "Direct mail personalization — every appeal letter tailored to individual giving psychology",
      "Event and volunteer recruitment using civic identity and community engagement scores",
      "Grant and major gift prospect identification using wealth indicators and philanthropic behavior models",
      "Advocacy campaign targeting using moral foundation and values alignment models",
    ],
    keyModels: ["Philanthropic Propensity", "Civic Identity Spectrum", "Emotional Sensitivity", "Values & Worldview", "Community Interaction", "Motivational Architecture"],
    platforms: ["Mailchimp", "Salesforce Nonprofit", "Direct Mail (DG3)", "DSPs", "SMS", "Email"],
  },
];

export default function VerticalsPage() {
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
            Industry Verticals
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 800,
              margin: "0 auto",
              color: "var(--t-text)",
            }}
          >
            Behavioral intelligence,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c084fc, #f0abfc, #fcd34d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              industry-specific.
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
            Same platform. Same 289M+ graph. Different applications.
            Each vertical gets the models, workflows, and integrations that matter most.
          </p>
        </div>

        {/* Jump nav */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            marginTop: 40,
            opacity: loaded ? 1 : 0,
            transition: "all 1s ease 0.6s",
          }}
        >
          {verticals.map((v) => (
            <a
              key={v.id}
              href={`#${v.id}`}
              style={{
                padding: "8px 18px",
                borderRadius: 24,
                background: "var(--t-card-bg)",
                border: `1px solid ${v.color}25`,
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: v.color,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = v.color + "15";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--t-card-bg)";
              }}
            >
              {v.eyebrow}
            </a>
          ))}
        </div>
      </section>

      {/* VERTICAL SECTIONS */}
      {verticals.map((v, i) => (
        <section
          key={v.id}
          id={v.id}
          style={{
            padding: "80px clamp(20px,6vw,80px)",
            maxWidth: 1200,
            margin: "0 auto",
            scrollMarginTop: 80,
          }}
        >
          <SectionDivider color={v.color} />

          <div style={{ marginTop: 50, marginBottom: 40 }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: v.color,
                opacity: 0.7,
                marginBottom: 14,
              }}
            >
              {v.eyebrow}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--t-text)",
                maxWidth: 650,
                marginBottom: 16,
              }}
            >
              {v.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.75,
                color: "var(--t-text-muted)",
                maxWidth: 650,
              }}
            >
              {v.desc}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
              gap: 20,
              alignItems: "start",
            }}
          >
            {/* Use cases */}
            <GlassCard color={v.color}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: v.color,
                  opacity: 0.7,
                  marginBottom: 16,
                }}
              >
                Use Cases
              </div>
              {v.useCases.map((uc, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "8px 0",
                    borderBottom: j < v.useCases.length - 1 ? "1px solid var(--t-border)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: v.color,
                      marginTop: 7,
                      flexShrink: 0,
                      opacity: 0.6,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--t-text-muted)",
                    }}
                  >
                    {uc}
                  </span>
                </div>
              ))}
            </GlassCard>

            {/* Right column: models + platforms */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <GlassCard color={v.color}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: v.color,
                    opacity: 0.7,
                    marginBottom: 14,
                  }}
                >
                  Key Behavioral Models
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {v.keyModels.map((m) => (
                    <span
                      key={m}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 20,
                        background: v.color + "12",
                        border: `1px solid ${v.color}25`,
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: v.color,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard color={v.color}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: v.color,
                    opacity: 0.7,
                    marginBottom: 14,
                  }}
                >
                  Integrations & Channels
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {v.platforms.map((p) => (
                    <span
                      key={p}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 20,
                        background: "var(--t-card-bg)",
                        border: "1px solid var(--t-card-border)",
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "var(--t-text-muted)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* CTA */}
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 28px",
                  borderRadius: 10,
                  background: v.color,
                  color: "#0a0a1a",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  width: "fit-content",
                }}
              >
                Book a {v.eyebrow} Demo →
              </Link>
            </div>
          </div>
        </section>
      ))}
    </PlatformLayout>
  );
}
