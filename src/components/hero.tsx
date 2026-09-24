import { hero } from "@/content/site";
import { Logo } from "@/components/logo";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden px-6 py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,180,130,0.35),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(166,184,160,0.45),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(232,220,193,0.7),transparent_46%)]"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Logo size="lg" />
        <h1 className="mt-8 max-w-2xl font-serif text-4xl leading-tight text-forest sm:text-5xl md:text-6xl">
          {hero.phrase}
        </h1>
        <WhatsAppButton className="mt-10" />
      </div>
    </section>
  );
}
