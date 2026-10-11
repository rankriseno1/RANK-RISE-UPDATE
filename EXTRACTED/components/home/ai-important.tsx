import { Info, Play, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { DemoBadge, ImportanceBadge } from '@/components/site/badges'
import { Section, SectionHeading } from '@/components/site/section'
import { btn, card, cardHover } from '@/components/site/styles'
import { ProgressBar } from '@/components/shared/charts'
import { AI_IMPORTANT_SETS } from '@/lib/data/insights'
import { getAvailableQuestionCount } from '@/lib/repository'
import { cn } from '@/lib/utils'

export function AiImportant() {
  return (
    <Section id="ai-important" tone="muted">
      <SectionHeading
        eyebrow="AI Priorities"
        title={
          <>
            <span aria-hidden="true">🎯 </span>AI Important Questions
          </>
        }
        description="Rank Rise will analyze historical question patterns and identify high-priority concepts for focused practice."
        action={<DemoBadge label="Demo data" />}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {AI_IMPORTANT_SETS.map((set) => (
          <article key={set.id} className={cn(card, cardHover, 'flex flex-col p-5')}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-wide text-primary uppercase">{set.examName}</p>
                <h3 className="mt-1 text-lg font-bold text-navy">{set.subjectName}</h3>
              </div>
              <ImportanceBadge level={set.priority} />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Sparkles className="size-3.5 text-highlight" aria-hidden="true" />
              Focus: {set.focus}
            </p>
            <div className="mt-5 flex items-baseline justify-between text-xs">
              <span className="text-muted-foreground">Priority score (sample)</span>
              <span className="font-bold text-navy tabular-nums">{set.score}/100</span>
            </div>
            <ProgressBar value={set.score} className="mt-1.5" label={`${set.subjectName} priority score`} />
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-sm">
                <span className="font-heading text-xl font-extrabold text-navy">
                  {Math.min(set.questionCount, getAvailableQuestionCount({ examSlug: set.examSlug, subjectSlug: set.subjectSlug }))}
                </span>
                <span className="ml-1 text-muted-foreground">demo questions</span>
              </p>
              <Link href={`/ai-quiz?exam=${set.examSlug}&subject=${set.subjectSlug}&type=concepts`} className={btn('primary', 'sm')}>
                <Play aria-hidden="true" />
                Start Practice
              </Link>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        AI recommendations are based on available question trends and are not guaranteed predictions of future exam questions.
      </p>
    </Section>
  )
}
