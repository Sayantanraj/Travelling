import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { company } from "@/lib/data/company";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
});
const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://howladartravels.example"),
  title: {
    default: `${company.nameEn} — ${company.taglineEn}`,
    template: `%s | ${company.nameEn}`,
  },
  description:
    "হাওলাদার ট্যুর এন্ড ট্রাভেলস — ২১ বছরের বিশ্বাস। কাশ্মীর, কেরল, আন্দামান, রাজস্থান, পুরী, দার্জিলিং সহ ৫০+ ভ্রমণ প্যাকেজ। WhatsApp এ বুকিং করুন।",
  keywords: [
    "Howladar Tour Travels", "Bengali tour operator", "Kashmir package",
    "Andaman tour", "Puri tour", "Darjeeling", "Hooghly travel agency",
  ],
  openGraph: {
    title: `${company.nameEn} — ${company.taglineEn}`,
    description: "২১ বছরের বিশ্বাস · ৫০+ গন্তব্য · WhatsApp এ বুকিং",
    type: "website",
    locale: "bn_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3A8A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${inter.variable} ${playfair.variable} ${bengali.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll>
          <Header />
          <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  );
}
