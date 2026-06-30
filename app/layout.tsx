import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Tanami360 — 360° Platforms, Built, Hosted, Maintained",
  description: "Tanami360 builds, hosts, and maintains custom web platforms for businesses. Full-cycle development from idea to live product.",
  openGraph: {
    title: "Tanami360 — 360° Platforms",
    description: "From idea to live product. We build, host, and maintain custom web platforms.",
    url: "https://tanami360.com",
    siteName: "Tanami360",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-snow text-midnight`}>{children}</body>
    </html>
  );
}