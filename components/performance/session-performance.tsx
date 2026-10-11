'use client'

import { CircleCheck, Clock3, ListChecks, PlayCircle, Target, Trophy } from 'lucide-react'
import Link from 'next/link'
import { StatCard } from '@/components/shared/stat-card'
import { useDemoStore } from '@/components/site/demo-store'
import { btn, card } from '@/components/site/styles'
import { formatDuration } from '@/lib/quiz'
import { cn } from '@/lib/utils'

const timeFormatter = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' })

export function SessionPerformance() {
  const { attempts, hydrated, clearAttempts } = useDemoStore()

  const totals = attempts.reduce(
    (acc, a) => ({
      questions: acc.questions + a.total,
      correct: acc.correct + a.correct,
      incorrect: acc.incorrect + a.incorrect,
      unanswered: acc.unanswered + a.unanswered,
      score: acc.score + a.score,
      maxScore: acc.maxScore + a.total * 4,
      time: acc.time + a.timeTakenSeconds,
    }),
    { questions: 0, correct: 0, incorrect: 0, unanswered: 0, score: 0, maxScore: 0, time: 0 },
  )
  const attempted = totals.correct + totals.incorrect
  const accuracy = attempted > 0 ? Math.round((totals.correct / attempted) * 100) : 0

  return (
    <section aria-labelledby="session-heading" className={cn(card, 'p-6')}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 id="session-heading" className="text-lg font-bold text-navy">This session</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quizzes you complete in this browser tab appear here. They are not saved to an account and clear when the tab closes.
          </p>
        </div>
        {attempts.length > 0 && (
          <button type="button" onClick={clearAttempts} className={btn('ghost', 'sm', 'self-start')}>
            Clear session
          </button>
        )}
      </div>

      {!hydrated ? (
        <p className="mt-6 text-sm text-muted-foreground" role="status">Loading session activity…</p>
      ) : attempts.length === 0 ? (
        <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">No quizzes completed yet in this session.</p>
          <Link href="/ai-quiz" className={btn('primary', 'sm')}>
            <PlayCircle aria-hidden="true" />
            Start a quiz
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5" data-testid="session-stats">
            <StatCard icon={PlayCircle} label="Quizzes Completed" value={`${attempts.length}`} />
            <StatCard icon={ListChecks} label="Questions" value={`${totals.questions}`} hint={`${totals.unanswered} unanswered`} />
            <StatCard icon={CircleCheck} label="Correct" value={`${totals.correct}`} hint={`${totals.incorrect} incorrect`} accent="success" />
            <StatCard icon={Target} label="Accuracy" value={`${accuracy}%`} hint="of attempted questions" accent="success" />
            <StatCard icon={Trophy} label="Total Score" value={`${totals.score}`} hint={`out of ${totals.maxScore}`} accent="navy" className="col-span-2 lg:col-span-1" />
          </div>

          <h3 className="mt-8 text-sm font-bold tracking-wide text-muted-foreground uppercase">Completed attempts</h3>
          <ul className="mt-3 divide-y divide-border" aria-label="Completed attempts this session">
            {attempts.map((a) => (
              <li key={a.id} className="flex flex-col gap-1 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-navy">{a.title}</span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 className="size-3" aria-hidden="true" />
                    {timeFormatter.format(a.completedAt)} · {formatDuration(a.timeTakenSeconds)} · {a.correct} correct, {a.incorrect} incorrect, {a.unanswered} unanswered
                  </span>
                </span>
                <span className="shrink-0 font-bold text-navy tabular-nums">
                  {a.score}/{a.total * 4} · {a.accuracy}%
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
