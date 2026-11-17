import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Bau & Dienstleistungen aller Art" },
      { name: "description", content: "Kontaktieren Sie uns für ein unverbindliches Angebot." },
      { property: "og:title", content: "Kontakt – Bau & Dienstleistungen aller Art" },
      { property: "og:description", content: "Kontaktieren Sie uns für ein unverbindliches Angebot." },
    ],
  }),
  component: Kontakt,
});

function Kontakt() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="font-display text-4xl font-bold">Kontakt</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">Rufen Sie uns an oder schreiben Sie uns – wir melden uns schnellstmöglich mit einem unverbindlichen Angebot.</p>
        <dl className="mt-10 grid gap-6 md:grid-cols-3">
          <div><dt className="text-sm font-semibold text-primary">Telefon</dt><dd className="mt-1 text-lg">0123 456789</dd></div>
          <div><dt className="text-sm font-semibold text-primary">E-Mail</dt><dd className="mt-1 text-lg">info@beispiel.de</dd></div>
          <div><dt className="text-sm font-semibold text-primary">Adresse</dt><dd className="mt-1 text-lg">Musterstraße 1, 12345 Musterstadt</dd></div>
        </dl>
      </section>
    </SiteShell>
  );
}
