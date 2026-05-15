import { createFileRoute, Link } from "@tanstack/react-router";

import { InviteButton } from "@/components/InviteButton";
import { PageList, PageSection, SitePage } from "@/components/SitePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/spec")({
  head: () => ({
    meta: [
      { title: "Spec — Velvt" },
      { name: "description", content: "Technical specification for Velvt: collection, modeling, insight, and delivery." },
    ],
  }),
  component: SpecPage,
});

function SpecPage() {
  return (
    <SitePage
      tag="product · spec"
      title={<>How Velvt works, <span className="italic text-muted-foreground">layer by layer.</span></>}
      subtitle="The collection agent is open-source. Everything above it is sealed on your machine until you choose otherwise."
    >
      <PageSection title="L1 — Collection agent">
        <p>
          Passive macOS background process. Logs active window titles, app names, and timestamps via the
          Accessibility API. Roughly one event per five seconds of active use. No screenshots, no
          keylogging, no content capture.
        </p>
        <PageList
          items={[
            "Swift · Accessibility API · auditable source",
            "~576 KB raw events per day",
            "Abstracted titles before any modeling",
          ]}
        />
      </PageSection>

      <PageSection title="L2 — Behavioral modeling">
        <p>
          Computes Focus Fragmentation, Switching Clusters, and Proportionality. Days 1–14 use
          rule-based thresholds; from day 15, deviations are measured against a rolling 14-day
          baseline (2× margin).
        </p>
      </PageSection>

      <PageSection title="L3 — Insight generation">
        <p>
          Lightweight model translates metrics into one neutral sentence. Deterministic syntactic
          fallback when offline. Voice of a data scientist, not a cheerleader.
        </p>
      </PageSection>

      <PageSection title="L4 — Delivery">
        <p>
          Menu bar app, native notifications, three timeline tracks. Maximum three alerts per day:
          one threshold, one inactivity, one evening summary at 8:00 PM.
        </p>
      </PageSection>

      <p>
        <InviteButton variant="ghost">Request beta access</InviteButton>{" "}
        or read our{" "}
        <Link to="/local-first" className="text-signal underline-offset-2 hover:underline">
          local-first
        </Link>{" "}
        and{" "}
        <Link to="/audit" className="text-signal underline-offset-2 hover:underline">
          audit
        </Link>{" "}
        docs. Questions:{" "}
        <a href={"mailto:" + SITE.email.hello} className="text-signal hover:underline">
          {SITE.email.hello}
        </a>
      </p>
    </SitePage>
  );
}
