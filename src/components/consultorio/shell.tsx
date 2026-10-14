import Link from "next/link";
import { logout } from "@/app/consultorio/actions";

const links = [
  { href: "/consultorio", label: "Inicio" },
  { href: "/consultorio/pacientes", label: "Pacientes" },
  { href: "/consultorio/prestaciones", label: "Mis precios" },
  { href: "/consultorio/consentimientos", label: "Hojas para firmar" },
];

export function ConsultorioShell({
  children,
  current,
}: {
  children: React.ReactNode;
  current?: string;
}) {
  return (
    <div className="min-h-full pb-28 md:pb-0">
      <header className="border-b border-sand bg-cream px-6 py-4 print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="font-serif text-3xl leading-none text-forest">Consultorio</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden text-forest md:inline">
              Ver la página
            </Link>
            <form action={logout}>
              <button type="submit" className="inline-flex h-12 items-center text-forest">
                Salir
              </button>
            </form>
          </div>
        </div>
        <nav aria-label="Consultorio" className="mx-auto mt-4 hidden max-w-6xl md:block">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current === link.href ? "page" : undefined}
                  className={`inline-flex h-12 items-center ${current === link.href ? "text-forest underline decoration-gold underline-offset-8" : "text-forest"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
      <nav
        aria-label="Consultorio"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-cream print:hidden md:hidden"
      >
        <ul className="grid grid-cols-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current === link.href ? "page" : undefined}
                className={`flex min-h-16 items-center justify-center px-1 text-center leading-tight text-forest ${current === link.href ? "bg-sand" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
