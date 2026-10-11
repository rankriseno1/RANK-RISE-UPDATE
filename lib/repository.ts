import { CURRENT_AFFAIRS } from '@/lib/data/current-affairs'
import { EXAMS } from '@/lib/data/exams'
import { MOCK_TESTS } from '@/lib/data/mock-tests'
import { QUESTIONS } from '@/lib/data/questions'
import { STUDY_MATERIALS } from '@/lib/data/study-materials'
import { SUBJECTS } from '@/lib/data/subjects'
import type { CurrentAffair, Exam, MockTest, PyqFilters, Question, QuizConfig, StudyMaterial, Subject } from '@/lib/types'

/**
 * Data-access layer. Every UI component reads data through these helpers so
 * the local demo arrays can later be replaced by Supabase/PostgreSQL queries
 * (or an AI question engine) in one place.
 */

export function getExams(): Exam[] {
  return EXAMS
}

export function getExamBySlug(slug: string): Exam | undefined {
  return EXAMS.find((exam) => exam.slug === slug)
}

export function getSubjects(): Subject[] {
  return SUBJECTS
}

export function getSubjectBySlug(slug: string): Subject | undefined {
  return SUBJECTS.find((subject) => subject.slug === slug)
}

export function getSubjectName(slug: string): string {
  return getSubjectBySlug(slug)?.name ?? slug
}

export function getExamName(slug: string): string {
  return getExamBySlug(slug)?.shortName ?? slug
}

export function getExamOptions() {
  return EXAMS.map((exam) => ({ value: exam.slug, label: exam.shortName }))
}

export function getSubjectOptions() {
  return SUBJECTS.map((subject) => ({ value: subject.slug, label: subject.name }))
}

export function filterQuestions(questions: Question[], filters: PyqFilters): Question[] {
  const query = filters.query?.trim().toLowerCase()
  return questions.filter((q) => {
    if (filters.examSlug && q.examSlug !== filters.examSlug) return false
    if (filters.year && q.year !== filters.year) return false
    if (filters.subjectSlug && q.subjectSlug !== filters.subjectSlug) return false
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false
    if (query && !`${q.text} ${q.topic}`.toLowerCase().includes(query)) return false
    return true
  })
}

export function getQuestions(filters: PyqFilters = {}): Question[] {
  return filterQuestions(QUESTIONS, filters)
}

/**
 * The questions eligible for a quiz: every question in the chosen subject, or —
 * for mixed quizzes — every question in a subject that belongs to the exam's
 * syllabus. Difficulty and question type only influence ordering, never eligibility.
 */
export function getQuizPool(config: Pick<QuizConfig, 'examSlug' | 'subjectSlug'>): Question[] {
  if (config.subjectSlug !== 'mixed') return QUESTIONS.filter((q) => q.subjectSlug === config.subjectSlug)
  const examSubjects = getExamBySlug(config.examSlug)?.subjectSlugs
  if (!examSubjects?.length) return QUESTIONS
  return QUESTIONS.filter((q) => examSubjects.includes(q.subjectSlug))
}

export function getAvailableQuestionCount(config: Pick<QuizConfig, 'examSlug' | 'subjectSlug'>): number {
  return getQuizPool(config).length
}

/**
 * Builds a demo quiz from the eligible pool. Within the pool, questions that
 * match the difficulty, exam and question type are ranked first. The result
 * never exceeds the pool size. Later this becomes a server action that calls
 * the AI question engine.
 */
export function buildQuiz(config: QuizConfig, seed = 0): Question[] {
  const pool = getQuizPool(config)

  const rank = (q: Question) => {
    let score = 0
    if (q.difficulty === config.difficulty) score += 2
    if (q.examSlug === config.examSlug) score += config.type === 'pyq' ? 2.5 : 1
    if (config.type === 'concepts' && q.difficulty !== 'Easy') score += 0.75
    return score + seededNoise(`${q.id}-${config.examSlug}-${config.type}-${config.mode ?? ''}`, seed)
  }

  return [...pool].sort((a, b) => rank(b) - rank(a)).slice(0, Math.max(0, Math.min(config.count, pool.length)))
}

/** Picks demo questions for a mock test, favouring the test's subjects and exam. */
export function buildMockTest(test: MockTest, seed = 0): Question[] {
  const rank = (q: Question) => {
    let score = 0
    if (test.subjectSlugs.includes(q.subjectSlug)) score += 4
    if (q.examSlug === test.examSlug) score += 1
    if (q.difficulty === test.difficulty) score += 1
    return score + seededNoise(`${q.id}-${test.id}`, seed)
  }
  return [...QUESTIONS].sort((a, b) => rank(b) - rank(a)).slice(0, Math.min(test.demoQuestions, QUESTIONS.length))
}

function seededNoise(key: string, seed: number) {
  const input = `${key}-${seed}`
  let hash = 0
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) | 0
  return (Math.abs(hash) % 100) / 100
}

export function getMockTests(): MockTest[] {
  return MOCK_TESTS
}

export function getMockTestById(id: string): MockTest | undefined {
  return MOCK_TESTS.find((t) => t.id === id)
}

export function getCurrentAffairs(): CurrentAffair[] {
  return [...CURRENT_AFFAIRS].sort((a, b) => b.date.localeCompare(a.date))
}

export function getCurrentAffairBySlug(slug: string): CurrentAffair | undefined {
  return CURRENT_AFFAIRS.find((item) => item.slug === slug)
}

export function getStudyMaterials(): StudyMaterial[] {
  return STUDY_MATERIALS
}

export function getStudyMaterialById(id: string): StudyMaterial | undefined {
  return STUDY_MATERIALS.find((m) => m.id === id)
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
