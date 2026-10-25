"use client";

import { useState } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/config/site";
import type { Machine } from "@/lib/types";

export function FloatingActions({ machines }: { machines: Machine[] }) {
  const [open, setOpen] = useState(false);
  const whatsapp = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello, I have a question about MEMAK confectionery equipment.")}`
    : "";

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-chocolate/10 bg-cream/95 p-3 shadow-card md:inset-x-auto md:bottom-6 md:right-4 md:flex-col md:items-end md:border-0 md:bg-transparent md:p-0 md:shadow-none">
        {whatsapp ? (
          <a
            href={whatsapp}
            className="btn btn-dark flex-1 shadow-card md:flex-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        ) : null}
        <button type="button" className="btn btn-primary flex-1 shadow-card md:flex-none" onClick={() => setOpen(true)}>
          Ask a Question
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/50 p-4 sm:items-center" role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ask-title"
            className="card max-h-[90vh] w-full max-w-lg overflow-auto p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 id="ask-title" className="font-serif text-2xl text-chocolate">
                Ask a question
              </h2>
              <button type="button" className="btn btn-line px-3 py-2" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <QuoteForm machines={machines} intent="quick" />
          </div>
        </div>
      ) : null}
    </>
  );
}
