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
      { title: "Bau & Dienstleistungen aller Art" },
      {
        name: "description",
        content:
          "Renovierung, Innenausbau, Pflasterarbeiten und Abbruch – zuverlässig aus einer Hand.",
      },
      { property: "og:title", content: "Bau & Dienstleistungen aller Art" },
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
    text: "Wir modernisieren Wohnungen, Häuser und Gewerberäume – von der Wand bis zum Boden.",
    img: renovierungImg,
    alt: "Maler streicht eine Wand in einer hellen, leeren Wohnung",
  },
  {
    title: "Innenausbau",
    text: "Trockenbau, Decken, Böden und Türen: sauber geplant und präzise umgesetzt.",
    img: innenausbauImg,
    alt: "Trockenbauer montiert eine Gipskartonwand in einem Rohraum",
  },
  {
    title: "Pflasterarbeiten",
    text: "Einfahrten, Terrassen und Wege – langlebig verlegt und fachgerecht verdichtet.",
    img: pflasterImg,
    alt: "Pflasterleger setzt Betonsteine mit Gummihammer und Wasserwaage",
  },
  {
    title: "Abbruch",
    text: "Kontrollierter Rückbau und Entkernung inklusive fachgerechter Entsorgung.",
    img: abbruchImg,
    alt: "Bagger mit Aufsatzhammer stemmt eine alte Innenwand",
  },
];

function Index() {
  return (
    <SiteShell>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1.05fr_1fr] md:gap-14 md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Bau & Dienstleistungen
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight md:text-6xl">
              Solide Arbeit. Faire Preise. Alles aus einer Hand.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Ob kleine Reparatur oder großes Bauprojekt – wir packen an und
              liefern verlässlich ab.
            </p>
            <Link
              to="/kontakt"
              className="mt-10 inline-block bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Angebot anfragen
            </Link>
          </div>
          <img
            src={heroImg}
            alt="Zwei Bauarbeiter verlegen Betonsteinpflaster auf einer neuen Einfahrt"
            width={1600}
            height={912}
            loading="eager"
            fetchPriority="high"
            className="h-full max-h-[26rem] w-full object-cover md:max-h-none"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold">Unsere Leistungen</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Ein Ansprechpartner für alle Gewerke – koordiniert, termintreu und
          zum vorher vereinbarten Preis.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {services.map((s, i) => (
            <article key={s.title} className="border border-border bg-card">
              <img
                src={s.img}
                alt={s.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-6">
                <span className="font-display text-sm text-primary">
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative flex flex-1 items-center overflow-hidden border-t border-border">
        <img
          src={fertigImg}
          alt="Fertiggestellte Fassade mit neu verlegter Einfahrt im Abendlicht"
          width={1600}
          height={800}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/75" />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <h2 className="max-w-xl font-display text-3xl font-bold text-background md:text-4xl">
            Von der ersten Besichtigung bis zur sauberen Übergabe.
          </h2>
          <p className="mt-4 max-w-lg text-background/80">
            Sagen Sie uns, was zu tun ist – Sie erhalten ein unverbindliches
            Angebot mit klarer Aufstellung.
          </p>
          <Link
            to="/kontakt"
            className="mt-8 inline-block bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
