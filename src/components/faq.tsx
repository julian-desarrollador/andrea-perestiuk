import { faq } from "@/content/site";

export function Faq() {
  return (
    <section id="preguntas" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-4xl text-forest md:text-5xl">{faq.title}</h2>
        <span className="mx-auto mt-4 block h-0.5 w-16 bg-gold" />
        <div className="mt-12 divide-y divide-sand border-y border-sand">
          {faq.items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl text-forest marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-gold transition-transform duration-500 ease-out group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="max-w-2xl pt-3 leading-relaxed text-muted">
                <p>{item.answer}</p>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-forest underline decoration-gold underline-offset-4"
                  >
                    {item.linkLabel}
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
