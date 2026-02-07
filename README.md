# Moonbrush — Next.js + TypeScript + Tailwind CSS

## Getting Started

### Prerequisites
- **Node.js** 18+ installed ([download here](https://nodejs.org))

### Setup
```bash
# 1. Open this folder in VS Code, then open the terminal (Ctrl + `)

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tech Stack

- **Next.js 14** — React framework with App Router
- **TypeScript** — Type safety across all files
- **Tailwind CSS** — Utility-first styling (no separate CSS files)

---

## Project Structure

```
moonbrush/
├── app/
│   ├── globals.css          # Tailwind directives + font imports
│   ├── layout.tsx           # Root layout (metadata, html wrapper)
│   └── page.tsx             # Homepage
├── components/
│   ├── CapPill.tsx          # Capability tag pill
│   ├── CaseStudy.tsx        # Case study card
│   ├── FeatureCard.tsx      # Product feature card
│   ├── Footer.tsx           # Site footer
│   ├── Logo.tsx             # SVG logo
│   ├── LogoTicker.tsx       # Scrolling client logos
│   ├── Moon.tsx             # Rotating moon animation
│   ├── Nav.tsx              # Navigation bar
│   ├── Reveal.tsx           # Scroll-triggered animation wrapper
│   └── StatCard.tsx         # Stat counter card
├── hooks/
│   └── useInView.ts         # Intersection Observer hook
├── public/                  # Static assets (images, fonts, favicon)
├── tailwind.config.ts       # Tailwind theme (colors, fonts, animations)
├── tsconfig.json            # TypeScript config
├── postcss.config.js        # PostCSS for Tailwind
├── next.config.js           # Next.js config
└── package.json
```

## Adding New Pages

Create a new folder in `app/` with a `page.tsx` file:

```
app/
├── about/
│   └── page.tsx             # → /about
├── platform/
│   └── page.tsx             # → /platform
├── case-studies/
│   └── page.tsx             # → /case-studies
```

## Customizing the Theme

All colors, fonts, and animations are defined in `tailwind.config.ts`.
Edit the `extend` section to change the palette, add new animations, etc.

## Future: CMS Integration

This project is designed to connect to a headless CMS like **Sanity** or **Contentful**.
Once connected, your team can edit all text, images, case studies, stats, and team
members through a visual dashboard — no code changes needed.
