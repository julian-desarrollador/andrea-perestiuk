import { whatsappHref } from "@/content/site";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.07-.96.32-3.23-.67-2.72-1.12-4.46-3.9-4.6-4.08-.13-.18-1.1-1.46-1.1-2.78 0-1.32.7-1.97.95-2.24.24-.27.53-.34.71-.34.18 0 .35 0 .51.01.16.01.39-.06.61.46.23.55.78 1.9.85 2.04.07.14.11.3 0 .48-.1.18-.16.29-.31.45-.16.16-.33.35-.47.47-.16.14-.32.29-.14.56.18.27.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.16.49.13.67-.08.18-.2.78-.91.99-1.22.21-.31.41-.26.69-.16.28.1 1.76.83 2.06.98.3.15.5.22.57.35.07.12.07.7-.17 1.38Z" />
    </svg>
  );
}

const variants = {
  forest:
    "border-forest text-forest hover:bg-forest hover:text-cream",
  cream:
    "border-cream text-cream hover:bg-cream hover:text-forest",
} as const;

export function WhatsAppButton({
  variant = "forest",
  className = "",
  children = "Solicitar turno",
}: {
  variant?: keyof typeof variants;
  className?: string;
  children?: string;
}) {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-6 py-4 font-sans text-lg transition-colors ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon />
      <span>{children}</span>
    </a>
  );
}
