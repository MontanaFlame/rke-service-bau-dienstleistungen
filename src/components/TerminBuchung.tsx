import { useState } from "react";

import {
  EMPFAENGER,
  ZEITEN,
  heuteISO,
  terminMailto,
  terminSchema,
} from "@/lib/termin-anfrage";

type Feld = "name" | "email" | "telefon" | "termin" | "zeit" | "ort" | "anliegen";

const start: Record<Feld, string> = {
  name: "",
  email: "",
  telefon: "",
  termin: "",
  zeit: "vormittag",
  ort: "",
  anliegen: "",
};

const feldCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40";
const labelCls = "block text-sm font-semibold text-foreground";
const fehlerCls = "mt-1 text-xs font-medium text-destructive";

export function TerminBuchung() {
  const [werte, setWerte] = useState<Record<Feld, string>>(start);
  const [fehler, setFehler] = useState<Partial<Record<Feld, string>>>({});
  const [mail, setMail] = useState<string | null>(null);

  const set = (feld: Feld, wert: string) => {
    setWerte((v) => ({ ...v, [feld]: wert }));
    setFehler((f) => ({ ...f, [feld]: undefined }));
  };

  function absenden(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pruefung = terminSchema.safeParse(werte);

    if (!pruefung.success) {
      const neueFehler: Partial<Record<Feld, string>> = {};
      for (const issue of pruefung.error.issues) {
        const feld = issue.path[0];
        if (typeof feld === "string" && !neueFehler[feld as Feld]) {
          neueFehler[feld as Feld] = issue.message;
        }
      }
      setFehler(neueFehler);
      setMail(null);
      return;
    }

    const url = terminMailto(pruefung.data);
    setFehler({});
    setMail(url);
    window.location.assign(url);
  }

  return (
    <section id="termin" className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Terminbuchung
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Wunschtermin anfragen
          </h2>
          <p className="mt-3 text-muted-foreground">
            Füllen Sie die Felder aus und senden Sie ab – dann öffnet sich Ihr
            E-Mail-Programm mit einer vorausgefüllten Nachricht an{" "}
            <a
              href={`mailto:${EMPFAENGER}`}
              className="font-semibold text-primary hover:text-accent"
            >
              {EMPFAENGER}
            </a>
            . Ihre Angaben werden nicht auf der Website gespeichert.
          </p>
        </div>

        <form noValidate onSubmit={absenden} className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="termin-name">
              Name
            </label>
            <input
              id="termin-name"
              className={feldCls}
              autoComplete="name"
              value={werte.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={fehler.name ? true : undefined}
              aria-describedby={fehler.name ? "termin-name-fehler" : undefined}
            />
            {fehler.name && (
              <p id="termin-name-fehler" className={fehlerCls}>
                {fehler.name}
              </p>
            )}
          </div>

          <div>
            <label className={labelCls} htmlFor="termin-email">
              E-Mail
            </label>
            <input
              id="termin-email"
              type="email"
              className={feldCls}
              autoComplete="email"
              value={werte.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={fehler.email ? true : undefined}
              aria-describedby={fehler.email ? "termin-email-fehler" : undefined}
            />
            {fehler.email && (
              <p id="termin-email-fehler" className={fehlerCls}>
                {fehler.email}
              </p>
            )}
          </div>

          <div>
            <label className={labelCls} htmlFor="termin-telefon">
              Telefon
            </label>
            <input
              id="termin-telefon"
              type="tel"
              className={feldCls}
              autoComplete="tel"
              value={werte.telefon}
              onChange={(e) => set("telefon", e.target.value)}
              aria-invalid={fehler.telefon ? true : undefined}
              aria-describedby={
                fehler.telefon ? "termin-telefon-fehler" : undefined
              }
            />
            {fehler.telefon && (
              <p id="termin-telefon-fehler" className={fehlerCls}>
                {fehler.telefon}
              </p>
            )}
          </div>

          <div>
            <label className={labelCls} htmlFor="termin-termin">
              Wunschtermin
            </label>
            <input
              id="termin-termin"
              type="date"
              className={feldCls}
              min={heuteISO()}
              value={werte.termin}
              onChange={(e) => set("termin", e.target.value)}
              aria-invalid={fehler.termin ? true : undefined}
              aria-describedby={
                fehler.termin ? "termin-termin-fehler" : undefined
              }
            />
            {fehler.termin && (
              <p id="termin-termin-fehler" className={fehlerCls}>
                {fehler.termin}
              </p>
            )}
          </div>

          <div>
            <label className={labelCls} htmlFor="termin-zeit">
              Tageszeit
            </label>
            <select
              id="termin-zeit"
              className={feldCls}
              value={werte.zeit}
              onChange={(e) => set("zeit", e.target.value)}
            >
              {ZEITEN.map((z) => (
                <option key={z.wert} value={z.wert}>
                  {z.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} htmlFor="termin-ort">
              Ort des Projekts{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <input
              id="termin-ort"
              className={feldCls}
              autoComplete="street-address"
              value={werte.ort}
              onChange={(e) => set("ort", e.target.value)}
              aria-invalid={fehler.ort ? true : undefined}
              aria-describedby={fehler.ort ? "termin-ort-fehler" : undefined}
            />
            {fehler.ort && (
              <p id="termin-ort-fehler" className={fehlerCls}>
                {fehler.ort}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="termin-anliegen">
              Worum geht es?
            </label>
            <textarea
              id="termin-anliegen"
              rows={4}
              className={feldCls}
              placeholder="Zum Beispiel: Einfahrt neu pflastern, ca. 40 m²."
              value={werte.anliegen}
              onChange={(e) => set("anliegen", e.target.value)}
              aria-invalid={fehler.anliegen ? true : undefined}
              aria-describedby={
                fehler.anliegen ? "termin-anliegen-fehler" : undefined
              }
            />
            {fehler.anliegen && (
              <p id="termin-anliegen-fehler" className={fehlerCls}>
                {fehler.anliegen}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-accent-foreground hover:bg-accent/90"
            >
              Termin per E-Mail anfragen
            </button>
          </div>
        </form>

        {mail && (
          <div
            aria-live="polite"
            className="mt-6 rounded-md border border-accent/50 bg-accent/10 px-4 py-3 text-sm"
          >
            <p className="font-semibold text-foreground">
              Ihre Nachricht ist fertig – bitte im E-Mail-Programm noch
              absenden.
            </p>
            <p className="mt-1 text-muted-foreground">
              Falls sich kein Programm geöffnet hat:{" "}
              <a href={mail} className="font-semibold text-primary underline">
                E-Mail jetzt öffnen
              </a>{" "}
              oder direkt an{" "}
              <a
                href={`mailto:${EMPFAENGER}`}
                className="font-semibold text-primary underline"
              >
                {EMPFAENGER}
              </a>{" "}
              schreiben.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
