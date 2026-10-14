import { team } from "@/content/site";

export function Team() {
  return (
    <section id="sobre-mi" className="bg-[#F5F3ED] px-6 py-16 text-forest md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:gap-16 lg:text-left">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#E8DCC1] p-1 shadow-inner lg:h-40 lg:w-40">
          <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
            <circle cx="100" cy="100" r="90" fill="#F3F1EB" stroke="#D4B482" strokeWidth="3" />
            <text
              x="100"
              y="114"
              textAnchor="middle"
              fill="#3C544B"
              fontSize="52"
              letterSpacing="2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              AP
            </text>
            <text
              x="100"
              y="140"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="11"
              letterSpacing="3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              NECOCHEA
            </text>
          </svg>
        </div>

        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#6B7280]">{team.title}</p>
          <h2 className="font-serif text-4xl leading-tight text-forest md:text-5xl">{team.name}</h2>
          <p className="mt-1 text-sm font-semibold text-[#4A5D4E]">{team.role}</p>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#2D3748] lg:mx-0">{team.bio}</p>
        </div>
      </div>
    </section>
  );
}
