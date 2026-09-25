import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { SideNav } from "@/components/layout/side-nav";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { nav, site } from "@/lib/content";

export interface SiteShellProps {
  children: ReactNode;
  onHome?: boolean;
}

export function SiteShell({ children, onHome = true }: SiteShellProps) {
  const bookHref = onHome ? site.bookingUrl : `/${site.bookingUrl}`;
  return (
    <>
      <SideNav
        items={nav}
        name={site.name}
        role={site.role}
        availability={site.availability}
        email={site.email}
        phone={site.phone}
        location={site.location.display}
        linkedin={site.linkedin}
        ctaHref={bookHref}
        onHome={onHome}
      />
      <div className="lg:pl-(--sidebar-w)">
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </div>
      {onHome && <StickyMobileCta bookHref={bookHref} email={site.email} />}
    </>
  );
}
