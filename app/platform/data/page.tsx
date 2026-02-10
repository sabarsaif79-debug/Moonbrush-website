import type { Metadata } from "next";
import PlatformDataPage from "@/components/PlatformDataPage";

export const metadata: Metadata = {
  title: "Data & Intelligence | Moonbrush",
  description: "289M+ consumer profiles, 10B+ daily signals, 98%+ identity resolution. Explore Moonbrush's consumer graph, data sources, and compliance architecture.",
  openGraph: {
    title: "Data & Intelligence | Moonbrush",
    description: "289M+ consumer profiles enriched with hundreds of behavioral dimensions. First-party, second-party, and third-party data streams unified in one platform.",
    type: "website",
    siteName: "Moonbrush",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & Intelligence | Moonbrush",
    description: "289M+ consumer profiles enriched with hundreds of behavioral dimensions.",
  },
};

export default PlatformDataPage;
