import { cn } from '@/lib/utils'

export function Section({
  id,
  className,
  children,
  tone = 'default',
}: {
  id?: string
  className?: string
  children: React.ReactNode
  tone?: 'default' | 'muted'
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-16 md:py-24', tone === 'muted' && 'bg-muted/60', className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 md:mb-12',
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <p className="mb-3 text-xs font-bold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>}
        <h2 className="text-3xl font-extrabold text-balance text-navy md:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <header className="relative overflow-hidden bg-hero text-white">
      <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-12 sm:px-6 md:pt-20 md:pb-16 lg:px-8">
        {eyebrow && <p className="mb-3 text-xs font-bold tracking-[0.18em] text-highlight uppercase">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-extrabold text-balance md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-white/75 md:text-lg">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  )
}
