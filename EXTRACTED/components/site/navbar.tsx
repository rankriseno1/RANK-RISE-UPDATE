'use client'

import { ArrowRight, LogIn, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LOGIN_LINK, NAV_LINKS } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { btn } from './styles'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.matchMedia('(min-width: 1024px)').matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [open])

  const loginActive = pathname.startsWith(LOGIN_LINK.href)

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground hover:bg-muted hover:text-navy',
                  )}
                >
                  {link.label}
                  {active && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" aria-hidden="true" />}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={LOGIN_LINK.href}
            aria-current={loginActive ? 'page' : undefined}
            className={btn(loginActive ? 'primary' : 'outline', 'sm', 'hidden sm:inline-flex')}
          >
            <LogIn aria-hidden="true" />
            {LOGIN_LINK.label}
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-navy transition-colors hover:bg-muted lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 animate-in overflow-y-auto bg-background duration-200 fade-in slide-in-from-top-2 lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex max-w-3xl flex-col gap-1 px-4 py-6 sm:px-6">
            <ul className="grid gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors',
                        active ? 'bg-primary-soft text-primary' : 'text-navy hover:bg-muted',
                      )}
                    >
                      {link.label}
                      <ArrowRight className="size-4 opacity-50" aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
              <Link href={LOGIN_LINK.href} onClick={() => setOpen(false)} className={btn('outline', 'lg', 'w-full')}>
                <LogIn aria-hidden="true" />
                {LOGIN_LINK.label}
              </Link>
              <Link href="/ai-quiz" onClick={() => setOpen(false)} className={btn('primary', 'lg', 'w-full')}>
                Start Preparing
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
