import type { Metadata } from "next";
import PlatformBuilderPage from "@/components/PlatformBuilderPage";

export const metadata: Metadata = {
  title: "Builder & Models | Moonbrush",
  description: "181 behavioral enrichment models across 11 lens categories. Build custom models with boost, gate, and exclude controls. Five scoring systems covering complete behavioral DNA.",
  openGraph: {
    title: "Builder & Models | Moonbrush",
    description: "181 behavioral enrichment models across 11 lens categories. Create custom behavioral models and segments with enterprise-grade scoring systems.",
    type: "website",
    siteName: "Moonbrush",
  },
  twitter: {
    card: "summary_large_image",
    title: "Builder & Models | Moonbrush",
    description: "181 behavioral enrichment models across 11 lens categories.",
  },
};

export default PlatformBuilderPage;
