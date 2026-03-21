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
    default: "Compli — Cloud Compliance Automation for SOC 2, ISO 27001 & DPDP Act",
    template: "%s | Compli",
  },
  description:
    "Compli continuously scans AWS, Azure, GCP, and Kubernetes for security misconfigurations and maps every finding to SOC 2, ISO 27001, and DPDP Act controls. India's cloud compliance platform.",
  keywords: [
    "cloud compliance",
    "SOC 2 automation",
    "ISO 27001",
    "DPDP Act",
    "compliance scanning",
    "AWS security",
    "Azure compliance",
    "GCP compliance",
    "Kubernetes security",
    "CISO dashboard",
    "compliance posture",
    "India compliance",
    "CERT-In",
    "security automation",
    "cloud security posture management",
    "CSPM",
  ],
  authors: [{ name: "Compli" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Compli — Cloud Compliance Automation for SOC 2, ISO 27001 & DPDP Act",
    description:
      "Continuously scan AWS, Azure, GCP, and Kubernetes against SOC 2, ISO 27001, and DPDP Act. India's cloud compliance platform.",
    url: "https://compli.in",
    siteName: "Compli",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compli — Cloud Compliance Automation for SOC 2, ISO 27001 & DPDP Act",
    description:
      "Continuously scan AWS, Azure, GCP, and Kubernetes against SOC 2, ISO 27001, and DPDP Act. India's cloud compliance platform.",
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
