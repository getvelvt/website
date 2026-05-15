import { createFileRoute, Link } from "@tanstack/react-router";

import { PageList, PageSection, SitePage } from "@/components/SitePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit — Velvt" },
      { name: "description", content: "Audit Velvt's open-source collection agent and verify what leaves your machine." },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  return (
    <SitePage
      tag="privacy · audit"
      title={<>Trust, but verify. <span className="italic text-muted-foreground">Especially us.</span></>}
      subtitle="The collection agent is open-source so you can read every syscall we make."
    >
      <PageSection title="What you can audit today">
        <PageList
          items={[
            "Swift collection agent — full source (see Source page)",
            "Local SQLite schema + export tooling",
            "Network activity: none on Unsealed tier",
            "Accessibility API usage — window metadata only",
          ]}
        />
      </PageSection>

      <PageSection title="Export & review">
        <p>
          Export raw and abstracted events as JSON. Compare against on-screen notifications. Report
          discrepancies to{" "}
          <a href={"mailto:" + SITE.email.security} className="text-signal hover:underline">
            {SITE.email.security}
          </a>
          .
        </p>
      </PageSection>

      <PageSection title="Third-party review">
        <p>Independent security review planned during beta. Findings will be published on this page.</p>
      </PageSection>

      <p>
        <Link to="/source" className="text-signal hover:underline">
          View source →
        </Link>
      </p>
    </SitePage>
  );
}
