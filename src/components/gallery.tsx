"use client";

import { useRef } from "react";
import { gallery } from "@/content/site";

const tones = {
  sage: "bg-sage text-cream",
  cream: "bg-cream text-forest border border-sand",
  sand: "bg-sand text-forest",
} as const;

export function Gallery() {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: number) {
    const el = scroller.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: "smooth" });
  }

  return (
    <section className="px-6 py-16 md:py-24" aria-label="Frases">
      <div className="relative mx-auto max-w-6xl">
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {gallery.map((slide) => (
            <article
              key={slide.text}
              data-card
              className={`flex min-h-80 w-full shrink-0 snap-start items-end rounded-2xl p-8 sm:min-h-96 sm:p-10 md:w-[calc((100%-2rem)/3)] ${tones[slide.tone]}`}
            >
              <p className="font-serif text-3xl leading-tight sm:text-4xl">{slide.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scrollByCard(-1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M15.4 4.6 8 12l7.4 7.4-1.4 1.4L5.2 12 14 3.2z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => scrollByCard(1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest text-forest transition-colors hover:bg-forest hover:text-cream"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="m8.6 4.6 1.4-1.4L18.8 12 10 20.8l-1.4-1.4L16 12z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
