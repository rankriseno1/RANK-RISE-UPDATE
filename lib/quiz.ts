import type { Question, QuizAnswerState, QuizResult } from '@/lib/types'

export const SECONDS_PER_QUESTION = 60

export const PREFERRED_QUESTION_COUNTS = [10, 20, 30]

export function getTimeLimitSeconds(questionCount: number) {
  return Math.max(0, questionCount) * SECONDS_PER_QUESTION
}

/** Count choices that never exceed the pool: preferred sizes below it, plus "all available". */
export function getQuestionCountOptions(available: number): number[] {
  if (available <= 0) return []
  const options = PREFERRED_QUESTION_COUNTS.filter((n) => n < available)
  return [...options, available]
}

/** Snaps a requested count to a valid option for the current pool. */
export function resolveQuestionCount(requested: number, available: number): number {
  const options = getQuestionCountOptions(available)
  if (options.length === 0) return 0
  if (options.includes(requested)) return requested
  const fitting = options.filter((n) => n <= requested)
  return fitting.length ? fitting[fitting.length - 1] : options[0]
}

export function createAnswerState(count: number): QuizAnswerState[] {
  return Array.from({ length: count }, (_, i) => ({ selected: null, markedForReview: false, visited: i === 0 }))
}

/**
 * Scores an attempt locally. The marking scheme (+4 / −1) mirrors common
 * government-exam patterns; later this moves server-side and persists to quiz_attempts.
 */
export function computeResult(questions: Question[], answers: QuizAnswerState[], timeTakenSeconds: number): QuizResult {
  const topicStats = new Map<string, { correct: number; total: number }>()
  let correct = 0
  let incorrect = 0

  questions.forEach((q, i) => {
    const selected = answers[i]?.selected
    const stats = topicStats.get(q.topic) ?? { correct: 0, total: 0 }
    stats.total += 1
    if (selected === q.correctIndex) {
      correct += 1
      stats.correct += 1
    } else if (selected !== null && selected !== undefined) {
      incorrect += 1
    }
    topicStats.set(q.topic, stats)
  })

  const total = questions.length
  const answered = correct + incorrect
  const ranked = [...topicStats.entries()].map(([topic, s]) => ({ topic, ratio: s.correct / s.total }))

  return {
    total,
    correct,
    incorrect,
    unanswered: total - answered,
    score: correct * 4 - incorrect,
    accuracy: answered ? Math.round((correct / answered) * 100) : 0,
    timeTakenSeconds,
    strongTopics: ranked.filter((t) => t.ratio >= 0.75).sort((a, b) => b.ratio - a.ratio).slice(0, 4).map((t) => t.topic),
    weakTopics: ranked.filter((t) => t.ratio < 0.5).sort((a, b) => a.ratio - b.ratio).slice(0, 4).map((t) => t.topic),
  }
}

export function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
