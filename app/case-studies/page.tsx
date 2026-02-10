import type { Metadata } from "next";
import CaseStudiesPage from "@/components/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies | Moonbrush",
  description: "Real results from behavioral intelligence campaigns. 312% ROI increase, 47% lower acquisition costs, 189% more qualified leads. See the measurable difference.",
  openGraph: {
    title: "Case Studies | Moonbrush",
    description: "Measurable results from behavioral intelligence. Restaurant chains, financial institutions, political campaigns, DTC brands, and nonprofits — all transformed by behavioral targeting.",
    type: "website",
    siteName: "Moonbrush",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Moonbrush",
    description: "312% ROI increase. 47% lower acquisition costs. Real behavioral intelligence results.",
  },
};

export default CaseStudiesPage;
