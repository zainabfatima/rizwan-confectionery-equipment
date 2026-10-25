import { CtaBanner } from "@/components/CtaBanner";
import { site } from "@/config/site";
import { aboutStats, aboutStory } from "@/data/about";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About the MEMAK Partnership",
  description:
    "How Rizwan Confectionery Equipment presents MEMAK chocolate and candy machinery to US plants, and what the partnership does and does not cover.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-page px-4 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">Company</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl text-chocolate md:text-5xl">
        A US desk for MEMAK confectionery equipment
      </h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4 text-lg leading-8 text-charcoal/85">
          {aboutStory.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p>
            The manufacturer catalog, which also shows bakery equipment we do not sell, is published at{" "}
            <a className="underline decoration-caramel underline-offset-4" href={site.manufacturerCatalogUrl}>
              memak.com
            </a>
            .
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {aboutStats.map((stat) => (
            <li key={stat.label} className="card p-5">
              <p className="font-serif text-3xl text-chocolate">{stat.value}</p>
              <p className="mt-1 text-sm text-cocoa">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
      <CtaBanner />
    </div>
  );
}
