import Link from 'next/link'
import { FOOTER_LINKS, SITE } from '@/lib/site'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 max-w-sm md:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 font-heading text-lg font-semibold text-white">{SITE.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{SITE.description}</p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <nav key={group} aria-label={`${group} links`}>
              <h2 className="text-xs font-bold tracking-[0.16em] text-white/50 uppercase">{group}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="rounded text-sm text-white/75 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-highlight">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Rank Rise. All rights reserved.</p>
          <p>Practice content in this version is demo data for illustration.</p>
        </div>
      </div>
    </footer>
  )
}
