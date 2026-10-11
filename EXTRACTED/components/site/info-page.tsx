import { PageHeader } from './section'
import { card } from './styles'
import { cn } from '@/lib/utils'

export function InfoPage({
  eyebrow,
  title,
  description,
  sections,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  sections: { heading: string; body: string }[]
  children?: React.ReactNode
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className={cn(card, 'space-y-8 p-6 sm:p-10')}>
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold text-navy">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{s.body}</p>
            </section>
          ))}
          {children}
        </div>
      </div>
    </>
  )
}
