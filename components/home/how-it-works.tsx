import { BookOpenCheck, ChartLine, Crosshair, ListChecks } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/section'
import { card } from '@/components/site/styles'
import { cn } from '@/lib/utils'

const STEPS = [
  { n: '01', icon: Crosshair, title: 'Choose Your Exam', body: 'Select the exam you are preparing for so practice follows its pattern and syllabus.' },
  { n: '02', icon: ListChecks, title: 'Select Your Subject', body: 'Focus on one subject at a time, or mix subjects for a full-length feel.' },
  { n: '03', icon: BookOpenCheck, title: 'Practice Smart Questions', body: 'Solve previous-year and high-priority concept questions with instant explanations.' },
  { n: '04', icon: ChartLine, title: 'Track Your Improvement', body: 'See accuracy, streaks and weak topics so you know exactly what to revise next.' },
]

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="muted">
      <SectionHeading align="center" eyebrow="How it works" title="How Rank Rise Works" description="A simple, focused loop designed to turn daily practice into measurable progress." />
      <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" aria-hidden="true" />
        {STEPS.map((step, i) => (
          <li key={step.n} className={cn(card, 'relative p-6')}>
            <div className="flex items-center justify-between">
              <span className={cn('flex size-12 items-center justify-center rounded-2xl', i === 3 ? 'bg-navy text-highlight' : 'bg-primary text-primary-foreground')}>
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-4xl font-extrabold text-primary/15">{step.n}</span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-navy">
              <span className="sr-only">Step {step.n}: </span>
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
