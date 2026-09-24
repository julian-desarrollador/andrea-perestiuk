import { appointment, site } from "@/content/site";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Appointment() {
  return (
    <section className="bg-forest px-6 py-24 text-center text-cream md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-4xl leading-tight md:text-5xl">{appointment.title}</h2>
        <p className="mt-4 text-lg">
          {appointment.text}{" "}
          <strong className="font-semibold text-gold">{site.phoneDisplay}</strong>
        </p>
        <WhatsAppButton variant="cream" className="mt-8" />
      </div>
    </section>
  );
}
