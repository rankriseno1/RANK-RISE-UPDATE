import { ChartNoAxesCombined, Gauge, Repeat, Sparkles } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/section'
import { card } from '@/components/site/styles'
import { IMPORTANCE_FACTOR_LABELS } from '@/lib/ai/importance-score'
import { cn } from '@/lib/utils'

const FEATURES = [
  { icon: ChartNoAxesCombined, title: 'Trend-Based Practice', body: 'Practice is organised around how topics have been tested over the years, not random question dumps.' },
  { icon: Repeat, title: 'Frequently Tested Concepts', body: 'Spot concepts that keep returning across papers and make sure they are never left to chance.' },
  { icon: Sparkles, title: 'Smart Quiz Experience', body: 'Exam-like timer, question palette and mark-for-review, with clear explanations after you submit.' },
  { icon: Gauge, title: 'Progress Tracking', body: 'Accuracy, streaks and subject-wise insights show exactly where your next hour of study should go.' },
]

export function WhyRankRise() {
  return (
    <Section id="why" tone="muted">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            className="mb-8 md:mb-8"
            eyebrow="Why Rank Rise"
            title="Preparation that respects your time"
            description="Rank Rise is being built to calculate an importance score for every concept, so practice goes where it matters most."
          />
          <div className={cn(card, 'p-5')}>
            <p className="text-sm font-bold text-navy">Importance score factors</p>
            <p className="mt-1 text-xs text-muted-foreground">A study-priority signal, never a guaranteed prediction.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {Object.values(IMPORTANCE_FACTOR_LABELS).map((f) => (
                <li key={f.label} title={f.description} className="rounded-lg border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-navy">
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <article key={f.title} className={cn(card, 'p-6 transition-colors duration-300 hover:border-primary/30')}>
              <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-highlight">
                <f.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
