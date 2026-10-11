import { ArrowRight, CircleCheck, Flame, ListChecks, Target, Trophy } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SessionPerformance } from '@/components/performance/session-performance'
import { DemoBadge } from '@/components/site/badges'
import { PageHeader } from '@/components/site/section'
import { btn, card } from '@/components/site/styles'
import { ProgressBar, TrendChart, accuracyColor } from '@/components/shared/charts'
import { StatCard } from '@/components/shared/stat-card'
import { IMPROVEMENT_TREND, PERFORMANCE_SUMMARY, RECENT_QUIZZES, STRONG_TOPICS, SUBJECT_PERFORMANCE, WEAK_TOPICS } from '@/lib/data/performance'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Performance',
  description: 'Track questions attempted, accuracy, streaks, strong and weak topics, and your Rank Rise Score.',
}

export default function PerformancePage() {
  const s = PERFORMANCE_SUMMARY
  return (
    <>
      <PageHeader
        eyebrow="Performance"
        title="See where you stand. Know what to fix."
        description="A preview of the Rank Rise analytics dashboard. Personal tracking will be available once accounts are enabled."
      >
        <DemoBadge tone="dark" label="Sample data for illustration" />
      </PageHeader>

      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <SessionPerformance />

        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-navy">Dashboard preview</h2>
          <DemoBadge label="Sample data" />
        </div>

        <section aria-label="Sample summary" className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard icon={ListChecks} label="Questions Attempted" value={s.questionsAttempted.toLocaleString('en-IN')} />
          <StatCard icon={Target} label="Accuracy" value={`${s.accuracy}%`} accent="success" />
          <StatCard icon={CircleCheck} label="Correct Answers" value={s.correctAnswers.toLocaleString('en-IN')} accent="success" />
          <StatCard icon={Flame} label="Current Streak" value={`${s.currentStreak} days`} accent="warning" />
          <StatCard icon={Trophy} label="Rank Rise Score" value={`${s.rankRiseScore}`} hint={`out of ${s.maxScore}`} accent="navy" className="col-span-2 lg:col-span-1" />
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <section aria-labelledby="trend" className={cn(card, 'p-6')}>
            <h2 id="trend" className="text-lg font-bold text-navy">Accuracy trend</h2>
            <p className="mt-1 text-sm text-muted-foreground">Weekly accuracy over the last 8 weeks.</p>
            <TrendChart data={IMPROVEMENT_TREND} className="mt-4" />
          </section>

          <section aria-labelledby="subjects" className={cn(card, 'p-6')}>
            <h2 id="subjects" className="text-lg font-bold text-navy">Subject accuracy</h2>
            <ul className="mt-4 space-y-4">
              {SUBJECT_PERFORMANCE.map((sub) => (
                <li key={sub.subject}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">{sub.subject}</span>
                    <span className="text-muted-foreground tabular-nums">{sub.accuracy}%</span>
                  </div>
                  <ProgressBar value={sub.accuracy} barClassName={accuracyColor(sub.accuracy)} label={`${sub.subject} accuracy`} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <section aria-labelledby="strong" className={cn(card, 'p-6')}>
            <h2 id="strong" className="text-lg font-bold text-navy">Strong topics</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {STRONG_TOPICS.map((t) => (
                <li key={t} className="rounded-full bg-success-soft px-3 py-1 text-sm font-semibold text-success">{t}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="weak" className={cn(card, 'p-6')}>
            <h2 id="weak" className="text-lg font-bold text-navy">Weak topics</h2>
            <ul className="mt-4 space-y-3">
              {WEAK_TOPICS.map((t) => (
                <li key={t.topic} className="flex items-center justify-between gap-3 text-sm">
                  <span>
                    <span className="font-semibold text-navy">{t.topic}</span>
                    <span className="block text-xs text-muted-foreground">{t.subject} · {t.accuracy}%</span>
                  </span>
                  <Link href={`/ai-quiz?subject=${t.subjectSlug}`} className={btn('outline', 'sm')}>Practice</Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="recent" className={cn(card, 'p-6')}>
            <h2 id="recent" className="text-lg font-bold text-navy">Recent quizzes</h2>
            <ul className="mt-4 divide-y divide-border">
              {RECENT_QUIZZES.map((q) => (
                <li key={q.id} className="flex items-center justify-between gap-3 py-2.5 text-sm first:pt-0">
                  <span>
                    <span className="font-semibold text-navy">{q.title}</span>
                    <span className="block text-xs text-muted-foreground">{q.date}</span>
                  </span>
                  <span className="font-bold text-navy tabular-nums">{q.score}/{q.total}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex justify-center">
          <Link href="/ai-quiz" className={btn('primary', 'lg')}>
            Take a quiz to improve
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  )
}
