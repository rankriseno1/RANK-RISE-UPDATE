import { computeImportanceScore, importanceFromScore, type ImportanceFactors } from '@/lib/ai/importance-score'
import type { Importance } from '@/lib/types'

/** All values in this file are illustrative demo data, not real exam statistics. */

export interface MostAskedTopic {
  subjectSlug: string
  topic: string
  frequency: number
  importance: Importance
  concepts: string[]
}

export const MOST_ASKED_TOPICS: MostAskedTopic[] = [
  { subjectSlug: 'polity', topic: 'Indian Polity', frequency: 92, importance: 'Very High', concepts: ['Fundamental Rights', 'Constitutional Bodies', 'Amendments'] },
  { subjectSlug: 'history', topic: 'History', frequency: 84, importance: 'High', concepts: ['Freedom Struggle', 'Mauryan Empire', 'British Policies'] },
  { subjectSlug: 'geography', topic: 'Geography', frequency: 76, importance: 'High', concepts: ['Rivers of India', 'Soils', 'Latitudes'] },
  { subjectSlug: 'science', topic: 'General Science', frequency: 88, importance: 'Very High', concepts: ['Vitamins', 'SI Units', 'Human Body'] },
  { subjectSlug: 'economics', topic: 'Economics', frequency: 64, importance: 'Medium', concepts: ['Repo Rate', 'GST', 'Budget'] },
]

export interface AiImportantSet {
  id: string
  examSlug: string
  examName: string
  subjectSlug: string
  subjectName: string
  questionCount: number
  score: number
  priority: Importance
  focus: string
}

const AI_SET_SEED: (Omit<AiImportantSet, 'score' | 'priority'> & { factors: ImportanceFactors })[] = [
  { id: 'ai-1', examSlug: 'ssc-cgl', examName: 'SSC CGL', subjectSlug: 'polity', subjectName: 'Indian Polity', questionCount: 40, focus: 'Fundamental Rights & Articles', factors: { frequency: 0.92, recency: 0.85, examRelevance: 0.9, topicRepetition: 0.88, similarPatterns: 0.8, difficulty: 0.5, syllabusRelevance: 0.95 } },
  { id: 'ai-2', examSlug: 'rrb-ntpc', examName: 'RRB NTPC', subjectSlug: 'science', subjectName: 'General Science', questionCount: 50, focus: 'Physics & Biology basics', factors: { frequency: 0.88, recency: 0.8, examRelevance: 0.92, topicRepetition: 0.82, similarPatterns: 0.75, difficulty: 0.4, syllabusRelevance: 0.9 } },
  { id: 'ai-3', examSlug: 'ibps-sbi', examName: 'IBPS / SBI', subjectSlug: 'reasoning', subjectName: 'Reasoning', questionCount: 30, focus: 'Clocks, series & coding', factors: { frequency: 0.75, recency: 0.7, examRelevance: 0.85, topicRepetition: 0.7, similarPatterns: 0.68, difficulty: 0.7, syllabusRelevance: 0.85 } },
  { id: 'ai-4', examSlug: 'upsc-cse', examName: 'UPSC', subjectSlug: 'history', subjectName: 'History', questionCount: 35, focus: 'Modern India & policies', factors: { frequency: 0.78, recency: 0.65, examRelevance: 0.8, topicRepetition: 0.72, similarPatterns: 0.6, difficulty: 0.8, syllabusRelevance: 0.9 } },
  { id: 'ai-5', examSlug: 'ssc-chsl', examName: 'SSC CHSL', subjectSlug: 'mathematics', subjectName: 'Mathematics', questionCount: 45, focus: 'Percentage & ratio', factors: { frequency: 0.6, recency: 0.6, examRelevance: 0.7, topicRepetition: 0.62, similarPatterns: 0.55, difficulty: 0.5, syllabusRelevance: 0.8 } },
  { id: 'ai-6', examSlug: 'kpsc', examName: 'KPSC', subjectSlug: 'geography', subjectName: 'Geography', questionCount: 25, focus: 'Physical features & soils', factors: { frequency: 0.66, recency: 0.6, examRelevance: 0.72, topicRepetition: 0.65, similarPatterns: 0.6, difficulty: 0.5, syllabusRelevance: 0.85 } },
]

export const AI_IMPORTANT_SETS: AiImportantSet[] = AI_SET_SEED.map(({ factors, ...rest }) => {
  const score = computeImportanceScore(factors)
  return { ...rest, score, priority: importanceFromScore(score) }
})
