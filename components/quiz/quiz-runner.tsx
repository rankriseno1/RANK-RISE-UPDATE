'use client'

import { CheckCircle2, ChevronLeft, ChevronRight, Clock3, Eraser, Flag, LayoutGrid, LogOut, XCircle } from 'lucide-react'
import { useCallback, useEffect, useEffectEvent, useRef, useState } from 'react'
import { ProgressBar } from '@/components/shared/charts'
import { useDemoStore } from '@/components/site/demo-store'
import { DifficultyBadge, Tag } from '@/components/site/badges'
import { btn, card } from '@/components/site/styles'
import { computeResult, createAnswerState, formatDuration } from '@/lib/quiz'
import { getSubjectName } from '@/lib/repository'
import type { Question, QuizAnswerState, QuizResult } from '@/lib/types'
import { cn } from '@/lib/utils'
import { QuizResults } from './quiz-results'

const LETTERS = ['A', 'B', 'C', 'D']

export type FeedbackMode = 'instant' | 'end'

export function QuizRunner({
  questions,
  eyebrow,
  title,
  timeLimitSeconds,
  feedback,
  kind,
  onExit,
  onNewSet,
  exitLabel = 'New quiz',
}: {
  questions: Question[]
  eyebrow: string
  title: string
  timeLimitSeconds: number
  /** `instant` reveals the answer once checked; `end` behaves like a real exam. */
  feedback: FeedbackMode
  kind: 'quiz' | 'mock'
  onExit: () => void
  /** Optional: generate a fresh set of questions with the same settings. */
  onNewSet?: () => void
  exitLabel?: string
}) {
  const { recordAttempt } = useDemoStore()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswerState[]>(() => createAnswerState(questions.length))
  const [checked, setChecked] = useState<boolean[]>(() => questions.map(() => false))
  const [secondsLeft, setSecondsLeft] = useState(timeLimitSeconds)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [runId, setRunId] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Keep the latest answers available to the timer without restarting it on every click.
  const answersRef = useRef(answers)
  answersRef.current = answers
  const finishedRef = useRef(false)

  const finish = useCallback(
    (elapsedSeconds: number) => {
      if (finishedRef.current) return
      finishedRef.current = true
      const computed = computeResult(questions, answersRef.current, Math.min(timeLimitSeconds, Math.max(0, elapsedSeconds)))
      setResult(computed)
      setConfirming(false)
      recordAttempt({
        title,
        kind,
        correct: computed.correct,
        incorrect: computed.incorrect,
        unanswered: computed.unanswered,
        total: computed.total,
        accuracy: computed.accuracy,
        score: computed.score,
        timeTakenSeconds: computed.timeTakenSeconds,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [kind, questions, recordAttempt, timeLimitSeconds, title],
  )

  const startedAtRef = useRef(0)
  const finishRef = useRef(finish)
  finishRef.current = finish

  // Deadline-based timer: accurate even if the tab is throttled or the component re-renders.
  useEffect(() => {
    finishedRef.current = false
    startedAtRef.current = Date.now()
    const deadline = startedAtRef.current + timeLimitSeconds * 1000
    setSecondsLeft(timeLimitSeconds)
    const id = window.setInterval(() => {
      if (finishedRef.current) {
        window.clearInterval(id)
        return
      }
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
      setSecondsLeft(left)
      if (left === 0) {
        window.clearInterval(id)
        finishRef.current(timeLimitSeconds)
      }
    }, 250)
    return () => window.clearInterval(id)
  }, [runId, timeLimitSeconds])

  const submitQuiz = () => finish(Math.round((Date.now() - startedAtRef.current) / 1000))

  const retake = () => {
    setCurrent(0)
    setAnswers(createAnswerState(questions.length))
    setChecked(questions.map(() => false))
    setResult(null)
    setConfirming(false)
    setPaletteOpen(false)
    setRunId((n) => n + 1)
    window.scrollTo({ top: 0 })
  }

  if (result) {
    return (
      <QuizResults
        eyebrow={eyebrow}
        title={title}
        questions={questions}
        answers={answers}
        result={result}
        onRetake={retake}
        onNewSet={onNewSet}
        onExit={onExit}
        exitLabel={exitLabel}
      />
    )
  }

  const question = questions[current]
  const answer = answers[current]
  const isLocked = feedback === 'instant' && checked[current]
  const isLast = current === questions.length - 1
  const answeredCount = answers.filter((a) => a.selected !== null).length
  const reviewCount = answers.filter((a) => a.markedForReview).length
  const unansweredCount = questions.length - answeredCount
  const progress = (answeredCount / questions.length) * 100
  const lowTime = secondsLeft <= 60

  const goTo = (index: number) => {
    if (index < 0 || index >= questions.length) return
    setCurrent(index)
    setPaletteOpen(false)
    setAnswers((prev) => prev.map((a, i) => (i === index ? { ...a, visited: true } : a)))
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

  const updateCurrent = (patch: Partial<QuizAnswerState>) => setAnswers((prev) => prev.map((a, i) => (i === current ? { ...a, ...patch } : a)))

  const choose = (index: number) => {
    if (isLocked) return
    updateCurrent({ selected: index })
  }

  const checkAnswer = () => setChecked((prev) => prev.map((s, i) => (i === current ? true : s)))

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-4 pb-10 sm:px-6 md:pt-8 lg:px-8">
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-[0.14em] text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-1 text-base font-bold text-pretty text-navy sm:text-xl">{title}</h1>
      </div>

      <div className="sticky top-16 z-30 -mx-4 mt-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-sm font-bold text-navy tabular-nums">
            Question {current + 1}
            <span className="font-medium text-muted-foreground"> / {questions.length}</span>
          </p>
          <div className="min-w-0 flex-1">
            <ProgressBar value={progress} label={`${answeredCount} of ${questions.length} answered`} />
          </div>
          <div
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-2.5 py-1.5 font-heading text-sm font-bold tabular-nums',
              lowTime ? 'border-destructive/30 bg-danger-soft text-destructive' : 'border-border bg-card text-navy',
            )}
            role="timer"
            aria-live="off"
            aria-label={`Time left ${formatDuration(secondsLeft)}`}
          >
            <Clock3 className="size-4" aria-hidden="true" />
            {formatDuration(secondsLeft)}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-5 lg:mt-2 lg:grid-cols-[1fr_17rem]">
        <article className={cn(card, 'min-w-0 p-4 sm:p-7')}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-navy">Q{current + 1}.</span>
            <Tag>{getSubjectName(question.subjectSlug)}</Tag>
            <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{question.topic}</span>
            <DifficultyBadge level={question.difficulty} />
          </div>
          <h2 ref={headingRef} tabIndex={-1} className="mt-4 scroll-mt-36 text-base leading-relaxed font-bold text-pretty break-words text-navy outline-none sm:mt-5 sm:text-xl">
            {question.text}
          </h2>

          <fieldset className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
            <legend className="sr-only">Choose an answer</legend>
            {question.options.map((option, index) => {
              const selected = answer.selected === index
              const isCorrect = index === question.correctIndex
              const state = isLocked ? (isCorrect ? 'correct' : selected ? 'wrong' : 'idle') : selected ? 'selected' : 'idle'
              return (
                <button
                  key={`${question.id}-${index}`}
                  type="button"
                  onClick={() => choose(index)}
                  aria-pressed={selected}
                  disabled={isLocked}
                  className={cn(
                    'flex min-h-12 w-full items-center gap-3 rounded-xl border p-3 text-left transition-all disabled:cursor-default sm:p-4',
                    state === 'selected' && 'border-primary bg-primary-soft ring-1 ring-primary',
                    state === 'correct' && 'border-success bg-success-soft',
                    state === 'wrong' && 'border-destructive bg-danger-soft',
                    state === 'idle' && 'border-border hover:border-primary/40 hover:bg-muted/60',
                    isLocked && state === 'idle' && 'opacity-60 hover:border-border hover:bg-transparent',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold',
                      state === 'selected' && 'border-primary bg-primary text-white',
                      state === 'correct' && 'border-success bg-success text-white',
                      state === 'wrong' && 'border-destructive bg-destructive text-white',
                      state === 'idle' && 'border-border bg-muted text-navy',
                    )}
                  >
                    {LETTERS[index]}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium break-words text-navy sm:text-base">{option}</span>
                  {state === 'correct' && <CheckCircle2 className="size-5 shrink-0 text-success" aria-label="Correct answer" />}
                  {state === 'wrong' && <XCircle className="size-5 shrink-0 text-destructive" aria-label="Your answer, incorrect" />}
                </button>
              )
            })}
          </fieldset>

          {isLocked && (
            <div role="status" className={cn('mt-5 rounded-xl p-4 text-sm leading-relaxed', answer.selected === question.correctIndex ? 'bg-success-soft' : 'bg-danger-soft')}>
              <p className={cn('font-bold', answer.selected === question.correctIndex ? 'text-success' : 'text-destructive')}>
                {answer.selected === question.correctIndex ? 'Correct! +4 marks' : `Incorrect — the answer is ${LETTERS[question.correctIndex]}. −1 mark`}
              </p>
              <p className="mt-1 text-navy/80">{question.explanation}</p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => updateCurrent({ markedForReview: !answer.markedForReview })}
              aria-pressed={answer.markedForReview}
              className={btn('outline', 'sm', cn(answer.markedForReview && 'border-warning/50 bg-warning-soft text-warning'))}
            >
              <Flag className={cn(answer.markedForReview && 'fill-current')} aria-hidden="true" />
              {answer.markedForReview ? 'Marked for review' : 'Mark for review'}
            </button>
            {answer.selected !== null && !isLocked && (
              <button type="button" onClick={() => updateCurrent({ selected: null })} className={btn('ghost', 'sm', 'text-muted-foreground')}>
                <Eraser aria-hidden="true" />
                Clear answer
              </button>
            )}
            {feedback === 'instant' && !isLocked && (
              <button type="button" disabled={answer.selected === null} onClick={checkAnswer} className={btn('secondary', 'sm', 'sm:ml-auto')}>
                <CheckCircle2 aria-hidden="true" />
                Check answer
              </button>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border pt-5 sm:flex sm:justify-between">
            <button type="button" className={btn('outline', 'md', 'h-12 sm:h-11')} disabled={current === 0} onClick={() => goTo(current - 1)}>
              <ChevronLeft aria-hidden="true" />
              Previous
            </button>
            {isLast ? (
              <button type="button" className={btn('primary', 'md', 'h-12 sm:h-11')} onClick={() => setConfirming(true)}>
                <CheckCircle2 aria-hidden="true" />
                Submit Quiz
              </button>
            ) : (
              <button type="button" className={btn('primary', 'md', 'h-12 sm:h-11')} onClick={() => goTo(current + 1)}>
                Next
                <ChevronRight aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setPaletteOpen((v) => !v)}
            aria-expanded={paletteOpen}
            aria-controls="question-palette"
            className={btn('ghost', 'md', 'mt-2 h-11 w-full lg:hidden')}
          >
            <LayoutGrid aria-hidden="true" />
            {paletteOpen ? 'Hide question palette' : 'Show question palette'}
          </button>
        </article>

        <aside
          id="question-palette"
          className={cn(card, 'h-fit p-4 lg:sticky lg:top-20 lg:block', paletteOpen ? 'block' : 'hidden')}
          aria-label="Question palette"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-navy">Question palette</p>
            <span className="text-xs text-muted-foreground tabular-nums">
              {answeredCount}/{questions.length} answered
            </span>
          </div>
          <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-10 lg:grid-cols-5">
            {questions.map((q, index) => {
              const item = answers[index]
              const revealed = feedback === 'instant' && checked[index]
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Question ${index + 1}${item.selected !== null ? ', answered' : ', not answered'}${item.markedForReview ? ', marked for review' : ''}`}
                  aria-current={index === current ? 'step' : undefined}
                  className={cn(
                    'relative flex aspect-square min-h-10 items-center justify-center rounded-lg border text-xs font-bold transition-colors',
                    index === current
                      ? 'border-primary bg-primary text-white'
                      : revealed
                        ? item.selected === q.correctIndex
                          ? 'border-success/40 bg-success-soft text-success'
                          : 'border-destructive/30 bg-danger-soft text-destructive'
                        : item.selected !== null
                          ? 'border-primary/30 bg-primary-soft text-primary'
                          : 'border-border bg-muted text-navy hover:border-primary/40',
                  )}
                >
                  {index + 1}
                  {item.markedForReview && <span className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-card bg-warning" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-muted-foreground">
            <Legend className="bg-primary-soft ring-1 ring-primary/30" label="Answered" />
            <Legend className="bg-muted ring-1 ring-border" label="Not answered" />
            <Legend className="bg-warning" label={`For review (${reviewCount})`} round />
            <Legend className="bg-primary" label="Current" />
          </ul>
          <div className="mt-4 grid gap-2 border-t border-border pt-4">
            <button type="button" className={btn('secondary', 'md', 'w-full')} onClick={() => setConfirming(true)}>
              <CheckCircle2 aria-hidden="true" />
              Submit Quiz
            </button>
            <button type="button" className={btn('ghost', 'sm', 'w-full text-muted-foreground')} onClick={onExit}>
              <LogOut aria-hidden="true" />
              Exit without saving
            </button>
          </div>
        </aside>
      </div>

      {confirming && (
        <SubmitDialog
          answered={answeredCount}
          unanswered={unansweredCount}
          review={reviewCount}
          onCancel={() => setConfirming(false)}
          onConfirm={submitQuiz}
        />
      )}
    </section>
  )
}

function SubmitDialog({
  answered,
  unanswered,
  review,
  onCancel,
  onConfirm,
}: {
  answered: number
  unanswered: number
  review: number
  onCancel: () => void
  onConfirm: () => void
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  // The parent re-renders every timer tick; keep the latest handler without re-running the mount effect.
  const cancel = useEffectEvent(onCancel)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Submitting is irreversible, so the safe action receives initial focus.
    cancelRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        cancel()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true })
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/50 p-4 backdrop-blur-sm sm:items-center" onClick={onCancel}>
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="submit-title"
        aria-describedby="submit-desc"
        className={cn(card, 'w-full max-w-sm p-6')}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="submit-title" className="text-lg font-bold text-navy">
          Submit quiz?
        </h2>
        <p id="submit-desc" className="mt-1 text-sm text-muted-foreground">
          {unanswered > 0 ? `You still have ${unanswered} unanswered ${unanswered === 1 ? 'question' : 'questions'}.` : 'All questions are answered.'} You can’t change answers after submitting.
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { label: 'Answered', value: answered, tone: 'text-primary' },
            { label: 'Unanswered', value: unanswered, tone: 'text-navy' },
            { label: 'For review', value: review, tone: 'text-warning' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col-reverse rounded-xl bg-muted p-2.5">
              <dt className="text-[11px] font-medium text-muted-foreground">{s.label}</dt>
              <dd className={cn('font-heading text-xl font-extrabold tabular-nums', s.tone)}>{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button ref={cancelRef} type="button" onClick={onCancel} className={btn('outline', 'md', 'h-11')}>
            Keep going
          </button>
          <button type="button" onClick={onConfirm} className={btn('primary', 'md', 'h-11')}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

function Legend({ className, label, round }: { className: string; label: string; round?: boolean }) {
  return (
    <li className="flex items-center gap-1.5">
      <span className={cn('size-3 shrink-0', round ? 'rounded-full' : 'rounded', className)} aria-hidden="true" />
      {label}
    </li>
  )
}
