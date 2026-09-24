"use client";

import { type FormEvent } from "react";
import { whatsappHref } from "@/content/site";

export function ContactForm() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = [
      "Hola, quiero hacer una consulta.",
      `Nombre: ${data.get("nombre")}`,
      `Teléfono: ${data.get("telefono")}`,
      `Correo: ${data.get("email")}`,
      `Consulta: ${data.get("consulta")}`,
    ].join("\n");
    window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} aria-label="Formulario de contacto">
      <label className="sr-only" htmlFor="nombre">
        Nombre y apellido
      </label>
      <input
        id="nombre"
        name="nombre"
        required
        placeholder="Nombre y apellido"
        className="rounded-lg border border-sand bg-white/70 px-5 py-4 text-forest placeholder:text-muted"
      />
      <label className="sr-only" htmlFor="telefono">
        Teléfono de contacto
      </label>
      <input
        id="telefono"
        name="telefono"
        type="tel"
        required
        placeholder="Teléfono de contacto"
        className="rounded-lg border border-sand bg-white/70 px-5 py-4 text-forest placeholder:text-muted"
      />
      <label className="sr-only" htmlFor="email">
        Correo electrónico
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="Correo electrónico"
        className="rounded-lg border border-sand bg-white/70 px-5 py-4 text-forest placeholder:text-muted"
      />
      <label className="sr-only" htmlFor="consulta">
        Consulta
      </label>
      <textarea
        id="consulta"
        name="consulta"
        required
        rows={6}
        placeholder="Consulta"
        className="rounded-lg border border-sand bg-white/70 px-5 py-4 text-forest placeholder:text-muted"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 self-end rounded-lg border border-forest px-6 py-4 text-lg text-forest transition-colors hover:bg-forest hover:text-cream"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M3.4 20.6 21.7 12 3.4 3.4l.1 6.7L15.8 12 3.5 13.9z" />
        </svg>
        Enviar
      </button>
    </form>
  );
}
