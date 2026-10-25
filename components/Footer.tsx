import Link from "next/link";
import { site } from "@/config/site";
import { categoriesWithMachines } from "@/lib/machines";

export function Footer() {
  const categories = categoriesWithMachines();
  return (
    <footer className="mt-8 bg-chocolate text-cream">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-serif text-2xl">Rizwan</p>
          <p className="mt-2 text-sm text-cream/80">
            Chocolate, gummy, caramel, nougat, and bar machines for plants in the United States.
          </p>
          <p className="mt-2 text-xs text-cream/70">Equipment from MEMAK Machinery.</p>
          <a className="mt-4 inline-block text-sm underline decoration-caramel underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="mt-2 block text-sm underline decoration-caramel underline-offset-4" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-caramel">Categories</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link className="hover:text-caramel" href={`/machines/${category.slug}`}>
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-caramel">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-caramel" href="/machines">All machines</Link></li>
            <li><Link className="hover:text-caramel" href="/turnkey-lines">Turnkey lines</Link></li>
            <li><Link className="hover:text-caramel" href="/services">Services</Link></li>
            <li><Link className="hover:text-caramel" href="/about">About</Link></li>
            <li><Link className="hover:text-caramel" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-caramel" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-caramel" href="/quote">Request a quote</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-caramel">Social</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-caramel" href={site.social.linkedin}>LinkedIn</a></li>
            <li><a className="hover:text-caramel" href={site.social.youtube}>YouTube</a></li>
            <li><a className="hover:text-caramel" href={site.social.facebook}>Facebook</a></li>
          </ul>
          <p className="mt-4 text-sm text-cream/75">{site.hours}</p>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-page px-4 py-5 text-xs leading-relaxed text-cream/70">{site.disclaimer}</p>
      </div>
    </footer>
  );
}
