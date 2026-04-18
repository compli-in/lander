import { TopNav } from "@/components/TopNav";
import { HeroLive } from "@/components/HeroLive";
import { SeeItCatch } from "@/components/SeeItCatch";
import { IndiaComparison } from "@/components/IndiaComparison";
import { HowItWorksNew } from "@/components/HowItWorksNew";
import { AgenticPreview } from "@/components/AgenticPreview";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Compli",
  url: "https://compli.in",
  description: "DPDP-first cloud compliance automation platform built in India. Continuously scan AWS, Azure, GCP, and Kubernetes against DPDP Act, SOC 2, and ISO 27001 controls.",
  foundingDate: "2026",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite", name: "Compli", url: "https://compli.in",
  description: "India's DPDP-first cloud compliance automation platform.",
};

const softwareSchema = {
  "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Compli",
  applicationCategory: "BusinessApplication", operatingSystem: "Web",
  description: "DPDP-first cloud compliance automation. Continuously scan AWS, Azure, GCP, and Kubernetes against DPDP Act, SOC 2, and ISO 27001 controls in real time.",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock", price: "0", priceCurrency: "INR" },
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is Compli DPDP-compliant?", acceptedAnswer: { "@type": "Answer", text: "Yes — Compli is DPDP-first, with native coverage of the DPDP Act on day one." }},
    { "@type": "Question", name: "Does Compli support SOC 2?", acceptedAnswer: { "@type": "Answer", text: "Yes — SOC 2 is supported alongside DPDP Act and ISO 27001." }},
    { "@type": "Question", name: "Where is data stored?", acceptedAnswer: { "@type": "Answer", text: "Data resides in AWS ap-south-1 (Mumbai, India) by default." }},
    { "@type": "Question", name: "Do you integrate with Indian auditors?", acceptedAnswer: { "@type": "Answer", text: "Yes — Compli is partnered with CERT-In listed auditors for Indian engagements." }},
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <TopNav />
      <main>
        <HeroLive />
        <SeeItCatch />
        <IndiaComparison />
        <HowItWorksNew />
        <AgenticPreview />
        <section className="bg-[color:var(--bg)] py-24 px-6"><EarlyAccessForm /></section>
      </main>
      <Footer />
    </div>
  );
}
