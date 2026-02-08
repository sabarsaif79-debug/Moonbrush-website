"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Nav from "@/components/Nav";
import SectionNav, { sectionItems } from "@/components/SectionNav";
import ParallaxMoon from "@/components/ParallaxMoon";
import ShowcaseFlip from "@/components/ShowcaseCard";
import LogoOrbit from "@/components/LogoOrbit";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import ProductFeatures from "@/components/ProductFeatures";
import HowItWorks from "@/components/HowItWorks";
import HorizontalScroll from "@/components/HorizontalScroll";
import IcebergSection from "@/components/IcebergSection";
import SegmentCards from "@/components/SegmentCards";
import CapPill from "@/components/CapPill";
import TrustBand from "@/components/TrustBand";
import CaseHighlight from "@/components/CaseHighlight";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeContext";
import ThemedSection from "@/components/ThemedSection";
import CardDeck from "@/components/CardDeck";

/* ─── Showcase Card Data ─── */
const cardData = [
  {
    id: "search-discover",
    icon: "\u25C8",
    title: "Search & Discover",
    stat: "289M+",
    statLabel: "consumer profiles",
    description:
      "Search the entire U.S. consumer graph with behavioral, intent, and brand affinity filters. Unlimited access. No credits. No per-record fees.",
    capabilities: ["Behavioral Filters", "Real-Time Intent", "Brand Affinity"],
    differentiator: "What competitors charge per record, we include in flat-rate access.",
    color: "#93c5fd",
  },
  {
    id: "model-understand",
    icon: "\u25C7",
    title: "Model & Understand",
    stat: "181",
    statLabel: "behavioral models",
    description:
      "Build custom behavioral models across 11 lens categories. Drill into any individual\u2019s complete profile\u2014down to what they searched yesterday.",
    capabilities: ["Custom Builder", "12 Audience Lenses", "Individual Deep Dives"],
    differentiator: "10 years in the making. No competitor matches individual-level behavioral depth.",
    color: "#c084fc",
  },
  {
    id: "optimize-decide",
    icon: "\u25CB",
    title: "Optimize & Decide",
    stat: "54",
    statLabel: "playbook dimensions",
    description:
      "The Playbook engine analyzes every individual across activation, creative, and messaging dimensions\u2014then segments them into behavioral cohorts with a scientific formula for conversion.",
    capabilities: ["25 Activation Dims", "20 Creative Dims", "9 Messaging Dims"],
    differentiator: "Not a suggestion\u2014a directive. 1,000+ options across every dimension.",
    color: "#6ee7b7",
  },
  {
    id: "personalize-activate",
    icon: "\u25B3",
    title: "Personalize & Activate",
    stat: "130+",
    statLabel: "messaging atoms",
    description:
      "One creative in, thousands of personalized variants out. PRISM maps every individual\u2019s behavioral profile to unique copy, tone, visuals, and offers\u2014then deploys across every channel.",
    capabilities: ["Dynamic Creative", "7 Atom Categories", "Multi-Channel"],
    differentiator: "DSP, email, SMS, direct mail\u2014true 1:1 personalization at scale.",
    color: "#fcd34d",
  },
];

/* ─── Capabilities for Marquee ─── */
const capsRow1 = [
  "181 Enrichment Models",
  "54 Playbook Dimensions",
  "130+ Messaging Atoms",
  "11 Lens Categories",
  "42+ Persona Templates",
];
const capsRow2 = [
  "1,000+ Dimension Options",
  "Identity Resolution (98%+)",
  "Multi-Channel Activation",
  "PRISM Creative Engine",
  "Flat-Rate Pricing",
];

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [inShowcase, setInShowcase] = useState(false);
  const [showcaseBottom, setShowcaseBottom] = useState(999);
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const activeCard = cardData[activeIndex].id;

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 200);
  }, []);

  /* ─── Card Navigation ─── */
  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= cardData.length || index === activeIndex) return;
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
  }, []);

  /* ─── Scroll Tracking ─── */
  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > 800);
      if (showcaseRef.current) {
        const rect = showcaseRef.current.getBoundingClientRect();
        const isIn =
          rect.top < window.innerHeight * 0.5 &&
          rect.bottom > window.innerHeight * 0.5;
        setInShowcase(isIn);
        setShowcaseBottom(rect.bottom);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── Keyboard ─── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inShowcase) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inShowcase, goNext, goPrev]);

  /* ─── Trackpad Swipe ─── */
  useEffect(() => {
    let canSwipe = true;
    const onWheel = (e: WheelEvent) => {
      if (!inShowcase || !canSwipe) return;
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX < 15 || absY > absX) return;
      e.preventDefault();
      const delta = e.deltaX;
      canSwipe = false;
      if (delta > 0) goNext();
      else goPrev();
      setTimeout(() => {
        canSwipe = true;
      }, 600);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [inShowcase, goNext, goPrev]);

  /* ─── Touch Swipe ─── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  /* ─── Mouse Drag ─── */
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.clientX - mouseStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  /* ─── Nav Callbacks ─── */
  const handleNavSelect = (id: string) => {
    const index = cardData.findIndex((c) => c.id === id);
    if (index !== -1) goTo(index);
  };

  const activeItem = sectionItems.find((s) => s.id === activeCard);
  const glowColor =
    pastHero && inShowcase
      ? (activeItem?.color || "#ffffff") + "80"
      : "transparent";

  return (
    <ThemeProvider>
    <style>{`
      html, body {
        overscroll-behavior-x: none;
      }
    `}</style>
    <div
      className="relative min-h-screen"
      style={{
        overflowX: "clip",
        overscrollBehaviorX: "none",
        fontFamily: "var(--font-body)",
        color: "var(--t-text-primary, #fff)",
      }}
    >
      {/* ─── Background ─── */}
      <div className="fixed inset-0 z-0" style={{ background: "#0a0a1a" }} />

      {/* ─── Stars ─── */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => {
          const size = Math.random() * 2 + 0.5;
          return (
            <div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: `rgba(255,255,255,${0.2 + Math.random() * 0.5})`,
                animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          );
        })}
        <style>{`@keyframes twinkle { 0%,100% { opacity:0.2 } 50% { opacity:1 } }`}</style>
      </div>

      {/* ─── Moon ─── */}
      <ParallaxMoon heroLoaded={heroLoaded} glowColor={glowColor} showcaseBottom={showcaseBottom} />

      {/* ─── Logo Orbit (around moon) ─── */}
      <LogoOrbit visible={heroLoaded} showcaseBottom={showcaseBottom} />

      {/* ─── Navigation ─── */}
      {pastHero && inShowcase ? (
        <SectionNav
          activeId={activeCard}
          onSelect={handleNavSelect}
          visible={true}
        />
      ) : (
        <Nav showToggle={pastHero && !inShowcase} />
      )}

      {/* ─── Main Content ─── */}
      <div className="relative z-[2]">

        {/* =============================================
            MOMENT 1 — Hero + Stats
            One viewport. The first impression.
        ============================================= */}
        <section
          className="relative flex flex-col justify-center items-center text-center"
          style={{ minHeight: "100vh", padding: "120px clamp(20px,6vw,80px) 60px" }}
        >
          {/* Headline */}
          <h1
            className="font-display font-bold leading-[1.05] max-w-[900px] mx-auto"
            style={{
              fontSize: "clamp(36px, 5.5vw, 72px)",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            1:1 personalization at a national scale, powered by{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #93c5fd, #a78bfa, #f0abfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              behavioral intelligence.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="font-body max-w-[640px] mx-auto mt-6"
            style={{
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.55)",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(20px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
            }}
          >
            Moonbrush transforms behavioral, demographic, transactional, and psychographic signals into precision-targeted outcomes.
          </p>

          {/* CTA */}
          <div
            style={{
              marginTop: 36,
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(15px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 1.0s",
            }}
          >
            <a
              href="https://meetings-na2.hubspot.com/adam-syed/moonbrushdemo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[15px] font-semibold py-4 px-10 rounded-xl inline-block relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #93c5fd, #a78bfa)",
                color: "#0a0a1a",
                boxShadow: "0 0 40px rgba(147,197,253,0.25)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 60px rgba(147,197,253,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(147,197,253,0.25)";
              }}
            >
              Book a Demo
            </a>
          </div>

          {/* Stats Row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-16 w-full max-w-[960px]"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "none" : "translateY(20px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 1.3s",
            }}
          >
            {[
              { end: 10, suffix: "B+", label: "Digital signals captured daily" },
              { end: 181, suffix: "", label: "Behavioral enrichment models" },
              { end: 289, suffix: "M+", label: "Consumer profiles in graph" },
              { end: 20, prefix: "<", suffix: " min", label: "Login to personalization" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 42px)",
                    background: "linear-gradient(135deg, #93c5fd, #e0e7ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <CountUp
                    end={stat.end}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix}
                    duration={2}
                    delay={1.5 + i * 0.2}
                  />
                </div>
                <div
                  className="font-body text-[12px] tracking-[1px] uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            style={{
              opacity: heroLoaded ? 0.4 : 0,
              transition: "opacity 1.5s ease 2.5s",
            }}
          >
            <div
              className="w-[1px] h-[50px] mx-auto"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)",
                animation: "pulse-line 2s ease-in-out infinite",
              }}
            />
            <style>{`@keyframes pulse-line { 0%,100% { opacity:0.3; transform:scaleY(0.8) } 50% { opacity:0.7; transform:scaleY(1) } }`}</style>
          </div>
        </section>

        {/* =============================================
            MOMENT 3 — Showcase Zone (Horizontal Swipe)
        ============================================= */}
        <section
          ref={showcaseRef}
          className="relative"
          style={{ minHeight: "200vh" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Fixed overlay — stays perfectly still, fades in/out */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              pointerEvents: inShowcase ? "auto" : "none",
              opacity: inShowcase ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <div className="relative w-full max-w-[1100px] px-[clamp(20px,6vw,80px)]">
              <ShowcaseFlip
                cards={cardData}
                activeIndex={activeIndex}
                visible={inShowcase}
              />
            </div>
          </div>
        </section>

        {/* =============================================
            ZONE 2 — Themed Content
        ============================================= */}
        <ThemedSection>

          <CardDeck>
            {/* CARD 1 — Product Features (Tabbed) */}
            <section
              className="relative z-10"
              style={{ padding: "80px clamp(20px,6vw,80px)" }}
            >
              <ProductFeatures />
            </section>

            {/* CARD 2 — How It Works */}
            <section
              className="relative z-10"
              style={{
                padding: "80px clamp(20px,6vw,80px)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HowItWorks />
            </section>

            {/* CARD 3 — Narrative Scroll */}
            <section
              className="relative z-10"
              style={{
                padding: "80px 0",
              }}
            >
              <div className="text-center mb-12" style={{ padding: "0 clamp(20px,6vw,80px)" }}>
                <Reveal>
                  <div
                    className="font-body text-[11px] tracking-[4px] uppercase mb-4"
                    style={{ color: "var(--t-accent-soft)" }}
                  >
                    Why Moonbrush
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2
                    className="font-display font-bold leading-[1.1]"
                    style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
                  >
                    The depth others can&apos;t reach.
                  </h2>
                </Reveal>
              </div>

              <HorizontalScroll labels={["The Gap", "Who It's For", "Capabilities"]}>
                {/* Panel A: Iceberg */}
                <IcebergSection />

                {/* Panel B: Segment Cards */}
                <SegmentCards />

                {/* Panel C: Capabilities Marquee */}
                <div style={{ padding: "40px 0" }}>
                  <div className="text-center mb-10">
                    <h3
                      className="font-display text-[clamp(24px,3vw,36px)] font-bold mb-3"
                    >
                      600+ models, scores, and dimensions.
                    </h3>
                    <p
                      className="font-body text-[15px]"
                      style={{ color: "var(--t-text-muted)" }}
                    >
                      Every capability continuously validated, calibrated, and updated.
                    </p>
                  </div>
                  {/* Row 1 scrolling right */}
                  <div
                    className="flex gap-3 mb-4 overflow-hidden"
                    style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
                  >
                    <div className="flex gap-3 animate-marquee-right">
                      {[...capsRow1, ...capsRow1, ...capsRow1].map((cap, i) => (
                        <CapPill key={`r1-${i}`} label={cap} delay={0} />
                      ))}
                    </div>
                  </div>
                  {/* Row 2 scrolling left */}
                  <div
                    className="flex gap-3 overflow-hidden"
                    style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
                  >
                    <div className="flex gap-3 animate-marquee-left">
                      {[...capsRow2, ...capsRow2, ...capsRow2].map((cap, i) => (
                        <CapPill key={`r2-${i}`} label={cap} delay={0} />
                      ))}
                    </div>
                  </div>
                  <style>{`
                    @keyframes marquee-right {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-33.33%); }
                    }
                    @keyframes marquee-left {
                      0% { transform: translateX(-33.33%); }
                      100% { transform: translateX(0); }
                    }
                    .animate-marquee-right { animation: marquee-right 25s linear infinite; }
                    .animate-marquee-left { animation: marquee-left 25s linear infinite; }
                  `}</style>
                </div>
              </HorizontalScroll>
            </section>

            {/* CARD 4 — Trust + Case Study */}
            <section
              className="relative z-10"
              style={{
                padding: "80px clamp(20px,6vw,80px)",
              }}
            >
              <TrustBand />
              <div style={{ marginTop: 40 }}>
                <CaseHighlight />
              </div>
            </section>
          </CardDeck>

          {/* Final CTA — outside the deck, scrolls normally */}
          <section
            className="relative"
            style={{
              zIndex: 50,
              padding: "80px clamp(20px,6vw,80px) 0",
              background: "var(--t-bg)",
            }}
          >
            <FinalCTA />
          </section>

          {/* FOOTER */}
          <div className="relative z-10">
            <Footer />
          </div>

        </ThemedSection>
      </div>
    </div>
    </ThemeProvider>
  );
}
