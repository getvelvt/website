import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Lock, Eye, Database, Cpu, Bell, Workflow } from "lucide-react";
import { MenuBar } from "@/components/MenuBar";
import { NotificationStack } from "@/components/NotificationStack";
import { TimelinePanel } from "@/components/TimelinePanel";
import { FragmentationGauge } from "@/components/FragmentationGauge";
import { EventStream } from "@/components/EventStream";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velvt — quiet behavioral intelligence for macOS" },
      { name: "description", content: "Velvt observes how you actually use your computer and tells you 1–3 specific, slightly uncomfortable truths about your focus per day. Sealed locally. No screenshots. No keylogging." },
      { property: "og:title", content: "Velvt — quiet behavioral intelligence for macOS" },
      { property: "og:description", content: "1–3 sealed observations a day. Everything stays on your machine." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MenuBar />
      <Hero />
      <Marquee />
      <Observation />
      <Architecture />
      <Triggers />
      <Tiers />
      <Foot />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-[0.35]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 30%, color-mix(in oklab, var(--signal) 12%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            v0.1 · macOS · private beta
          </div>
          <h1 className="mt-6 text-balance font-display text-[64px] leading-[0.92] tracking-tight md:text-[88px]">
            The observer<br />
            <span className="italic text-muted-foreground">that does not flatter you.</span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-muted-foreground">
            Velvt sits quietly in your menu bar, sealing every observation
            on-device and modeling how you actually work. Once or twice a
            day, it tells you something specific about your focus — in the
            voice of a neutral data scientist, not a cheerleader.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-[13px] font-medium text-signal-foreground transition hover:opacity-90">
              Request invite <ArrowUpRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-3 text-[13px] text-foreground transition hover:bg-surface">
              Read the spec
            </button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6 font-mono">
            <Stat k="data / day" v="≈ 576 KB" />
            <Stat k="data / year" v="< 200 MB" />
            <Stat k="alerts / day" v="max 3" />
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl border border-border bg-surface/40 backdrop-blur-sm" aria-hidden />
          <div className="relative space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              Notification Center
            </div>
            <NotificationStack />
            <EventStream />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-dim">{k}</div>
      <div className="mt-1 text-[18px] text-foreground tabular-nums">{v}</div>
    </div>
  );
}

function Marquee() {
  const items = [
    "no screenshots",
    "no keylogging",
    "no content capture",
    "local sqlite",
    "user-auditable",
    "abstracted titles",
    "100% offline mode",
    "open-source agent",
  ];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-surface/40 py-3">
      <div className="flex w-max gap-10 ticker font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {row.map((x, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-signal">●</span>
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function Observation() {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHead
          tag="01 · the panel"
          title={<>The product is the notification. <span className="text-muted-foreground italic">This is everything else.</span></>}
          sub="A single window, a single gauge, a single timeline. No streaks. No scoreboards. No emoji."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <TimelinePanel />
          <FragmentationGauge />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Quote
            kind="Threshold"
            text="You've switched away from your task 18 times in the last 30 minutes — 3× your usual rate."
          />
          <Quote
            kind="Inactivity"
            text="You haven't done anything that looks like focused work in 2 hours and 14 minutes."
          />
          <Quote
            kind="Evening Summary"
            text="Your longest focus block today was 18 minutes. Your personal record is 94 minutes — that was last Thursday."
          />
        </div>
      </div>
    </section>
  );
}

function Quote({ kind, text }: { kind: string; text: string }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-surface/60 p-5"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">{kind}</div>
      <p className="mt-3 text-balance text-[15px] leading-snug">{text}</p>
    </motion.blockquote>
  );
}

function Architecture() {
  const layers = [
    {
      n: "L1", icon: Eye, name: "Collection Agent",
      open: true,
      body: "Passive macOS background process. Logs active window titles, app names, timestamps via the Accessibility API. ~1 event per 5s of active use.",
      tags: ["Swift", "Accessibility API", "open-source"],
    },
    {
      n: "L2", icon: Database, name: "Behavioral Modeling",
      body: "Computes Focus Fragmentation, Switching Clusters, and Proportionality. Days 1–14 are rule-based; from Day 15 it deviates against a rolling 14-day baseline.",
      tags: ["SQLite", "rolling baseline", "2× anomaly"],
    },
    {
      n: "L3", icon: Cpu, name: "Insight Generation",
      body: "Lightweight LLM (or local inference) translates metrics into one objective sentence. Falls back to deterministic syntactic phrases if offline.",
      tags: ["GPT-5 mini", "local fallback", "neutral voice"],
    },
    {
      n: "L4", icon: Bell, name: "Delivery",
      body: "Menu bar app, native notifications, three timeline tracks. No dashboards. No streaks. Maximum three alerts per day.",
      tags: ["menu bar", "notifications", "open-source"],
    },
  ];

  return (
    <section className="relative border-b border-border bg-surface/30">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHead
          tag="02 · architecture"
          title={<>Four quiet layers. <span className="text-muted-foreground italic">Nothing leaves unless you say so.</span></>}
          sub="Collection is open-source so you can audit it. Modeling and insight live above an obfuscation pipeline."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {layers.map((l) => (
            <li key={l.n} className="relative bg-background p-6">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
                <span>{l.n}</span>
                <l.icon className="h-4 w-4 text-signal" />
              </div>
              <h4 className="mt-6 font-display text-2xl">{l.name}</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{l.body}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {l.tags.map((t) => (
                  <span key={t} className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
              <Lock className="h-3.5 w-3.5 text-signal" /> abstraction pipeline
            </div>
            <div className="mt-4 grid gap-3 font-mono text-[12px]">
              <Pair raw='"AP Lang Research Paper"' abs='"Document: B"' />
              <Pair raw='"#general — engineering"' abs='"Channel: A"' />
              <Pair raw='"velvt/agent.swift"' abs='"File: F"' />
            </div>
            <p className="mt-5 text-[13px] text-muted-foreground">
              The mapping dictionary lives only on your machine. Insights are
              reverse-translated locally before they ever appear on screen.
            </p>
          </div>

          <div className="rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
              <Database className="h-3.5 w-3.5 text-signal" /> seed classifier · O(1)
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px]">
              {[
                ["FOCUS_WORK", "VS Code · Docs · Notion"],
                ["PASSIVE_CONSUMPTION", "YouTube · Netflix"],
                ["SOCIAL_FEED", "Reddit · X · Instagram"],
                ["COMMUNICATION", "Slack · Discord · Mail"],
                ["TASK_MANAGEMENT", "Linear · Jira · Asana"],
                ["REFERENCE", "Wikipedia · MDN · SO"],
                ["SYSTEM", "Finder · Settings"],
                ["UNLOGGED", "→ inline classify"],
              ].map(([k, v]) => (
                <div key={k} className="rounded border border-border bg-background p-2">
                  <div className="text-signal">{k}</div>
                  <div className="text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pair({ raw, abs }: { raw: string; abs: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded border border-border bg-background p-2.5">
      <span className="truncate text-muted-foreground line-through decoration-dim/40">{raw}</span>
      <span className="text-dim">→</span>
      <span className="truncate text-signal">{abs}</span>
    </div>
  );
}

function Triggers() {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHead
          tag="03 · dispatch logic"
          title={<>Three alerts. <span className="text-muted-foreground italic">No more, ever.</span></>}
          sub="A hybrid scheduler: one event-driven anomaly, one inactivity threshold, one fixed evening heartbeat."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          <Trigger
            n="01"
            kind="Threshold"
            cap="capped 1 / day"
            rule="2× margin against rolling 14-day baseline"
            body="Fires the moment a switching cluster or fragmentation anomaly crosses the line. Real-time. Dynamic."
          />
          <Trigger
            n="02"
            kind="Temporal Inactivity"
            cap="user-configured · default 90m"
            rule="0 events matching FOCUS_WORK"
            body="The guilt engine. When you haven't done anything that looks like work for as long as you said you wouldn't."
          />
          <Trigger
            n="03"
            kind="Evening Summary"
            cap="fixed · 8:00 PM"
            rule="single most fascinating deviation"
            body="The non-negotiable daily heartbeat. One sentence. The thing you'd rather not hear."
          />
        </div>

        <div className="mt-10 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
            <Workflow className="h-3.5 w-3.5 text-signal" /> automation hooks
          </div>
          <div className="mt-4 grid gap-3 font-mono text-[12px] md:grid-cols-2">
            <Hook
              when="if temporal_inactivity > 90m"
              then='run ~/.servnt/scripts/close_safari.sh'
            />
            <Hook
              when="on cluster(VS Code ⇄ Discord) ≥ 12/30m"
              then="enable focus_lock → mute Discord 25m"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Trigger({
  n, kind, cap, rule, body,
}: { n: string; kind: string; cap: string; rule: string; body: string }) {
  return (
    <div className="bg-background p-6">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
        <span>{n}</span>
        <span className="text-signal">{cap}</span>
      </div>
      <h4 className="mt-5 font-display text-2xl">{kind}</h4>
      <div className="mt-2 font-mono text-[11px] text-muted-foreground">when · {rule}</div>
      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Hook({ when, then }: { when: string; then: string }) {
  return (
    <div className="rounded border border-border bg-background p-3">
      <div className="text-warn">{when}</div>
      <div className="text-muted-foreground">  {then}</div>
    </div>
  );
}

function Tiers() {
  const tiers = [
    {
      name: "Free", price: "$0", note: "open-source core",
      bullets: [
        "Collection agent (open-source)",
        "Local fragmentation metrics",
        "7-day data retention",
        "100% local operation",
      ],
    },
    {
      name: "Servnt Plus", price: "$6", per: "/ mo", featured: true, note: "the everyday tier",
      bullets: [
        "Advanced behavioral modeling",
        "Cross-application pattern libraries",
        "1-year data history",
        "Weekly behavioral reports",
        "Optional encrypted cloud sync",
      ],
    },
    {
      name: "Lifetime Local", price: "$49", per: "once", note: "no cloud, no recurring",
      bullets: [
        "Full feature set, permanent",
        "Local file processing only",
        "Local model inference",
        "Bypass cloud entirely",
      ],
    },
  ];

  return (
    <section className="relative border-b border-border bg-surface/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHead
          tag="04 · pricing"
          title={<>Pay once. Pay monthly. <span className="text-muted-foreground italic">Or don't pay at all.</span></>}
          sub="The collection agent is free and open-source. Pay only if you want the longer memory."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                "relative rounded-2xl border p-6 " +
                (t.featured
                  ? "border-signal bg-surface-elevated"
                  : "border-border bg-background")
              }
            >
              {t.featured && (
                <div className="absolute -top-2.5 left-6 rounded bg-signal px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal-foreground">
                  recommended
                </div>
              )}
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim">{t.note}</div>
              <h4 className="mt-3 font-display text-3xl">{t.name}</h4>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl">{t.price}</span>
                {t.per && <span className="font-mono text-[12px] text-muted-foreground">{t.per}</span>}
              </div>
              <ul className="mt-6 space-y-2 text-[13px]">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <button
                className={
                  "mt-7 w-full rounded-md px-4 py-2.5 text-[13px] font-medium transition " +
                  (t.featured
                    ? "bg-signal text-signal-foreground hover:opacity-90"
                    : "border border-border-strong text-foreground hover:bg-surface")
                }
              >
                {t.name === "Free" ? "Download agent" : "Get " + t.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  tag, title, sub,
}: { tag: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">{tag}</div>
      <div>
        <h2 className="text-balance font-display text-4xl leading-tight md:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function Foot() {
  return (
    <footer className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-12 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="font-display text-3xl">Servnt</div>
        <p className="mt-2 max-w-md text-[13px] text-muted-foreground">
          A passive observer for people who suspect they're not as focused as they think.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <div className="space-y-2">
          <div className="text-dim">product</div>
          <div>Spec</div><div>Changelog</div><div>Roadmap</div>
        </div>
        <div className="space-y-2">
          <div className="text-dim">privacy</div>
          <div>Local-first</div><div>Audit</div><div>Source</div>
        </div>
        <div className="space-y-2">
          <div className="text-dim">company</div>
          <div>About</div><div>Press</div><div>Contact</div>
        </div>
      </div>
    </footer>
  );
}
