"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Visit Us" },
  { href: "/install", label: "Get App" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
        ? "border-b border-charcoal-900/10 bg-white"
        : "bg-white"
        }`}
    >
      <div className="container-page flex h-[72px] sm:h-[100px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative h-24 w-24 overflow-hidden ">
            <Image
              src="/logos.png"
              alt={`${site.fullName} logo`}
              fill
              sizes=""
              className="object-contain p-0.5"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold tracking-tight leading-none">
              {site.name}
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-chilli-600">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active
                  ? "bg-chilli-600 text-white"
                  : "text-charcoal-900/70 hover:bg-charcoal-900/5 hover:text-charcoal-900"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden rounded-full border border-charcoal-900/15 px-4 py-2 text-sm font-semibold transition hover:border-chilli-500 hover:text-chilli-700 lg:inline-flex"
          >
            {site.phoneDisplay}
          </a>

          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full bg-charcoal-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-chilli-600"
          >
            Cart
            {count > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-masala-400 px-1 text-[11px] font-bold text-charcoal-900">
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-full border border-charcoal-900/15 p-2.5 md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="container-page grid gap-1 border-t border-charcoal-900/10 bg-cream pb-4 pt-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-charcoal-900/80 transition hover:bg-chilli-50 hover:text-chilli-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
