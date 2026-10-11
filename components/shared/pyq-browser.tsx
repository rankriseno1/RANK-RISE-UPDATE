'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Search, SlidersHorizontal, Timer, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { QuizRunner } from '@/components/quiz/quiz-runner'
import { DemoBadge } from '@/components/site/badges'
import { btn, card, inputClass } from '@/components/site/styles'
import { filterQuestions } from '@/lib/repository'
import type { Difficulty, Question } from '@/lib/types'
import { cn } from '@/lib/utils'
import { EmptyState } from './empty-state'
import { QuestionCard } from './question-card'
import { SelectField } from './select-field'

interface Option {
  value: string
  label: string
}

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']
const MAX_PRACTICE = 30

export function PyqBrowser({
  questions,
  exams,
  subjects,
  years,
  variant = 'full',
  pageSize = 6,
  initialExam = '',
  initialSubject = '',
}: {
  questions: Question[]
  exams: Option[]
  subjects: Option[]
  years: number[]
  variant?: 'full' | 'compact'
  pageSize?: number
  initialExam?: string
  initialSubject?: string
}) {
  const [query, setQuery] = useState('')
  const [exam, setExam] = useState(initialExam)
  const [year, setYear] = useState('')
  const [subject, setSubject] = useState(initialSubject)
  const [difficulty, setDifficulty] = useState('')
  const [page, setPage] = useState(1)

  const examNames = useMemo(() => Object.fromEntries(exams.map((e) => [e.value, e.label])), [exams])
  const subjectNames = useMemo(() => Object.fromEntries(subjects.map((s) => [s.value, s.label])), [subjects])

  const filtered = useMemo(
    () =>
      filterQuestions(questions, {
        query: variant === 'full' ? query : undefined,
        examSlug: exam || undefined,
        year: year ? Number(year) : undefined,
        subjectSlug: subject || undefined,
        difficulty: (difficulty || undefined) as Difficulty | undefined,
      }),
    [questions, query, exam, year, subject, difficulty, variant],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const hasFilters = Boolean(query || exam || year || subject || difficulty)

  const withReset = (setter: (v: string) => void) => (v: string) => {
    setter(v)
    setPage(1)
  }

  const resetAll = () => {
    setQuery('')
    setExam('')
    setYear('')
    setSubject('')
    setDifficulty('')
    setPage(1)
  }

  const [practiceSet, setPracticeSet] = useState<Question[] | null>(null)
  const [practiceRun, setPracticeRun] = useState(0)

  const startPractice = (set: Question[]) => {
    setPracticeSet(set.slice(0, MAX_PRACTICE))
    setPracticeRun((n) => n + 1)
    window.scrollTo({ top: 0 })
  }

  if (practiceSet) {
    return (
      <QuizRunner
        key={practiceRun}
        questions={practiceSet}
        eyebrow="Previous Year Questions · Practice"
        title={practiceSet.length === 1 ? 'Single question practice' : `PYQ practice · ${practiceSet.length} questions`}
        timeLimitSeconds={Math.max(120, practiceSet.length * 60)}
        feedback="end"
        kind="quiz"
        onExit={() => {
          setPracticeSet(null)
          window.scrollTo({ top: 0 })
        }}
        exitLabel="Back to questions"
      />
    )
  }

  return (
    <div>
      <div className={cn(card, 'p-4 md:p-5')}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-navy">
            <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
            Filter questions
          </p>
          <DemoBadge label="Demo questions" />
        </div>

        {variant === 'full' && (
          <div className="relative mb-3">
            <label htmlFor="pyq-search" className="sr-only">
              Search questions
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="pyq-search"
              type="search"
              value={query}
              onChange={(e) => withReset(setQuery)(e.target.value)}
              placeholder="Search by keyword or topic, e.g. 'Article', 'repo rate'"
              className={cn(inputClass, 'pl-10')}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <SelectField label="Exam" value={exam} onChange={withReset(setExam)} options={[{ value: '', label: 'All exams' }, ...exams]} />
          <SelectField
            label="Year"
            value={year}
            onChange={withReset(setYear)}
            options={[{ value: '', label: 'All years' }, ...years.map((y) => ({ value: String(y), label: String(y) }))]}
          />
          <SelectField label="Subject" value={subject} onChange={withReset(setSubject)} options={[{ value: '', label: 'All subjects' }, ...subjects]} />
          <SelectField
            label="Difficulty"
            value={difficulty}
            onChange={withReset(setDifficulty)}
            options={[{ value: '', label: 'Any difficulty' }, ...DIFFICULTIES.map((d) => ({ value: d, label: d }))]}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-navy">{filtered.length}</span> {filtered.length === 1 ? 'question' : 'questions'} found
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {hasFilters && (
              <button type="button" onClick={resetAll} className="inline-flex min-h-9 items-center gap-1 font-semibold text-primary hover:underline">
                <X className="size-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
            {variant === 'full' && filtered.length > 0 && (
              <button type="button" onClick={() => startPractice(filtered)} className={btn('primary', 'sm')}>
                <Timer aria-hidden="true" />
                Practice {Math.min(filtered.length, MAX_PRACTICE)} as quiz
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        {visible.length === 0 ? (
          <EmptyState
            title="No questions match these filters"
            description="Try removing a filter or searching for a different keyword. More questions will be added as the database grows."
            action={
              <button type="button" onClick={resetAll} className={btn('outline', 'sm')}>
                Reset filters
              </button>
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {visible.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                examName={examNames[q.examSlug] ?? q.examSlug}
                subjectName={subjectNames[q.subjectSlug] ?? q.subjectSlug}
                onQuizPractice={variant === 'full' ? () => startPractice([q, ...filtered.filter((f) => f.id !== q.id)]) : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {variant === 'full' && totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={btn('outline', 'sm', 'px-2.5')}
            aria-label="Previous page"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === currentPage ? 'page' : undefined}
              className={cn(btn(n === currentPage ? 'primary' : 'outline', 'sm', 'min-w-9 px-2.5'), n === currentPage && 'hover:translate-y-0')}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={btn('outline', 'sm', 'px-2.5')}
            aria-label="Next page"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </nav>
      )}

      {variant === 'compact' && (
        <div className="mt-8 flex justify-center">
          <Link href="/previous-year-questions" className={btn('outline', 'md')}>
            View all previous year questions
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  )
}
