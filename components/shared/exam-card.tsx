import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AppIcon } from '@/components/site/app-icon'
import { card, cardHover } from '@/components/site/styles'
import type { IconKey } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ExamCard({
  title,
  description,
  icon,
  href,
  meta,
}: {
  title: string
  description: string
  icon: IconKey
  href: string
  meta?: React.ReactNode
}) {
  return (
    <article className={cn(card, cardHover, 'group relative flex flex-col p-5')}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-soft to-secondary text-primary transition-colors duration-300 group-hover:from-primary group-hover:to-navy group-hover:text-white">
          <AppIcon name={icon} className="size-5.5" />
        </span>
        {meta}
      </div>
      <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-3 focus-visible:after:ring-ring/40"
      >
        Explore
        <span className="sr-only"> {title}</span>
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  )
}
