import { Wifi, BatteryFull, Search } from "lucide-react";
import { useEffect, useState } from "react";

export function MenuBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-7 max-w-[1400px] items-center justify-between px-4 text-[12px]">
        <div className="flex items-center gap-4 font-medium">
          <span aria-hidden></span>
          <span className="font-semibold">Velvt</span>
          <span className="text-muted-foreground">File</span>
          <span className="text-muted-foreground">Edit</span>
          <span className="text-muted-foreground">View</span>
          <span className="text-muted-foreground">Window</span>
          <span className="text-muted-foreground">Help</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-foreground sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" />
            <span>velvt</span>
          </span>
          <BatteryFull className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <Search className="h-3.5 w-3.5" />
          <span className="font-mono text-[11px] text-foreground">{time || "—"}</span>
        </div>
      </div>
    </div>
  );
}
