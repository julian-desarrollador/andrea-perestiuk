import { specialties } from "@/content/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Specialties() {
  return (
    <section id="especialidades" className="bg-panel px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-2">
        <div className="flex min-h-80 items-end rounded-2xl bg-sage p-8 sm:p-12">
          <p className="font-serif text-4xl leading-tight text-cream sm:text-5xl">
            {specialties.phrase}
          </p>
        </div>
        <div>
          <h2 className="font-serif text-4xl text-forest md:text-5xl">Especialidades</h2>
          <span className="mt-4 block h-0.5 w-16 bg-gold" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {specialties.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-cream">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="m9.2 16.6-3.8-3.8L4 14.2l5.2 5.2L20 8.6 18.6 7.2z" />
                  </svg>
                </span>
                <span className="text-lg text-forest">{item}</span>
              </li>
            ))}
          </ul>
          <WhatsAppButton className="mt-10" />
        </div>
      </div>
    </section>
  );
}
