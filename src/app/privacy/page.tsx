import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How enquiry details and client data are handled.",
  alternates: { canonical: "/privacy" },
};

// NOTE: starter policy, to be reviewed against Jonalie's jurisdiction before launch.
export default function PrivacyPage() {
  return (
    <SiteShell onHome={false}>
      <article className="gutter mx-auto max-w-3xl pt-32 pb-24 lg:pt-28">
        <p className="eyebrow text-muted">Privacy</p>
        <h1 className="display mt-5 text-(length:--text-3xl)">How your details are handled</h1>
        <div className="mt-10 space-y-8 text-muted [&_h2]:display [&_h2]:text-(length:--text-xl) [&_h2]:text-pearl">
          <section>
            <h2>What the enquiry form collects</h2>
            <p className="mt-3">Your name, email, and anything you choose to tell me about your business. It&rsquo;s used only to reply to your enquiry.</p>
          </section>
          <section>
            <h2>Client data</h2>
            <p className="mt-3">
              Clients&rsquo; accounts and information are covered by an NDA. Credentials are shared only through a password manager and are never stored in email or chat.
            </p>
          </section>
          <section>
            <h2>Your rights</h2>
            <p className="mt-3">
              To see, correct or delete anything I hold about you, email{" "}
              <a className="text-pearl underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}
