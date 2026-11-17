import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/rke-logo.png.asset.json";

const navCls = "border-b-2 border-transparent pb-1 hover:text-primary";
const active = { className: "border-accent text-primary" };

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-card shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo.url} alt="RKE Logo" className="h-10 w-auto" />
            <span className="hidden border-l border-border pl-3 text-xs font-semibold uppercase leading-tight tracking-widest text-muted-foreground sm:block">
              Bau &<br />Dienstleistungen
            </span>
          </Link>
          <nav className="flex gap-6 text-sm font-semibold">
            <Link to="/" className={navCls} activeOptions={{ exact: true }} activeProps={active}>Startseite</Link>
            <Link to="/kontakt" className={navCls} activeProps={active}>Kontakt</Link>
          </nav>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm">
          <span>© {new Date().getFullYear()} RKE – Bau & Dienstleistungen aller Art</span>
          <Link to="/kontakt" className="text-accent hover:underline">Kontakt aufnehmen</Link>
        </div>
      </footer>
    </div>
  );
}
