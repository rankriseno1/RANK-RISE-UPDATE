import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-navy shadow-md shadow-primary/30',
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="size-5" fill="none">
        <rect x="6" y="18" width="4.5" height="8" rx="1.2" fill="white" fillOpacity="0.55" />
        <rect x="13.75" y="13" width="4.5" height="13" rx="1.2" fill="white" fillOpacity="0.8" />
        <rect x="21.5" y="7" width="4.5" height="19" rx="1.2" fill="white" />
        <path d="M5 13.5 L13 8 L18 10.5 L26 4" stroke="oklch(0.82 0.15 78)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Link href="/" className={cn('group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/40', className)}>
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      <span className={cn('font-heading text-lg font-extrabold tracking-tight', tone === 'dark' ? 'text-navy' : 'text-white')}>
        Rank<span className={tone === 'dark' ? 'text-primary' : 'text-highlight'}>Rise</span>
      </span>
      <span className="sr-only">Rank Rise home</span>
    </Link>
  )
}
