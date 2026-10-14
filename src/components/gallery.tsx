import { consultorioPhotos, consultorioPhrases } from "@/content/site";

export function Gallery() {
  const [photo] = consultorioPhotos;

  return (
    <section id="consultorio" className="bg-cream px-6 py-16 text-forest md:py-24" aria-label="El consultorio">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-x-14">
        <div className="lg:col-start-2">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#6B7280]">El ambiente</p>
          <h2 className="font-serif text-5xl leading-none text-forest">El consultorio</h2>
          <p className="mt-2 font-serif text-2xl italic leading-snug text-forest">{photo.caption}</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#E8DCC1]/60 bg-white shadow-sm lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="h-64 w-full object-cover object-[center_42%] lg:absolute lg:inset-0 lg:h-full"
          />
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-sand bg-cream/90 px-3 py-1 text-xs font-medium text-forest backdrop-blur-sm">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>Vista relajante al jardín</span>
          </div>
        </div>

        <ul className="space-y-3 text-[17px] leading-relaxed text-[#2D3748] lg:col-start-2 lg:self-end">
          {consultorioPhrases.map((phrase) => (
            <li key={phrase} className="flex items-start gap-3">
              <span className="mt-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-forest" aria-hidden="true" />
              <span>{phrase}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
