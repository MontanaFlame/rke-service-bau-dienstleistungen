import { z } from "zod";

/** Anfragen gehen ausschließlich als E-Mail an diese Adresse – sie werden nirgends gespeichert. */
export const EMPFAENGER = "info@rke-service.de";

export const ZEITEN = [
  { wert: "vormittag", label: "Vormittag (ca. 8–12 Uhr)" },
  { wert: "nachmittag", label: "Nachmittag (ca. 12–17 Uhr)" },
  { wert: "ganztags", label: "Ganztägig – bin flexibel" },
] as const;

/** Heutiges Datum in lokaler Zeitzone als YYYY-MM-DD. */
export function heuteISO(): string {
  const jetzt = new Date();
  return new Date(jetzt.getTime() - jetzt.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

/** YYYY-MM-DD -> TT.MM.JJJJ */
export function datumLesbar(iso: string): string {
  return iso.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3.$2.$1");
}

const zeitLabel = (wert: string) =>
  ZEITEN.find((z) => z.wert === wert)?.label ?? wert;

export const terminSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihren Namen an.")
    .max(100, "Bitte nutzen Sie einen Namen mit maximal 100 Zeichen."),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an.")
    .max(255, "Die E-Mail-Adresse ist zu lang."),
  telefon: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre Telefonnummer an.")
    .max(30, "Die Telefonnummer ist zu lang.")
    .regex(
      /^[0-9+()[\]/\-.\s]+$/,
      "Die Telefonnummer enthält ungültige Zeichen.",
    ),
  termin: z
    .string()
    .min(1, "Bitte wählen Sie einen Wunschtermin.")
    .refine(
      (wert) => /^\d{4}-\d{2}-\d{2}$/.test(wert),
      "Bitte wählen Sie ein gültiges Datum.",
    )
    .refine(
      (wert) => wert >= heuteISO(),
      "Der Wunschtermin liegt in der Vergangenheit. Bitte wählen Sie ein Datum ab heute.",
    ),
  zeit: z.enum(["vormittag", "nachmittag", "ganztags"], {
    errorMap: () => ({ message: "Bitte wählen Sie eine Tageszeit." }),
  }),
  ort: z.string().trim().max(200, "Die Adresse ist zu lang."),
  anliegen: z
    .string()
    .trim()
    .min(1, "Bitte beschreiben Sie kurz, worum es geht.")
    .max(1000, "Bitte halten Sie die Beschreibung unter 1000 Zeichen."),
});

export type TerminDaten = z.infer<typeof terminSchema>;

/**
 * Baut die mailto-Adresse mit vorausgefüllter Betreff- und Textzeile.
 * Alles wird URL-codiert, damit Umlaute und Zeilenumbrüche korrekt ankommen.
 */
export function terminMailto(daten: TerminDaten): string {
  const betreff = `Terminanfrage ${datumLesbar(daten.termin)} – ${daten.name}`;
  const zeilen = [
    `Wunschtermin: ${datumLesbar(daten.termin)}, ${zeitLabel(daten.zeit)}`,
    `Name: ${daten.name}`,
    `E-Mail: ${daten.email}`,
    `Telefon: ${daten.telefon}`,
    ...(daten.ort ? [`Ort des Projekts: ${daten.ort}`] : []),
    "",
    "Anliegen:",
    daten.anliegen,
    "",
    "– Gesendet über das Terminformular auf der RKE-Service-Website",
  ];

  return `mailto:${EMPFAENGER}?subject=${encodeURIComponent(
    betreff,
  )}&body=${encodeURIComponent(zeilen.join("\r\n"))}`;
}
