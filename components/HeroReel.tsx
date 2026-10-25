"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { MachineImage } from "@/components/MachineImage";

export type HeroSlide = {
  slug: string;
  category: string;
  name: string;
  summary: string;
  capacityLabel: string;
  applications: string[];
  images: { src: string; alt: string }[];
  video: { title: string; url: string } | null;
};

function displayName(name: string) {
  const letters = name.replace(/[^A-Za-z]/g, "");
  if (!letters || letters !== letters.toUpperCase()) return name;
  return name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function videoKind(url: string) {
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return "file" as const;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return { type: "youtube" as const, src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0` };
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop() || "";
      if (!id) return null;
      return { type: "youtube" as const, src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0` };
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (!id) return null;
      return { type: "vimeo" as const, src: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1` };
    }
  } catch {
    return null;
  }
  return null;
}

export function HeroReel({
  slides,
  eyebrow,
  headline,
  subhead,
}: {
  slides: HeroSlide[];
  eyebrow: string;
  headline: string;
  subhead: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [hoverPause, setHoverPause] = useState(false);
  const paused = Boolean(reduce) || manualPause || hoverPause;
  const slide = slides[index];

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
      setPhoto(0);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  useEffect(() => {
    const count = slides[index]?.images.length ?? 0;
    if (paused || count < 2 || slide?.video) return;
    const timer = window.setInterval(() => {
      setPhoto((current) => (current + 1) % count);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, index, slide?.video, slides]);

  if (!slide) return null;

  const name = displayName(slide.name);
  const image = slide.images[photo] ?? slide.images[0];
  const uses = slide.applications.slice(0, 4);
  const video = slide.video ? videoKind(slide.video.url) : null;
  const href = `/machines/${slide.category}/${slide.slug}`;

  function show(next: number) {
    setIndex((next + slides.length) % slides.length);
    setPhoto(0);
  }

  function hold(node: HTMLElement, active: boolean) {
    setHoverPause(active || node.contains(document.activeElement));
  }

  return (
    <section
      className="relative overflow-x-clip bg-charcoal text-cream"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured confectionery machines"
      tabIndex={0}
      onMouseEnter={(event) => hold(event.currentTarget, true)}
      onMouseLeave={(event) => hold(event.currentTarget, false)}
      onFocusCapture={(event) => hold(event.currentTarget, true)}
      onBlurCapture={(event) => hold(event.currentTarget, false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          show(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          show(index - 1);
        }
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {video && video !== "file" ? (
          <iframe
            key={video.src}
            title={slide.video?.title || name}
            src={video.src}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[100vw] min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 sm:w-[177.78vh]"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
          />
        ) : null}
        {slide.video && videoKind(slide.video.url) === "file" ? (
          <video
            key={slide.video.url}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label={slide.video.title || name}
          >
            <source src={slide.video.url} />
          </video>
        ) : null}
        {!video && image ? (
          <div key={`${slide.slug}-${image.src}`} className="absolute inset-0">
            <MachineImage
              src={image.src}
              alt={image.alt}
              sizes="100vw"
              priority={index === 0 && photo === 0}
              className={`object-cover object-center ${reduce ? "" : "hero-kenburns"}`}
            />
          </div>
        ) : null}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/35" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/90 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-page flex-col justify-between gap-8 px-4 pb-28 pt-8 md:min-h-[88vh] md:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-caramel sm:tracking-[0.2em]">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-3xl leading-tight sm:text-4xl md:text-6xl">{headline}</h1>
          {index === 0 ? <p className="mt-5 max-w-2xl text-base leading-7 text-cream/90 sm:text-lg">{subhead}</p> : null}
        </div>

        <div className="mt-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-caramel">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl md:text-4xl">{name}</h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-cream/90">{slide.summary}</p>
          <p className="mt-3 text-sm font-semibold text-caramel">{slide.capacityLabel}</p>
          {uses.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {uses.map((use) => (
                <li key={use} className="rounded-full bg-white/15 px-3 py-1 text-sm text-cream">
                  {use}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={href} className="btn btn-line-light w-full sm:w-auto">
              View Details
            </Link>
            <Link href={`/quote?machine=${slide.slug}`} className="btn btn-primary w-full sm:w-auto">
              Get Quote
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap" role="tablist" aria-label="Choose a featured machine">
            {slides.map((item, itemIndex) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={itemIndex === index}
                aria-label={`Show ${displayName(item.name)}`}
                className="inline-flex h-11 w-11 items-center justify-center"
                onClick={() => show(itemIndex)}
              >
                <span className={`block h-2.5 rounded-full ${itemIndex === index ? "w-8 bg-caramel" : "w-2.5 bg-cream/50"}`} />
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex">
            {reduce ? null : (
              <button type="button" className="btn btn-line-light px-3" aria-pressed={manualPause} onClick={() => setManualPause((value) => !value)}>
                {manualPause ? "Play" : "Pause"}
              </button>
            )}
            <button type="button" className="btn btn-line-light px-3" aria-label="Previous machine" onClick={() => show(index - 1)}>
              Previous
            </button>
            <button type="button" className="btn btn-line-light px-3" aria-label="Next machine" onClick={() => show(index + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/20" aria-hidden="true">
        {paused ? null : <div key={index} className="hero-progress" />}
      </div>
    </section>
  );
}
