import type { Metadata } from 'next'
import { QuizExperience } from '@/components/quiz/quiz-experience'
import { getExamBySlug, getExamOptions, getSubjectBySlug, getSubjectOptions } from '@/lib/repository'
import type { Difficulty, QuizQuestionType } from '@/lib/types'

export const metadata: Metadata = {
  title: 'AI Quiz',
  description: 'Build a timed practice quiz by exam, subject, difficulty and question type. Review answers and track your strong and weak topics.',
}

const TYPES: QuizQuestionType[] = ['pyq', 'concepts', 'mixed']
const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard']

export default async function AiQuizPage({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string; subject?: string; type?: string; mode?: string; difficulty?: string }>
}) {
  const { exam, subject, type, mode, difficulty } = await searchParams
  const isDaily = mode === 'daily'

  return (
    <QuizExperience
      key={`${exam}-${subject}-${type}-${mode}-${difficulty}`}
      exams={getExamOptions()}
      subjects={getSubjectOptions()}
      isDaily={isDaily}
      initialConfig={{
        examSlug: exam && getExamBySlug(exam) ? exam : 'ssc-cgl',
        subjectSlug: isDaily ? 'mixed' : subject && getSubjectBySlug(subject) ? subject : 'mixed',
        difficulty: DIFFICULTIES.find((d) => d === difficulty) ?? 'Medium',
        count: 10,
        type: isDaily ? 'mixed' : TYPES.find((t) => t === type) ?? 'mixed',
        mode: isDaily ? 'daily' : 'standard',
      }}
    />
  )
}
