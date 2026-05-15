import { useEffect, useRef, useState } from "react";

type Ev = { t: string; app: string; title: string; cat: string };

const STREAM: Ev[] = [
  { t: "14:02:11", app: "VS Code",   title: "velvt/agent.swift",        cat: "FOCUS_WORK" },
  { t: "14:02:46", app: "VS Code",   title: "velvt/agent.swift",        cat: "FOCUS_WORK" },
  { t: "14:03:18", app: "Discord",   title: "Tab: A",                    cat: "COMMUNICATION" },
  { t: "14:03:22", app: "VS Code",   title: "velvt/agent.swift",        cat: "FOCUS_WORK" },
  { t: "14:03:41", app: "Twitter",   title: "Tab: B",                    cat: "SOCIAL_FEED" },
  { t: "14:03:58", app: "VS Code",   title: "velvt/agent.swift",        cat: "FOCUS_WORK" },
  { t: "14:04:09", app: "Discord",   title: "Tab: A",                    cat: "COMMUNICATION" },
  { t: "14:04:14", app: "Twitter",   title: "Tab: B",                    cat: "SOCIAL_FEED" },
  { t: "14:04:31", app: "YouTube",   title: "Tab: C",                    cat: "PASSIVE_CONSUMPTION" },
  { t: "14:05:02", app: "VS Code",   title: "velvt/agent.swift",        cat: "FOCUS_WORK" },
  { t: "14:05:24", app: "Stack Overflow", title: "Tab: D",               cat: "REFERENCE" },
  { t: "14:05:48", app: "VS Code",   title: "velvt/agent.swift",        cat: "FOCUS_WORK" },
];

const CAT_COLOR: Record<string, string> = {
  FOCUS_WORK: "text-good",
  COMMUNICATION: "text-warn",
  SOCIAL_FEED: "text-bad",
  PASSIVE_CONSUMPTION: "text-bad",
  REFERENCE: "text-muted-foreground",
};

export function EventStream() {
  const [rows, setRows] = useState<Ev[]>([]);
  const i = useRef(0);
  useEffect(() => {
    const id = setInterval(() => {
      setRows((r) => {
        const next = [...r, STREAM[i.current % STREAM.length]];
        i.current++;
        return next.slice(-9);
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-background/80 font-mono text-[11px] shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-border px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-dim">
        <div className="flex items-center gap-1.5">
          <i className="h-2 w-2 rounded-full bg-bad" />
          <i className="h-2 w-2 rounded-full bg-warn" />
          <i className="h-2 w-2 rounded-full bg-good" />
          <span className="ml-2">~/velvt/events.sqlite</span>
        </div>
        <span>tail -f · abstracted</span>
      </div>
      <div className="px-3 py-2">
        <div className="grid grid-cols-[78px_94px_1fr_120px] gap-3 border-b border-border/60 pb-1.5 text-[10px] uppercase tracking-wider text-dim">
          <span>time</span><span>app</span><span>title</span><span>category</span>
        </div>
        <div className="mt-1.5 space-y-1">
          {rows.map((r, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[78px_94px_1fr_120px] items-center gap-3 leading-tight"
              style={{ opacity: 0.4 + (idx / rows.length) * 0.6 }}
            >
              <span className="text-dim">{r.t}</span>
              <span className="text-foreground">{r.app}</span>
              <span className="truncate text-muted-foreground">{r.title}</span>
              <span className={CAT_COLOR[r.cat] ?? "text-muted-foreground"}>{r.cat}</span>
            </div>
          ))}
          <div className="text-dim">
            <span className="blink">▍</span>
          </div>
        </div>
      </div>
    </div>
  );
}
