import { CtaBanner } from "@/components/CtaBanner";
import { serviceNotes, services } from "@/data/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Installation, Training, Parts, and Maintenance",
  description:
    "US installation, operator training, spare parts, and maintenance for MEMAK confectionery lines. Bakery equipment is outside this scope.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-page px-4 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">After the quote</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl text-chocolate md:text-5xl">
        Installation, training, parts, and maintenance
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-charcoal/80">
        Buying the machine is the middle of the project. These are the services that get a confectionery line running in a US plant and keep it that way.
      </p>
      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <li key={service.title} className="card p-6">
            <h2 className="font-serif text-3xl text-chocolate">{service.title}</h2>
            <p className="mt-3 leading-7 text-charcoal/80">{service.body}</p>
          </li>
        ))}
      </ul>
      <ul className="mt-8 space-y-2 text-sm text-cocoa">
        {serviceNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <CtaBanner title="Add service to the same quote as the machine." />
    </div>
  );
}
