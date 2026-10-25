import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/data/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Buyer FAQ: Lead Time, Shipping, Voltage, Warranty",
  description:
    "Answers for US buyers of MEMAK confectionery equipment: lead times, shipping, 380 V versus US power, warranty, and financing inquiries.",
  path: "/faq",
});

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <JsonLd data={schema} />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">Before you buy</p>
      <h1 className="mt-2 font-serif text-4xl text-chocolate md:text-5xl">Questions from US buyers</h1>
      <p className="mt-4 leading-7 text-charcoal/80">
        Lead time, shipping, voltage, warranty, and financing come up on every project. The controlling terms are still the quotation.
      </p>
      <div className="mt-8 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="card group p-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-chocolate">
              {faq.question}
              <span aria-hidden className="text-caramel transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-7 text-charcoal/80">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
