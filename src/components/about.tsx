import { about } from "@/content/site";

function PillarIcon({ name }: { name: (typeof about.pillars)[number]["icon"] }) {
  if (name === "heart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-12 w-12 fill-sage">
        <path d="M12 21s-6.7-4.35-9.33-8.17C.8 10.2 1.3 6.7 4.05 5.2 6.2 4.02 8.55 4.6 10 6.3L12 8.6l2-2.3c1.45-1.7 3.8-2.28 5.95-1.1 2.75 1.5 3.25 5 1.38 7.63C18.7 16.65 12 21 12 21Z" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-12 w-12 fill-sage">
        <path d="M12 2.5 13.8 8l5.7 1.2L13.8 11l-1.8 5.5L10.2 11 4.5 9.2 10.2 8 12 2.5Zm6.2 11.2.8 2.3 2.5.6-2.5.8-.8 2.4-.7-2.4-2.4-.8 2.4-.6.7-2.3ZM6.2 14.2l.6 1.8 1.9.5-1.9.6-.6 1.9-.5-1.9-1.8-.6 1.8-.5.5-1.8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-12 w-12 fill-sage">
      <path d="M12 2c.4 3.2 1.6 5.2 3.6 6.6C18.2 10 20 11.6 20 15a8 8 0 1 1-16 0c0-2.2.8-3.8 2.2-5.2C8.2 8.1 9.6 6.4 12 2Zm0 8.2c-.8 1.5-1.2 2.6-1.2 3.8a1.2 1.2 0 1 0 2.4 0c0-1.2-.4-2.3-1.2-3.8Z" />
    </svg>
  );
}

export function About() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-4xl text-center font-serif text-4xl leading-tight text-forest md:text-5xl">
          {about.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted">
          {about.text}
        </p>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {about.pillars.map((pillar) => (
            <article key={pillar.title}>
              <PillarIcon name={pillar.icon} />
              <h3 className="mt-5 font-serif text-3xl text-forest">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
