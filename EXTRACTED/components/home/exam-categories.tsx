import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ExamCard } from '@/components/shared/exam-card'
import { Section, SectionHeading } from '@/components/site/section'
import { btn } from '@/components/site/styles'
import { HOME_EXAM_CARDS } from '@/lib/data/exams'

export function ExamCategories() {
  return (
    <Section id="exams">
      <SectionHeading
        eyebrow="Exams"
        title="Prepare for Your Target Exam"
        description="Pick your exam to get subject-wise practice, previous-year questions and topic priorities shaped around its pattern."
        action={
          <Link href="/exams" className={btn('outline', 'md')}>
            View all exams
            <ArrowRight aria-hidden="true" />
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {HOME_EXAM_CARDS.map((exam) => (
          <ExamCard key={exam.title} {...exam} />
        ))}
      </div>
    </Section>
  )
}
