'use client'

import { Flame, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DifficultyBadge } from '@/components/site/badges'
import { card, inputClass } from '@/components/site/styles'
import { EmptyState } from '@/components/shared/empty-state'
import { ExamCard } from '@/components/shared/exam-card'
import type { EXAM_SECTORS, ExamSector } from '@/lib/data/exams'
import type { Exam } from '@/lib/types'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'popular' | ExamSector
type Sector = (typeof EXAM_SECTORS)[number]

export function ExamsExplorer({
  exams,
  sectors,
  initialSector,
  initialQuery = '',
}: {
  exams: Exam[]
  sectors: Sector[]
  initialSector?: ExamSector
  initialQuery?: string
}) {
  const [query, setQuery] = useState(initialQuery)
  const [filter, setFilter] = useState<Filter>(initialSector ?? 'all')

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    ...sectors.map((s) => ({ id: s.id, label: s.label })),
  ]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const sector = sectors.find((s) => s.id === filter)
    return exams.filter((exam) => {
      const matchesFilter = filter === 'all' || (filter === 'popular' ? exam.popular : sector?.examSlugs.includes(exam.slug))
      const matchesQuery =
        !q || [exam.name, exam.shortName, exam.description, ...exam.categories, ...exam.importantTopics].some((s) => s.toLowerCase().includes(q))
      return matchesFilter && matchesQuery
    })
  }, [exams, sectors, query, filter])

  const showGrouped = filter === 'all' && !query.trim()
  const activeLabel = filters.find((f) => f.id === filter)?.label

  const clearAll = () => {
    setQuery('')
    setFilter('all')
  }

  return (
    <div>
      <div className={cn(card, 'sticky top-[4.5rem] z-20 -mt-10 p-3 shadow-lg md:-mt-12 md:p-4')}>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="exam-search" className="sr-only">
            Search exams
          </label>
          <input
            id="exam-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exams, e.g. SSC CGL, banking, polity..."
            className={cn(inputClass, 'pl-11')}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
              aria-label="Clear search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]" role="group" aria-label="Filter by category">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors',
                filter === f.id ? 'border-navy bg-navy text-white' : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {showGrouped ? (
        <div className="mt-12 space-y-14">
          <ExamGroup
            id="popular"
            title="Popular Exams"
            description="The exams most aspirants are preparing for right now."
            icon={<Flame className="size-5 text-highlight" aria-hidden="true" />}
            exams={exams.filter((e) => e.popular)}
          />
          {sectors.map((s) => (
            <ExamGroup key={s.id} id={s.id} title={s.label} description={s.description} exams={exams.filter((e) => s.examSlugs.includes(e.slug))} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'exam' : 'exams'} found
              {filter !== 'all' && <> in <span className="font-semibold text-navy">{activeLabel}</span></>}
              {query.trim() && <> for &ldquo;<span className="font-semibold text-navy">{query.trim()}</span>&rdquo;</>}
            </p>
            <button type="button" onClick={clearAll} className="text-sm font-semibold text-primary hover:underline">
              Reset filters
            </button>
          </div>
          {filtered.length ? (
            <ExamGrid exams={filtered} />
          ) : (
            <EmptyState
              title="No exams match your search"
              description="Try a different name or clear the filters to see every exam."
              action={
                <button type="button" onClick={clearAll} className="text-sm font-semibold text-primary hover:underline">
                  Clear filters
                </button>
              }
            />
          )}
        </div>
      )}
    </div>
  )
}

function ExamGroup({ id, title, description, icon, exams }: { id: string; title: string; description: string; icon?: React.ReactNode; exams: Exam[] }) {
  if (!exams.length) return null
  return (
    <section aria-labelledby={`group-${id}`} className="scroll-mt-48">
      <div className="mb-5">
        <h2 id={`group-${id}`} className="flex items-center gap-2 text-2xl font-extrabold text-navy">
          {icon}
          {title}
          <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">{exams.length}</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <ExamGrid exams={exams} />
    </section>
  )
}

function ExamGrid({ exams }: { exams: Exam[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {exams.map((exam) => (
        <ExamCard
          key={exam.slug}
          title={exam.shortName}
          description={exam.description}
          icon={exam.icon}
          href={`/exams/${exam.slug}`}
          meta={<DifficultyBadge level={exam.difficulty} />}
        />
      ))}
    </div>
  )
}
