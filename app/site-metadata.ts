import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://moonbrush.com"),
  title: {
    default: "Moonbrush | Behavioral Intelligence Platform",
    template: "%s | Moonbrush",
  },
  description:
    "Transform billions of raw signals into actionable behavioral intelligence. 289M+ consumer profiles, 181 enrichment models, and PRISM dynamic creative personalization.",
  keywords: [
    "behavioral intelligence",
    "consumer graph",
    "psychographic targeting",
    "behavioral enrichment",
    "identity resolution",
    "audience personalization",
    "PRISM creative engine",
    "marketing data platform",
    "behavioral modeling",
    "micro-cohorting",
  ],
  authors: [{ name: "Moonbrush" }],
  creator: "Moonbrush",
  publisher: "Moonbrush",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moonbrush.com",
    siteName: "Moonbrush",
    title: "Moonbrush | Behavioral Intelligence Platform",
    description:
      "Transform billions of raw signals into actionable behavioral intelligence. 289M+ profiles. 181 models. PRISM personalization.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moonbrush | Behavioral Intelligence Platform",
    description:
      "Transform billions of raw signals into actionable behavioral intelligence. 289M+ profiles. 181 models. PRISM personalization.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
