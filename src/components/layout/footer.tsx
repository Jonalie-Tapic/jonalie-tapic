import { nav, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 pb-28 lg:pb-10">
      <div className="gutter mx-auto max-w-[92rem]">
        <p aria-hidden="true" className="display text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] text-pearl/90">
          Quietly <em className="text-slate">handled.</em>
        </p>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="display text-2xl">{site.name}</p>
            <p className="mt-1 text-muted">
              {site.role} · {site.tagline}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`} className="text-muted hover:text-pearl">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-2">
            <a href={`mailto:${site.email}`} className="block [overflow-wrap:anywhere] text-pearl hover:underline">
              {site.email}
            </a>
            <a href={site.phone.href} className="block text-pearl hover:underline">
              {site.phone.display}
            </a>
            <p className="text-muted">{site.location.display}</p>
            <a href={site.linkedin} className="block text-muted hover:text-pearl" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <p className="text-muted">{site.hours}</p>
          </div>
          <div className="space-y-2 text-muted lg:text-right">
            <a href="/privacy" className="block hover:text-pearl">
              Privacy
            </a>
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
