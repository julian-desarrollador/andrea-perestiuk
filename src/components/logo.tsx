export function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
  const large = size === "lg";

  return (
    <span
      className={`inline-flex flex-col text-forest ${large ? "items-center gap-3" : "items-start gap-1"}`}
    >
      <span
        className={`font-sans font-medium uppercase leading-none tracking-[0.22em] ${large ? "text-base sm:text-lg" : "text-[0.68rem]"}`}
      >
        Andrea Perestiuk
      </span>
      <span className={`bg-gold ${large ? "h-px w-16" : "h-px w-8"}`} aria-hidden="true" />
      <span className={`font-serif italic leading-none text-gold ${large ? "text-2xl" : "text-sm"}`}>
        odontología integral
      </span>
    </span>
  );
}
