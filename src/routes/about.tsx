import { createFileRoute, Link } from "@tanstack/react-router";

import { PageSection, SitePage } from "@/components/SitePage";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Velvt" },
      { name: "description", content: "About Velvt — quiet behavioral intelligence for macOS." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SitePage
      tag="company · about"
      title={<>We build tools that <span className="italic text-muted-foreground">don't flatter you.</span></>}
      subtitle="Velvt is behavioral intelligence for people who already suspect the truth about their focus."
    >
      <PageSection title="Mission">
        <p>
          Most productivity software optimizes for engagement. Velvt optimizes for honesty — one to
          three specific observations per day, sealed on your machine, in the voice of a neutral
          analyst.
        </p>
      </PageSection>

      <PageSection title="Company">
        <p>
          Based in the US. Building at {SITE.domain}. Private beta now; fundraising to expand the
          team. We're macOS-first because that's where deep work still lives.
        </p>
      </PageSection>

      <PageSection title="Contact">
        <p>
          General:{" "}
          <a href={"mailto:" + SITE.email.hello} className="text-signal hover:underline">
            {SITE.email.hello}
          </a>
          <br />
          Press:{" "}
          <Link to="/press" className="text-signal hover:underline">
            Press kit
          </Link>
          {" · "}
          <a href={"mailto:" + SITE.email.press} className="text-signal hover:underline">
            {SITE.email.press}
          </a>
        </p>
      </PageSection>
    </SitePage>
  );
}
