import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Notif = {
  id: string;
  kind: "Threshold" | "Inactivity" | "Evening Summary";
  body: string;
  meta: string;
  actions?: [string, string];
};

const NOTIFS: Notif[] = [
  {
    id: "1",
    kind: "Threshold",
    body: "You've switched away from your task 18 times in the last 30 minutes — 3× your usual rate.",
    meta: "VS Code ⇄ Discord ⇄ Twitter · cluster detected",
    actions: ["Start Focus Lock", "Log as Exception"],
  },
  {
    id: "2",
    kind: "Inactivity",
    body: "You haven't done anything that looks like focused work in 2 hours and 14 minutes.",
    meta: "Last FOCUS_WORK event: 14:46 · Safari, Reddit since",
    actions: ["Open Doc", "Snooze 20m"],
  },
  {
    id: "3",
    kind: "Evening Summary",
    body: "Your longest focus block today was 18 minutes. Your personal record is 94 minutes — that was last Thursday.",
    meta: "Daily heartbeat · 8:00 PM",
  },
];

export function NotificationStack() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % NOTIFS.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[260px] w-full">
      <AnimatePresence mode="popLayout">
        {NOTIFS.map((n, i) => {
          const offset = (i - idx + NOTIFS.length) % NOTIFS.length;
          if (offset > 2) return null;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{
                opacity: offset === 0 ? 1 : 0.55 - offset * 0.18,
                y: offset * 12,
                scale: 1 - offset * 0.04,
              }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              style={{ zIndex: 10 - offset }}
              className="absolute inset-x-0 top-0"
            >
              <NotifCard n={n} active={offset === 0} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function NotifCard({ n, active }: { n: Notif; active: boolean }) {
  return (
    <div className="rounded-xl border border-border-strong bg-surface-elevated/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          <span>Servnt</span>
          <span className="text-dim">·</span>
          <span className={active ? "text-signal" : "text-muted-foreground"}>{n.kind}</span>
        </div>
        <span className="text-dim">now</span>
      </div>
      <p className="mt-3 text-[15px] leading-snug text-foreground text-balance">{n.body}</p>
      <p className="mt-2 font-mono text-[11px] text-dim">{n.meta}</p>
      {n.actions && (
        <div className="mt-3 flex gap-2">
          <button className="rounded-md bg-signal px-3 py-1.5 text-[12px] font-medium text-signal-foreground transition hover:opacity-90">
            {n.actions[0]}
          </button>
          <button className="rounded-md border border-border-strong px-3 py-1.5 text-[12px] text-foreground transition hover:bg-surface">
            {n.actions[1]}
          </button>
        </div>
      )}
    </div>
  );
}
