"use client";

import { useRef } from "react";
import { MachineCard } from "@/components/MachineCard";
import type { Machine } from "@/lib/types";

export function FeaturedCarousel({ machines }: { machines: Machine[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  function move(direction: number) {
    const node = scroller.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.85, 420), behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" className="btn btn-line px-4" onClick={() => move(-1)} aria-label="Previous featured machines">
          Previous
        </button>
        <button type="button" className="btn btn-line px-4" onClick={() => move(1)} aria-label="Next featured machines">
          Next
        </button>
      </div>
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        tabIndex={0}
        aria-label="Featured machines"
      >
        {machines.map((machine) => (
          <div key={machine.slug} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]">
            <MachineCard machine={machine} />
          </div>
        ))}
      </div>
    </div>
  );
}
