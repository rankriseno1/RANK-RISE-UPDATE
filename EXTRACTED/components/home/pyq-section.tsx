import { PyqBrowser } from '@/components/shared/pyq-browser'
import { Section, SectionHeading } from '@/components/site/section'
import { PYQ_YEARS, QUESTIONS } from '@/lib/data/questions'
import { getExamOptions, getSubjectOptions } from '@/lib/repository'

export function PyqSection() {
  return (
    <Section id="pyq">
      <SectionHeading
        eyebrow="Question bank"
        title={
          <>
            <span aria-hidden="true">📚 </span>Previous Year Questions
          </>
        }
        description="Filter by exam, year, subject and difficulty, then practice instantly with explanations. Sample questions shown below are for demonstration."
      />
      <PyqBrowser questions={QUESTIONS} exams={getExamOptions()} subjects={getSubjectOptions()} years={PYQ_YEARS} variant="compact" pageSize={4} />
    </Section>
  )
}
