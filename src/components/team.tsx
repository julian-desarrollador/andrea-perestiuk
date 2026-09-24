import { team } from "@/content/site";

export function Team() {
  return (
    <section id="sobre-mi" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-4xl text-forest md:text-5xl">
          {team.title}
        </h2>
        <span className="mx-auto mt-4 block h-0.5 w-16 bg-gold" />
        <article className="mx-auto mt-12 max-w-sm overflow-hidden rounded-2xl border-4 border-sage bg-cream">
          <div className="flex h-80 items-center justify-center bg-sage">
            <p className="font-serif text-7xl text-cream">AP</p>
          </div>
          <div className="px-6 py-6">
            <h3 className="font-serif text-3xl text-forest">{team.name}</h3>
            <p className="mt-1 text-gold">{team.role}</p>
            <p className="mt-4 leading-relaxed text-muted">{team.bio}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
