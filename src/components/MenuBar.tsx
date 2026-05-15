"use client";

import { Link, useRouter } from "@tanstack/react-router";
import { BatteryFull, Search, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useWaitlist } from "@/components/WaitlistProvider";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SITE } from "@/lib/site";

function MenuTrigger({ label }: { label: string }) {
  return (
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        className="rounded px-1.5 py-0.5 text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground data-[state=open]:bg-surface-elevated data-[state=open]:text-foreground"
      >
        {label}
      </button>
    </DropdownMenuTrigger>
  );
}

async function clipboardWrite(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(label + " copied");
  } catch {
    toast.error("Clipboard unavailable");
  }
}

export function MenuBar() {
  const [time, setTime] = useState("");
  const router = useRouter();
  const { openWaitlist } = useWaitlist();
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(100);

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

  useEffect(() => {
    document.documentElement.style.zoom = String(zoom / 100);
    return () => {
      document.documentElement.style.zoom = "";
    };
  }, [zoom]);

  useEffect(() => {
    document.body.dataset.showGrid = showGrid ? "1" : "0";
  }, [showGrid]);

  return (
    <div className="w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-7 max-w-[1400px] items-center justify-between px-4 text-[12px]">
        <div className="flex items-center gap-1 font-medium">
          <Link to="/" className="rounded px-1.5 font-semibold transition hover:bg-surface-elevated">
            Velvt
          </Link>

          <DropdownMenu>
            <MenuTrigger label="File" />
            <DropdownMenuContent
              align="start"
              className="min-w-[220px] border-border bg-surface-elevated p-1 font-sans text-[13px] shadow-lg"
            >
              <DropdownMenuItem onSelect={() => openWaitlist()}>
                Request beta access…
                <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/spec">Read the spec</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onSelect={() => {
                  window.print();
                }}
              >
                Print page…
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem asChild>
                <a href={"mailto:" + SITE.email.hello}>Email {SITE.email.hello}</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <MenuTrigger label="Edit" />
            <DropdownMenuContent
              align="start"
              className="min-w-[200px] border-border bg-surface-elevated p-1 font-sans text-[13px] shadow-lg"
            >
              <DropdownMenuItem disabled>
                Undo
                <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                Redo
                <DropdownMenuShortcut>⇧⌘Z</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem onSelect={() => clipboardWrite(window.location.href, "Link")}>
                Copy link
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => clipboardWrite(document.title, "Page title")}
              >
                Copy page title
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => window.getSelection()?.selectAllChildren(document.body)}>
                Select all
                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <MenuTrigger label="View" />
            <DropdownMenuContent
              align="start"
              className="min-w-[200px] border-border bg-surface-elevated p-1 font-sans text-[13px] shadow-lg"
            >
              <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
                Show grid background
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem onSelect={() => setZoom((z) => Math.min(z + 10, 150))}>
                Zoom in
                <DropdownMenuShortcut>⌘+</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom((z) => Math.max(z - 10, 80))}>
                Zoom out
                <DropdownMenuShortcut>⌘−</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoom(100)}>
                Actual size
                <DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem onSelect={() => router.navigate({ to: "/" })}>
                Go to home
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <MenuTrigger label="Window" />
            <DropdownMenuContent
              align="start"
              className="min-w-[220px] border-border bg-surface-elevated p-1 font-sans text-[13px] shadow-lg"
            >
              <DropdownMenuItem onSelect={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Minimize scroll
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => document.documentElement.requestFullscreen?.()}>
                Enter full screen
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Navigate to</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="border-border bg-surface-elevated">
                  <DropdownMenuItem asChild>
                    <Link to="/spec">Spec</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/changelog">Changelog</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/roadmap">Roadmap</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/about">About</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem asChild>
                <Link to="/">Velvt — Home</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <MenuTrigger label="Help" />
            <DropdownMenuContent
              align="start"
              className="min-w-[220px] border-border bg-surface-elevated p-1 font-sans text-[13px] shadow-lg"
            >
              <DropdownMenuLabel className="font-normal text-muted-foreground">
                Velvt Help
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link to="/spec">Documentation (spec)</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/local-first">Local-first privacy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/audit">Audit the agent</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem asChild>
                <Link to="/changelog">Changelog</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">Contact support</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About Velvt</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem disabled>
                v0.1 beta · {SITE.domain}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="hidden items-center gap-1.5 font-mono text-[11px] text-foreground sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" />
            <span>velvt</span>
          </span>
          <BatteryFull className="h-3.5 w-3.5" />
          <Wifi className="h-3.5 w-3.5" />
          <button
            type="button"
            className="rounded p-0.5 transition hover:text-foreground"
            aria-label="Search site"
            onClick={() => {
              const q = window.prompt("Search Velvt pages (spec, changelog, roadmap…)");
              if (!q) return;
              const term = q.toLowerCase();
              const routes: Record<string, string> = {
                spec: "/spec",
                changelog: "/changelog",
                roadmap: "/roadmap",
                about: "/about",
                contact: "/contact",
                press: "/press",
                audit: "/audit",
                source: "/source",
                local: "/local-first",
                "local-first": "/local-first",
                invite: "/",
                waitlist: "/",
              };
              const match = Object.entries(routes).find(([k]) => term.includes(k));
              if (match) router.navigate({ to: match[1] });
              else toast.message("Try: spec, changelog, roadmap, contact");
            }}
          >
            <Search className="h-3.5 w-3.5" />
          </button>
          <span className="font-mono text-[11px] text-foreground">{time || "—"}</span>
        </div>
      </div>
    </div>
  );
}
