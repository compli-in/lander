import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://compli.in"),
  title: {
    default: "Compli - AI-Powered Compliance & Data Protection",
    template: "%s | Compli",
  },
  description:
    "Automate your compliance workflows with AI. Manage policies, respond to security questionnaires, and stay ahead of regulations with Compli.",
  keywords: [
    "compliance",
    "data protection",
    "AI",
    "security questionnaire",
    "policy management",
    "GDPR",
    "SOC 2",
    "ISO 27001",
    "compliance automation",
    "infosec",
    "data privacy",
  ],
  authors: [{ name: "Compli" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Compli - AI-Powered Compliance & Data Protection",
    description:
      "Automate your compliance workflows with AI. Manage policies, respond to security questionnaires, and stay ahead of regulations.",
    url: "https://compli.in",
    siteName: "Compli",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compli - AI-Powered Compliance & Data Protection",
    description:
      "Automate your compliance workflows with AI. Manage policies, respond to security questionnaires, and stay ahead of regulations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${figtree.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
