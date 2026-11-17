import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-lg font-bold">Bau & Dienstleistungen</Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-primary" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Leistungen</Link>
            <Link to="/kontakt" className="hover:text-primary" activeProps={{ className: "text-primary" }}>Kontakt</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted-foreground">© {new Date().getFullYear()} Bau & Dienstleistungen aller Art</div>
      </footer>
    </div>
  );
}
