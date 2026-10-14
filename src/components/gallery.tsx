import { consultorioPhotos, consultorioPhrases } from "@/content/site";

export function Gallery() {
  const [main, detail] = consultorioPhotos;

  return (
    <section className="px-6 py-16 md:py-24" aria-label="El consultorio">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-4xl text-forest md:text-5xl">El consultorio</h2>
        <span className="mt-4 mb-8 block h-0.5 w-16 bg-gold" />
        <div className="grid items-stretch gap-4 md:grid-cols-[2fr_1fr]">
          <figure className="relative overflow-hidden rounded-2xl">
            <img
              src={main.src}
              alt={main.alt}
              className="aspect-video w-full origin-[68%_54%] scale-[1.85] object-cover"
            />
          </figure>
          <figure className="relative overflow-hidden rounded-2xl md:h-full">
            <img
              src={detail.src}
              alt={detail.alt}
              className="aspect-video w-full origin-[78%_42%] scale-[1.9] object-cover md:absolute md:inset-0 md:aspect-auto md:h-full md:origin-[76%_38%]"
            />
          </figure>
        </div>
        <p className="mt-3 text-forest">{main.caption}</p>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {consultorioPhrases.map((phrase) => (
            <li key={phrase} className="font-serif text-2xl leading-snug text-forest">
              {phrase}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
