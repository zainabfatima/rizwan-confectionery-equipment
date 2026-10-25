import Link from "next/link";
import { HoverLift } from "@/components/HoverLift";
import { MachineImage } from "@/components/MachineImage";
import { productTypeLabel } from "@/lib/labels";
import type { Machine } from "@/lib/types";

export function MachineCard({ machine, priority = false }: { machine: Machine; priority?: boolean }) {
  const image = machine.images[0];
  const href = `/machines/${machine.category}/${machine.slug}`;
  return (
    <HoverLift className="h-full">
      <article className="card flex h-full flex-col overflow-hidden">
        <Link href={href} className="relative block aspect-[4/3] bg-[#f3ebe3]">
          {image ? (
            <MachineImage
              src={image.src}
              alt={image.alt}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
          ) : null}
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cocoa">{machine.categoryLabel}</p>
          <h3 className="mt-2 font-serif text-2xl leading-tight text-chocolate">
            <Link href={href} className="hover:text-cocoa">
              {machine.name}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-charcoal/80">{machine.summary}</p>
          <p className="mt-3 text-sm font-medium text-chocolate">{machine.capacityLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {machine.productTypes.map((type) => (
              <li key={type} className="rounded-full bg-cream px-2 py-1 text-xs text-cocoa">
                {productTypeLabel(type)}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={href} className="btn btn-dark">
              View Details
            </Link>
            <Link href={`/quote?machine=${machine.slug}`} className="btn btn-line">
              Get Quote
            </Link>
          </div>
        </div>
      </article>
    </HoverLift>
  );
}
