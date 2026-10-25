import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { MachineCard } from "@/components/MachineCard";
import { categoriesWithMachines, categoryOrThrow, machinesInCategory } from "@/lib/machines";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return categoriesWithMachines().map((category) => ({ category: category.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = categoryOrThrow(params.category);
  if (!category) return {};
  return pageMeta({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/machines/${category.slug}`,
  });
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryOrThrow(params.category);
  if (!category) notFound();
  const machines = machinesInCategory(category.slug);
  return (
    <div className="mx-auto max-w-page px-4 py-12 md:py-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Machines", path: "/machines" },
          { name: category.label, path: `/machines/${category.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Machines", href: "/machines" },
          { name: category.label },
        ]}
      />
      <h1 className="mt-6 max-w-3xl font-serif text-4xl text-chocolate md:text-5xl">{category.label}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-charcoal/85">{category.intro}</p>
      {machines.length === 0 ? (
        <p className="card mt-8 p-6 text-cocoa">No machines are published in this category yet.</p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {machines.map((machine) => (
            <li key={machine.slug}>
              <MachineCard machine={machine} />
            </li>
          ))}
        </ul>
      )}
      <CtaBanner title={`Quote a ${category.label.toLowerCase()} project`} />
    </div>
  );
}
