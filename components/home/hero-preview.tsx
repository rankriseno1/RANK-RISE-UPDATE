import { Target, TrendingDown, TrendingUp, Zap } from 'lucide-react'
import { DemoBadge } from '@/components/site/badges'
import { ScoreRing, TrendChart } from '@/components/shared/charts'
import { IMPROVEMENT_TREND, PERFORMANCE_SUMMARY } from '@/lib/data/performance'

export function HeroPreview() {
  return (
    <div className="relative animate-in delay-150 duration-700 fade-in slide-in-from-bottom-4" aria-label="Sample dashboard preview">
      <div className="absolute -inset-6 rounded-[2rem] bg-primary/25 blur-3xl" aria-hidden="true" />
      <div className="relative rounded-3xl border border-white/12 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
        <div className="flex items-center justify-between gap-3 px-1 pb-4">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-success" aria-hidden="true" />
            <p className="text-sm font-semibold">Your Dashboard</p>
          </div>
          <DemoBadge tone="dark" label="Sample preview" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <PreviewStat icon={Zap} label="Questions Attempted" value={PERFORMANCE_SUMMARY.questionsAttempted.toLocaleString('en-IN')} />
          <PreviewStat icon={Target} label="Accuracy" value={`${PERFORMANCE_SUMMARY.accuracy}%`} />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-navy/60 p-4 sm:flex-col sm:justify-center sm:gap-2">
            <ScoreRing value={PERFORMANCE_SUMMARY.rankRiseScore} max={PERFORMANCE_SUMMARY.maxScore} size={104} stroke={9} tone="dark" sublabel="/ 1000" />
            <p className="text-xs font-semibold text-white/70">Rank Rise Score</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-navy/60 p-3">
            <p className="px-1 text-xs font-semibold text-white/70">Accuracy trend</p>
            <TrendChart data={IMPROVEMENT_TREND} tone="dark" className="mt-1" />
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <TopicList icon={TrendingUp} title="Strong Topics" items={['Fundamental Rights', 'Vitamins', 'Freedom Struggle']} tone="success" />
          <TopicList icon={TrendingDown} title="Weak Topics" items={['Profit & Loss', 'Clocks', 'Physical Features']} tone="warning" />
        </div>
      </div>
    </div>
  )
}

function PreviewStat({ icon: Icon, label, value }: { icon: typeof Zap; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy/60 p-4">
      <div className="flex items-center gap-2 text-white/65">
        <Icon className="size-3.5 text-highlight" aria-hidden="true" />
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="mt-2 font-heading text-2xl font-extrabold tabular-nums sm:text-3xl">{value}</p>
    </div>
  )
}

function TopicList({ icon: Icon, title, items, tone }: { icon: typeof Zap; title: string; items: string[]; tone: 'success' | 'warning' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy/60 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold text-white/70">
        <Icon className={tone === 'success' ? 'size-3.5 text-[oklch(0.75_0.14_155)]' : 'size-3.5 text-highlight'} aria-hidden="true" />
        {title}
      </p>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={
              tone === 'success'
                ? 'rounded-md bg-[oklch(0.55_0.14_155/0.2)] px-2 py-1 text-[11px] font-medium text-[oklch(0.85_0.1_155)]'
                : 'rounded-md bg-[oklch(0.82_0.15_78/0.15)] px-2 py-1 text-[11px] font-medium text-highlight'
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
