import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";

export function FragmentationGauge() {
  const [score, setScore] = useState(64);
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(mv, score, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [score, mv]);

  useEffect(() => {
    const targets = [64, 38, 81, 22, 57];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % targets.length;
      setScore(targets[i]);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const dash = 282;
  const offset = useTransform(mv, (v) => dash - (dash * v) / 100);

  return (
    <div className="rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur-xl">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
        Focus Fragmentation
      </div>
      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-[120px] w-[120px]">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="45" stroke="var(--border)" strokeWidth="6" fill="none" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--signal)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={dash}
              style={{ strokeDashoffset: offset }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span className="font-mono text-3xl font-medium tabular-nums">
              {display}
            </motion.span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-dim">/ 100</span>
          </div>
        </div>
        <div className="flex-1 space-y-2 font-mono text-[11px]">
          <Row k="Switches / hr" v={score > 50 ? "47" : "12"} hot={score > 50} />
          <Row k="Longest block" v={score > 50 ? "8m" : "62m"} hot={score > 50} />
          <Row k="vs 14d baseline" v={score > 50 ? "+184%" : "−22%"} hot={score > 50} />
          <Row k="Cluster" v={score > 50 ? "VSC ⇄ DSC" : "—"} hot={score > 50} />
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, hot }: { k: string; v: string; hot: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-1">
      <span className="text-muted-foreground">{k}</span>
      <span className={hot ? "text-warn" : "text-foreground"}>{v}</span>
    </div>
  );
}
