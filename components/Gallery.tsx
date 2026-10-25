"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MachineImage } from "@/components/MachineImage";
import type { MachineImage as Photo } from "@/lib/types";

export function Gallery({ images, name }: { images: Photo[]; name: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const photo = images[active] ?? images[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function step(direction: number) {
    setActive((current) => (current + direction + images.length) % images.length);
  }

  if (!photo) return null;

  return (
    <div>
      <button
        type="button"
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#e7eef0]"
        onClick={() => setOpen(true)}
        aria-label={`Open larger photo of ${name}`}
      >
        <MachineImage src={photo.src} alt={photo.alt} sizes="(max-width: 1024px) 100vw, 50vw" priority />
      </button>
      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                className={`relative block aspect-square overflow-hidden rounded-xl ring-2 ${index === active ? "ring-caramel" : "ring-transparent"}`}
                onClick={() => setActive(index)}
                aria-label={`Show photo ${index + 1} of ${name}`}
                aria-current={index === active}
              >
                <MachineImage src={image.src} alt="" sizes="80px" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <dialog
        ref={dialogRef}
        className="w-[min(960px,calc(100%-2rem))] rounded-2xl bg-chocolate p-4 text-cream backdrop:bg-charcoal/70"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id={titleId} className="font-serif text-xl">
            {name}
          </h2>
          <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black/20">
          <MachineImage src={photo.src} alt={photo.alt} sizes="90vw" priority />
        </div>
        {images.length > 1 ? (
          <div className="mt-3 flex justify-between">
            <button type="button" className="btn btn-line-light" onClick={() => step(-1)}>
              Previous
            </button>
            <button type="button" className="btn btn-line-light" onClick={() => step(1)}>
              Next
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
