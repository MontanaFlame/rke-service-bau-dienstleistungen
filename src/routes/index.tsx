import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bau & Dienstleistungen aller Art" },
      { name: "description", content: "Renovierung, Innenausbau, Pflasterarbeiten und Abbruch – zuverlässig aus einer Hand." },
      { property: "og:title", content: "Bau & Dienstleistungen aller Art" },
      { property: "og:description", content: "Renovierung, Innenausbau, Pflasterarbeiten und Abbruch – zuverlässig aus einer Hand." },
    ],
  }),
  component: Index,
});

const services = [
  { title: "Renovierung", text: "Wir modernisieren Wohnungen, Häuser und Gewerberäume – von der Wand bis zum Boden." },
  { title: "Innenausbau", text: "Trockenbau, Decken, Böden und Türen: sauber geplant und präzise umgesetzt." },
  { title: "Pflasterarbeiten", text: "Einfahrten, Terrassen und Wege – langlebig verlegt und fachgerecht verdichtet." },
  { title: "Abbruch", text: "Kontrollierter Rückbau und Entkernung inklusive fachgerechter Entsorgung." },
];

function Index() {
  return (
    <SiteShell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Bau & Dienstleistungen</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-tight md:text-6xl">
            Solide Arbeit. Faire Preise. Alles aus einer Hand.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Ob kleine Reparatur oder großes Bauprojekt – wir packen an und liefern verlässlich ab.
          </p>
          <Link to="/kontakt" className="mt-10 inline-block bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
            Angebot anfragen
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold">Unsere Leistungen</h2>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {services.map((s, i) => (
            <div key={s.title} className="bg-background p-8">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
