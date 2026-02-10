"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

/* ── Dropdown data ── */

interface DropdownItem {
  label: string;
  href: string;
  desc: string;
  color: string;
}

interface DropdownMenu {
  label: string;
  fallbackHref: string;
  items: DropdownItem[];
}

const dropdowns: DropdownMenu[] = [
  {
    label: "Platform",
    fallbackHref: "/platform/data",
    items: [
      { label: "Data & Intelligence", href: "/platform/data", desc: "289M+ consumer graph, identity resolution, compliance", color: "#93c5fd" },
      { label: "Builder & Models", href: "/platform/builder", desc: "181 enrichment models, 11 lens categories, custom scoring", color: "#c084fc" },
      { label: "Search & Workshop", href: "/platform/search", desc: "Unlimited search, individual profiles, 12 audience lenses", color: "#6ee7b7" },
      { label: "Activation & PRISM", href: "/platform/activation", desc: "Playbook engine, dynamic creative, multi-channel deployment", color: "#fcd34d" },
    ],
  },
  {
    label: "Solutions",
    fallbackHref: "/solutions",
    items: [
      { label: "Enterprise", href: "/solutions#enterprise", desc: "PRISM personalization, infrastructure integration, full stack", color: "#93c5fd" },
      { label: "Mid-Market", href: "/solutions#midmarket", desc: "Full behavioral workflow with dedicated support teams", color: "#c084fc" },
      { label: "Small Business", href: "/solutions#smallbusiness", desc: "Fortune 500 data at flat-rate start-up pricing", color: "#6ee7b7" },
      { label: "Agencies", href: "/solutions#agencies", desc: "Embedded behavioral science & data science teams", color: "#fcd34d" },
      { label: "Political Campaigns", href: "/solutions#political", desc: "Behavioral voter targeting across every outreach channel", color: "#f87171" },
      { label: "International", href: "/solutions#international", desc: "Alternative credit scoring, emerging market intelligence", color: "#f0abfc" },
    ],
  },
  {
    label: "Verticals",
    fallbackHref: "/verticals",
    items: [
      { label: "Retail & E-Commerce", href: "/verticals#retail", desc: "Purchase drivers, brand conquest, personalized mail", color: "#93c5fd" },
      { label: "Financial Services", href: "/verticals#finance", desc: "Risk scoring, trust dynamics, wealth management", color: "#6ee7b7" },
      { label: "Healthcare", href: "/verticals#healthcare", desc: "HIPAA-compliant patient engagement & care targeting", color: "#f87171" },
      { label: "Political & Advocacy", href: "/verticals#political", desc: "Voter behavioral profiles, cross-channel activation", color: "#fcd34d" },
      { label: "Marketing Agencies", href: "/verticals#agencies", desc: "White-label behavioral intelligence for your clients", color: "#f0abfc" },
      { label: "Nonprofits", href: "/verticals#nonprofit", desc: "Donor psychology, LTV modeling, personalized appeals", color: "#fca5a5" },
    ],
  },
];

const plainLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

/* ── Desktop dropdown ── */

function NavDropdown({ menu }: { menu: DropdownMenu }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  const wide = menu.items.length > 4;

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <Link
        href={menu.fallbackHref}
        className="font-body text-[13px] font-normal tracking-[1.5px] text-text-primary/70 uppercase transition-colors duration-300 hover:text-accent"
        style={{ display: "flex", alignItems: "center", gap: 4 }}
      >
        {menu.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.3s ease",
            opacity: 0.5,
          }}
        >
          <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </Link>

      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: open
            ? "translateX(-50%) translateY(8px)"
            : "translateX(-50%) translateY(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          width: wide ? 420 : 320,
          padding: "12px",
          borderRadius: 14,
          background: "rgba(10, 10, 26, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(147, 197, 253, 0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(147,197,253,0.05)",
          zIndex: 200,
          display: wide ? "grid" : "flex",
          gridTemplateColumns: wide ? "1fr 1fr" : undefined,
          flexDirection: wide ? undefined : "column",
          gap: wide ? 4 : 0,
        }}
      >
        {menu.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: wide ? "10px 12px" : "12px 14px",
              borderRadius: 10,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${item.color}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: item.color,
                marginTop: 5,
                flexShrink: 0,
                boxShadow: `0 0 8px ${item.color}40`,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body, Outfit, sans-serif)",
                  fontSize: wide ? 13 : 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: 2,
                  letterSpacing: 0.3,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body, Outfit, sans-serif)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.4,
                }}
              >
                {item.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile accordion section ── */

function MobileSection({
  menu,
  onNavigate,
}: {
  menu: DropdownMenu;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-body, Outfit, sans-serif)",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.8)",
        }}
      >
        {menu.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.3s ease",
            opacity: 0.4,
          }}
        >
          <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      <div
        style={{
          maxHeight: open ? menu.items.length * 56 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {menu.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 12px 12px 8px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: item.color,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body, Outfit, sans-serif)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {item.label}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Main Nav ── */

interface NavProps {
  visible?: boolean;
  showToggle?: boolean;
}

export default function Nav({ visible = true, showToggle = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-[clamp(16px,4vw,60px)] h-[72px] flex items-center justify-between transition-all duration-400 ${
          scrolled || mobileOpen
            ? "bg-bg/85 backdrop-blur-xl border-b border-accent/[0.08]"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
          <Logo />
          <span className="font-body font-semibold text-lg tracking-[3px] text-text-primary">
            MOONBRUSH
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {dropdowns.map((menu) => (
            <NavDropdown key={menu.label} menu={menu} />
          ))}

          {plainLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-body text-[13px] font-normal tracking-[1.5px] text-text-primary/70 uppercase transition-colors duration-300 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}

          {showToggle && <ThemeToggle />}

          <a
            href="https://meetings-na2.hubspot.com/adam-syed/moonbrushdemo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] font-medium tracking-[1px] text-bg bg-accent/90 px-6 py-2.5 rounded-md uppercase transition-all duration-300 hover:bg-accent hover:shadow-[0_0_20px_rgba(147,197,253,0.4)]"
          >
            Book a Demo
          </a>

          <a
            href="/login"
            className="font-body text-[13px] font-normal tracking-[1.5px] text-accent/80 uppercase border border-accent/20 px-5 py-[9px] rounded-md transition-all duration-300 hover:border-accent/50 hover:text-accent"
          >
            Login
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: mobileOpen ? 0 : 5,
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--color-text-primary, #fff)",
              borderRadius: 2,
              transition: "all 0.3s ease",
              transform: mobileOpen ? "rotate(45deg) translateY(0px)" : "none",
              transformOrigin: "center",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--color-text-primary, #fff)",
              borderRadius: 2,
              transition: "all 0.3s ease",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--color-text-primary, #fff)",
              borderRadius: 2,
              transition: "all 0.3s ease",
              transform: mobileOpen ? "rotate(-45deg) translateY(0px)" : "none",
              transformOrigin: "center",
            }}
          />
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        style={{
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 49,
          background: "rgba(6, 6, 15, 0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div style={{ padding: "20px clamp(20px,6vw,40px) 40px" }}>
          {/* Dropdown sections with accordions */}
          {dropdowns.map((menu) => (
            <MobileSection key={menu.label} menu={menu} onNavigate={closeMobile} />
          ))}

          {/* Plain links */}
          {plainLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={closeMobile}
              style={{
                display: "block",
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "var(--font-body, Outfit, sans-serif)",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* CTA buttons */}
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href="https://meetings-na2.hubspot.com/adam-syed/moonbrushdemo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 24px",
                borderRadius: 10,
                background: "#93c5fd",
                color: "#0a0a1a",
                fontFamily: "var(--font-body, Outfit, sans-serif)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Book a Demo
            </a>

            <a
              href="/login"
              onClick={closeMobile}
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 24px",
                borderRadius: 10,
                border: "1px solid rgba(147,197,253,0.25)",
                color: "#93c5fd",
                fontFamily: "var(--font-body, Outfit, sans-serif)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
