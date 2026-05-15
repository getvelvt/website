import { motion } from "motion/react";

type Block = { start: number; end: number; label?: string };
type Track = { name: string; tone: "good" | "warn" | "dim"; blocks: Block[] };

const TRACKS: Track[] = [
  {
    name: "Pure Productive",
    tone: "good",
    blocks: [
      { start: 8.2, end: 9.4, label: "VS Code · 72m" },
      { start: 10.1, end: 10.4 },
      { start: 13.6, end: 14.3, label: "Docs · 42m" },
      { start: 16.0, end: 16.3 },
    ],
  },
  {
    name: "Compromised",
    tone: "warn",
    blocks: [
      { start: 9.4, end: 10.1, label: "VS Code ⇄ Discord" },
      { start: 11.0, end: 12.4, label: "switching cluster ×18" },
      { start: 14.3, end: 16.0 },
      { start: 17.2, end: 18.0 },
    ],
  },
  {
    name: "Unlogged / Idle",
    tone: "dim",
    blocks: [
      { start: 0, end: 8.2 },
      { start: 12.4, end: 13.6 },
      { start: 18.0, end: 24 },
    ],
  },
];

const HOURS = [0, 4, 8, 12, 16, 20, 24];

export function TimelinePanel() {
  return (
    <div className="rounded-2xl border border-border bg-surface/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <header className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Today · day 12 of 14</div>
          <h3 className="mt-1 text-lg font-display">Timeline</h3>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-good" />Productive</span>
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-warn" />Compromised</span>
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-dim/60" />Idle</span>
        </div>
      </header>

      <div className="mt-5 space-y-3">
        {TRACKS.map((t, ti) => (
          <div key={t.name} className="grid grid-cols-[120px_1fr] items-center gap-4">
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {t.name}
            </div>
            <div className="relative h-7 rounded-md border border-border bg-background/60">
              {t.blocks.map((b, i) => {
                const left = (b.start / 24) * 100;
                const width = ((b.end - b.start) / 24) * 100;
                const cls =
                  t.tone === "good"
                    ? "bg-good/80"
                    : t.tone === "warn"
                    ? "bg-warn/80"
                    : "bg-dim/30";
                return (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.05 * (ti * 4 + i), duration: 0.5, ease: "easeOut" }}
                    style={{ left: `${left}%`, width: `${width}%`, transformOrigin: "left" }}
                    className={`absolute top-1 bottom-1 rounded-sm ${cls} group cursor-default`}
                  >
                    {b.label && (
                      <span className="pointer-events-none absolute -top-6 left-0 hidden whitespace-nowrap rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] text-foreground group-hover:block">
                        {b.label}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[120px_1fr] gap-4">
        <div />
        <div className="flex justify-between font-mono text-[10px] text-dim">
          {HOURS.map((h) => (
            <span key={h}>{String(h).padStart(2, "0")}:00</span>
          ))}
        </div>
      </div>
    </div>
  );
}
