import { ArrowRight, Clock, Gauge, Layers, ListOrdered } from 'lucide-react'
import Link from 'next/link'
import { btn } from '@/components/site/styles'

const DETAILS = [
  { icon: ListOrdered, label: 'Questions', value: '10 Questions' },
  { icon: Layers, label: 'Subjects', value: 'Mixed Subjects' },
  { icon: Clock, label: 'Estimated time', value: '10 minutes' },
  { icon: Gauge, label: 'Difficulty', value: 'Moderate' },
]

export function DailyChallenge() {
  return (
    <section id="daily" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-6 text-white sm:p-10 lg:p-12">
          <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden="true" />
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-highlight/20 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-highlight/15 px-3 py-1 text-xs font-bold text-highlight">
                New challenge every day
              </p>
              <h2 className="mt-4 text-3xl font-extrabold text-balance md:text-4xl">
                <span aria-hidden="true">⚡ </span>Daily Challenge
              </h2>
              <p className="mt-3 max-w-xl text-white/75">
                A quick, mixed-subject warm-up to keep your preparation consistent. Build a streak and keep every subject fresh.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {DETAILS.map((d) => (
                  <div key={d.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <d.icon className="size-4.5 text-highlight" aria-hidden="true" />
                    <dt className="mt-3 text-[11px] font-medium tracking-wide text-white/55 uppercase">{d.label}</dt>
                    <dd className="mt-0.5 text-sm font-bold">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-center">
              <Link href="/ai-quiz?mode=daily" className={btn('light', 'lg', 'w-full sm:w-auto')}>
                Start Daily Quiz
                <ArrowRight aria-hidden="true" />
              </Link>
              <p className="text-xs text-white/55">Demo quiz · no sign-in needed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
