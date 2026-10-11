import { ArrowRight, CircleCheck, Flame, Target, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'
import { DemoBadge } from '@/components/site/badges'
import { Section, SectionHeading } from '@/components/site/section'
import { btn, card } from '@/components/site/styles'
import { TrendChart } from '@/components/shared/charts'
import { StatCard } from '@/components/shared/stat-card'
import { IMPROVEMENT_TREND, PERFORMANCE_SUMMARY as S } from '@/lib/data/performance'
import { cn } from '@/lib/utils'

export function ProgressSection() {
  return (
    <Section id="progress" tone="muted">
      <SectionHeading
        eyebrow="Analytics"
        title={
          <>
            <span aria-hidden="true">📊 </span>Track Your Progress
          </>
        }
        description="Every quiz feeds your dashboard, so you can see what is improving and what needs attention."
        action={<DemoBadge label="Sample data" />}
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard icon={Zap} label="Questions Attempted" value={S.questionsAttempted.toLocaleString('en-IN')} />
        <StatCard icon={Target} label="Accuracy" value={`${S.accuracy}%`} accent="success" />
        <StatCard icon={CircleCheck} label="Correct Answers" value={S.correctAnswers.toLocaleString('en-IN')} />
        <StatCard icon={Flame} label="Current Streak" value={`${S.currentStreak} days`} accent="warning" />
        <StatCard icon={Trophy} label="Rank Rise Score" value={String(S.rankRiseScore)} hint={`out of ${S.maxScore}`} accent="navy" className="col-span-2 lg:col-span-1" />
      </div>
      <div className={cn(card, 'mt-4 p-5 md:p-6')}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-navy">Accuracy improvement</h3>
            <p className="text-sm text-muted-foreground">Weekly accuracy over the last 8 weeks (sample)</p>
          </div>
          <Link href="/performance" className={btn('outline', 'sm')}>
            Open dashboard
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <TrendChart data={IMPROVEMENT_TREND} className="mt-4" />
      </div>
    </Section>
  )
}
