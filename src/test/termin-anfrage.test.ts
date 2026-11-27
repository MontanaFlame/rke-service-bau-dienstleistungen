import { describe, expect, it } from "vitest";

import {
  EMPFAENGER,
  datumLesbar,
  terminMailto,
  terminSchema,
} from "@/lib/termin-anfrage";

const gueltig = {
  name: "Anna Beispiel",
  email: "anna@beispiel.de",
  telefon: "0171 2345678",
  termin: "2099-03-14",
  zeit: "nachmittag",
  ort: "Musterstraße 1, 12345 Musterstadt",
  anliegen: "Einfahrt neu pflastern, ca. 40 qm.",
};

describe("Terminformular-Prüfung", () => {
  it("lässt eine vollständige, gültige Anfrage durch", () => {
    expect(terminSchema.safeParse(gueltig).success).toBe(true);
  });

  it("lehnt leeren Namen, ungültige E-Mail und ein Datum in der Vergangenheit ab", () => {
    expect(terminSchema.safeParse({ ...gueltig, name: "   " }).success).toBe(
      false,
    );
    expect(
      terminSchema.safeParse({ ...gueltig, email: "keine-mail" }).success,
    ).toBe(false);
    expect(
      terminSchema.safeParse({ ...gueltig, termin: "2000-01-01" }).success,
    ).toBe(false);
  });

  it("zeigt für jede Regel eine deutsche Meldung", () => {
    const fehler = terminSchema.safeParse({
      ...gueltig,
      name: "",
      telefon: "abc",
      anliegen: "",
    });
    expect(fehler.success).toBe(false);
    const meldungen = fehler.success ? [] : fehler.error.issues.map((i) => i.message);
    expect(meldungen).toContain("Bitte geben Sie Ihren Namen an.");
    expect(meldungen).toContain("Die Telefonnummer enthält ungültige Zeichen.");
    expect(meldungen).toContain("Bitte beschreiben Sie kurz, worum es geht.");
  });
});

describe("Vorausgefüllte E-Mail", () => {
  it("geht an info@rke-service.de", () => {
    expect(EMPFAENGER).toBe("info@rke-service.de");
    const url = terminMailto(terminSchema.parse(gueltig));
    expect(url.startsWith("mailto:info@rke-service.de?subject=")).toBe(true);
  });

  it(" enthält alle Angaben in Betreff und Text", () => {
    const url = terminMailto(terminSchema.parse(gueltig));
    const [, body = ""] = url.split("body=");
    const text = decodeURIComponent(body);
    const betreff = decodeURIComponent(
      url.slice(url.indexOf("subject=") + 8, url.indexOf("&body=")),
    );

    expect(betreff).toBe("Terminanfrage 14.03.2099 – Anna Beispiel");
    expect(text).toContain("Wunschtermin: 14.03.2099, Nachmittag (ca. 12–17 Uhr)");
    expect(text).toContain("Name: Anna Beispiel");
    expect(text).toContain("E-Mail: anna@beispiel.de");
    expect(text).toContain("Telefon: 0171 2345678");
    expect(text).toContain("Ort des Projekts: Musterstraße 1, 12345 Musterstadt");
    expect(text).toContain("Einfahrt neu pflastern, ca. 40 qm.");
  });

  it("lässt die Ortszeile weg, wenn kein Ort angegeben ist", () => {
    const url = terminMailto(terminSchema.parse({ ...gueltig, ort: "" }));
    const [, body = ""] = url.split("body=");
    expect(decodeURIComponent(body)).not.toContain("Ort des Projekts");
  });

  it("codiert Umlaute und Zeilenumbrüche, damit die Adresse keine rohen Zeichen enthält", () => {
    const url = terminMailto(terminSchema.parse({ ...gueltig, name: "Jörg Muß" }));
    expect(url).not.toContain("\n");
    expect(url).not.toContain(" ");
    expect(url).toContain("J%C3%B6rg%20Mu%C3%9F");
  });
});

describe("Datum", () => {
  it("wandelt YYYY-MM-DD in TT.MM.JJJJ um", () => {
    expect(datumLesbar("2099-03-14")).toBe("14.03.2099");
  });
});
