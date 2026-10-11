import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AppIcon } from '@/components/site/app-icon'
import { Section, SectionHeading } from '@/components/site/section'
import { card, cardHover } from '@/components/site/styles'
import { SUBJECTS } from '@/lib/data/subjects'
import { cn } from '@/lib/utils'

export function SubjectsSection() {
  return (
    <Section id="subjects">
      <SectionHeading align="center" eyebrow="Subjects" title="Practice Every Subject" description="Core subjects that appear across most Indian government exams, organised for focused practice." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {SUBJECTS.map((subject) => (
          <article key={subject.slug} className={cn(card, cardHover, 'group relative flex flex-col p-5')}>
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <AppIcon name={subject.icon} className="size-5" />
            </span>
            <h3 className="mt-4 font-bold text-navy">{subject.name}</h3>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{subject.description}</p>
            <Link
              href={`/ai-quiz?subject=${subject.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-2xl"
            >
              Practice
              <span className="sr-only"> {subject.name}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  )
}
