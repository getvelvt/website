import { createFileRoute } from "@tanstack/react-router";

import { PageList, PageSection, SitePage } from "@/components/SitePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — Velvt" },
      { name: "description", content: "Velvt press kit and media contact." },
    ],
  }),
  component: PressPage,
});

function PressPage() {
  return (
    <SitePage
      tag="company · press"
      title={<>Press kit <span className="italic text-muted-foreground">for skeptics.</span></>}
      subtitle="Velvt is in private beta. We're happy to brief journalists and creators under embargo when needed."
    >
      <PageSection title="Boilerplate">
        <p className="font-mono text-[13px] leading-relaxed text-foreground/90">
          Velvt is quiet behavioral intelligence for macOS. It observes how you actually use your
          computer — without screenshots or keylogging — and delivers one to three honest focus
          insights per day. Everything stays local by default. {SITE.domain}
        </p>
      </PageSection>

      <PageSection title="Facts">
        <PageList
          items={[
            "Platform: macOS (beta)",
            "Domain: " + SITE.domain,
            "Pricing: Unsealed (free), Velvt Vault ($6/mo), Sovereign ($49 lifetime)",
            "Status: Private beta, VC fundraising in progress",
          ]}
        />
      </PageSection>

      <PageSection title="Media contact">
        <p>
          <a href={"mailto:" + SITE.email.press} className="text-signal hover:underline">
            {SITE.email.press}
          </a>
        </p>
      </PageSection>
    </SitePage>
  );
}
