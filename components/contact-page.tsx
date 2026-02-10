import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Book a Demo | Moonbrush",
  description: "See your actual customers through the behavioral intelligence lens. 30-minute live demo — your data, not a pitch deck. 289M+ profiles, 181 models, zero per-record cost.",
  openGraph: {
    title: "Book a Demo | Moonbrush",
    description: "30-minute live demo with your data. See behavioral profiles, Workshop analysis, and Playbook activation running against your actual audience.",
    type: "website",
    siteName: "Moonbrush",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo | Moonbrush",
    description: "See your customers through the behavioral intelligence lens. 30-minute live demo.",
  },
};

export default ContactPage;
