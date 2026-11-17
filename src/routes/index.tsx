import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

import heroImg from "@/assets/hero-pflaster.jpg";
import renovierungImg from "@/assets/leistung-renovierung.jpg";
import innenausbauImg from "@/assets/leistung-innenausbau.jpg";
import pflasterImg from "@/assets/leistung-pflaster.jpg";
import abbruchImg from "@/assets/leistung-abbruch.jpg";
import fertigImg from "@/assets/fertig-projekt.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RKE – Bau & Dienstleistungen aller Art" },
      {
        name: "description",
        content:
          "Renovierung, Innenausbau, Pflasterarbeiten und Abbruch – zuverlässig aus einer Hand.",
      },
      { property: "og:title", content: "RKE – Bau & Dienstleistungen aller Art" },
      {
        property: "og:description",
        content:
          "Renovierung, Innenausbau, Pflasterarbeiten und Abbruch – zuverlässig aus einer Hand.",
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    title: "Renovierung",
    slogan: "Wieder wie neu – ohne Umzug.",
    text: "Wir modernisieren Wohnungen, Häuser und Gewerberäume – von der Wand bis zum Boden.",
    img: renovierungImg,
    alt: "Maler streicht eine Wand in einer hellen, leeren Wohnung",
  },
  {
    title: "Innenausbau",
    slogan: "Mehr Raum, so wie Sie ihn brauchen.",
    text: "Trockenbau, Decken, Böden und Türen: sauber geplant und präzise umgesetzt.",
    img: innenausbauImg,
    alt: "Trockenbauer montiert eine Gipskartonwand in einem Rohraum",
  },
  {
    title: "Pflasterarbeiten",
    slogan: "Einfahrten, die auch nach 20 Jahren gerade liegen.",
    text: "Einfahrten, Terrassen und Wege – langlebig verlegt und fachgerecht verdichtet.",
    img: pflasterImg,
    alt: "Pflasterleger setzt Betonsteine mit Gummihammer und Wasserwaage",
  },
  {
    title: "Abbruch",
    slogan: "Was weg muss, ist über Nacht weg.",
    text: "Kontrollierter Rückbau und Entkernung inklusive fachgerechter Entsorgung.",
    img: abbruchImg,
    alt: "Bagger mit Aufsatzhammer stemmt eine alte Innenwand",
  },
];

function Index() {
  return (
    <SiteShell>
      <section className="grid md:grid-cols-2">
        <div className="flex items-center bg-primary px-6 py-16 text-primary-foreground md:rounded-br-3xl md:px-12 lg:pl-[max(3rem,calc((100vw-72rem)/2+1.5rem))]">
          <div className="max-w-lg">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              Angepackt, sauber fertig, übergeben.<br />Ein Anruf, ein Ansprechpartner.
            </h1>
            <p className="mt-6 text-primary-foreground/80">
              Herzlich willkommen bei RKE – Ihrem Partner für Bau und
              Dienstleistungen aller Art. Vom kleinen Auftrag bis zum großen Projekt.
            </p>
            <Link to="/kontakt" className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-semibold text-accent-foreground hover:bg-accent/90">
              Angebot anfragen
            </Link>
          </div>
        </div>
        <img src={heroImg} alt="Zwei Bauarbeiter verlegen Betonsteinpflaster auf einer neuen Einfahrt" width={1600} height={912} loading="eager" fetchPriority="high" className="h-72 w-full object-cover md:h-full md:min-h-[32rem]" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-semibold text-accent">Leistungen</p>
        <h2 className="mt-1 text-3xl font-bold text-primary">Alles aus einer Hand</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} className="overflow-hidden rounded-xl bg-card shadow-sm">
              <img src={s.img} alt={s.alt} width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover" />
              <div className="p-6">
                <p className="text-sm font-semibold text-accent">{s.title}</p>
                <h3 className="mt-1 text-xl font-bold">{s.slogan}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
                <Link to="/kontakt" className="mt-4 inline-block rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary/70">
                  Mehr erfahren
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative flex flex-1 items-center overflow-hidden">
        <img src={fertigImg} alt="Fertiggestellte Fassade mit neu verlegter Einfahrt im Abendlicht" width={1600} height={800} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-primary-foreground">
          <h2 className="max-w-xl text-3xl font-bold md:text-4xl">Von der ersten Besichtigung bis zur sauberen Übergabe.</h2>
          <p className="mt-4 max-w-lg text-primary-foreground/80">Sie erhalten ein unverbindliches Angebot mit klarer Aufstellung.</p>
          <Link to="/kontakt" className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-semibold text-accent-foreground hover:bg-accent/90">Kontakt aufnehmen</Link>
        </div>
      </section>
    </SiteShell>
  );
}
