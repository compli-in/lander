"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled ? "bg-[color:var(--bg)]/90 backdrop-blur border-b border-[color:var(--border)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 text-sm">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-[15px] tracking-tight text-[color:var(--text)]">
          <span className="w-[22px] h-[22px] rounded-md grid place-items-center bg-[color:var(--accent-cta)] text-white text-xs font-bold">C</span>
          compli.in
        </Link>
        <div className="flex items-center gap-7 text-[color:var(--text-dim)]">
          <Link href="#product">Product</Link>
          <Link href="#frameworks">Frameworks</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="/blog">Blog</Link>
          <Link href="#early-access" className="bg-[color:var(--accent-cta)] text-white px-3.5 py-1.5 rounded-md font-medium">
            Request Early Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
