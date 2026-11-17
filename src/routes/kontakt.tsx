import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import teamImg from "@/assets/team-van.jpg";
import fertigImg from "@/assets/fertig-projekt.jpg";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Bau & Dienstleistungen aller Art" },
      {
        name: "description",
        content: "Kontaktieren Sie uns für ein unverbindliches Angebot.",
      },
      {
        property: "og:title",
        content: "Kontakt – Bau & Dienstleistungen aller Art",
      },
      {
        property: "og:description",
        content: "Kontaktieren Sie uns für ein unverbindliches Angebot.",
      },
    ],
  }),
  component: Kontakt,
});

function Kontakt() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_1fr] md:gap-14 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Kontakt
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Reden wir über Ihr Projekt.
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Rufen Sie uns an oder schreiben Sie uns – wir melden uns
            schnellstmöglich mit einem unverbindlichen Angebot.
          </p>
          <dl className="mt-10 grid gap-6">
            <div>
              <dt className="text-sm font-semibold text-primary">Telefon</dt>
              <dd className="mt-1 text-lg">0123 456789</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-primary">E-Mail</dt>
              <dd className="mt-1 text-lg">info@beispiel.de</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-primary">Adresse</dt>
              <dd className="mt-1 text-lg">Musterstraße 1, 12345 Musterstadt</dd>
            </div>
          </dl>
        </div>
        <img
          src={teamImg}
          alt="Handwerker in orangefarbener Arbeitsjacke vor dem geöffneten Servicefahrzeug"
          width={1200}
          height={800}
          loading="eager"
          className="aspect-[3/2] w-full object-cover"
        />
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
        <div className="relative mx-auto w-full max-w-5xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-background md:text-3xl">
              So läuft's ab
            </h2>
            <Link
              to="/"
              className="bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-background/90"
            >
              Zurück zu unseren Leistungen
            </Link>
          </div>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Kurz schildern",
                d: "Sie sagen uns telefonisch oder per E-Mail, was ansteht.",
              },
              {
                n: "02",
                t: "Besichtigung",
                d: "Wir kommen vorbei, schauen uns die Sache an und rechnen durch.",
              },
              {
                n: "03",
                t: "Angebot",
                d: "Sie erhalten eine klare Aufstellung – unverbindlich und kostenlos.",
              },
            ].map((s) => (
              <li key={s.n}>
                <span className="font-display text-sm text-primary">{s.n}</span>
                <h3 className="mt-1 text-lg font-semibold text-background">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm text-background/80">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteShell>
  );
}
