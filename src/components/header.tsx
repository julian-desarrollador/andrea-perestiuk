"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "@/components/logo";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#inicio" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-forest/80 underline-offset-8 transition-colors hover:text-forest hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <WhatsAppButton className="hidden lg:inline-flex" />

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-forest lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Abrir menú</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
            <path d="M3 6h18v2H3zm0 5h14v2H3zm0 5h18v2H3z" />
          </svg>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-forest/40"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          />
          <div
            id="menu-movil"
            className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-cream px-8 py-8 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-forest"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
                  <path d="m13.41 12 6.3-6.29-1.42-1.42L12 10.59 5.71 4.29 4.29 5.71 10.59 12l-6.3 6.29 1.42 1.42L12 13.41l6.29 6.3 1.42-1.42z" />
                </svg>
              </button>
            </div>
            <nav aria-label="Móvil" className="mt-12">
              <ul className="flex flex-col gap-6">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="font-serif text-4xl text-forest"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <WhatsAppButton className="mt-auto" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
