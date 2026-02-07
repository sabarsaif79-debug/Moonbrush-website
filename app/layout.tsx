import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moonbrush | Personalization at Scale",
  description:
    "Moonbrush is a high-performance intelligence platform that transforms behavioral, demographic, transactional, and psychographic signals into precision-targeted outcomes.",
  keywords: [
    "behavioral intelligence",
    "personalization",
    "data platform",
    "audience segmentation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
