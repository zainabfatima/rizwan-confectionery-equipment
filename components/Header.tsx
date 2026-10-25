"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const links = [
  { href: "/machines", label: "Machines" },
  { href: "/turnkey-lines", label: "Turnkey Lines" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-chocolate/10 bg-cream/90 backdrop-blur">
      <div className="hidden border-b border-chocolate/10 md:block">
        <div className="mx-auto flex max-w-page items-center justify-between px-4 py-2 text-xs tracking-wide text-cocoa">
          <p>US installation support · Spare parts · Confectionery equipment only</p>
          <a className="font-medium underline decoration-caramel/60 underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="group min-w-0" onClick={() => setOpen(false)}>
          <span className="block font-serif text-xl leading-none text-chocolate">Rizwan</span>
          <span className="block text-[11px] uppercase tracking-[0.16em] text-cocoa">Confectionery Equipment</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-charcoal/80 hover:text-chocolate",
                  active && "text-chocolate underline decoration-caramel decoration-2 underline-offset-8",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/quote" className="btn btn-primary hidden sm:inline-flex">
            {site.hero.secondaryCta}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-chocolate/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-chocolate" />
              <span className="block h-0.5 w-5 bg-chocolate" />
              <span className="block h-0.5 w-5 bg-chocolate" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-chocolate/10 px-4 py-4 lg:hidden" aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-3 text-base font-medium hover:bg-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="btn btn-primary mt-2 w-full" onClick={() => setOpen(false)}>
                {site.hero.secondaryCta}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
