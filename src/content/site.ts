export const site = {
  name: "Andrea Perestiuk",
  title: "Andrea Perestiuk · Odontología integral",
  description:
    "Más que odontología, una mirada integral sobre la salud y el bienestar.",
  location: "Necochea, Buenos Aires",
  mapsUrl: "https://maps.app.goo.gl/9cQm87NgAzou6swj8",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12480.490304963287!2d-58.7517894655105!3d-38.5539895840301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x958fbd5b8f26ebb9%3A0xd070b6a05289559c!2sOdontologia%20Integral%20Andrea%20Perestiuk!5e0!3m2!1ses!2sar!4v1790109077383!5m2!1ses!2sar",
  instagram: "@andreaperestiuk.odonto",
  instagramUrl: "https://www.instagram.com/andreaperestiuk.odonto/",
  phoneDisplay: "2262 47-3443",
  phoneWa: "5492262473443",
  whatsappGreeting: "¡Hola! Quiero pedir un turno",
  copyright: "© 2026 Andrea Perestiuk. Odontología integral.",
};

export const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function whatsappHref(text = site.whatsappGreeting) {
  return `https://wa.me/${site.phoneWa}?text=${encodeURIComponent(text)}`;
}

export function mapsHref() {
  return site.mapsUrl;
}

export function mapsEmbedSrc() {
  return site.mapsEmbed;
}

export const hero = {
  phrase: "Experiencia que cuida. Cercanía que transforma.",
};

export const about = {
  title:
    "Más que odontología, una mirada integral sobre la salud y el bienestar.",
  text: "La salud bucal también es calidad de vida. Una atención personalizada, con experiencia y actualización constante.",
  pillars: [
    {
      title: "Cercanía que transforma",
      text: "Cuidar la salud empieza por escuchar. La cercanía es parte del tratamiento.",
      icon: "heart",
    },
    {
      title: "Tecnología, experiencia y trato humano",
      text: "Eso es lo que marca la diferencia: tecnología, experiencia y un trato humano.",
      icon: "spark",
    },
    {
      title: "Equilibrio entre cuerpo, mente y emociones",
      text: "La salud es el equilibrio entre cuerpo, mente y emociones.",
      icon: "leaf",
    },
  ],
} as const;

export const specialties = {
  phrase: "Tu sonrisa habla de vos.",
  items: [
    "Rehabilitación integral",
    "Implantología",
    "Periodoncia",
    "Ortodoncia",
    "Endodoncia",
    "Odontología estética",
    "Blanqueamiento dental",
    "Cirugía dental",
    "Odontopediatría",
    "Ortopedia funcional",
  ],
};

export const gallery = [
  { text: "Pequeños cambios, grandes resultados.", tone: "sage" },
  { text: "La salud bucal también es calidad de vida.", tone: "cream" },
  { text: "Hábitos simples que hacen grandes cambios.", tone: "sand" },
  { text: "Cuidar la salud empieza por escuchar.", tone: "sage" },
  {
    text: "También es importante elegir qué queremos para esta nueva etapa.",
    tone: "cream",
  },
  {
    text: "Experiencia y actualización constante. Atención personalizada.",
    tone: "sand",
  },
] as const;

export const team = {
  title: "Sobre mí",
  name: "Dra. Andrea Perestiuk",
  role: "Odontóloga · Necochea",
  bio: "Experiencia y actualización constante, con una atención personalizada. Salud bucal, estética y bienestar.",
};

export const faq = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Cómo pido un turno?",
      answer: `Escribime por WhatsApp al ${site.phoneDisplay} y coordinamos el horario.`,
      href: whatsappHref(),
      linkLabel: "Escribir por WhatsApp",
    },
    {
      question: "¿Qué es la odontología integral?",
      answer:
        "Es una mirada sobre la salud bucal, la estética y el bienestar. La salud es el equilibrio entre cuerpo, mente y emociones.",
    },
    {
      question: "¿Dónde está el consultorio?",
      answer: `Atiendo en ${site.location}.`,
      href: mapsHref(),
      linkLabel: "Ver en el mapa",
    },
    {
      question: "¿Cómo es la primera consulta?",
      answer:
        "Empieza por escuchar. La cercanía y una atención personalizada son parte del tratamiento.",
    },
  ],
};

export const appointment = {
  title: "Agenda tu consulta",
  text: "Pedí tu turno por WhatsApp al",
};

export const contact = {
  title: "Contacto",
  intro:
    "Completá el formulario y dejame tu consulta. Me pongo en contacto a la brevedad.",
};
