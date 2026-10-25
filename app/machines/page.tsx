import { Catalog } from "@/components/Catalog";
import { getMachines } from "@/lib/machines";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Confectionery Machine Catalog",
  description:
    "Filter MEMAK chocolate moulding machines, gummy depositors, enrobers, and candy production equipment available through a US distributor.",
  path: "/machines",
});

export default function MachinesPage() {
  const machines = getMachines();
  return (
    <div className="mx-auto max-w-page px-4 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">Catalog</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl text-chocolate md:text-5xl">Confectionery machines</h1>
      <p className="mt-4 max-w-3xl text-charcoal/80">
        Filter by category, by the candy you make, and by published hourly capacity. Ratings come from the manufacturer. The sentence under each name was written for US buyers.
      </p>
      <div className="mt-8">
        <Catalog machines={machines} />
      </div>
    </div>
  );
}
