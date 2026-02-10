import type { Metadata } from "next";
import PlatformActivationPage from "@/components/PlatformActivationPage";

export const metadata: Metadata = {
  title: "Activation & PRISM | Moonbrush",
  description: "54-dimension Playbook engine, PRISM dynamic creative personalization with 130+ messaging atoms, and multi-channel deployment across DSP, email, SMS, and direct mail.",
  openGraph: {
    title: "Activation & PRISM | Moonbrush",
    description: "From login to personalized activation in under 20 minutes. Playbook engine, PRISM creative personalization, and multi-channel deployment.",
    type: "website",
    siteName: "Moonbrush",
  },
  twitter: {
    card: "summary_large_image",
    title: "Activation & PRISM | Moonbrush",
    description: "54-dimension Playbook engine and PRISM dynamic creative personalization.",
  },
};

export default PlatformActivationPage;
