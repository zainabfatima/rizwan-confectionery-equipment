import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Authorized MEMAK Confectionery Equipment for North America",
    template: "%s | Rizwan Confectionery Equipment",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "chocolate moulding machine USA",
    "confectionery equipment distributor",
    "gummy depositor",
    "chocolate enrobing machine",
    "candy production line",
    "MEMAK USA",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Authorized MEMAK Confectionery Equipment for North America",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-caramel focus:px-4 focus:py-2 focus:text-chocolate"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions machines={[]} />
      </body>
    </html>
  );
}
