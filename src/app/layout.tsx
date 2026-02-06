import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Compli - AI-Powered Compliance & Data Protection",
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
  ],
  authors: [{ name: "Compli" }],
  openGraph: {
    title: "Compli - AI-Powered Compliance & Data Protection",
    description:
      "Automate your compliance workflows with AI. Manage policies, respond to security questionnaires, and stay ahead of regulations.",
    url: "https://compli.in",
    siteName: "Compli",
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
