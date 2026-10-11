import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, Layers, Play, Sparkles, Target } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AppIcon } from '@/components/site/app-icon'
import { DemoBadge, DifficultyBadge } from '@/components/site/badges'
import { btn, card, cardHover } from '@/components/site/styles'
import { EmptyState } from '@/components/shared/empty-state'
import { QuestionCard } from '@/components/shared/question-card'
import { getExamBySlug, getExams, getQuestions, getSubjectBySlug, getSubjectName } from '@/lib/repository'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return getExams().map((exam) => ({ slug: exam.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const exam = getExamBySlug(slug)
  if (!exam) return { title: 'Exam not found' }
  return { title: `${exam.shortName} Preparation`, description: exam.description }
}

export default async function ExamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const exam = getExamBySlug(slug)
  if (!exam) notFound()

  const subjects = exam.subjectSlugs.map(getSubjectBySlug).filter((s) => s !== undefined)
  const examQuestions = getQuestions({ examSlug: exam.slug }).slice(0, 4)

  return (
    <>
      <header className="relative overflow-hidden bg-hero text-white">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-10 pb-12 sm:px-6 md:pt-14 md:pb-16 lg:px-8">
          <Link href="/exams" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All exams
          </Link>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-highlight md:size-16">
                <AppIcon name={exam.icon} className="size-7" />
              </span>
              <div>
                <div className="flex flex-wrap gap-2">
                  {exam.categories.map((c) => (
                    <span key={c} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/80">
                      {c}
                    </span>
                  ))}
                </div>
                <h1 className="mt-2 text-3xl font-extrabold text-balance md:text-5xl">{exam.shortName}</h1>
                <p className="mt-1 text-white/70">{exam.name}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-white/80">{exam.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href={`/ai-quiz?exam=${exam.slug}&type=mixed`} className={btn('light', 'lg')}>
                <Play aria-hidden="true" />
                Start Quiz
              </Link>
              <Link href={`/previous-year-questions?exam=${exam.slug}`} className={btn('outline-light', 'lg')}>
                Previous Year Questions
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1fr_340px] lg:px-8">
        <div className="space-y-6">
          <section className={cn(card, 'p-6')} aria-labelledby="overview">
            <h2 id="overview" className="flex items-center gap-2 text-xl font-bold text-navy">
              <BookOpen className="size-5 text-primary" aria-hidden="true" />
              Preparation overview
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{exam.overview}</p>
            <h3 className="mt-6 text-sm font-bold text-navy">Exam stages</h3>
            <ol className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {exam.stages.map((stage, i) => (
                <li key={stage} className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm font-medium text-navy">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  {stage}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="subjects">
            <h2 id="subjects" className="flex items-center gap-2 text-xl font-bold text-navy">
              <Layers className="size-5 text-primary" aria-hidden="true" />
              Practice by Subject
            </h2>
            <p className="mt-1 mb-4 text-sm text-muted-foreground">Pick a subject to start a focused {exam.shortName} practice quiz.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {subjects.map((s) => (
                <Link
                  key={s.slug}
                  href={`/ai-quiz?exam=${exam.slug}&subject=${s.slug}`}
                  className={cn(card, cardHover, 'group flex items-center gap-3 p-4')}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <AppIcon name={s.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-navy">{s.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{s.topics.slice(0, 3).join(' · ')}</span>
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="pyq">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 id="pyq" className="flex items-center gap-2 text-xl font-bold text-navy">
                <GraduationCap className="size-5 text-primary" aria-hidden="true" />
                Previous Year Questions
              </h2>
              <DemoBadge label="Demo questions" />
            </div>
            {examQuestions.length ? (
              <div className="grid gap-4">
                {examQuestions.map((q) => (
                  <QuestionCard key={q.id} question={q} examName={exam.shortName} subjectName={getSubjectName(q.subjectSlug)} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Questions coming soon"
                description={`Previous-year questions for ${exam.shortName} will appear here once the question bank is connected.`}
                action={
                  <Link href={`/ai-quiz?exam=${exam.slug}`} className={btn('primary', 'sm')}>
                    Try a practice quiz
                  </Link>
                }
              />
            )}
            <Link href={`/previous-year-questions?exam=${exam.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Browse all {exam.shortName} questions
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className={cn(card, 'p-6')}>
            <h2 className="text-sm font-bold text-navy">At a glance</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Difficulty</dt>
                <dd>
                  <DifficultyBadge level={exam.difficulty} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Subjects</dt>
                <dd className="font-semibold text-navy">{subjects.length}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Eligibility</dt>
                <dd className="mt-1 font-medium text-navy">{exam.eligibility}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">Always confirm eligibility and pattern from the official notification.</p>
          </div>

          <div className={cn(card, 'p-6')}>
            <h2 className="flex items-center gap-2 text-sm font-bold text-navy">
              <Target className="size-4 text-primary" aria-hidden="true" />
              Important Topics
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {exam.importantTopics.map((t) => (
                <li key={t} className="rounded-lg bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">Based on demo trend data. Not a guaranteed prediction.</p>
          </div>

          <div className="rounded-2xl bg-hero p-6 text-white">
            <Sparkles className="size-5 text-highlight" aria-hidden="true" />
            <p className="mt-3 font-bold">AI Quiz for {exam.shortName}</p>
            <p className="mt-1 text-sm text-white/70">Mix previous-year and important-concept questions in one timed session.</p>
            <div className="mt-5 grid gap-2">
              <Link href={`/ai-quiz?exam=${exam.slug}&type=mixed`} className={btn('light', 'md', 'w-full')}>
                <Play aria-hidden="true" />
                Start Quiz
              </Link>
              <Link href={`/ai-quiz?exam=${exam.slug}&type=concepts`} className={btn('outline-light', 'md', 'w-full')}>
                Practice important concepts
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
