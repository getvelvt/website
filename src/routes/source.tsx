import { createFileRoute } from "@tanstack/react-router";

import { PageSection, SitePage } from "@/components/SitePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/source")({
  head: () => ({
    meta: [
      { title: "Source — Velvt" },
      { name: "description", content: "Open-source Velvt collection agent and related repositories." },
    ],
  }),
  component: SourcePage,
});

function SourcePage() {
  return (
    <SitePage
      tag="privacy · source"
      title={<>Open source <span className="italic text-muted-foreground">where it matters.</span></>}
      subtitle="The collection layer is public. Modeling and menu bar app ship as binaries during beta."
    >
      <PageSection title="Repositories">
        <ul className="space-y-3 font-mono text-[12px]">
          <li>
            <span className="text-dim">agent</span>
            <span className="ml-2 text-muted-foreground">
              velvt/agent — macOS collection (Swift) · launching with beta
            </span>
          </li>
          <li>
            <span className="text-dim">spec</span>
            <span className="ml-2 text-muted-foreground">
              Public architecture docs mirror getvelvt.com/spec
            </span>
          </li>
        </ul>
      </PageSection>

      <PageSection title="License">
        <p>Collection agent: permissive OSS license (details at repo release). Commercial tiers cover modeling, sync, and support — not surveillance.</p>
      </PageSection>

      <p>
        Notify me when repos are live:{" "}
        <a href={"mailto:" + SITE.email.hello} className="text-signal hover:underline">
          {SITE.email.hello}
        </a>
      </p>
    </SitePage>
  );
}
