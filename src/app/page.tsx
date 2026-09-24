import { About } from "@/components/about";
import { Appointment } from "@/components/appointment";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Specialties } from "@/components/specialties";
import { Team } from "@/components/team";

export default function Home() {
  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cream focus:px-4 focus:py-2"
      >
        Ir al contenido
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Specialties />
        <Gallery />
        <Team />
        <Appointment />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
