import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { MachineCard } from "@/components/MachineCard";
import { site } from "@/config/site";
import { getMachine, getMachines, relatedMachines } from "@/lib/machines";
import { productTypeLabel } from "@/lib/labels";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return getMachines().map((machine) => ({ category: machine.category, slug: machine.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { category: string; slug: string } }): Metadata {
  const machine = getMachine(params.category, params.slug);
  if (!machine) return {};
  const image = machine.images[0];
  return pageMeta({
    title: `${machine.name} for US Plants`,
    description: machine.summary,
    path: `/machines/${machine.category}/${machine.slug}`,
    image: image?.src,
    imageAlt: image?.alt,
  });
}

function embedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (parsed.hostname.includes("vimeo.com") && !parsed.hostname.includes("player.")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return url;
  }
  return url;
}

export default function MachinePage({ params }: { params: { category: string; slug: string } }) {
  const machine = getMachine(params.category, params.slug);
  if (!machine) notFound();
  const related = relatedMachines(machine);
  const quoteHref = `/quote?machine=${machine.slug}`;
  const pageUrl = `${getSiteUrl()}/machines/${machine.category}/${machine.slug}`;
  const video = machine.videos[0];

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: machine.name,
    description: machine.summary,
    image: machine.images.map((image) => (image.src.startsWith("http") ? image.src : `${getSiteUrl()}${image.src}`)),
    brand: { "@type": "Brand", name: "MEMAK" },
    category: machine.categoryLabel,
    url: pageUrl,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      url: `${getSiteUrl()}${quoteHref}`,
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <article className="mx-auto max-w-page px-4 py-12 pb-28 md:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Machines", path: "/machines" },
          { name: machine.categoryLabel, path: `/machines/${machine.category}` },
          { name: machine.name, path: `/machines/${machine.category}/${machine.slug}` },
        ])}
      />
      <JsonLd data={productLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Machines", href: "/machines" },
          { name: machine.categoryLabel, href: `/machines/${machine.category}` },
          { name: machine.name },
        ]}
      />

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <Gallery images={machine.images} name={machine.name} />
        <div className="lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">{machine.categoryLabel}</p>
          <h1 className="mt-2 font-serif text-4xl text-chocolate md:text-5xl">{machine.name}</h1>
          <p className="mt-4 text-lg leading-8 text-charcoal/85">{machine.summary}</p>
          <p className="mt-4 text-sm font-semibold text-chocolate">Published rating: {machine.capacityLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {machine.productTypes.map((type) => (
              <li key={type} className="rounded-full bg-white px-3 py-1 text-xs text-cocoa ring-1 ring-chocolate/10">
                {productTypeLabel(type)}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={quoteHref} className="btn btn-primary">
              Request a Quote for this Machine
            </Link>
            {machine.brochures[0] ? (
              <a className="btn btn-line" href={machine.brochures[0].href} target="_blank" rel="noopener noreferrer">
                Brochure
              </a>
            ) : null}
          </div>
          {machine.todo ? <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-950">{machine.todo}</p> : null}
        </div>
      </div>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-serif text-3xl text-chocolate">About this machine</h2>
        {machine.description.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mt-4 leading-7 text-charcoal/85">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl text-chocolate">Features</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {machine.features.map((feature) => (
            <li key={feature} className="card px-4 py-3 text-sm">
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl text-chocolate">Technical specifications</h2>
        <p className="mt-2 max-w-3xl text-sm text-cocoa">
          Figures are transcribed from the manufacturer. Your quotation is the controlling document.
        </p>
        <div className="card mt-4 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <caption className="sr-only">Specifications for {machine.name}</caption>
            <thead className="bg-cream text-cocoa">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Specification</th>
                <th scope="col" className="px-4 py-3 font-semibold">Published value</th>
              </tr>
            </thead>
            <tbody>
              {machine.specs.map((spec) => (
                <tr key={`${spec.label}-${spec.value}`} className="border-t border-chocolate/10">
                  <th scope="row" className="px-4 py-3 font-medium text-chocolate">
                    {spec.label}
                  </th>
                  <td className="px-4 py-3">{spec.value}</td>
                </tr>
              ))}
              <tr className="border-t border-chocolate/10">
                <th scope="row" className="px-4 py-3 font-medium text-chocolate">Materials</th>
                <td className="px-4 py-3">{machine.materials}</td>
              </tr>
              <tr className="border-t border-chocolate/10">
                <th scope="row" className="px-4 py-3 font-medium text-chocolate">Voltage note for US plants</th>
                <td className="px-4 py-3">{machine.voltage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-3xl text-chocolate">Applications</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {machine.applications.map((item) => (
            <li key={item} className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-chocolate/10">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {machine.brochures.length || video ? (
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          {machine.brochures.length ? (
            <div className="card p-6">
              <h2 className="font-serif text-2xl text-chocolate">Brochure</h2>
              <ul className="mt-3 space-y-2">
                {machine.brochures.map((brochure) => (
                  <li key={brochure.href}>
                    <a className="underline decoration-caramel underline-offset-4" href={brochure.href} target="_blank" rel="noopener noreferrer">
                      {brochure.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {video ? (
            <div className="card p-6">
              <h2 className="font-serif text-2xl text-chocolate">Video</h2>
              {/youtube|vimeo/.test(video.url) ? (
                <iframe
                  className="mt-4 aspect-video w-full rounded-xl"
                  src={embedUrl(video.url)}
                  title={`${machine.name} video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <a className="mt-3 inline-block underline" href={video.url}>
                  Watch video
                </a>
              )}
            </div>
          ) : null}
        </section>
      ) : null}

      <p className="mt-8 text-xs leading-5 text-cocoa">
        Source: <a className="underline" href={machine.sourceUrl}>{machine.sourceUrl}</a>. {site.disclaimer}
      </p>

      {related.length ? (
        <section className="mt-14">
          <h2 className="font-serif text-3xl text-chocolate">Related machines</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <MachineCard machine={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-chocolate/10 bg-cream/95 p-3 backdrop-blur lg:hidden">
        <Link href={quoteHref} className="btn btn-primary w-full">
          Request a Quote for this Machine
        </Link>
      </div>
    </article>
  );
}
