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

const ACCENT = "#93c5fd";

/* ── Solution data ── */

const solutions = [
  {
    id: "enterprise",
    eyebrow: "Enterprise",
    title: "Behavioral intelligence at enterprise scale.",
    subtitle:
      "Layer Moonbrush on top of your existing data infrastructure. PRISM generates thousands of creative variants per campaign. Compliance built in.",
    color: "#93c5fd",
    stats: [
      { value: "1:1", label: "Individual personalization" },
      { value: "PRISM", label: "Dynamic creative engine" },
      { value: "5", label: "Compliance certifications" },
    ],
    painPoints: [
      "Massive data assets but no behavioral layer to activate them",
      '"Personalized" campaigns that are really just broad segment targeting',
      "CDPs that promise personalization but deliver rule-based segmentation",
      "Creative bottlenecks — generating variant creative is manual and slow",
      "Fragmented data ecosystem with no unified intelligence layer",
    ],
    capabilities: [
      {
        title: "PRISM Engine",
        desc: "Takes your creative + brand guidelines + audience data → generates thousands of variants, each adapted to individual behavioral psychology. Language, visuals, color, tone, CTA — every dimension personalized.",
        color: "#c084fc",
      },
      {
        title: "Infrastructure Integration",
        desc: "Direct connections into your data lakes, warehouses, CDPs, and enterprise platforms. Behavioral intelligence flows into existing workflows — not a bolt-on, part of your stack.",
        color: "#6ee7b7",
      },
      {
        title: "Compliance Architecture",
        desc: "HIPAA, SOC 2, ISO 27001, GDPR, CCPA maintained as standard. Not tiered, not add-on — every layer of the platform meets enterprise regulatory requirements.",
        color: "#fcd34d",
      },
      {
        title: "Full Behavioral Stack",
        desc: "Everything mid-market gets — enrichment, Builder, Workshop, Playbooks, multi-channel activation — plus PRISM and dedicated enterprise support teams.",
        color: "#93c5fd",
      },
    ],
    cta: "Explore Enterprise",
    href: "/contact?segment=enterprise",
  },
  {
    id: "midmarket",
    eyebrow: "Mid-Market",
    title: "Enterprise-grade behavioral science. Mid-market pricing.",
    subtitle:
      "The full behavioral intelligence workflow — from data intake through personalized activation — designed for teams without data science PhDs.",
    color: "#c084fc",
    stats: [
      { value: "Full", label: "Behavioral stack access" },
      { value: "3", label: "Dedicated support teams" },
      { value: "1 wk", label: "New CRM integrations" },
    ],
    painPoints: [
      "Demographic targeting is insufficient but behavioral science is out of budget",
      "Enterprise competitors running hyper-personalized campaigns while you rely on broad segments",
      "Marketing automation platforms underutilized — lack behavioral intelligence to power them",
      "Multiple point solutions (data, intent, enrichment, ABM) without a unifying layer",
      "No budget for dedicated behavioral science or data science teams",
    ],
    capabilities: [
      {
        title: "Scientific Conversion Formula",
        desc: "Playbooks analyze your audience across 54 dimensions and produce the optimal behavioral split — channel, offer, messaging, creative, timing — for each micro-cohort.",
        color: "#fcd34d",
      },
      {
        title: "Behavioral Science Team",
        desc: "Dedicated behavioral scientists interpret data, design targeting strategies, translate insights into creative briefs, and advise on messaging psychology. No hire required.",
        color: "#c084fc",
      },
      {
        title: "Solutions Architect",
        desc: "A dedicated architect manages integration with Klaviyo, HubSpot, Salesforce, Mailchimp — any platform. New CRM integrations scoped and built within one week.",
        color: "#6ee7b7",
      },
      {
        title: "Workshop Research Lab",
        desc: "Twelve behavioral lenses provide instant audience analysis that would cost six figures from a consulting firm. Understand how your audience thinks, decides, and acts.",
        color: "#93c5fd",
      },
    ],
    cta: "Explore Mid-Market",
    href: "/contact?segment=midmarket",
  },
  {
    id: "smallbusiness",
    eyebrow: "Small Business & Start-Ups",
    title: "Fortune 500 data. Start-up pricing.",
    subtitle:
      "The same 289M+ consumer graph that powers enterprise campaigns — at a flat monthly rate with zero per-record costs. Replace multiple vendor subscriptions with one platform.",
    color: "#6ee7b7",
    stats: [
      { value: "$0", label: "Per-record cost" },
      { value: "All", label: "Contact data included" },
      { value: "1", label: "Platform replaces many" },
    ],
    painPoints: [
      "Paying $5k–$10k/month on per-record data lists from ZoomInfo, Apollo, Aristotle",
      "Purchased data is incomplete, outdated, or locked behind credit systems",
      "No access to behavioral or psychographic data at any price",
      "Feeling locked out of sophisticated targeting — only enterprises can afford it",
      "Managing multiple vendor relationships that fragment the data picture",
    ],
    capabilities: [
      {
        title: "Flat-Rate Data Access",
        desc: "The entire 289M consumer graph. Personal, professional, behavioral, intent, brand affinity — all included. No per-record charges, no credits, no add-on fees for emails or phone numbers.",
        color: "#6ee7b7",
      },
      {
        title: "BCP Questionnaire",
        desc: "Answer simple business questions — AI translates answers into sophisticated behavioral targeting. Enterprise-grade targeting accessible to anyone, no behavioral science expertise needed.",
        color: "#c084fc",
      },
      {
        title: "Existing Tool Integration",
        desc: "Moonbrush plugs into Klaviyo, Mailchimp, HubSpot, Shopify — the tools you already use. No stack overhaul. It enriches and powers what you already have.",
        color: "#93c5fd",
      },
      {
        title: "Multi-Vendor Replacement",
        desc: "Instead of ZoomInfo for contacts, Bombora for intent, another tool for firmographics, and another for behavioral signals — get everything aggregated at one price.",
        color: "#fcd34d",
      },
    ],
    cta: "Explore Small Business",
    href: "/contact?segment=smallbusiness",
  },
  {
    id: "agencies",
    eyebrow: "Agencies",
    title: "In an era of agency skepticism, behavioral intelligence proves your value.",
    subtitle:
      "An out-of-the-box behavioral science team and data science team become part of your agency. Offer capabilities no competing agency can match.",
    color: "#fcd34d",
    stats: [
      { value: "2", label: "Embedded expert teams" },
      { value: "BCP", label: "Client kickoff tool" },
      { value: "∞", label: "Client portfolio scale" },
    ],
    painPoints: [
      "Client skepticism about whether agency services deliver genuine value",
      "Pressure to justify fees with measurable, differentiated outcomes",
      "No in-house behavioral science or data science — expensive to hire",
      "Competitors claiming AI capabilities without real behavioral intelligence",
      "Commoditization of basic marketing execution by AI tools",
    ],
    capabilities: [
      {
        title: "Behavioral Science Team",
        desc: "Interprets behavioral data, designs targeting strategies, translates profiles into creative briefs, advises on audience psychology. Yours to leverage across your entire client portfolio.",
        color: "#c084fc",
      },
      {
        title: "Data Science Team",
        desc: "Handles behavioral modeling, audience segmentation, predictive analytics, Playbook optimization, and campaign analysis. Eliminates the need to hire your own data scientists.",
        color: "#93c5fd",
      },
      {
        title: "BCP for Client Kickoffs",
        desc: "Use the guided questionnaire with clients in real time during kickoff meetings. Translates business language into behavioral targeting instantly — demonstrates immediate value.",
        color: "#fcd34d",
      },
      {
        title: "White-Label Intelligence",
        desc: "Behavioral micro-cohorting, scientific Playbooks, and one-to-one creative personalization — capabilities that become part of your agency's offering without revealing the source.",
        color: "#6ee7b7",
      },
    ],
    cta: "Explore Agency Model",
    href: "/contact?segment=agency",
  },
  {
    id: "political",
    eyebrow: "Political Campaigns",
    title: "Politics is emotional. Target the psychology, not the zip code.",
    subtitle:
      "Moonbrush was born from political campaign data. Behavioral intelligence meets voters where they actually make decisions — with tailored messaging across every touchpoint.",
    color: "#f87171",
    stats: [
      { value: "4", label: "Political outreach channels" },
      { value: "Real-time", label: "Sentiment detection" },
      { value: "1:1", label: "Voter-level messaging" },
    ],
    painPoints: [
      "Generic campaign mailers and scripts that treat all voters the same",
      "Inability to maintain consistent narrative across channels",
      "Poll-based sentiment analysis that arrives weeks too late",
      "Broad demographic targeting that misses persuadable voters",
      "Fragmented voter contact across canvassing, mail, phone, and digital",
    ],
    capabilities: [
      {
        title: "Behavioral Voter Profiles",
        desc: "Emotional responsiveness, value systems, civic identity, information consumption, decision-making styles, motivational drivers — the psychology behind the vote.",
        color: "#f87171",
      },
      {
        title: "Cross-Channel Activation",
        desc: "Block walking, phone banking, direct mail, DSP digital ads — each informed by individual behavioral intelligence. Tailored talking points at every door.",
        color: "#fcd34d",
      },
      {
        title: "Narrative Consistency",
        desc: "Touchpoint tracking ensures the voter journey is coherent. A healthcare mail piece leads to healthcare digital ads, healthcare canvassing, and healthcare phone scripts.",
        color: "#93c5fd",
      },
      {
        title: "Real-Time Sentiment",
        desc: "Detect shifts in voter sentiment as they happen through digital behavior and engagement signals — not weeks later when poll results arrive.",
        color: "#c084fc",
      },
    ],
    cta: "Explore Political",
    href: "/contact?segment=political",
  },
  {
    id: "international",
    eyebrow: "International",
    title: "Where traditional data is scarce, behavior tells the story.",
    subtitle:
      "Credit scoring for the unbanked. Insurance for populations without medical records. Behavioral intelligence bridges the gap between informal economies and formal services.",
    color: "#f0abfc",
    stats: [
      { value: "Global", label: "Consumer graph expansion" },
      { value: "Mobile", label: "First-market focus" },
      { value: "Billions", label: "Profiles worldwide" },
    ],
    painPoints: [
      "Large populations with no credit history, limited banking, minimal employment docs",
      "Traditional credit and actuarial models cannot evaluate these populations",
      "Rich digital behavioral footprints exist but aren't being leveraged",
      "Financial inclusion blocked by lack of formal data infrastructure",
      "Healthcare and insurance products can't be designed without behavioral data",
    ],
    capabilities: [
      {
        title: "Alternative Credit Scoring",
        desc: "Mobile usage patterns, digital commerce behavior, app usage, geographic stability — behavioral signals that predict creditworthiness where traditional scoring can't reach.",
        color: "#6ee7b7",
      },
      {
        title: "Insurance Underwriting",
        desc: "Health behavior patterns, lifestyle indicators, risk-taking behavior, and community health signals inform product design for populations without formal medical histories.",
        color: "#93c5fd",
      },
      {
        title: "Healthcare Intelligence",
        desc: "Identify health-seeking behaviors, wellness engagement, preventive care adoption, and community health trends through digital behavioral signals.",
        color: "#c084fc",
      },
      {
        title: "Telecom Intelligence",
        desc: "Predict churn, identify upsell opportunities, and create behavioral segments in mobile-first markets — far beyond basic usage metrics.",
        color: "#fcd34d",
      },
    ],
    cta: "Explore International",
    href: "/contact?segment=international",
  },
];

/* ── Sticky section nav items ── */
const sectionNavItems = solutions.map((s) => ({
  id: s.id,
  label: s.eyebrow,
  color: s.color,
}));

export default function SolutionsPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  /* Track which section is in view */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    solutions.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(s.id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
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
              color: "var(--t-accent)",
              opacity: 0.7,
              marginBottom: 20,
            }}
          >
            Solutions
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 900,
              margin: "0 auto",
              color: "var(--t-text)",
            }}
          >
            One platform.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #93c5fd, #c084fc, #6ee7b7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every audience.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.6vw, 19px)",
              lineHeight: 1.75,
              color: "var(--t-text-muted)",
              maxWidth: 620,
              margin: "24px auto 0",
            }}
          >
            Whether you&apos;re a start-up replacing overpriced data lists or an enterprise
            deploying one-to-one creative personalization at scale — Moonbrush meets you
            where you are.
          </p>
        </div>

        {/* Jump nav */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            marginTop: 50,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(16px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
          }}
        >
          {sectionNavItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                padding: "8px 18px",
                borderRadius: 24,
                background: "var(--t-card-bg)",
                border: `1px solid ${item.color}25`,
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: item.color,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = item.color + "15";
                e.currentTarget.style.borderColor = item.color + "40";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--t-card-bg)";
                e.currentTarget.style.borderColor = item.color + "25";
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* ─── SOLUTION SECTIONS ─── */}
      {solutions.map((sol, idx) => (
        <SolutionSection key={sol.id} sol={sol} idx={idx} />
      ))}

      {/* ─── CROSS-CUTTING BOTTOM ─── */}
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
                  color: "var(--t-accent)",
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Across Every Solution
              </div>,
              <h2
                key="h2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "var(--t-text)",
                  marginBottom: 16,
                }}
              >
                The behavioral intelligence difference.
              </h2>,
            ]}
          </RevealGroup>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {[
            {
              title: "10 Years in the Making",
              desc: "Not a recently-launched AI feature. A mature, validated behavioral intelligence system with deep roots in political campaigns where outcomes are immediate and unforgiving.",
              color: "#93c5fd",
            },
            {
              title: "Not a Marketing Channel",
              desc: "Moonbrush doesn't compete with your tools — it powers them. An intelligence layer that makes every connected channel more effective.",
              color: "#c084fc",
            },
            {
              title: "Compliance as Standard",
              desc: "HIPAA, SOC 2, ISO 27001, GDPR, CCPA maintained across the platform. Not tiered, not add-on — every customer, every plan.",
              color: "#6ee7b7",
            },
            {
              title: "Flat-Rate Access",
              desc: "No per-record pricing. No credit systems. Unlimited access to the full consumer graph and behavioral intelligence at a predictable monthly cost.",
              color: "#fcd34d",
            },
          ].map((item, i) => (
            <GlassCard key={item.title} color={item.color} delay={i * 0.1}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: item.color,
                  marginBottom: 10,
                }}
              >
                {item.title}
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
                {item.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>
    </PlatformLayout>
  );
}

/* ── Individual solution section ── */
function SolutionSection({ sol, idx }: { sol: (typeof solutions)[number]; idx: number }) {
  const hero = useRevealOnScroll(0.15);

  return (
    <section
      id={sol.id}
      style={{
        padding: "100px clamp(20px,6vw,80px) 80px",
        maxWidth: 1200,
        margin: "0 auto",
        scrollMarginTop: 80,
      }}
    >
      <SectionDivider color={sol.color} />

      {/* Header */}
      <div
        ref={hero.ref}
        style={{
          marginTop: 60,
          marginBottom: 50,
          opacity: hero.visible ? 1 : 0,
          transform: hero.visible ? "none" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: sol.color,
            opacity: 0.7,
            marginBottom: 14,
          }}
        >
          {sol.eyebrow}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "var(--t-text)",
            maxWidth: 700,
            marginBottom: 16,
          }}
        >
          {sol.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.75,
            color: "var(--t-text-muted)",
            maxWidth: 620,
          }}
        >
          {sol.subtitle}
        </p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 24,
          maxWidth: 500,
          marginBottom: 50,
        }}
      >
        {sol.stats.map((s) => (
          <AnimStat key={s.label} value={s.value} label={s.label} color={sol.color} />
        ))}
      </div>

      {/* Two-column: Pain points + Capabilities */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
          gap: 30,
          alignItems: "start",
        }}
      >
        {/* Pain points */}
        <GlassCard color={sol.color} delay={0.1}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: sol.color,
              opacity: 0.7,
              marginBottom: 18,
            }}
          >
            Pain Points We Solve
          </div>
          {sol.painPoints.map((pp, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "10px 0",
                borderBottom:
                  i < sol.painPoints.length - 1
                    ? "1px solid var(--t-border)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: sol.color,
                  marginTop: 7,
                  flexShrink: 0,
                  opacity: 0.6,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--t-text-muted)",
                }}
              >
                {pp}
              </span>
            </div>
          ))}
        </GlassCard>

        {/* Capabilities */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {sol.capabilities.map((cap, i) => (
            <GlassCard key={cap.title} color={cap.color} delay={0.15 + i * 0.08}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  fontWeight: 700,
                  color: cap.color,
                  marginBottom: 6,
                }}
              >
                {cap.title}
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
                {cap.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: 40 }}>
        <RevealGroup stagger={0.1} direction="up">
          {[
            <Link
              key="cta"
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: 10,
                background: sol.color,
                color: "#0a0a1a",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 0.5,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px ${sol.color}40`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              {sol.cta}
              <span style={{ fontSize: 16 }}>→</span>
            </Link>,
          ]}
        </RevealGroup>
      </div>
    </section>
  );
}
