import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { COMPANY } from "@/lib/data/company";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/seo/routes";

const bdoGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/BDOGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BDOGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BDOGrotesk-DemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-bdogrotesk",
  display: "swap",
});

const sequelSans = localFont({
  src: [
    {
      path: "../public/fonts/Sequel Sans Roman Body.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sequelsans",
  preload: false,
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME}: ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: COMPANY.description,
  applicationName: SITE_NAME,
  authors: [{ name: COMPANY.legalName, url: siteUrl }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description: COMPANY.description,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}: ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description: COMPANY.description,
    images: ["/opengraph-image"],
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
      // globals.css sets `scroll-behavior: smooth` for in-page anchors. This
      // tells Next 16 to switch it off during route changes, so a new page
      // jumps straight to the top instead of animating there (that animation
      // gets cut short by GSAP's ScrollTrigger refresh, leaving you mid-page).
      data-scroll-behavior="smooth"
      className={`${bdoGrotesk.variable} ${sequelSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#111111]">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
