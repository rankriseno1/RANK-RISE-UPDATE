'use client'

import { BarChart3, CheckCircle2, CircleDashed, Clock3, ListChecks, RotateCcw, Shuffle, Sparkles, Target, Trophy, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ScoreRing } from '@/components/shared/charts'
import { DifficultyBadge } from '@/components/site/badges'
import { btn, card } from '@/components/site/styles'
import { formatDuration } from '@/lib/quiz'
import type { Question, QuizAnswerState, QuizResult } from '@/lib/types'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D']
type ReviewFilter = 'all' | 'correct' | 'incorrect' | 'unanswered'

function verdict({ correct, total, unanswered }: QuizResult) {
  if (total > 0 && unanswered > total / 2) {
    return { title: 'Finish the full set next time.', body: 'Most questions were left unanswered. Attempt every question to get a reliable read on your level.' }
  }
  // Grade on correct answers across all questions so skipping cannot inflate the verdict.
  const accuracy = total > 0 ? (correct / total) * 100 : 0
  if (accuracy >= 80) return { title: 'Outstanding work!', body: 'You are exam-ready on these topics. Push difficulty up a level next time.' }
  if (accuracy >= 60) return { title: 'Good attempt!', body: 'Solid base. Review the incorrect answers below to close the gaps.' }
  if (accuracy >= 40) return { title: 'Keep going!', body: 'A few concepts need revision. Read the explanations and retake the quiz.' }
  return { title: 'Every attempt counts.', body: 'Start with the study notes for these topics, then try an Easy quiz.' }
}

export function QuizResults({
  eyebrow,
  title,
  questions,
  answers,
  result,
  onRetake,
  onNewSet,
  onExit,
  exitLabel,
}: {
  eyebrow: string
  title: string
  questions: Question[]
  answers: QuizAnswerState[]
  result: QuizResult
  onRetake: () => void
  onNewSet?: () => void
  onExit: () => void
  exitLabel: string
}) {
  const [filter, setFilter] = useState<ReviewFilter>('all')
  const maxScore = result.total * 4
  const { title: verdictTitle, body } = verdict(result)

  const statusOf = (i: number): Exclude<ReviewFilter, 'all'> => {
    const selected = answers[i]?.selected
    if (selected === null || selected === undefined) return 'unanswered'
    return selected === questions[i].correctIndex ? 'correct' : 'incorrect'
  }

  const visible = questions.map((q, i) => ({ q, i, status: statusOf(i) })).filter((item) => filter === 'all' || item.status === filter)
  const counts = { all: result.total, correct: result.correct, incorrect: result.incorrect, unanswered: result.unanswered }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className={cn(card, 'overflow-hidden')}>
        <div className="relative overflow-hidden bg-hero p-6 text-white sm:p-8">
          <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ScoreRing value={result.accuracy} label={`${result.accuracy}%`} sublabel="accuracy" tone="dark" size={128} />
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-[0.16em] text-highlight uppercase">{eyebrow} · Result</p>
              <h1 className="mt-1 text-2xl font-extrabold text-balance sm:text-3xl">{verdictTitle}</h1>
              <p className="mt-1 text-sm text-white/75">{title}</p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">{body}</p>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 sm:p-6">
          <ResultStat icon={Trophy} label="Score" value={`${result.score}/${maxScore}`} tone="primary" />
          <ResultStat icon={Target} label="Accuracy" value={`${result.accuracy}%`} tone="primary" />
          <ResultStat icon={CheckCircle2} label="Correct" value={`${result.correct}`} tone="success" />
          <ResultStat icon={XCircle} label="Incorrect" value={`${result.incorrect}`} tone="danger" />
          <ResultStat icon={CircleDashed} label="Unanswered" value={`${result.unanswered}`} tone="muted" />
          <ResultStat icon={Clock3} label="Time taken" value={formatDuration(result.timeTakenSeconds)} tone="muted" />
        </dl>
        <p className="-mt-2 px-5 pb-4 text-xs text-muted-foreground sm:px-6">Marking: +4 per correct, −1 per incorrect, 0 for unanswered. Accuracy is based on attempted questions.</p>

        <div className="grid gap-4 border-t border-border p-5 sm:p-6 md:grid-cols-2">
          <div className="rounded-2xl bg-success-soft p-5">
            <p className="font-semibold text-navy">Strong topics</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{result.strongTopics.length ? result.strongTopics.join(' · ') : 'Keep practising to build a strong topic base.'}</p>
          </div>
          <div className="rounded-2xl bg-warning-soft p-5">
            <p className="font-semibold text-navy">Topics to improve</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{result.weakTopics.length ? result.weakTopics.join(' · ') : 'Great consistency — no major weak topics detected.'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:flex-wrap sm:p-6">
          <button type="button" onClick={onRetake} className={btn('primary', 'md', 'h-11')}>
            <RotateCcw aria-hidden="true" />
            Try Again
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('answer-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className={btn('secondary', 'md', 'h-11')}
          >
            <ListChecks aria-hidden="true" />
            Review Answers
          </button>
          {onNewSet && (
            <button type="button" onClick={onNewSet} className={btn('outline', 'md', 'h-11')}>
              <Shuffle aria-hidden="true" />
              New questions, same settings
            </button>
          )}
          <button type="button" onClick={onExit} className={btn('outline', 'md', 'h-11')}>
            <Sparkles aria-hidden="true" />
            {exitLabel}
          </button>
          <Link href="/performance" className={btn('ghost')}>
            <BarChart3 aria-hidden="true" />
            View performance
          </Link>
        </div>
      </div>

      <div id="answer-review" className="mt-10 scroll-mt-20">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-extrabold text-navy">Review Answers</h2>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]" role="group" aria-label="Filter answers">
            {(Object.keys(counts) as ReviewFilter[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                className={cn(
                  'shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors',
                  filter === key ? 'border-navy bg-navy text-white' : 'border-border bg-card text-muted-foreground hover:text-primary',
                )}
              >
                {key} ({counts[key]})
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">No questions in this group.</p>
        ) : (
          <ol className="space-y-4">
            {visible.map(({ q, i, status }) => {
              const selected = answers[i]?.selected
              return (
                <li key={q.id} className={cn(card, 'p-5')}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-navy">Q{i + 1}.</span>
                    <StatusPill status={status} />
                    <DifficultyBadge level={q.difficulty} />
                    <span className="text-xs text-muted-foreground">{q.topic}</span>
                  </div>
                  <p className="mt-3 font-semibold leading-relaxed break-words text-navy">{q.text}</p>
                  <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <div className={cn('rounded-lg px-3 py-2', status === 'correct' ? 'bg-success-soft' : status === 'incorrect' ? 'bg-danger-soft' : 'bg-muted')}>
                      <dt className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Your answer</dt>
                      <dd className={cn('mt-0.5 font-semibold', status === 'correct' ? 'text-success' : status === 'incorrect' ? 'text-destructive' : 'text-muted-foreground')}>
                        {selected === null || selected === undefined ? 'Not answered' : `${LETTERS[selected]}. ${q.options[selected]}`}
                      </dd>
                    </div>
                    <div className="rounded-lg bg-success-soft px-3 py-2">
                      <dt className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Correct answer</dt>
                      <dd className="mt-0.5 font-semibold text-success">
                        {LETTERS[q.correctIndex]}. {q.options[q.correctIndex]}
                      </dd>
                    </div>
                  </dl>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {q.options.map((option, idx) => {
                      const isCorrect = idx === q.correctIndex
                      const isPicked = idx === selected
                      return (
                        <li
                          key={`${q.id}-${idx}`}
                          className={cn(
                            'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm',
                            isCorrect ? 'border-success/40 bg-success-soft text-navy' : isPicked ? 'border-destructive/30 bg-danger-soft text-navy' : 'border-border text-muted-foreground',
                          )}
                        >
                          <span className="font-bold">{LETTERS[idx]}.</span>
                          <span className="min-w-0 flex-1 break-words">{option}</span>
                          {isCorrect && <span className="text-[11px] font-bold text-success">Correct</span>}
                          {isPicked && !isCorrect && <span className="text-[11px] font-bold text-destructive">Your answer</span>}
                        </li>
                      )
                    })}
                  </ul>
                  {q.explanation && (
                    <p className="mt-3 rounded-lg bg-muted px-3 py-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-navy">Explanation: </span>
                      {q.explanation}
                    </p>
                  )}
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}

function StatusPill({ status }: { status: Exclude<ReviewFilter, 'all'> }) {
  const map = {
    correct: 'bg-success-soft text-success',
    incorrect: 'bg-danger-soft text-destructive',
    unanswered: 'bg-muted text-muted-foreground',
  }
  return <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize', map[status])}>{status}</span>
}

function ResultStat({ icon: Icon, label, value, tone }: { icon: typeof Trophy; label: string; value: string; tone: 'primary' | 'success' | 'danger' | 'muted' }) {
  const tones = { primary: 'text-primary', success: 'text-success', danger: 'text-destructive', muted: 'text-muted-foreground' }
  return (
    <div className="rounded-2xl bg-muted p-4">
      <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        <Icon className={cn('size-3.5', tones[tone])} aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 font-heading text-2xl font-extrabold text-navy tabular-nums">{value}</dd>
    </div>
  )
}
