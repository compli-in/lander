import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Compli",
  url: "https://compli.in",
  description:
    "AI-powered compliance and data protection platform. Automate policy management, security questionnaire responses, and compliance workflows.",
  foundingDate: "2026",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Compli",
  url: "https://compli.in",
  description:
    "AI-powered compliance and data protection platform.",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Compli",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered compliance platform for policy management, security questionnaire automation, and smart policy recommendations.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareSchema} />
      <Header />
      <main>
        <Hero />
        <Features />
        <ComingSoon />
      </main>
      <Footer />
    </div>
  );
}
