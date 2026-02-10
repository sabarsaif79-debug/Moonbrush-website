import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About | Moonbrush",
  description: "10 years in the making. Born from political campaigns, built for everyone. 289M+ profiles, 181 behavioral models, 10B+ daily signals. The behavioral intelligence thesis.",
  openGraph: {
    title: "About Moonbrush",
    description: "Moonbrush started where outcomes are immediate and unforgiving — political campaigns. The behavioral intelligence thesis was proven in elections, then brought to commercial marketing.",
    type: "website",
    siteName: "Moonbrush",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Moonbrush",
    description: "10 years in the making. Born from politics. Built for everyone.",
  },
};

export default AboutPage;
