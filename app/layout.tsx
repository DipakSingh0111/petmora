import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { PageBanner } from "@/components/PageBanner";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/motion/PageTransition";
import petlioData from "@/data/petlio.json";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${petlioData.site.name} | ${petlioData.site.tagline}`,
  description: petlioData.hero.tagline ?? petlioData.site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-about-text">
        <ScrollToTop />
        <Header />
        <PageBanner />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
