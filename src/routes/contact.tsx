import { createFileRoute } from "@tanstack/react-router";

import { InviteButton } from "@/components/InviteButton";
import { PageSection, SitePage } from "@/components/SitePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Velvt" },
      { name: "description", content: "Contact Velvt — support, press, and security." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SitePage
      tag="company · contact"
      title={<>Get in touch</>}
      subtitle="We read every message. Beta access is fastest through the waitlist."
    >
      <PageSection title="Beta access">
        <p>
          <InviteButton>Join the waitlist</InviteButton>
        </p>
      </PageSection>

      <PageSection title="Email">
        <ul className="space-y-2 font-mono text-[12px]">
          <li>
            <span className="text-dim">general</span>{" "}
            <a href={"mailto:" + SITE.email.hello} className="text-signal hover:underline">
              {SITE.email.hello}
            </a>
          </li>
          <li>
            <span className="text-dim">press</span>{" "}
            <a href={"mailto:" + SITE.email.press} className="text-signal hover:underline">
              {SITE.email.press}
            </a>
          </li>
          <li>
            <span className="text-dim">security</span>{" "}
            <a href={"mailto:" + SITE.email.security} className="text-signal hover:underline">
              {SITE.email.security}
            </a>
          </li>
          <li>
            <span className="text-dim">waitlist</span>{" "}
            <a href={"mailto:" + SITE.email.waitlist} className="text-signal hover:underline">
              {SITE.email.waitlist}
            </a>
          </li>
        </ul>
      </PageSection>

      <PageSection title="Domain">
        <p>
          Primary site:{" "}
          <a href={SITE.url} className="text-signal hover:underline">
            {SITE.url}
          </a>
        </p>
      </PageSection>
    </SitePage>
  );
}
