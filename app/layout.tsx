import type { Metadata } from "next";
import { DM_Serif_Display, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vasanthaa.com"),
  title: {
    default: "Vasanthaa | Content Writer & Voice Over Artist",
    template: "%s | Vasanthaa",
  },
  description:
    "Portfolio of Vasanthaa, a content writer and voice-over artist creating scripts, brand content, social media content, commercial voice overs, narration and creative campaigns.",
  keywords: [
    "Vasanthaa",
    "Content Writer",
    "Voice Over Artist",
    "Reel Scripts",
    "Scriptwriter",
    "Commercial Voice Over",
    "Storyteller",
    "Brand Content",
  ],
  authors: [{ name: "Vasanthaa" }],
  creator: "Vasanthaa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vasanthaa.com",
    title: "Vasanthaa | Content Writer & Voice Over Artist",
    description:
      "I shape thoughts into words and tune voices that make every message felt.",
    siteName: "Vasanthaa Portfolio",
    images: [
      {
        url: "/images/hero/vasanthaa.webp",
        width: 1200,
        height: 630,
        alt: "Vasanthaa - Content Writer and Voice Over Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasanthaa | Content Writer & Voice Over Artist",
    description:
      "I shape thoughts into words and tune voices that make every message felt.",
    images: ["/images/hero/vasanthaa.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://vasanthaa.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${manrope.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#021D15] text-[#F7F4EC] font-sans selection:bg-[#C8A75A] selection:text-[#021D15]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
