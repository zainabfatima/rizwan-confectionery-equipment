"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { site } from "@/config/site";
import { productTypeLabel } from "@/lib/labels";
import { usStates } from "@/lib/us-states";
import { productTypes, type Machine } from "@/lib/types";

type Intent = "quote" | "contact" | "quick";

const timelines = ["As soon as the quote is ready", "1–3 months", "3–6 months", "6–12 months", "Planning only"];

export function QuoteFormWithParams({ machines, intent = "quote" }: { machines: Machine[]; intent?: Intent }) {
  const params = useSearchParams();
  return <QuoteForm machines={machines} intent={intent} initialMachine={params.get("machine") ?? ""} />;
}

export function QuoteForm({
  machines,
  intent = "quote",
  initialMachine = "",
}: {
  machines: Machine[];
  intent?: Intent;
  initialMachine?: string;
}) {
  const router = useRouter();
  const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const selected = useMemo(() => new Set(initialMachine ? [initialMachine] : []), [initialMachine]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_gotcha") ?? "")) return;
    setError("");
    setStatus("submitting");

    try {
      if (formspree) {
        data.set("_next", `${window.location.origin}/quote/thank-you`);
        const response = await fetch(`https://formspree.io/f/${formspree}`, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("The form service did not accept the message.");
      } else {
        const lines = Array.from(data.entries())
          .filter(([key, value]) => key !== "_gotcha" && key !== "attachment" && key !== "_next" && typeof value === "string" && value)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        const file = data.get("attachment");
        const fileNote =
          file instanceof File && file.size > 0
            ? "\n\nA file was selected in the browser but cannot travel with a mailto link. Please attach it in your email app."
            : "";
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(String(data.get("_subject") || "Quote request"))}&body=${encodeURIComponent(lines + fileNote)}`;
      }
      setStatus("success");
      window.setTimeout(() => router.push("/quote/thank-you"), 900);
    } catch (reason) {
      setStatus("error");
      setError(reason instanceof Error ? reason.message : "Something went wrong. Email us directly instead.");
    }
  }

  const quote = intent === "quote";
  const quick = intent === "quick";

  return (
    <form
      className="grid gap-4"
      method="post"
      action={formspree ? `https://formspree.io/f/${formspree}` : undefined}
      encType="multipart/form-data"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="_subject" value={quick ? "Quick question" : quote ? "Machine quote request" : "Contact"} />
      <p className="hidden">
        <label>
          Company website
          <input name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        {quick ? null : <Field label="Company" name="company" required autoComplete="organization" />}
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        {quick ? null : (
          <label className="block text-sm font-medium sm:col-span-2">
            State
            <select name="state" required className="field mt-1" defaultValue="">
              <option value="" disabled>
                Select a state
              </option>
              {usStates.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      {quote ? (
        <fieldset className="rounded-2xl border border-chocolate/10 p-4">
          <legend className="px-1 text-sm font-semibold">Machines of interest</legend>
          <div className="mt-2 grid max-h-56 gap-2 overflow-auto sm:grid-cols-2">
            {machines.map((machine) => (
              <label key={machine.slug} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="machines"
                  value={`${machine.name} (${machine.slug})`}
                  defaultChecked={selected.has(machine.slug)}
                  className="mt-1"
                />
                <span>
                  {machine.name}
                  <span className="block text-xs text-cocoa">{machine.categoryLabel}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {quote ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Desired capacity" name="capacity" placeholder="Example: 500 kg/h of 12 g gummies" />
          <label className="block text-sm font-medium">
            Product type
            <select name="productType" className="field mt-1" defaultValue="chocolate">
              {productTypes.map((type) => (
                <option key={type.id} value={productTypeLabel(type.id)}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Timeline
            <select name="timeline" className="field mt-1" defaultValue={timelines[2]}>
              {timelines.map((timeline) => (
                <option key={timeline}>{timeline}</option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <label className="block text-sm font-medium">
        Message
        <textarea name="message" required rows={quick ? 4 : 6} className="field mt-1" placeholder="Product, piece weight, and anything the brochure will not tell us." />
      </label>

      {quick ? null : (
        <label className="block text-sm font-medium">
          File upload <span className="font-normal text-cocoa">(optional)</span>
          <input name="attachment" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" className="mt-2 block w-full text-sm" />
          <span className="mt-1 block text-xs text-cocoa">Drawings or photos. PDF, image, or Word.</span>
        </label>
      )}

      {!formspree ? (
        <p className="rounded-xl bg-cream px-3 py-2 text-sm text-cocoa">
          The form service is not configured, so submit opens an email to {site.email}. Attach any file again in your mail app.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-900" role="alert">
          {error}
        </p>
      ) : null}
      <div aria-live="polite">
        {status === "success" ? (
          <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-950" role="status">
            Message ready. Taking you to the thank-you page.
          </p>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : quote ? "Request a Quote" : quick ? "Send question" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} className="field mt-1" />
    </label>
  );
}
