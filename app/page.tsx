import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { MachineImage } from "@/components/MachineImage";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";
import { processSteps, testimonials, whyMemak, whyUs } from "@/data/home";
import { categoriesWithMachines, getFeaturedMachines } from "@/lib/machines";
import { pageMeta } from "@/lib/seo";

export function generateMetadata() {
  const hero = getFeaturedMachines()[0]?.images[0];
  return pageMeta({
    title: "Chocolate Moulding Machines & Candy Lines USA | Rizwan Confectionery Equipment",
    description:
      "MEMAK USA partner for chocolate moulding machines, gummy depositors, chocolate enrobing, and turnkey candy production lines. Request a US quote.",
    path: "/",
    absoluteTitle: true,
    image: hero?.src,
    imageAlt: hero?.alt,
  });
}

export default function HomePage() {
  const featured = getFeaturedMachines();
  const hero = featured[0]?.images[0];
  const categories = categoriesWithMachines();

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden bg-chocolate text-cream">
        {hero ? (
          <MachineImage
            src={hero.src}
            alt={hero.alt}
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-chocolate/80 to-chocolate/20" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-page flex-col justify-end px-4 py-16 md:justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">{site.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{site.hero.headline}</h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/85">{site.hero.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/machines" className="btn btn-primary">
              {site.hero.primaryCta}
            </Link>
            <Link href="/quote" className="btn btn-line-light">
              {site.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-chocolate/10 bg-white" aria-label="Manufacturer context">
        <ul className="mx-auto grid max-w-page gap-4 px-4 py-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Since 1997", "MEMAK machinery"],
            ["120+ countries", "Manufacturer installed base"],
            ["Turnkey lines", "Kitchen through wrapping"],
            ["US support", "Quote, install, parts"],
          ].map(([title, detail]) => (
            <li key={title}>
              <p className="font-semibold text-chocolate">{title}</p>
              <p className="text-cocoa">{detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-page px-4 py-16 md:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">Catalog</p>
          <h2 className="mt-2 font-serif text-4xl text-chocolate">Confectionery categories</h2>
          <p className="mt-3 max-w-2xl text-charcoal/80">
            Chocolate, gummy, caramel, nougat, and bar equipment. Every card opens a machine that was imported from the manufacturer’s confectionery range.
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/machines/${category.slug}`} className="card block h-full p-5 transition hover:-translate-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-caramel">
                  {category.count} {category.count === 1 ? "machine" : "machines"}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-chocolate">{category.label}</h3>
                <p className="mt-2 text-sm leading-6 text-charcoal/80">{category.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-page px-4">
          <h2 className="font-serif text-4xl text-chocolate">Featured machines</h2>
          <p className="mt-3 max-w-2xl text-charcoal/80">
            A short list for buyers comparing a chocolate moulding machine, an enrober, a tempering unit, or a gummy line.
          </p>
          <div className="mt-8">
            <FeaturedCarousel machines={featured} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-16 md:py-24">
        <h2 className="font-serif text-4xl text-chocolate">Why MEMAK</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {whyMemak.map((item) => (
            <li key={item.title} className="card p-6">
              <h3 className="font-serif text-2xl text-chocolate">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-charcoal/80">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cocoa py-16 text-cream md:py-24">
        <div className="mx-auto max-w-page px-4">
          <h2 className="font-serif text-4xl">Why buy through us</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {whyUs.map((item) => (
              <li key={item.title} className="rounded-2xl bg-white/10 p-5">
                <h3 className="font-serif text-2xl text-caramel">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-cream/85">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-16 md:py-24">
        <h2 className="font-serif text-4xl text-chocolate">From first call to a running line</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.step} className="card p-5">
              <p className="font-serif text-3xl text-caramel">{step.step}</p>
              <h3 className="mt-3 font-serif text-2xl text-chocolate">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/80">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white py-16 md:py-24" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-page px-4">
          <h2 id="testimonials-heading" className="font-serif text-4xl text-chocolate">
            Testimonials
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-cocoa">
            Sample cards for the layout. They are not customer reviews. Replace them with statements you have permission to publish.
          </p>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <li key={item.role} className="card p-6">
                <blockquote>
                  <p className="text-sm leading-6">“{item.quote}”</p>
                  <footer className="mt-4 text-sm">
                    <p className="font-semibold text-chocolate">{item.name}</p>
                    <p className="text-cocoa">{item.role}</p>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
