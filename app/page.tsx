import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { HeroReel, type HeroSlide } from "@/components/HeroReel";
import { Reveal } from "@/components/Reveal";
import { site } from "@/config/site";
import { finishedProducts, processSteps, testimonials, whyMemak, whyUs } from "@/data/home";
import { categoriesWithMachines, getFeaturedMachines, machinesInCategory } from "@/lib/machines";
import type { CatalogSlide } from "@/components/FeaturedCarousel";
import { pageMeta } from "@/lib/seo";

export function generateMetadata() {
  const hero = getFeaturedMachines()[0]?.images[0];
  return pageMeta({
    title: "Chocolate, Gummy, Caramel, Nougat and Bar Machines | Rizwan Confectionery Equipment",
    description:
      "Rizwan Confectionery Equipment for US plants. Chocolate, gummy and jelly, caramel, nougat, and bar machines, with what each line makes and the output it is quoted at.",
    path: "/",
    absoluteTitle: true,
    image: hero?.src,
    imageAlt: hero?.alt,
  });
}

export default function HomePage() {
  const featured = getFeaturedMachines();
  const categories = categoriesWithMachines();

  return (
    <>
      <HeroReel
        slides={featured.map(
          (machine): HeroSlide => ({
            slug: machine.slug,
            category: machine.category,
            name: machine.name,
            summary: machine.summary,
            capacityLabel: machine.capacityLabel,
            applications: machine.applications,
            features: machine.features,
            images: machine.images.map((image) => ({ src: image.src, alt: image.alt })),
            video: machine.videos[0] ?? null,
          }),
        )}
        eyebrow={site.hero.eyebrow}
        headline={site.hero.headline}
        subhead={site.hero.subhead}
        credit={site.hero.credit}
      />

      <section className="border-b border-chocolate/10 bg-white" aria-label="Manufacturer context">
        <ul className="mx-auto grid max-w-page gap-4 px-4 py-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Since 1997", "Factory-built equipment"],
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

      <section className="mx-auto max-w-page px-4 pt-16" aria-label="Finished products">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">What the plant makes</p>
        <h2 className="mt-2 font-serif text-4xl text-chocolate">Five confectionery families</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {finishedProducts.map((product) => (
            <li key={product.label}>
              <a href={product.href} className="card flex h-full flex-col p-5 hover:-translate-y-1">
                <span className={`h-1.5 w-12 rounded-full ${product.swatch}`} aria-hidden="true" />
                <span className="mt-4 font-serif text-2xl text-chocolate">{product.label}</span>
                <span className="mt-2 text-sm leading-6 text-charcoal/80">{product.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-page px-4 py-16 md:py-20" aria-labelledby="selling-slider-heading">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">What we sell</p>
          <h2 id="selling-slider-heading" className="mt-2 font-serif text-4xl text-chocolate">
            Every category, every machine
          </h2>
          <p className="mt-3 max-w-2xl text-charcoal/80">
            The full confectionery range, grouped by job. Each card shows the machine, a short description, the published output, and what it is used for.
          </p>
        </Reveal>
        <div className="mt-12 space-y-14">
          {categories.map((category, index) => {
            const slides: CatalogSlide[] = machinesInCategory(category.slug).map((machine) => ({
              slug: machine.slug,
              category: machine.category,
              name: machine.name,
              summary: machine.summary,
              capacityLabel: machine.capacityLabel,
              applications: machine.applications,
              image: machine.images[0] ? { src: machine.images[0].src, alt: machine.images[0].alt } : null,
            }));
            return (
              <section key={category.slug} aria-labelledby={`category-${category.slug}`}>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cocoa">
                      {String(index + 1).padStart(2, "0")} · {category.count} {category.count === 1 ? "machine" : "machines"}
                    </p>
                    <h3 id={`category-${category.slug}`} className="mt-1 font-serif text-3xl text-chocolate">
                      {category.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-charcoal/80">{category.short}</p>
                  </div>
                  <Link href={`/machines/${category.slug}`} className="text-sm font-semibold text-cocoa underline-offset-4 hover:underline">
                    Open {category.label}
                  </Link>
                </div>
                <FeaturedCarousel machines={slides} label={category.label} />
              </section>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-16 md:py-24">
        <h2 className="font-serif text-4xl text-chocolate">Why these machines</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {whyMemak.map((item) => (
            <li key={item.title} className="card p-6">
              <h3 className="font-serif text-2xl text-chocolate">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-charcoal/80">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-chocolate py-16 text-cream md:py-24">
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
