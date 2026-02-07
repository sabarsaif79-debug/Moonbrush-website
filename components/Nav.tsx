"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Verticals", href: "/verticals" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

interface NavProps {
  visible?: boolean;
  showToggle?: boolean;
}

export default function Nav({ visible = true, showToggle = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-[clamp(20px,4vw,60px)] h-[72px] flex items-center justify-between transition-all duration-400 ${
        scrolled
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
      <div className="flex items-center gap-3">
        <Logo />
        <span className="font-body font-semibold text-lg tracking-[3px] text-text-primary">
          MOONBRUSH
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-9">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="font-body text-[13px] font-normal tracking-[1.5px] text-text-primary/70 uppercase transition-colors duration-300 hover:text-accent"
          >
            {l.label}
          </a>
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
    </nav>
  );
}
