import { createFileRoute, Link } from "@tanstack/react-router";

import { PageList, PageSection, SitePage } from "@/components/SitePage";

export const Route = createFileRoute("/local-first")({
  head: () => ({
    meta: [
      { title: "Local-first — Velvt" },
      { name: "description", content: "Velvt is local-first: your behavioral data stays on your Mac by default." },
    ],
  }),
  component: LocalFirstPage,
});

function LocalFirstPage() {
  return (
    <SitePage
      tag="privacy · local-first"
      title={<>Your machine is the vault. <span className="italic text-muted-foreground">Not our cloud.</span></>}
      subtitle="Unsealed tier is 100% offline. Paid tiers add optional sync — never required for core insights."
    >
      <PageSection title="Default: on-device only">
        <PageList
          items={[
            "SQLite store on your Mac — under 200 MB/year typical",
            "No screenshots, keylogging, or content capture",
            "Abstracted window titles before modeling",
            "Insights reverse-translated locally before display",
          ]}
        />
      </PageSection>

      <PageSection title="Optional sync (Vault)">
        <p>
          End-to-end encrypted sync is opt-in. Keys stay with you. We cannot read your behavioral
          timeline. Sovereign tier removes the cloud path entirely.
        </p>
      </PageSection>

      <PageSection title="Offline mode">
        <p>100% offline operation supported. Deterministic phrase fallbacks when models are unreachable.</p>
      </PageSection>

      <p>
        See also:{" "}
        <Link to="/audit" className="text-signal hover:underline">
          Audit
        </Link>
        ,{" "}
        <Link to="/source" className="text-signal hover:underline">
          Source
        </Link>
        .
      </p>
    </SitePage>
  );
}
