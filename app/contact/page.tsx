import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/config/site";
import { getMachines } from "@/lib/machines";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact the Quote Desk",
  description:
    "Email, phone, and business hours for Rizwan Confectionery Equipment, plus a contact form for MEMAK confectionery projects in the United States.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-page gap-10 px-4 py-12 md:py-16 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">Contact</p>
        <h1 className="mt-2 font-serif text-4xl text-chocolate md:text-5xl">Talk to the quote desk</h1>
        <dl className="mt-8 space-y-4">
          <div>
            <dt className="text-sm font-semibold text-cocoa">Email</dt>
            <dd>
              <a className="text-lg underline decoration-caramel underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-cocoa">Phone</dt>
            <dd>
              <a className="text-lg underline decoration-caramel underline-offset-4" href={site.phoneHref}>
                {site.phoneDisplay}
              </a>
              <p className="text-sm text-cocoa">Replace this demo number in config/site.ts before launch.</p>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-cocoa">Hours</dt>
            <dd>{site.hours}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-cocoa">Service area</dt>
            <dd>{site.addressLines.join(", ")}</dd>
          </div>
        </dl>
        <iframe
          title="Map placeholder showing the United States service area"
          src={site.mapEmbedUrl}
          className="mt-8 h-72 w-full rounded-2xl border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="card p-6">
        <h2 className="font-serif text-3xl text-chocolate">Send a message</h2>
        <div className="mt-4">
          <QuoteForm machines={getMachines()} intent="contact" />
        </div>
      </div>
    </div>
  );
}
