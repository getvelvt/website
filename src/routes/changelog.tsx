import { createFileRoute } from "@tanstack/react-router";

import { PageSection, SitePage } from "@/components/SitePage";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — Velvt" },
      { name: "description", content: "Velvt release notes. Currently in private beta." },
    ],
  }),
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <SitePage
      tag="product · changelog"
      title={<>Release notes <span className="italic text-muted-foreground">from the vault.</span></>}
      subtitle="We're in private beta. This page tracks what ships to testers on getvelvt.com."
    >
      <div className="rounded-lg border border-signal/40 bg-signal/10 px-4 py-3 font-mono text-[12px] text-foreground">
        Current channel: <span className="text-signal">beta</span> · v0.1.x
      </div>

      <PageSection title="2026-05 — Private beta">
        <ul className="space-y-4 font-mono text-[12px]">
          <li>
            <span className="text-signal">added</span>
            <span className="ml-2 text-muted-foreground">
              Menu bar agent shell, local SQLite event store, seed classifier (8 categories)
            </span>
          </li>
          <li>
            <span className="text-signal">added</span>
            <span className="ml-2 text-muted-foreground">
              Threshold + inactivity + evening summary notification pipeline (cap 3/day)
            </span>
          </li>
          <li>
            <span className="text-signal">added</span>
            <span className="ml-2 text-muted-foreground">
              Title abstraction pipeline — mapping dictionary stays on-device only
            </span>
          </li>
          <li>
            <span className="text-warn">known</span>
            <span className="ml-2 text-muted-foreground">
              Insight model requires network unless Sovereign local inference is enabled
            </span>
          </li>
          <li>
            <span className="text-dim">planned</span>
            <span className="ml-2 text-muted-foreground">
              Encrypted sync (Vault tier), automation hooks, expanded audit export
            </span>
          </li>
        </ul>
      </PageSection>

      <PageSection title="Pre-beta (internal)">
        <p>Architecture spec frozen. Open-source collection agent repository prepared for public audit.</p>
      </PageSection>
    </SitePage>
  );
}
