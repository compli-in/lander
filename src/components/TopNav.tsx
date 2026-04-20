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
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="10" width="28" height="5" rx="2.5" fill="#0b1220" />
            <rect x="6" y="10" width="22" height="5" rx="2.5" fill="#0EA5E9" />
            <rect x="6" y="18" width="28" height="5" rx="2.5" fill="#0b1220" />
            <rect x="6" y="18" width="26" height="5" rx="2.5" fill="#0EA5E9" opacity="0.7" />
            <rect x="6" y="26" width="28" height="5" rx="2.5" fill="#0b1220" />
            <rect x="6" y="26" width="18" height="5" rx="2.5" fill="#0EA5E9" opacity="0.45" />
          </svg>
          compli.in
        </Link>
        <div className="flex items-center gap-7 text-[color:var(--text-dim)]">
          <Link href="/#see-it-catch">Product</Link>
          <Link href="/#how-it-works">How it Works</Link>
          <Link href="/blog">Blog</Link>
          <Link href="#early-access" className="bg-[color:var(--accent-cta)] text-white px-3.5 py-1.5 rounded-md font-medium">
            Request Early Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
