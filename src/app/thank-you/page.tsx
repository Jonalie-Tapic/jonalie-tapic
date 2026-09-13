import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <SiteShell onHome={false}>
      <section className="grain relative isolate grid min-h-svh place-items-center overflow-hidden pt-16 lg:pt-0">
        <div aria-hidden="true" className="stars absolute inset-0 -z-10 opacity-70" />
        <div className="gutter max-w-2xl text-center">
          <p className="eyebrow fade-up text-muted">Enquiry received</p>
          <h1 className="display mt-6 text-(length:--text-4xl)">
            <span className="line-mask">
              <span>Thank you.</span>
            </span>
            <span className="line-mask" style={{ ["--i" as string]: 1 }}>
              <span className="text-mist italic">It&rsquo;s in good hands.</span>
            </span>
          </h1>
          <p className="fade-up mt-8 text-(length:--text-lg) text-muted" style={{ ["--i" as string]: 2 }}>
            I&rsquo;ll read your note and reply {site.response} with a couple of times for a 20-minute call. If it&rsquo;s urgent, email me at{" "}
            <a className="text-pearl underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
          <ButtonLink href="/" variant="ghost" className="fade-up mt-10">
            Back to the homepage
          </ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}
