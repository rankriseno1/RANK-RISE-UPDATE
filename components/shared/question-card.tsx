'use client'

import { Bookmark, CircleCheck, CircleX, Lightbulb, Play, RotateCcw, Timer } from 'lucide-react'
import { useState } from 'react'
import { DifficultyBadge, Tag } from '@/components/site/badges'
import { btn, card, cardHover } from '@/components/site/styles'
import { useToast } from '@/components/site/toast-provider'
import type { Question } from '@/lib/types'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D']

export function QuestionCard({
  question,
  examName,
  subjectName,
  onQuizPractice,
}: {
  question: Question
  examName: string
  subjectName: string
  /** Opens the timed quiz runner starting from this question. */
  onQuizPractice?: () => void
}) {
  const [practicing, setPracticing] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const { comingSoon } = useToast()
  const answered = selected !== null
  const correct = selected === question.correctIndex

  return (
    <article className={cn(card, cardHover, 'flex flex-col p-5 hover:translate-y-0')}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag className="bg-primary-soft text-primary">{examName}</Tag>
        <Tag>{question.year}</Tag>
        <Tag>{subjectName}</Tag>
        <DifficultyBadge level={question.difficulty} />
        <span className="ml-auto text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Demo</span>
      </div>

      <h3 className="mt-4 text-base leading-relaxed font-semibold text-pretty text-navy">{question.text}</h3>
      <p className="mt-1 text-xs text-muted-foreground">Topic: {question.topic}</p>

      {practicing && (
        <div className="mt-4 animate-in duration-300 fade-in slide-in-from-top-1">
          <fieldset>
            <legend className="sr-only">Choose an answer</legend>
            <div className="grid gap-2">
              {question.options.map((option, i) => {
                const isCorrect = i === question.correctIndex
                const isPicked = i === selected
                return (
                  <button
                    key={`${question.id}-${i}`}
                    type="button"
                    disabled={answered}
                    onClick={() => setSelected(i)}
                    aria-pressed={isPicked}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all',
                      !answered && 'border-border hover:border-primary/50 hover:bg-primary-soft',
                      answered && isCorrect && 'border-success/50 bg-success-soft text-success',
                      answered && isPicked && !isCorrect && 'border-destructive/40 bg-danger-soft text-destructive',
                      answered && !isCorrect && !isPicked && 'border-border opacity-60',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold',
                        answered && isCorrect ? 'border-success bg-success text-white' : answered && isPicked ? 'border-destructive bg-destructive text-white' : 'border-border bg-muted text-navy',
                      )}
                    >
                      {LETTERS[i]}
                    </span>
                    <span className="flex-1 font-medium">{option}</span>
                    {answered && isCorrect && <CircleCheck className="size-4.5" aria-label="Correct answer" />}
                    {answered && isPicked && !isCorrect && <CircleX className="size-4.5" aria-label="Your answer" />}
                  </button>
                )
              })}
            </div>
          </fieldset>

          {answered && (
            <div role="status" className={cn('mt-3 flex gap-3 rounded-xl p-3.5 text-sm', correct ? 'bg-success-soft' : 'bg-warning-soft')}>
              <Lightbulb className={cn('mt-0.5 size-4.5 shrink-0', correct ? 'text-success' : 'text-warning')} aria-hidden="true" />
              <div>
                <p className="font-semibold text-navy">{correct ? 'Correct!' : 'Not quite.'}</p>
                <p className="mt-0.5 text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
        {!practicing ? (
          <button type="button" onClick={() => setPracticing(true)} className={btn('primary', 'sm')}>
            <Play aria-hidden="true" />
            Practice
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSelected(null)
              if (!answered) setPracticing(false)
            }}
            className={btn('outline', 'sm')}
          >
            <RotateCcw aria-hidden="true" />
            {answered ? 'Try again' : 'Hide'}
          </button>
        )}
        {onQuizPractice && (
          <button type="button" onClick={onQuizPractice} className={btn('outline', 'sm')}>
            <Timer aria-hidden="true" />
            <span>
              Quiz<span className="hidden sm:inline"> mode</span>
            </span>
          </button>
        )}
        <button type="button" onClick={() => comingSoon('Bookmarks')} className={btn('ghost', 'sm', 'ml-auto text-muted-foreground')} aria-label="Bookmark question">
          <Bookmark aria-hidden="true" />
          <span className="hidden sm:inline">Save</span>
        </button>
      </div>
    </article>
  )
}
