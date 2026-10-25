import type { Metadata } from "next";
import { site } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

export function pageMeta({ title, description, path, image, imageAlt, noIndex, absoluteTitle }: PageMetaInput): Metadata {
  const descriptionText = description.length > 160 ? `${description.slice(0, 157).trim()}...` : description;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: descriptionText,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description: descriptionText,
      url: path,
      siteName: site.name,
      type: "website",
      images: image ? [{ url: image, alt: imageAlt ?? title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: descriptionText,
      images: image ? [image] : undefined,
    },
  };
}

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url,
    email: site.email,
    telephone: site.phoneDisplay,
    description: site.description,
    areaServed: "US",
    brand: site.partner,
    sameAs: Object.values(site.social),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}
