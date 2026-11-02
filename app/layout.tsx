import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBar } from "@/components/MobileBar";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const serif = Lora({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Magh Mela Camp Booking - Prayagraj 2027",
  description: "Book Swiss Cottage, Deluxe Tent, and Dormitory stays near Sangam for Magh Mela Prayagraj 2027.",
  icons: { icon: "/favicon.png" },
  openGraph: { images: [site.ogImage] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileBar />
        </Providers>
      </body>
    </html>
  );
}
