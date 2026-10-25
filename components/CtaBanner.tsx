import Link from "next/link";
import { site } from "@/config/site";

export function CtaBanner({
  title = "Tell us the candy you want to run.",
  body = "Send the product, the piece weight, and the hourly output. We will answer with the MEMAK frames that fit a US plant — and we will say so if a machine is the wrong size.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-page px-4 py-16">
      <div className="overflow-hidden rounded-2xl bg-chocolate px-6 py-12 text-cream shadow-card md:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Next step</p>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl md:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-cream/80">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            {site.hero.secondaryCta}
          </Link>
          <Link href="/machines" className="btn btn-line-light">
            {site.hero.primaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
