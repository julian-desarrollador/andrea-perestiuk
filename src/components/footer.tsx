import { nav, site } from "@/content/site";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-sand px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        <a href="#inicio" className="shrink-0">
          <Logo />
        </a>
        <nav aria-label="Pie">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-forest/80 hover:text-forest">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-center text-sm text-muted md:text-left">
        {site.copyright}
      </p>
    </footer>
  );
}
