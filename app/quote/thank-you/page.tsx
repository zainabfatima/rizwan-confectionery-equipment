import Link from "next/link";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Quote Request Received",
  description: "Thank you. The Rizwan Confectionery Equipment quote desk has your note, or your email app is ready to send it.",
  path: "/quote/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cocoa">Thank you</p>
      <h1 className="mt-3 font-serif text-4xl text-chocolate">We have the request</h1>
      <p className="mt-4 leading-7 text-charcoal/80">
        If a form service is connected, the quote desk has your message. If your email app opened instead, send that draft to {site.email}. We reply during {site.hours.toLowerCase()}.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/machines" className="btn btn-dark">
          Back to machines
        </Link>
        <a href={`mailto:${site.email}`} className="btn btn-line">
          Email {site.email}
        </a>
      </div>
    </div>
  );
}
