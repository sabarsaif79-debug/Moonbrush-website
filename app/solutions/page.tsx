import type { Metadata } from "next";
import SolutionsPage from "@/components/SolutionsPage";

export const metadata: Metadata = {
  title: "Solutions | Moonbrush",
  description: "Behavioral intelligence solutions for enterprise, mid-market, small business, agencies, political campaigns, and international markets. One platform, every audience.",
  openGraph: {
    title: "Solutions | Moonbrush",
    description: "Enterprise PRISM personalization, mid-market behavioral science, flat-rate data access for start-ups, agency intelligence tools, and political campaign targeting.",
    type: "website",
    siteName: "Moonbrush",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | Moonbrush",
    description: "Behavioral intelligence solutions for every audience segment.",
  },
};

export default SolutionsPage;
