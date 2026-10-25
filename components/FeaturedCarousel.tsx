"use client";

import { useRef } from "react";
import Link from "next/link";
import { HoverLift } from "@/components/HoverLift";
import { MachineImage } from "@/components/MachineImage";

export type CatalogSlide = {
  slug: string;
  category: string;
  name: string;
  summary: string;
  capacityLabel: string;
  applications: string[];
  image: { src: string; alt: string } | null;
};

function displayName(name: string) {
  const letters = name.replace(/[^A-Za-z]/g, "");
  if (!letters || letters !== letters.toUpperCase()) return name;
  return name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

export function FeaturedCarousel({ machines, label }: { machines: CatalogSlide[]; label: string }) {
  const scroller = useRef<HTMLDivElement>(null);

  function move(direction: number) {
    const node = scroller.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = node.querySelector<HTMLElement>("[data-machine-card]");
    const distance = card ? card.offsetWidth + 20 : Math.min(node.clientWidth * 0.85, 360);
    node.scrollBy({ left: direction * distance, behavior: reduce ? "auto" : "smooth" });
  }

  if (!machines.length) return null;

  return (
    <div>
      {machines.length > 1 ? (
        <div className="mb-3 flex justify-end gap-2">
          <button type="button" className="btn btn-line px-4 py-2" onClick={() => move(-1)} aria-label={`Previous ${label} machines`}>
            Previous
          </button>
          <button type="button" className="btn btn-line px-4 py-2" onClick={() => move(1)} aria-label={`Next ${label} machines`}>
            Next
          </button>
        </div>
      ) : null}
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
        tabIndex={0}
        aria-label={`${label} machines`}
      >
        {machines.map((machine) => {
          const name = displayName(machine.name);
          const href = `/machines/${machine.category}/${machine.slug}`;
          const uses = machine.applications.slice(0, 3);
          return (
            <div key={machine.slug} data-machine-card className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">
              <HoverLift className="h-full">
                <article className="card flex h-full flex-col overflow-hidden">
                  <Link href={href} className="relative block aspect-[4/3] bg-[#e7eef0]">
                    {machine.image ? (
                      <MachineImage src={machine.image.src} alt={machine.image.alt} sizes="(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 32vw" />
                    ) : null}
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="font-serif text-xl leading-tight text-chocolate">
                      <Link href={href} className="hover:text-cocoa">
                        {name}
                      </Link>
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-charcoal/80" title={machine.summary}>
                      {machine.summary}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-chocolate">{machine.capacityLabel}</p>
                    {uses.length > 0 ? (
                      <div className="mt-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa">Used for</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {uses.map((use) => (
                            <li key={use} className="rounded-full bg-cream px-2.5 py-1 text-xs text-cocoa">
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href={href} className="btn btn-dark px-4 py-2">
                        View Details
                      </Link>
                      <Link href={`/quote?machine=${machine.slug}`} className="btn btn-line px-4 py-2">
                        Get Quote
                      </Link>
                    </div>
                  </div>
                </article>
              </HoverLift>
            </div>
          );
        })}
      </div>
    </div>
  );
}
