import type { Metadata } from 'next'
import { PyqBrowser } from '@/components/shared/pyq-browser'
import { DemoBadge } from '@/components/site/badges'
import { PageHeader } from '@/components/site/section'
import { PYQ_YEARS, QUESTIONS } from '@/lib/data/questions'
import { getExamBySlug, getExamOptions, getSubjectBySlug, getSubjectOptions } from '@/lib/repository'

export const metadata: Metadata = {
  title: 'Previous Year Questions',
  description: 'Search and filter previous-year style questions by exam, year, subject and difficulty, then practise with explanations.',
}

export default async function PyqPage({ searchParams }: { searchParams: Promise<{ exam?: string; subject?: string }> }) {
  const { exam, subject } = await searchParams
  const initialExam = exam && getExamBySlug(exam) ? exam : ''
  const initialSubject = subject && getSubjectBySlug(subject) ? subject : ''

  return (
    <>
      <PageHeader
        eyebrow="Question bank"
        title="Previous Year Questions"
        description="Search, filter and practise questions in the style of past government exams. Every card reveals the answer and a short explanation."
      >
        <DemoBadge tone="dark" label="Demo questions · real PYQ database coming soon" />
      </PageHeader>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <PyqBrowser
          key={`${initialExam}-${initialSubject}`}
          questions={QUESTIONS}
          exams={getExamOptions()}
          subjects={getSubjectOptions()}
          years={PYQ_YEARS}
          initialExam={initialExam}
          initialSubject={initialSubject}
          pageSize={6}
        />
      </div>
    </>
  )
}
