import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

import heroImg from "@/assets/hero-pflaster.jpg";
import reinigungImg from "@/assets/leistung-reinigung.jpg";
import entruempelungImg from "@/assets/leistung-entruempelung.jpg";
import transportImg from "@/assets/leistung-transport.jpg";
import abbruchImg from "@/assets/leistung-abbruch.jpg";
import abrissImg from "@/assets/leistung-abriss.jpg";
import fertigImg from "@/assets/fertig-projekt.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RKE-Service – Bau & Dienstleistungen aller Art" },
      {
        name: "description",
        content:
          "Reinigung, Entrümpelung, Transport, Abbruch und Abriss – zuverlässig aus einer Hand.",
      },
      { property: "og:title", content: "RKE-Service – Bau & Dienstleistungen aller Art" },
      {
        property: "og:description",
        content:
          "Reinigung, Entrümpelung, Transport, Abbruch und Abriss – zuverlässig aus einer Hand.",
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    title: "Reinigung",
    slogan: "Nach unserem Besuch ist es sauberer als vorher.",
    text: "Unterhaltsreinigung, Grundreinigung und Reinigung nach Abschluss – für Wohnungen, Büros und Gewerbe.",
    img: reinigungImg,
    alt: "Reinigungskraft wischt den Boden eines hellen Büros",
  },
  {
    title: "Entrümpelung",
    slogan: "Entspannt entrümpeln: Wir packen an, Sie atmen auf.",
    text: "Keller, Dachboden, Wohnung oder Betrieb: wir räumen komplett, sortieren und entsorgen fachgerecht.",
    img: entruempelungImg,
    alt: "Zwei Entrümpler tragen ein demontiertes Regal und einen Karton aus einem Haus zum Transporter",
  },
  {
    title: "Transport",
    slogan: "Wir laden ein, fahren und wieder aus – Sie müssen nichts tragen.",
    text: "Möbel, Geräte, Material: wir holen ab, bringen hin und helfen beim Tragen – auch mit zwei Händen mehr.",
    img: transportImg,
    alt: "Zwei Männer laden Kartons und eine Matratze in einen weißen Transporter",
  },
  {
    title: "Abbruch",
    slogan: "Wände raus, Platz drin – Raum für Raum.",
    text: "Innere Rückbauarbeiten: Wände, Böden und alte Einbauten werden ausgebaut und sofort abtransportiert.",
    img: abbruchImg,
    alt: "Arbeiter mit Helm und Staubmaske stemmt eine Innenwand auf",
  },
  {
    title: "Abriss",
    slogan: "Vom Haus zur freien Fläche – in einem Zug.",
    text: "Gebäude, Garagen und Anbauten werden komplett abgerissen, das Grundstück leer und sauber übergeben.",
    img: abrissImg,
    alt: "Bagger mit Abbruchhammer reißt die Außenwand eines alten Hauses ab",
    wide: true,
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
              Herzlich willkommen bei RKE-Service – Ihrem Partner für Bau und
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
            s.wide ? (
              <article key={s.title} className="overflow-hidden rounded-xl bg-card shadow-sm sm:col-span-2 sm:flex">
                <img src={s.img} alt={s.alt} width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover sm:aspect-auto sm:w-1/2" />
                <div className="flex flex-col justify-center p-6 sm:w-1/2">
                  <p className="text-sm font-semibold text-accent">{s.title}</p>
                  <h3 className="mt-1 text-xl font-bold">{s.slogan}</h3>
                  <p className="mt-2 text-muted-foreground">{s.text}</p>
                  <Link to="/kontakt" className="mt-4 inline-block w-fit rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary/70">
                    Mehr erfahren
                  </Link>
                </div>
              </article>
            ) : (
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
            )
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
