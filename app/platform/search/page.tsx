import type { Metadata } from "next";
import PlatformSearchPage from "@/components/PlatformSearchPage";

export const metadata: Metadata = {
  title: "Search & Workshop | Moonbrush",
  description: "Search 289M+ consumer profiles with behavioral, intent, and brand affinity filters. Drill into individual profiles. Unlimited access at flat-rate pricing.",
  openGraph: {
    title: "Search & Workshop | Moonbrush",
    description: "Search the entire U.S. consumer graph with behavioral filters. Individual-level profiles with 12 analytical lenses. Zero per-record fees.",
    type: "website",
    siteName: "Moonbrush",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search & Workshop | Moonbrush",
    description: "Search 289M+ profiles with behavioral filters. Zero per-record fees.",
  },
};

export default PlatformSearchPage;
