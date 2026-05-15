import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { MenuBar } from "@/components/MenuBar";
import { SiteFooter } from "@/components/SiteFooter";

type SitePageProps = {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
};

export function SitePage({ tag, title, subtitle, children }: SitePageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MenuBar />
      <main className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-[0.2]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 0%, color-mix(in oklab, var(--signal) 10%, transparent), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">{tag}</div>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl leading-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
          <div className="prose-velvt mt-12 max-w-3xl space-y-6 text-[15px] leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-surface/50 p-6">
      <h2 className="font-display text-xl text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function PageList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
