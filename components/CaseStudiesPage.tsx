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

const ACCENT = "#6ee7b7";

const caseStudies = [
  {
    id: "restaurant-chain",
    client: "National Restaurant Chain",
    vertical: "Retail & Hospitality",
    color: "#93c5fd",
    challenge:
      "A major restaurant group was spending heavily on broad demographic targeting for new location launches and seasonal promotions. Conversion rates were declining, and customer acquisition costs were climbing year over year.",
    approach: [
      "Ingested 2.4M customer records and resolved against the consumer graph at 97.8% match rate",
      "Built custom behavioral models using LTV as predictive column — identified key behavioral signatures of high-value diners",
      "Playbook analysis revealed 96% of top customers indexed against 'lifestyle aspirational' visual style vs. 33% national average",
      "PRISM generated 840+ creative variants across DSP, email, and direct mail channels",
      "Each variant tailored to individual motivational drivers, channel preferences, and dining behavior patterns",
    ],
    results: [
      { metric: "312%", label: "Increase in campaign ROI" },
      { metric: "47%", label: "Reduction in acquisition cost" },
      { metric: "2.8x", label: "Improvement in email engagement" },
      { metric: "6 wks", label: "From onboarding to first activation" },
    ],
    quote:
      "We went from guessing to knowing exactly who our best customers are and what makes them respond.",
  },
  {
    id: "financial-services",
    client: "Regional Financial Institution",
    vertical: "Financial Services",
    color: "#6ee7b7",
    challenge:
      "A regional bank needed to grow its wealth management division but was limited to basic demographic targeting. Their existing data vendor provided contact lists with no behavioral depth, and campaigns were generating low-quality leads.",
    approach: [
      "Mapped existing client base to consumer graph and identified behavioral patterns of highest-AUM clients",
      "Built wealth management propensity model using financial anxiety, risk tolerance, and decision style scores",
      "Workshop analysis revealed trust dynamics as the primary differentiator — high-value prospects needed authority-based proof",
      "Playbook produced 5 behavioral cohorts with distinct messaging strategies per cohort",
      "Activated across direct mail (1:1 personalized via DG3), email sequences, and targeted DSP campaigns",
    ],
    results: [
      { metric: "189%", label: "Increase in qualified leads" },
      { metric: "4.2x", label: "Higher conversion to consultation" },
      { metric: "$12M", label: "New AUM in first quarter" },
      { metric: "62%", label: "Lower cost per qualified lead" },
    ],
    quote:
      "The behavioral profiling showed us that our best prospects weren't who we thought they were demographically — but their behavioral patterns were unmistakable.",
  },
  {
    id: "political-campaign",
    client: "Statewide Political Campaign",
    vertical: "Political & Advocacy",
    color: "#fcd34d",
    challenge:
      "A statewide campaign was struggling with message consistency across canvassing, phone banking, direct mail, and digital advertising. Voter outreach was generic, and persuadable voter identification was based on outdated polling models.",
    approach: [
      "Behavioral voter profiles built across the full voter file using civic identity, moral foundation, and emotional responsiveness models",
      "Identified 340K persuadable voters based on behavioral volatility and value system alignment — not party registration",
      "Cross-channel activation with narrative consistency: canvass scripts, phone scripts, mail pieces, and digital ads all reinforcing the same issue themes per voter",
      "Real-time digital behavior monitoring detected sentiment shift on education policy — campaign pivoted messaging within 48 hours",
      "Block walking lists enriched with individual talking points based on each voter's motivational drivers",
    ],
    results: [
      { metric: "+8.3", label: "Point swing in persuadable voters" },
      { metric: "340K", label: "Behaviorally-targeted voters" },
      { metric: "48 hrs", label: "Sentiment-to-pivot response time" },
      { metric: "4", label: "Channels with unified behavioral targeting" },
    ],
    quote:
      "For the first time, every door knocked and every mail piece sent was informed by actual behavioral intelligence — not just a voter file with a party label.",
  },
  {
    id: "ecommerce-dtc",
    client: "DTC E-Commerce Brand",
    vertical: "E-Commerce",
    color: "#c084fc",
    challenge:
      "A growing DTC brand was spending $8,500/month across ZoomInfo, Bombora, and two other data vendors for basic prospect lists and intent signals. Data quality was inconsistent, and there was no behavioral layer connecting their disparate data sources.",
    approach: [
      "Consolidated all data vendor subscriptions into single Moonbrush flat-rate access",
      "Customer file resolved against consumer graph — revealed behavioral segments invisible to demographic-only targeting",
      "BCP questionnaire identified 3 behavioral profiles that mapped to 78% of repeat purchasers",
      "Builder models created for competitive conquest — targeted shoppers of 4 competitor brands based on brand affinity scores",
      "Activated through Klaviyo email integration and programmatic DSP campaigns",
    ],
    results: [
      { metric: "73%", label: "Reduction in data vendor spend" },
      { metric: "2.1x", label: "Increase in repeat purchase rate" },
      { metric: "41%", label: "Higher email revenue per send" },
      { metric: "1", label: "Platform replacing 4 vendors" },
    ],
    quote:
      "We were spending nearly $100K a year on data that gave us names and emails. Moonbrush gave us the psychology behind every customer.",
  },
  {
    id: "nonprofit",
    client: "National Nonprofit Organization",
    vertical: "Nonprofit & Advocacy",
    color: "#fca5a5",
    challenge:
      "A national nonprofit was seeing declining donor retention and rising acquisition costs. Their direct mail campaigns used the same appeal letter for all donors regardless of giving history, motivation, or engagement level.",
    approach: [
      "Donor file enriched with full behavioral profiles — philanthropic propensity, motivational architecture, and emotional sensitivity scores",
      "LTV predictive column identified behavioral DNA of $1,000+ annual donors — projected across full consumer graph to find lookalikes",
      "Playbook segmented donors into 4 motivational cohorts: legacy builders, community champions, justice seekers, and quiet givers",
      "Direct mail campaign via DG3 — every appeal letter personalized to individual motivational driver and communication style",
      "Lapsed donor reactivation campaign using behavioral re-engagement triggers specific to each individual's giving psychology",
    ],
    results: [
      { metric: "156%", label: "Increase in donor reactivation" },
      { metric: "38%", label: "Higher average gift amount" },
      { metric: "23K", label: "New high-propensity donors identified" },
      { metric: "4.7x", label: "Direct mail ROI improvement" },
    ],
    quote:
      "We stopped treating all donors the same. When you speak to someone's actual motivation for giving, they give more — and they stay.",
  },
];

export default function CaseStudiesPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <PlatformLayout accentColor={ACCENT}>
      {/* HERO */}
      <section
        style={{
          minHeight: "70vh",
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
            Case Studies
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
            Behavioral intelligence.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6ee7b7, #93c5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Measurable results.
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
            Real outcomes from real campaigns. Every case study demonstrates the gap between
            demographic targeting and behavioral intelligence.
          </p>
        </div>
      </section>

      {/* CASE STUDIES */}
      {caseStudies.map((cs, i) => (
        <section
          key={cs.id}
          id={cs.id}
          style={{
            padding: "80px clamp(20px,6vw,80px)",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <SectionDivider color={cs.color} />

          <div style={{ marginTop: 50, marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span
                style={{
                  padding: "4px 14px",
                  borderRadius: 20,
                  background: cs.color + "15",
                  border: `1px solid ${cs.color}25`,
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: cs.color,
                }}
              >
                {cs.vertical}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3vw, 38px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--t-text)",
                marginBottom: 12,
              }}
            >
              {cs.client}
            </h2>
          </div>

          {/* Results strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 16,
              marginBottom: 30,
            }}
          >
            {cs.results.map((r) => (
              <div
                key={r.label}
                style={{
                  padding: "20px 16px",
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
                    color: cs.color,
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {r.metric}
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
                  {r.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 20,
              alignItems: "start",
            }}
          >
            {/* Challenge */}
            <GlassCard color={cs.color}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: cs.color,
                  opacity: 0.7,
                  marginBottom: 14,
                }}
              >
                The Challenge
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
                {cs.challenge}
              </p>
            </GlassCard>

            {/* Approach */}
            <GlassCard color={cs.color}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: cs.color,
                  opacity: 0.7,
                  marginBottom: 14,
                }}
              >
                The Approach
              </div>
              {cs.approach.map((step, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "6px 0",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: cs.color,
                      opacity: 0.5,
                      marginTop: 2,
                      minWidth: 18,
                    }}
                  >
                    {String(j + 1).padStart(2, "0")}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--t-text-muted)",
                    }}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </GlassCard>
          </div>

          {/* Quote */}
          <div
            style={{
              marginTop: 24,
              padding: "24px 28px",
              borderRadius: 12,
              borderLeft: `3px solid ${cs.color}`,
              background: "var(--t-card-bg)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                fontStyle: "italic",
                lineHeight: 1.7,
                color: "var(--t-text-muted)",
                margin: 0,
              }}
            >
              &ldquo;{cs.quote}&rdquo;
            </p>
          </div>
        </section>
      ))}

      {/* BOTTOM CTA */}
      <section
        style={{
          padding: "60px clamp(20px,6vw,80px) 120px",
          textAlign: "center",
        }}
      >
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
            transition: "all 0.3s ease",
          }}
        >
          See These Results for Yourself →
        </Link>
      </section>
    </PlatformLayout>
  );
}
