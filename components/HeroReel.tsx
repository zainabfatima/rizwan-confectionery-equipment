"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MachineImage } from "@/components/MachineImage";

export type HeroSlide = {
  slug: string;
  category: string;
  name: string;
  summary: string;
  capacityLabel: string;
  applications: string[];
  features: string[];
  images: { src: string; alt: string }[];
  video: { title: string; url: string } | null;
};

function displayName(name: string) {
  const letters = name.replace(/[^A-Za-z]/g, "");
  if (!letters || letters !== letters.toUpperCase()) return name;
  return name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function videoKind(url: string) {
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { kind: "file" as const, src: url };
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      if (!id) return null;
      return {
        kind: "embed" as const,
        src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0`,
      };
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop() || "";
      if (!id) return null;
      return {
        kind: "embed" as const,
        src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0`,
      };
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (!id || id === "video") return null;
      return {
        kind: "embed" as const,
        src: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`,
      };
    }
  } catch {
    return null;
  }
  return null;
}

function useReduceMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduce;
}

const SLIDE_MS = 2800;
const PHOTO_MS = 1200;

function explanationLines(slide: HeroSlide) {
  const does = slide.features.find((feature) => feature.trim()) || slide.summary;
  const uses = slide.applications.map((item) => item.trim()).filter(Boolean).slice(0, 4);
  return [
    { label: "What it does", text: does },
    { label: "Used for", text: uses.length ? uses.join(", ") : slide.summary },
  ];
}

export function HeroReel({
  slides,
  eyebrow,
  headline,
  subhead,
  credit,
}: {
  slides: HeroSlide[];
  eyebrow: string;
  headline: string;
  subhead: string;
  credit: string;
}) {
  const reduce = useReduceMotion();
  const allowMotion = !reduce;
  const [index, setIndex] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [beat, setBeat] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const paused = reduce || manualPause;
  const slide = slides[index];

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
      setPhoto(0);
      setBeat(0);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  useEffect(() => {
    const current = slides[index];
    const count = current?.images.length ?? 0;
    const hasVideo = Boolean(current?.video && videoKind(current.video.url));
    if (paused) return;
    const timer = window.setInterval(() => {
      setBeat((value) => value + 1);
      if (!hasVideo && count > 1) setPhoto((currentPhoto) => (currentPhoto + 1) % count);
    }, PHOTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, index, slides]);

  if (!slide) return null;

  const name = displayName(slide.name);
  const uses = slide.applications.slice(0, 4);
  const lines = explanationLines(slide);
  const playback = allowMotion && slide.video ? videoKind(slide.video.url) : null;
  const href = `/machines/${slide.category}/${slide.slug}`;
  const activeLine = allowMotion ? beat % 2 : -1;

  function show(next: number) {
    setBeat(0);
    setPhoto(0);
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section
      className="relative isolate overflow-x-clip bg-charcoal text-cream md:min-h-[calc(100svh-7.5rem)]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Machines in motion"
      tabIndex={0}
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
        {playback?.kind === "embed" ? (
          <iframe
            key={playback.src}
            title={slide.video?.title || name}
            src={playback.src}
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-video min-h-full w-[177.78%] min-w-full -translate-x-1/2 -translate-y-1/2"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
          />
        ) : null}
        {playback?.kind === "file" ? (
          <video
            key={playback.src}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label={slide.video?.title || name}
          >
            <source src={playback.src} />
          </video>
        ) : null}
        {!playback ? (
          <div key={slide.slug} className={`absolute inset-0 ${allowMotion ? "hero-kenburns" : ""}`}>
            {slide.images.map((image, imageIndex) => {
              const active = imageIndex === photo;
              return (
                <div
                  key={`${slide.slug}-${image.src}`}
                  className={`hero-crossfade absolute inset-0 ${active ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={!active}
                >
                  <MachineImage
                    src={image.src}
                    alt=""
                    sizes="100vw"
                    priority={index === 0 && imageIndex === 0}
                    className="object-cover object-center"
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/88 to-charcoal/30" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-charcoal to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-page flex-col justify-between gap-8 px-4 pb-8 pt-8 md:min-h-[calc(100svh-7.5rem)] md:py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-caramel sm:tracking-[0.18em]">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-balance font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-6xl">{headline}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-cream">{subhead}</p>
          <p className="mt-3 text-sm text-cream">{credit}</p>
        </div>

        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-caramel">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <h2 className="mt-2 text-balance font-serif text-2xl leading-tight text-cream sm:text-3xl md:text-4xl">{name}</h2>
          <p className="mt-3 text-base leading-7 text-cream">{slide.summary}</p>
          <ol className="mt-4 space-y-3">
            {lines.map((line, lineIndex) => (
              <li
                key={line.label}
                className={`border-l-2 pl-3 ${lineIndex === activeLine ? "border-caramel" : "border-cream/45"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-caramel">{line.label}</p>
                <p className="mt-1 text-sm leading-6 text-cream">{line.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm font-semibold text-caramel">{slide.capacityLabel}</p>
          {uses.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {uses.map((use) => (
                <li key={use} className="rounded-full bg-charcoal/80 px-3 py-1 text-sm text-cream ring-1 ring-cream/30">
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

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-wrap" role="tablist" aria-label="Choose a machine">
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
                  <span className={`block h-2.5 rounded-full ${itemIndex === index ? "w-8 bg-caramel" : "w-2.5 bg-cream/70"}`} />
                </button>
              ))}
            </div>
            <div className={`grid gap-2 ${allowMotion ? "grid-cols-3" : "grid-cols-2"}`}>
              {allowMotion ? (
                <button
                  type="button"
                  className="btn btn-line-light w-full px-2"
                  aria-pressed={manualPause}
                  onClick={() => setManualPause((value) => !value)}
                >
                  {manualPause ? "Play" : "Pause"}
                </button>
              ) : null}
              <button type="button" className="btn btn-line-light w-full px-2" aria-label="Previous machine" onClick={() => show(index - 1)}>
                Previous
              </button>
              <button type="button" className="btn btn-line-light w-full px-2" aria-label="Next machine" onClick={() => show(index + 1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/20" aria-hidden="true">
        {paused ? null : <div key={index} className="hero-progress" />}
      </div>
    </section>
  );
}
