import { contact, mapsEmbedSrc, mapsHref, site, whatsappHref } from "@/content/site";
import { ContactForm } from "@/components/contact-form";

const cards = [
  {
    title: "Consultorio",
    value: site.location,
    href: mapsHref(),
    icon: "pin",
  },
  {
    title: "WhatsApp",
    value: site.phoneDisplay,
    href: whatsappHref(),
    icon: "chat",
  },
  {
    title: "Instagram",
    value: site.instagram,
    href: site.instagramUrl,
    icon: "camera",
  },
] as const;

function CardIcon({ name }: { name: (typeof cards)[number]["icon"] }) {
  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-cream">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-cream">
        <path d="M12.04 3C7.06 3 3 6.9 3 11.7c0 1.5.4 2.96 1.16 4.25L3.1 21l4.7-1.22A9.3 9.3 0 0 0 12.04 21C17 21 21 17.1 21 12.3S17 3 12.04 3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-cream">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 4.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2Zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1ZM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2Z" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contacto" className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl text-forest md:text-5xl">{contact.title}</h2>
          <span className="mt-4 block h-0.5 w-16 bg-gold" />
          <ul className="mt-8 grid gap-4">
            {cards.map((card) => (
              <li key={card.title}>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl bg-panel p-6 transition-colors hover:bg-sand"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage">
                    <CardIcon name={card.icon} />
                  </span>
                  <span>
                    <span className="block font-serif text-2xl text-forest">{card.title}</span>
                    <span className="mt-1 block text-muted">{card.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-6 text-lg leading-relaxed text-muted">{contact.intro}</p>
          <ContactForm />
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-2xl">
        <iframe
          title="Odontología Integral Andrea Perestiuk"
          src={mapsEmbedSrc()}
          loading="lazy"
          allowFullScreen
          className="h-[420px] w-full border-0"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
