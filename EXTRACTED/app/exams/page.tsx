import type { Metadata } from 'next'
import { ExamsExplorer } from '@/components/exams/exams-explorer'
import { PageHeader } from '@/components/site/section'
import { EXAM_SECTORS } from '@/lib/data/exams'
import { getExams } from '@/lib/repository'

export const metadata: Metadata = {
  title: 'Exams',
  description: 'Explore UPSC, SSC, Railway, Banking, Defence, Police and State exams with subject-wise practice on Rank Rise.',
}

export default async function ExamsPage({ searchParams }: { searchParams: Promise<{ sector?: string; q?: string }> }) {
  const { sector, q } = await searchParams
  const initialSector = EXAM_SECTORS.find((s) => s.id === sector)?.id

  return (
    <>
      <PageHeader
        eyebrow="Exams"
        title="Find your exam. Start practising."
        description="Browse central, state, banking, railway, defence and police exams. Each exam has its own subjects, important topics and previous-year practice."
      />
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ExamsExplorer key={`${initialSector}-${q}`} exams={getExams()} sectors={EXAM_SECTORS} initialSector={initialSector} initialQuery={q ?? ''} />
      </div>
    </>
  )
}
