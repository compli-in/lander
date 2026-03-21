import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Frameworks from "@/components/Frameworks";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Compli",
  url: "https://compli.in",
  description:
    "Cloud compliance automation platform for SOC 2, ISO 27001, and DPDP Act. Continuously scan AWS, Azure, GCP, and Kubernetes environments for security misconfigurations.",
  foundingDate: "2026",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Compli",
  url: "https://compli.in",
  description:
    "India's cloud compliance automation platform.",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Compli",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Automated cloud compliance scanning for AWS, Azure, GCP, and Kubernetes. Map findings to SOC 2, ISO 27001, and DPDP Act controls in real time.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    price: "0",
    priceCurrency: "INR",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareSchema} />
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Frameworks />
        <ComingSoon />
      </main>
      <Footer />
    </div>
  );
}
