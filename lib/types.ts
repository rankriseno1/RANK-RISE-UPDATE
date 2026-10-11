/**
 * Shared domain types. These mirror the shape of future database tables
 * (exams, subjects, questions, quiz_attempts) so the local demo data can be
 * swapped for Supabase/PostgreSQL rows without touching UI components.
 */

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type Importance = 'Very High' | 'High' | 'Medium'

export type ExamCategory =
  | 'UPSC'
  | 'SSC'
  | 'Banking'
  | 'Railways'
  | 'Defence'
  | 'State PSC'
  | 'Teaching'
  | 'Other Government Exams'

export type PrepStatus = 'Not started' | 'In progress' | 'Completed'

export type IconKey =
  | 'landmark'
  | 'scale'
  | 'file-text'
  | 'clipboard'
  | 'shield'
  | 'shield-check'
  | 'train'
  | 'train-track'
  | 'building'
  | 'banknote'
  | 'plane'
  | 'medal'
  | 'badge'
  | 'book'
  | 'newspaper'
  | 'globe'
  | 'map'
  | 'flask'
  | 'trending'
  | 'brain'
  | 'calculator'
  | 'languages'
  | 'history'
  | 'siren'
  | 'library'
  | 'graduation'

export interface Exam {
  slug: string
  name: string
  shortName: string
  categories: ExamCategory[]
  description: string
  icon: IconKey
  popular: boolean
  questionCount: number
  testCount: number
  status: PrepStatus
  progress: number
  subjectSlugs: string[]
  difficulty: Difficulty
  eligibility: string
  stages: string[]
  overview: string
  importantTopics: string[]
}

export interface Subject {
  slug: string
  name: string
  description: string
  icon: IconKey
  topics: string[]
}

export interface Question {
  id: string
  text: string
  options: [string, string, string, string]
  correctIndex: number
  explanation: string
  examSlug: string
  year: number
  subjectSlug: string
  topic: string
  difficulty: Difficulty
}

export type QuizQuestionType = 'pyq' | 'concepts' | 'mixed'

export interface QuizConfig {
  examSlug: string
  subjectSlug: string
  difficulty: Difficulty
  count: number
  type: QuizQuestionType
  mode?: 'standard' | 'daily'
}

export interface QuizAnswerState {
  selected: number | null
  markedForReview: boolean
  visited: boolean
}

export interface QuizResult {
  total: number
  correct: number
  incorrect: number
  unanswered: number
  score: number
  accuracy: number
  timeTakenSeconds: number
  strongTopics: string[]
  weakTopics: string[]
}

export type MockTestType = 'Full-length' | 'Sectional' | 'Previous Year Paper'

export interface MockTest {
  id: string
  title: string
  examSlug: string
  type: MockTestType
  questions: number
  durationMin: number
  difficulty: Difficulty
  subjectSlugs: string[]
  attempts: number
  /** Number of local demo questions used when a learner attempts the test. */
  demoQuestions: number
  lastScore?: number
  isNew?: boolean
}

export type CurrentAffairCategory = 'National' | 'International' | 'Economy' | 'Science & Tech' | 'Environment' | 'Sports' | 'Schemes' | 'Awards'

export interface CurrentAffair {
  slug: string
  title: string
  summary: string
  body: string[]
  category: CurrentAffairCategory
  date: string
  important: boolean
  readMinutes: number
  examRelevance: string[]
  keyFacts: string[]
}

export type MaterialType = 'Notes' | 'PDF' | 'Quick Revision' | 'Formula Sheet'

export interface StudyMaterial {
  id: string
  title: string
  subjectSlug: string
  type: MaterialType
  pages: number
  sizeMb: number
  updated: string
  downloads: number
  summary: string
  sections: { heading: string; points: string[] }[]
}

export interface PyqFilters {
  query?: string
  examSlug?: string
  year?: number
  subjectSlug?: string
  difficulty?: Difficulty
}
