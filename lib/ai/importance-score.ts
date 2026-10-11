import type { Importance } from '@/lib/types'

/**
 * Rank Rise Importance Score (v0 heuristic).
 *
 * Future pipeline: historical PYQs → topic tagging + similarity clustering
 * (embeddings) → per-concept factors below → weighted score → recommendations.
 * Each factor is normalised to 0–1. The score signals study priority only;
 * it is NOT a prediction of what will appear in a future exam.
 */
export interface ImportanceFactors {
  frequency: number
  recency: number
  examRelevance: number
  topicRepetition: number
  similarPatterns: number
  difficulty: number
  syllabusRelevance: number
}

export const IMPORTANCE_WEIGHTS: Record<keyof ImportanceFactors, number> = {
  frequency: 0.25,
  recency: 0.15,
  examRelevance: 0.15,
  topicRepetition: 0.15,
  similarPatterns: 0.12,
  difficulty: 0.08,
  syllabusRelevance: 0.1,
}

export const IMPORTANCE_FACTOR_LABELS: Record<keyof ImportanceFactors, { label: string; description: string }> = {
  frequency: { label: 'Concept frequency', description: 'How often a concept has been tested across previous papers.' },
  recency: { label: 'Recency', description: 'Recent appearances are weighted more than older ones.' },
  examRelevance: { label: 'Exam relevance', description: 'How closely a concept matches your chosen exam pattern.' },
  topicRepetition: { label: 'Topic repetition', description: 'Whether the wider topic keeps returning year after year.' },
  similarPatterns: { label: 'Similar-question patterns', description: 'Clusters of questions that test the same idea in different words.' },
  difficulty: { label: 'Difficulty', description: 'Balances high-yield easy marks with challenging differentiators.' },
  syllabusRelevance: { label: 'Syllabus relevance', description: 'Alignment with the officially notified syllabus.' },
}

export function computeImportanceScore(factors: ImportanceFactors): number {
  const total = (Object.keys(IMPORTANCE_WEIGHTS) as (keyof ImportanceFactors)[]).reduce(
    (sum, key) => sum + clamp01(factors[key]) * IMPORTANCE_WEIGHTS[key],
    0,
  )
  return Math.round(total * 100)
}

export function importanceFromScore(score: number): Importance {
  if (score >= 80) return 'Very High'
  if (score >= 65) return 'High'
  return 'Medium'
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}
