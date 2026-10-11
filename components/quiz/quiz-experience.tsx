'use client'

import { BookOpenCheck, Clock3, ListChecks, Sparkles, Target, Zap } from 'lucide-react'
import { useState } from 'react'
import { SelectField } from '@/components/shared/select-field'
import { DemoBadge } from '@/components/site/badges'
import { btn, card } from '@/components/site/styles'
import { getQuestionCountOptions, getTimeLimitSeconds, resolveQuestionCount } from '@/lib/quiz'
import { buildQuiz, getAvailableQuestionCount, getExamName, getSubjectName } from '@/lib/repository'
import type { Difficulty, Question, QuizConfig, QuizQuestionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { type FeedbackMode, QuizRunner } from './quiz-runner'

type Option = { value: string; label: string }

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']

interface Attempt {
  id: number
  questions: Question[]
  config: QuizConfig
  feedback: FeedbackMode
}

export function QuizExperience({
  exams,
  subjects,
  isDaily,
  initialConfig,
}: {
  exams: Option[]
  subjects: Option[]
  isDaily: boolean
  initialConfig: QuizConfig
}) {
  const [config, setConfig] = useState<QuizConfig>(initialConfig)
  const [feedback, setFeedback] = useState<FeedbackMode>('instant')
  const [attempt, setAttempt] = useState<Attempt | null>(null)

  const update = <K extends keyof QuizConfig>(key: K, value: QuizConfig[K]) => setConfig((prev) => ({ ...prev, [key]: value }))

  const available = getAvailableQuestionCount(config)
  const countOptions = getQuestionCountOptions(available)
  const questionCount = resolveQuestionCount(config.count, available)

  const launch = (quizConfig: QuizConfig, feedbackMode: FeedbackMode) => {
    const count = resolveQuestionCount(quizConfig.count, getAvailableQuestionCount(quizConfig))
    if (count === 0) return
    const seed = Math.floor(Math.random() * 1_000_000)
    const resolved = { ...quizConfig, count }
    setAttempt({ id: seed, questions: buildQuiz(resolved, seed), config: resolved, feedback: feedbackMode })
    window.scrollTo({ top: 0 })
  }

  const start = () => launch(config, feedback)

  if (attempt) {
    const { config: c } = attempt
    const subjectLabel = c.subjectSlug === 'mixed' ? 'Mixed subjects' : getSubjectName(c.subjectSlug)
    return (
      <QuizRunner
        key={attempt.id}
        questions={attempt.questions}
        eyebrow={isDaily ? 'Daily Challenge' : 'AI Quiz'}
        title={`${getExamName(c.examSlug)} · ${subjectLabel} · ${c.difficulty}`}
        timeLimitSeconds={getTimeLimitSeconds(attempt.questions.length)}
        feedback={attempt.feedback}
        kind="quiz"
        onExit={() => setAttempt(null)}
        onNewSet={() => launch(attempt.config, attempt.feedback)}
        exitLabel="Change quiz settings"
      />
    )
  }

  const minutes = Math.round(getTimeLimitSeconds(questionCount) / 60)

  return (
    <>
      <header className="relative overflow-hidden bg-hero text-white">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 pb-24 sm:px-6 md:pt-16 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
            <Sparkles className="size-3.5 text-highlight" aria-hidden="true" />
            {isDaily ? 'Daily Challenge' : 'AI Quiz'}
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold text-balance md:text-5xl">{isDaily ? 'Today’s Rank Rise Challenge' : 'Build your smart practice quiz'}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            {isDaily
              ? 'A quick mixed quiz to keep your preparation streak alive. Choose your exam and go.'
              : 'Pick your exam, subject, difficulty and length. Questions are matched to your exam pattern from the Rank Rise question bank.'}
          </p>
          <DemoBadge tone="dark" className="mt-5" label="Demo · local question bank, no live AI calls" />
        </div>
      </header>

      <section className="mx-auto -mt-14 w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className={cn(card, 'relative p-5 sm:p-7')}>
          <h2 className="text-lg font-bold text-navy">Quiz settings</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField label="Select Exam" value={config.examSlug} onChange={(v) => update('examSlug', v)} options={exams} />
            <SelectField label="Select Subject" value={config.subjectSlug} onChange={(v) => update('subjectSlug', v)} options={[{ value: 'mixed', label: 'Mixed subjects' }, ...subjects]} />
            {!isDaily && (
              <SelectField
                label="Question type"
                value={config.type}
                onChange={(v) => update('type', v as QuizQuestionType)}
                options={[
                  { value: 'mixed', label: 'Mixed' },
                  { value: 'pyq', label: 'Previous Year' },
                  { value: 'concepts', label: 'Important Concepts' },
                ]}
              />
            )}
            <SelectField
              label="Answer feedback"
              value={feedback}
              onChange={(v) => setFeedback(v as FeedbackMode)}
              options={[
                { value: 'instant', label: 'Instant (practice)' },
                { value: 'end', label: 'At the end (exam)' },
              ]}
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ChoiceGroup label="Difficulty" value={config.difficulty} options={DIFFICULTIES} onChange={(v) => update('difficulty', v)} />
            <div>
              <ChoiceGroup
                label="Number of Questions"
                value={questionCount}
                options={countOptions}
                onChange={(v) => update('count', v)}
                render={(v) => (v === available && countOptions.length > 1 ? `All ${v}` : `${v} ${v === 1 ? 'question' : 'questions'}`)}
              />
              <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
                {available} {available === 1 ? 'question' : 'questions'} available in the demo bank for this exam and subject.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-4 rounded-2xl bg-muted/70 p-5 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy">
              <li className="flex items-center gap-2">
                <ListChecks className="size-4 text-primary" aria-hidden="true" />
                {questionCount} {questionCount === 1 ? 'question' : 'questions'}
              </li>
              <li className="flex items-center gap-2">
                <Clock3 className="size-4 text-primary" aria-hidden="true" />
                {minutes} minutes
              </li>
              <li className="flex items-center gap-2">
                <Target className="size-4 text-primary" aria-hidden="true" />
                +4 correct · −1 wrong
              </li>
            </ul>
            <button type="button" onClick={start} disabled={questionCount === 0} className={btn('primary', 'lg', 'w-full md:w-auto')}>
              <Zap aria-hidden="true" />
              Start Quiz
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Target, title: 'Exam-matched', body: 'Questions are ranked by your exam’s subjects and difficulty.' },
            { icon: BookOpenCheck, title: 'Instant explanations', body: 'Submit each answer to see why it is right or wrong.' },
            { icon: ListChecks, title: 'Full review', body: 'Finish to see your score, accuracy and every answer.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-navy">{title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function ChoiceGroup<T extends string | number>({
  label,
  value,
  options,
  onChange,
  render = (v) => String(v),
}: {
  label: string
  value: T
  options: T[]
  onChange: (v: T) => void
  render?: (v: T) => string
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <p className="mb-2 text-xs font-semibold text-navy">{label}</p>
      <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" style={options.length === 4 ? { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' } : undefined}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={cn(
              'h-11 rounded-xl border px-4 text-sm font-semibold transition-colors',
              value === option ? 'border-primary bg-primary-soft text-primary ring-1 ring-primary' : 'border-border bg-card text-navy hover:border-primary/40',
            )}
          >
            {render(option)}
          </button>
        ))}
      </div>
    </div>
  )
}
