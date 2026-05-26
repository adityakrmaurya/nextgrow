import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import CursorGlow from "@/components/layout/CursorGlow";
import SmoothScroll from "@/components/providers/SmoothScroll";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextgrow.in"),
  title: "NextGrow — From Here to Everywhere",
  description:
    "NextGrow is a Marketing Technology & Media company delivering strategy, campaigns, and execution across digital, offline, and on-screen. Based in Lucknow.",
  keywords: [
    "marketing agency Lucknow",
    "digital marketing India",
    "growth marketing",
    "NextGrow",
    "offline marketing",
    "brand strategy",
  ],
  openGraph: {
    title: "NextGrow — From Here to Everywhere",
    description:
      "Strategy, campaigns, and execution across digital, offline, and on-screen.",
    type: "website",
    url: "https://nextgrow.in",
    siteName: "NextGrow",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGrow — From Here to Everywhere",
    description: "Marketing Technology & Media company based in Lucknow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="antialiased min-h-screen bg-ink text-cream">
        {/* Skip-to-content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-lime focus:text-ink focus:px-4 focus:py-2 focus:text-sm focus:font-body focus:font-bold focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <CursorGlow />
          <Cursor />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
