"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PlatformLayout, {
  GlassCard,
  SectionDivider,
} from "@/components/PlatformLayout";

const ACCENT = "#93c5fd";
const HUBSPOT_LINK = "https://meetings-na2.hubspot.com/adam-syed/moonbrushdemo";

const demoSteps = [
  {
    number: "01",
    title: "Your Audience, Live",
    desc: "Upload a sample of your customer data — or describe your target audience. We'll resolve it against our 289M+ consumer graph in real time and show you what behavioral intelligence looks like for your actual customers.",
    color: "#93c5fd",
  },
  {
    number: "02",
    title: "The Behavioral Profile",
    desc: "See individual-level behavioral profiles — what someone was looking at online yesterday, their decision-making style, emotional responsiveness, channel preferences, motivational drivers, and hundreds more dimensions. This is the moment skepticism turns to belief.",
    color: "#c084fc",
  },
  {
    number: "03",
    title: "Builder & Workshop",
    desc: "Watch us create a custom behavioral model for your specific use case using the Builder. Then explore your audience through 12 analytical lenses in the Workshop — instant behavioral research at your fingertips.",
    color: "#6ee7b7",
  },
  {
    number: "04",
    title: "Playbook & Activation",
    desc: "We'll run a Playbook against your audience to produce a scientific conversion formula — the optimal channel, messaging, creative, and timing for each behavioral micro-cohort. Then show you how it activates across DSP, email, SMS, and direct mail.",
    color: "#fcd34d",
  },
];

const proofPoints = [
  { value: "289M+", label: "US consumer profiles", color: "#93c5fd" },
  { value: "181", label: "Behavioral models", color: "#c084fc" },
  { value: "98%+", label: "Identity match rate", color: "#6ee7b7" },
  { value: "$0", label: "Per-record cost", color: "#fcd34d" },
  { value: "1 wk", label: "CRM integration time", color: "#f0abfc" },
  { value: "5", label: "Compliance certs", color: "#fca5a5" },
];

const audienceTypes = [
  "I'm exploring data platforms for the first time",
  "I'm replacing ZoomInfo, Apollo, or similar providers",
  "I run an agency and want behavioral intelligence for clients",
  "I need enterprise-scale personalization with PRISM",
  "I'm in political campaigns or advocacy",
  "I just want to see what you have on my customers",
];

export default function ContactPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <PlatformLayout accentColor={ACCENT}>
      {/* ─── HERO ─── */}
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
            Book a Demo
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 800,
              margin: "0 auto",
              color: "var(--t-text)",
            }}
          >
            See your audience{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #93c5fd, #c084fc, #6ee7b7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              like never before.
            </span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 1.6vw, 19px)",
              lineHeight: 1.75,
              color: "var(--t-text-muted)",
              maxWidth: 580,
              margin: "24px auto 0",
            }}
          >
            In 30 minutes, we&apos;ll show you the behavioral intelligence behind your
            actual customers — not a generic pitch deck, not a canned demo. Your data, live.
          </p>

          <a
            href={HUBSPOT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 40,
              padding: "16px 40px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #93c5fd, #c084fc)",
              color: "#0a0a1a",
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 0.5,
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 0 40px rgba(147,197,253,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 60px rgba(147,197,253,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 40px rgba(147,197,253,0.2)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Schedule Your Demo
            <span style={{ fontSize: 18 }}>→</span>
          </a>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--t-text-faint)",
              marginTop: 14,
            }}
          >
            30 minutes · No commitment · Your data, live
          </p>
        </div>
      </section>

      {/* ─── PROOF POINTS ─── */}
      <section style={{ padding: "40px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 14,
          }}
        >
          {proofPoints.map((p) => (
            <div
              key={p.label}
              style={{
                padding: "20px 14px",
                borderRadius: 12,
                background: "var(--t-card-bg)",
                border: "1px solid var(--t-card-border)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  fontWeight: 800,
                  color: p.color,
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {p.value}
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
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHAT YOU'LL SEE ─── */}
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
              marginBottom: 12,
            }}
          >
            What you&apos;ll see in 30 minutes.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--t-text-muted)",
              maxWidth: 550,
              margin: "0 auto",
            }}
          >
            Every demo is customized to your business. We don&apos;t show slides —
            we show your data running through the platform live.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 16 }}>
          {demoSteps.map((step) => (
            <GlassCard key={step.number} color={step.color}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 800,
                  color: step.color,
                  opacity: 0.25,
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {step.number}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--t-text)",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "var(--t-text-muted)",
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ─── */}
      <section style={{ padding: "60px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#c084fc" />

        <div style={{ marginTop: 60, marginBottom: 40, textAlign: "center" }}>
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
            This demo is for you if…
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: 12,
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {audienceTypes.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 20px",
                borderRadius: 12,
                background: "var(--t-card-bg)",
                border: "1px solid var(--t-card-border)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #93c5fd20, #c084fc20)",
                  border: "1px solid #93c5fd30",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 12,
                  color: "#93c5fd",
                }}
              >
                ✓
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--t-text-muted)",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE MOMENT ─── */}
      <section style={{ padding: "60px clamp(20px,6vw,80px)", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#6ee7b7" />

        <div
          style={{
            marginTop: 60,
            padding: "40px clamp(20px,4vw,40px)",
            borderRadius: 16,
            background: "var(--t-card-bg)",
            border: "1px solid var(--t-card-border)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6ee7b7",
              opacity: 0.7,
              marginBottom: 16,
            }}
          >
            Why People Book
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 2.5vw, 32px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--t-text)",
              maxWidth: 600,
              margin: "0 auto 16px",
            }}
          >
            &ldquo;Show me what you know about my customers.&rdquo;
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--t-text-muted)",
              maxWidth: 600,
              margin: "0 auto 24px",
            }}
          >
            That&apos;s the challenge we welcome. Upload a sample, give us a target, or just
            name a competitor&apos;s customers — and we&apos;ll show you down-to-the-person
            behavioral profiles that reveal what demographics never could. Real-time digital
            activity, decision patterns, emotional drivers, channel preferences, and more.
            It&apos;s 10 years in the making, and it takes 30 minutes to see.
          </p>
          <a
            href={HUBSPOT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 36px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #6ee7b7, #93c5fd)",
              color: "#0a0a1a",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 40px rgba(110,231,183,0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "none";
            }}
          >
            Schedule Your Demo →
          </a>
        </div>
      </section>

      {/* ─── CONTACT INFO ─── */}
      <section style={{ padding: "60px clamp(20px,6vw,80px) 120px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionDivider color="#fcd34d" />

        <div
          style={{
            marginTop: 60,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <GlassCard color="#fcd34d">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 17,
                fontWeight: 700,
                color: "#fcd34d",
                marginBottom: 10,
              }}
            >
              General Inquiries
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
              Questions about the platform, pricing, or whether Moonbrush is the right fit?
              Reach out and we&apos;ll connect you with the right person.
            </p>
            <a
              href="mailto:hello@moonbrush.com"
              style={{
                display: "inline-block",
                marginTop: 14,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                color: "#fcd34d",
                textDecoration: "none",
              }}
            >
              hello@moonbrush.com →
            </a>
          </GlassCard>

          <GlassCard color="#c084fc">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 17,
                fontWeight: 700,
                color: "#c084fc",
                marginBottom: 10,
              }}
            >
              Agency & Partner Inquiries
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
              Interested in white-label behavioral intelligence for your agency or a
              channel partnership? Let&apos;s talk about how Moonbrush scales across your client portfolio.
            </p>
            <a
              href="mailto:partners@moonbrush.com"
              style={{
                display: "inline-block",
                marginTop: 14,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                color: "#c084fc",
                textDecoration: "none",
              }}
            >
              partners@moonbrush.com →
            </a>
          </GlassCard>

          <GlassCard color="#93c5fd">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 17,
                fontWeight: 700,
                color: "#93c5fd",
                marginBottom: 10,
              }}
            >
              Enterprise & PRISM
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
              Need PRISM dynamic creative personalization, data pipeline integration,
              or enterprise-scale deployment? Our solutions team handles the heavy lifting.
            </p>
            <a
              href="mailto:enterprise@moonbrush.com"
              style={{
                display: "inline-block",
                marginTop: 14,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
                color: "#93c5fd",
                textDecoration: "none",
              }}
            >
              enterprise@moonbrush.com →
            </a>
          </GlassCard>
        </div>
      </section>
    </PlatformLayout>
  );
}
