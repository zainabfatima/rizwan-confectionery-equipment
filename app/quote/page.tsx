import { Suspense } from "react";
import { QuoteFormWithParams } from "@/components/QuoteForm";
import { getMachines } from "@/lib/machines";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Request a Quote",
  description:
    "Request a quote for MEMAK chocolate moulding, gummy, enrobing, or turnkey candy equipment. Tell us the machine, capacity, and US state.",
  path: "/quote",
});

export default function QuotePage() {
  const machines = getMachines();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">Quotation</p>
      <h1 className="mt-2 font-serif text-4xl text-chocolate md:text-5xl">Request a quote</h1>
      <p className="mt-4 leading-7 text-charcoal/80">
        Name the machines, the candy, and the capacity. If you opened this page from a product, that machine is already selected.
      </p>
      <div className="card mt-8 p-6">
        <Suspense fallback={<p>Loading the form…</p>}>
          <QuoteFormWithParams machines={machines} />
        </Suspense>
      </div>
    </div>
  );
}
