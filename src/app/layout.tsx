import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionController } from "@/components/layout/motion-controller";
import { site } from "@/lib/content";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Virtual Assistant for Inbox, Calendar & Admin`,
    template: `%s | ${site.name}, Virtual Assistant`,
  },
  description:
    "Jonalie is a virtual assistant for founders, coaches and small-business owners. She handles inbox, calendar, client paperwork, invoicing, travel and systems so you get 10+ hours a week back.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Your inbox, calendar & admin, quietly handled`,
    description: "General admin and operations support for busy founders. Book a free 20-minute discovery call.",
    images: [{ url: "/images/jonalie-standing.jpg", width: 1023, height: 1537, alt: "Jonalie, virtual assistant" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0d1b2a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal styles only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="overflow-x-clip">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-pearl px-5 py-3 text-sm font-semibold text-night transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <MotionController />
      </body>
    </html>
  );
}
