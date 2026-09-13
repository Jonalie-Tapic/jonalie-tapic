import { SiteShell } from "@/components/layout/site-shell";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <SiteShell onHome={false}>
      <section className="grid min-h-svh place-items-center pt-16 lg:pt-0">
        <div className="gutter text-center">
          <p className="eyebrow text-muted">404</p>
          <h1 className="display mt-5 text-(length:--text-3xl)">
            This page got <em className="text-mist">misfiled.</em>
          </h1>
          <p className="mt-5 text-muted">Unusual for me, I promise. Try one of these instead.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Homepage</ButtonLink>
            <ButtonLink href="/#services" variant="ghost">
              Services
            </ButtonLink>
            <ButtonLink href="/#contact" variant="ghost">
              Contact
            </ButtonLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
