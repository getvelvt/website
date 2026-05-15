import { createFileRoute } from "@tanstack/react-router";

import { InviteButton } from "@/components/InviteButton";
import { PageList, PageSection, SitePage } from "@/components/SitePage";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — Velvt" },
      { name: "description", content: "Velvt product roadmap: beta, fundraising, and development milestones." },
    ],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <SitePage
      tag="product · roadmap"
      title={<>Where we're headed <span className="italic text-muted-foreground">(honestly).</span></>}
      subtitle="Active development, private beta, and upcoming venture rounds to scale the team."
    >
      <PageSection title="Now — Development & beta">
        <PageList
          items={[
            "Private beta via waitlist at getvelvt.com",
            "Core agent: collection, modeling, notifications",
            "Security review + open-source agent release for audit",
          ]}
        />
      </PageSection>

      <PageSection title="Next — Fundraising & team">
        <p>
          We're preparing VC conversations to hire engineers (macOS, on-device ML, security) and
          ship Velvt Vault sync without compromising local-first defaults.
        </p>
        <PageList
          items={[
            "Seed / pre-seed rounds — focused on privacy-preserving productivity",
            "Design partners from beta cohort",
            "Public changelog + spec updates as features stabilize",
          ]}
        />
      </PageSection>

      <PageSection title="Later — Scale without surveillance">
        <PageList
          items={[
            "Velvt Vault: optional E2E encrypted sync",
            "Sovereign tier: fully airgapped, on-device inference",
            "Automation hooks (user-defined scripts on triggers)",
            "Android / Windows exploration — only if parity on privacy holds",
          ]}
        />
      </PageSection>

      <p>
        Want in early?{" "}
        <InviteButton variant="ghost">Join the waitlist</InviteButton>
        .
      </p>
    </SitePage>
  );
}
