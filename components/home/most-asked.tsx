import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { DemoBadge, ImportanceBadge } from '@/components/site/badges'
import { AppIcon } from '@/components/site/app-icon'
import { Section, SectionHeading } from '@/components/site/section'
import { card, cardHover } from '@/components/site/styles'
import { MOST_ASKED_TOPICS } from '@/lib/data/insights'
import { getSubjectBySlug } from '@/lib/repository'
import { cn } from '@/lib/utils'

export function MostAsked() {
  return (
    <Section id="most-asked">
      <SectionHeading
        eyebrow="Trends"
        title={
          <>
            <span aria-hidden="true">🔥 </span>Most Asked Questions
          </>
        }
        description="Discover concepts that have appeared frequently across previous government examinations."
        action={<DemoBadge label="Demo data · illustrative values" />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {MOST_ASKED_TOPICS.map((topic) => {
          const subject = getSubjectBySlug(topic.subjectSlug)
          return (
            <article key={topic.topic} className={cn(card, cardHover, 'group relative flex flex-col p-5')}>
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <AppIcon name={subject?.icon ?? 'book'} className="size-5" />
                </span>
                <ImportanceBadge level={topic.importance} />
              </div>
              <h3 className="mt-4 text-base font-bold text-navy">{topic.topic}</h3>
              <div className="mt-4">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-muted-foreground">Sample frequency</span>
                  <span className="font-bold text-navy tabular-nums">{topic.frequency}/100</span>
                </div>
                <div className="mt-1.5 flex gap-1" role="img" aria-label={`Illustrative frequency ${topic.frequency} out of 100`}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className={cn('h-2 flex-1 rounded-full', i < Math.round(topic.frequency / 10) ? 'bg-primary' : 'bg-muted')} />
                  ))}
                </div>
              </div>
              <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                {topic.concepts.map((c) => (
                  <li key={c} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {c}
                  </li>
                ))}
              </ul>
              <Link
                href={`/previous-year-questions?subject=${topic.subjectSlug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl"
              >
                See questions
                <span className="sr-only"> for {topic.topic}</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
