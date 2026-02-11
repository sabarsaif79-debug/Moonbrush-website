"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import PlatformLayout, {
  GlassCard,
  SectionDivider,
} from "@/components/PlatformLayout";

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
        desc: "Takes your creative + brand guidelines + audience data → generates thousands of variants, each adapted to individual behavioral psychology.",
        color: "#c084fc",
      },
      {
        title: "Infrastructure Integration",
        desc: "Direct connections into your data lakes, warehouses, CDPs, and enterprise platforms. Behavioral intelligence flows into existing workflows.",
        color: "#6ee7b7",
      },
      {
        title: "Compliance Architecture",
        desc: "HIPAA, SOC 2, ISO 27001, GDPR, CCPA maintained as standard. Not tiered, not add-on — every layer meets enterprise regulatory requirements.",
        color: "#fcd34d",
      },
      {
        title: "Full Behavioral Stack",
        desc: "Everything mid-market gets — enrichment, Builder, Workshop, Playbooks, multi-channel activation — plus PRISM and dedicated enterprise support.",
        color: "#93c5fd",
      },
    ],
    cta: "Explore Enterprise",
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
      "Enterprise competitors running hyper-personalized campaigns",
      "Marketing automation platforms underutilized without behavioral intelligence",
      "Multiple point solutions without a unifying layer",
      "No budget for dedicated behavioral science or data science teams",
    ],
    capabilities: [
      {
        title: "Scientific Conversion Formula",
        desc: "Playbooks analyze your audience across 54 dimensions and produce the optimal behavioral split — channel, offer, messaging, creative, timing.",
        color: "#fcd34d",
      },
      {
        title: "Behavioral Science Team",
        desc: "Dedicated behavioral scientists interpret data, design targeting strategies, translate insights into creative briefs. No hire required.",
        color: "#c084fc",
      },
      {
        title: "Solutions Architect",
        desc: "A dedicated architect manages integration with Klaviyo, HubSpot, Salesforce, Mailchimp — any platform. New CRMs within one week.",
        color: "#6ee7b7",
      },
      {
        title: "Workshop Research Lab",
        desc: "Twelve behavioral lenses provide instant audience analysis that would cost six figures from a consulting firm.",
        color: "#93c5fd",
      },
    ],
    cta: "Explore Mid-Market",
  },
  {
    id: "smallbusiness",
    eyebrow: "Small Business",
    title: "Fortune 500 data. Start-up pricing.",
    subtitle:
      "The same 289M+ consumer graph that powers enterprise campaigns — at a flat monthly rate with zero per-record costs.",
    color: "#6ee7b7",
    stats: [
      { value: "$0", label: "Per-record cost" },
      { value: "All", label: "Contact data included" },
      { value: "1", label: "Platform replaces many" },
    ],
    painPoints: [
      "Paying $5k–$10k/month on per-record data lists",
      "Purchased data is incomplete, outdated, or behind credit systems",
      "No access to behavioral or psychographic data at any price",
      "Locked out of sophisticated targeting — only enterprises can afford it",
      "Multiple vendor relationships that fragment the data picture",
    ],
    capabilities: [
      {
        title: "Flat-Rate Data Access",
        desc: "The entire 289M consumer graph. Personal, professional, behavioral, intent, brand affinity — all included. No per-record charges.",
        color: "#6ee7b7",
      },
      {
        title: "BCP Questionnaire",
        desc: "Answer simple business questions — AI translates answers into sophisticated behavioral targeting. No expertise needed.",
        color: "#c084fc",
      },
      {
        title: "Existing Tool Integration",
        desc: "Plugs into Klaviyo, Mailchimp, HubSpot, Shopify — the tools you already use. No stack overhaul.",
        color: "#93c5fd",
      },
      {
        title: "Multi-Vendor Replacement",
        desc: "Replace ZoomInfo, Bombora, and multiple enrichment tools. Everything aggregated at one price.",
        color: "#fcd34d",
      },
    ],
    cta: "Explore Small Business",
  },
  {
    id: "agencies",
    eyebrow: "Agencies",
    title: "In an era of skepticism, behavioral intelligence proves your value.",
    subtitle:
      "An out-of-the-box behavioral science team and data science team become part of your agency.",
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
        desc: "Interprets behavioral data, designs targeting strategies, translates profiles into creative briefs across your entire client portfolio.",
        color: "#c084fc",
      },
      {
        title: "Data Science Team",
        desc: "Handles behavioral modeling, audience segmentation, predictive analytics, and campaign analysis. No data scientists to hire.",
        color: "#93c5fd",
      },
      {
        title: "BCP for Client Kickoffs",
        desc: "Use the guided questionnaire with clients in real time. Translates business language into behavioral targeting instantly.",
        color: "#fcd34d",
      },
      {
        title: "White-Label Intelligence",
        desc: "Behavioral micro-cohorting, scientific Playbooks, and personalized creative that become part of your agency's offering.",
        color: "#6ee7b7",
      },
    ],
    cta: "Explore Agency Model",
  },
  {
    id: "political",
    eyebrow: "Political",
    title: "Politics is emotional. Target the psychology, not the zip code.",
    subtitle:
      "Moonbrush was born from political campaign data. Behavioral intelligence meets voters where they actually make decisions.",
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
        desc: "Emotional responsiveness, value systems, civic identity, decision-making styles, motivational drivers — the psychology behind the vote.",
        color: "#f87171",
      },
      {
        title: "Cross-Channel Activation",
        desc: "Block walking, phone banking, direct mail, DSP digital ads — each informed by individual behavioral intelligence.",
        color: "#fcd34d",
      },
      {
        title: "Narrative Consistency",
        desc: "Touchpoint tracking ensures the voter journey is coherent across every channel and every contact.",
        color: "#93c5fd",
      },
      {
        title: "Real-Time Sentiment",
        desc: "Detect shifts in voter sentiment as they happen through digital behavior — not weeks later when polls arrive.",
        color: "#c084fc",
      },
    ],
    cta: "Explore Political",
  },
  {
    id: "international",
    eyebrow: "International",
    title: "Where traditional data is scarce, behavior tells the story.",
    subtitle:
      "Credit scoring for the unbanked. Insurance for populations without medical records. Behavioral intelligence bridges the gap.",
    color: "#f0abfc",
    stats: [
      { value: "Global", label: "Consumer graph expansion" },
      { value: "Mobile", label: "First-market focus" },
      { value: "Billions", label: "Profiles worldwide" },
    ],
    painPoints: [
      "Large populations with no credit history or formal employment docs",
      "Traditional credit and actuarial models can't evaluate these populations",
      "Rich digital behavioral footprints exist but aren't being leveraged",
      "Financial inclusion blocked by lack of formal data infrastructure",
      "Healthcare and insurance can't be designed without behavioral data",
    ],
    capabilities: [
      {
        title: "Alternative Credit Scoring",
        desc: "Mobile usage, digital commerce, app usage, geographic stability — behavioral signals that predict creditworthiness.",
        color: "#6ee7b7",
      },
      {
        title: "Insurance Underwriting",
        desc: "Health behavior patterns, lifestyle indicators, risk-taking behavior for populations without formal medical histories.",
        color: "#93c5fd",
      },
      {
        title: "Healthcare Intelligence",
        desc: "Health-seeking behaviors, wellness engagement, preventive care adoption, and community health trends.",
        color: "#c084fc",
      },
      {
        title: "Telecom Intelligence",
        desc: "Predict churn, identify upsell opportunities, create behavioral segments in mobile-first markets.",
        color: "#fcd34d",
      },
    ],
    cta: "Explore International",
  },
];

/* ── Component ── */

export default function SolutionsPage() {
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [exitTransform, setExitTransform] = useState("rotateX(0)");
  const [exitOrigin, setExitOrigin] = useState("bottom center");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStart = useRef({ x: 0, y: 0 });
  const pillScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  /* ── Navigate between walls ── */
  const navigateTo = useCallback(
    (index: number) => {
      if (index === activeIndex || isTransitioning || index < 0 || index >= solutions.length)
        return;

      const goingRight = index > activeIndex;

      setExitingIndex(activeIndex);
      setExitOrigin(goingRight ? "bottom center" : "top center");
      setExitTransform("rotateX(0)");
      setIsTransitioning(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setExitTransform(goingRight ? "rotateX(-90deg)" : "rotateX(90deg)");
        });
      });

      setActiveIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
        setExitingIndex(null);
      }, 700);
    },
    [activeIndex, isTransitioning]
  );

  /* ── Scroll active pill into view ── */
  useEffect(() => {
    if (!pillScrollRef.current) return;
    const container = pillScrollRef.current;
    const activeBtn = container.children[activeIndex] as HTMLElement;
    if (!activeBtn) return;
    const left = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, [activeIndex]);

  /* ── Touch swipe on walls ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;

    // Firm threshold: >100px horizontal, and horizontal > 2.5x vertical
    if (Math.abs(dx) > 100 && Math.abs(dx) > Math.abs(dy) * 2.5) {
      if (dx < 0) navigateTo(activeIndex + 1);
      else navigateTo(activeIndex - 1);
    }
  };

  /* ── Keyboard nav ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateTo(activeIndex + 1);
      if (e.key === "ArrowLeft") navigateTo(activeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, navigateTo]);

  const activeSol = solutions[activeIndex];

  return (
    <PlatformLayout accentColor="#93c5fd">
      {/* ═══ HERO ═══ */}
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
      </section>

      {/* ═══ STICKY SECTION: PILLS + WALLS ═══ */}
      <div style={{ minHeight: "150vh" }}>
        <div
          style={{
            position: "sticky",
            top: 56,
            zIndex: 40,
            height: "calc(100vh - 56px)",
            display: "flex",
            flexDirection: "column",
            background: "var(--t-bg)",
          }}
        >
          {/* ── PILL NAV ── */}
          <div
            style={{
              background: "var(--t-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--t-border)",
              flexShrink: 0,
            }}
          >
            {/* Hide scrollbar CSS */}
            <style>{`
              .pill-scroll::-webkit-scrollbar { display: none; }
            `}</style>

            <div
              ref={pillScrollRef}
              className="pill-scroll"
              style={{
                display: "flex",
                gap: 8,
                padding: "12px clamp(20px,6vw,80px)",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {solutions.map((sol, i) => (
                <button
                  key={sol.id}
                  onClick={() => navigateTo(i)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 24,
                    background: i === activeIndex ? sol.color + "20" : "transparent",
                    border: `1.5px solid ${i === activeIndex ? sol.color : "var(--t-border)"}`,
                    color: i === activeIndex ? sol.color : "var(--t-text-faint)",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  {sol.eyebrow}
                </button>
              ))}
            </div>

            {/* Progress indicator */}
            <div style={{ height: 2, background: "var(--t-border)" }}>
              <div
                style={{
                  height: "100%",
                  width: `${((activeIndex + 1) / solutions.length) * 100}%`,
                  background: activeSol.color,
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  opacity: 0.6,
                }}
              />
            </div>
          </div>

          {/* ── WALL CONTAINER ── */}
          <div
            style={{
              position: "relative",
              flex: 1,
              perspective: 1500,
              perspectiveOrigin: "center center",
              overflow: "hidden",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
        {solutions.map((sol, i) => {
          const isActive = i === activeIndex;
          const isExiting = isTransitioning && i === exitingIndex;
          const isVisible = isActive || isExiting;

          return (
            <div
              key={sol.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: isActive && !isTransitioning ? "auto" : "hidden",
                WebkitOverflowScrolling: "touch",
                background: "var(--t-bg)",
                backfaceVisibility: "hidden",
                zIndex: isExiting ? 10 : isActive ? 5 : 1,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isActive && !isTransitioning ? "auto" : "none",
                transform: isExiting ? exitTransform : "rotateX(0)",
                transformOrigin: isExiting ? exitOrigin : "center center",
                transition: isExiting
                  ? "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease"
                  : "none",
                willChange: isExiting ? "transform" : "auto",
              }}
            >
              {/* ── Wall content ── */}
              <div
                style={{
                  padding: "50px clamp(20px,6vw,80px) 60px",
                  maxWidth: 1200,
                  margin: "0 auto",
                }}
              >
                {/* Header */}
                <div style={{ marginBottom: 30 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      letterSpacing: 4,
                      textTransform: "uppercase",
                      color: sol.color,
                      opacity: 0.7,
                      marginBottom: 10,
                    }}
                  >
                    {sol.eyebrow}
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(26px, 3.5vw, 40px)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      color: "var(--t-text)",
                      maxWidth: 650,
                      marginBottom: 12,
                    }}
                  >
                    {sol.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--t-text-muted)",
                      maxWidth: 580,
                    }}
                  >
                    {sol.subtitle}
                  </p>
                </div>

                {/* Stats row */}
                <div
                  style={{
                    display: "flex",
                    gap: "clamp(20px, 4vw, 40px)",
                    marginBottom: 36,
                    flexWrap: "wrap",
                  }}
                >
                  {sol.stats.map((s) => (
                    <div key={s.label}>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(24px, 3vw, 32px)",
                          fontWeight: 800,
                          color: sol.color,
                          lineHeight: 1,
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          color: "var(--t-text-faint)",
                          marginTop: 4,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Horizontal card carousel */}
                <style>{`
                  .card-scroll::-webkit-scrollbar { display: none; }
                `}</style>
                <div
                  className="card-scroll"
                  style={{
                    display: "flex",
                    gap: 16,
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    scrollSnapType: "x mandatory",
                    paddingBottom: 8,
                  }}
                  /* Stop card-scroll touches from triggering wall swipe */
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  {/* Pain points card */}
                  <div
                    style={{
                      minWidth: "min(360px, 85vw)",
                      maxWidth: 400,
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                      padding: "clamp(16px, 3vw, 28px)",
                      borderRadius: 16,
                      background: "var(--t-card-bg)",
                      border: `1px solid ${sol.color}15`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        color: sol.color,
                        opacity: 0.7,
                        marginBottom: 14,
                      }}
                    >
                      Pain Points We Solve
                    </div>
                    {sol.painPoints.map((pp, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          padding: "7px 0",
                          borderBottom:
                            j < sol.painPoints.length - 1
                              ? "1px solid var(--t-border)"
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: sol.color,
                            marginTop: 7,
                            flexShrink: 0,
                            opacity: 0.5,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 13,
                            lineHeight: 1.55,
                            color: "var(--t-text-muted)",
                          }}
                        >
                          {pp}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Capability cards */}
                  {sol.capabilities.map((cap) => (
                    <div
                      key={cap.title}
                      style={{
                        minWidth: "min(300px, 80vw)",
                        maxWidth: 340,
                        flexShrink: 0,
                        scrollSnapAlign: "start",
                        padding: "clamp(16px, 3vw, 28px)",
                        borderRadius: 16,
                        background: "var(--t-card-bg)",
                        border: `1px solid ${cap.color}15`,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 17,
                          fontWeight: 700,
                          color: cap.color,
                          marginBottom: 10,
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
                          flex: 1,
                        }}
                      >
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Scroll hint */}
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--t-text-faint)",
                    opacity: 0.4,
                    marginTop: 8,
                    letterSpacing: 1,
                  }}
                >
                  ← swipe cards →
                </div>

                {/* CTA */}
                <div style={{ marginTop: 28 }}>
                  <Link
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
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
          </div>{/* end wall container */}

          {/* Swipe hint inside sticky */}
          <div
            style={{
              textAlign: "center",
              padding: "8px 20px",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "var(--t-text-faint)",
              opacity: 0.3,
              letterSpacing: 2,
              flexShrink: 0,
            }}
          >
            ← swipe or use arrows to navigate sections →
          </div>
        </div>{/* end sticky wrapper */}
      </div>{/* end 300vh outer wrapper */}

      {/* ═══ CROSS-CUTTING BOTTOM ═══ */}
      <section
        style={{
          padding: "80px clamp(20px,6vw,80px) 120px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <SectionDivider color="#93c5fd" />

        <div style={{ textAlign: "center", marginTop: 60, marginBottom: 50 }}>
          <div
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
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--t-text)",
            }}
          >
            The behavioral intelligence difference.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: 16,
          }}
        >
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
          ].map((item) => (
            <GlassCard key={item.title} color={item.color}>
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
