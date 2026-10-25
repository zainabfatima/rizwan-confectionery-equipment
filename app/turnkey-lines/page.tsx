import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { turnkeyLines } from "@/data/turnkey";
import { getMachineBySlug } from "@/lib/machines";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Turnkey Candy Production Lines",
  description:
    "Complete MEMAK confectionery lines for chocolate tablets, shell pralines, gummies, and nougat bars, quoted for US plants.",
  path: "/turnkey-lines",
});

export default function TurnkeyPage() {
  return (
    <div className="mx-auto max-w-page px-4 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">Lines</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl text-chocolate md:text-5xl">Turnkey confectionery lines</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-charcoal/80">
        A candy production line is a chain of machines that share one rate. These four scopes show how MEMAK frames sit together. Each step links to the catalog page so you can read the published rating before you ask for a quote.
      </p>
      <div className="mt-10 space-y-10">
        {turnkeyLines.map((line) => (
          <section key={line.slug} className="card p-6 md:p-8" aria-labelledby={line.slug}>
            <h2 id={line.slug} className="font-serif text-3xl text-chocolate">
              {line.title}
            </h2>
            <p className="mt-3 max-w-3xl leading-7">{line.summary}</p>
            <p className="mt-2 text-sm text-cocoa">{line.fit}</p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {line.steps.map((step, index) => {
                const machine = step.machineSlug ? getMachineBySlug(step.machineSlug) : undefined;
                return (
                  <li key={step.title} className="rounded-2xl bg-cream p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-caramel">Step {index + 1}</p>
                    <h3 className="mt-1 font-serif text-xl text-chocolate">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6">{step.detail}</p>
                    {machine ? (
                      <Link className="mt-3 inline-block text-sm font-semibold underline decoration-caramel underline-offset-4" href={`/machines/${machine.category}/${machine.slug}`}>
                        {machine.name}
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
      <CtaBanner title="Request a line, not a single crate." />
    </div>
  );
}
