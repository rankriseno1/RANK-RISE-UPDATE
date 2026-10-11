/**
 * Sample analytics for a demo learner. Replace with per-user aggregates from
 * the quiz_attempts table once authentication and the database are connected.
 */

export const PERFORMANCE_SUMMARY = {
  questionsAttempted: 1248,
  accuracy: 72,
  correctAnswers: 899,
  currentStreak: 12,
  rankRiseScore: 742,
  maxScore: 1000,
  mockTestsCompleted: 14,
  quizzesCompleted: 63,
  averageMockPercentile: 82,
}

export const MOCK_HISTORY = [
  { id: 'm1', title: 'SSC CGL Tier 1 · Full Mock 01', date: '6 Oct 2026', score: 142, max: 200, percentile: 82 },
  { id: 'm2', title: 'Indian Polity · Sectional Test', date: '2 Oct 2026', score: 46, max: 60, percentile: 88 },
  { id: 'm3', title: 'SSC CHSL · Quant Sectional', date: '27 Sep 2026', score: 38, max: 50, percentile: 74 },
  { id: 'm4', title: 'Reasoning Ability · Sectional', date: '21 Sep 2026', score: 26, max: 35, percentile: 79 },
]

export const RECOMMENDATIONS = [
  { title: 'Revise Profit & Loss shortcuts', detail: 'Spend 20 minutes on the formula sheet, then attempt a 10-question Hard quiz.', href: '/study-materials/maths-formula-sheet' },
  { title: 'Strengthen Physical Geography', detail: 'Read the Rivers & Drainage notes and practise map-based questions.', href: '/study-materials/geography-rivers' },
  { title: 'Daily clock & calendar drills', detail: 'Five quick reasoning questions every day will lift your Clocks accuracy.', href: '/ai-quiz?subject=reasoning&difficulty=Hard' },
]

export const IMPROVEMENT_TREND = [
  { label: 'Wk 1', accuracy: 54 },
  { label: 'Wk 2', accuracy: 58 },
  { label: 'Wk 3', accuracy: 57 },
  { label: 'Wk 4', accuracy: 63 },
  { label: 'Wk 5', accuracy: 66 },
  { label: 'Wk 6', accuracy: 65 },
  { label: 'Wk 7', accuracy: 70 },
  { label: 'Wk 8', accuracy: 72 },
]

export const SUBJECT_PERFORMANCE = [
  { subject: 'Indian Polity', accuracy: 84, attempted: 210 },
  { subject: 'General Science', accuracy: 79, attempted: 186 },
  { subject: 'History', accuracy: 74, attempted: 168 },
  { subject: 'Reasoning', accuracy: 71, attempted: 240 },
  { subject: 'English', accuracy: 68, attempted: 132 },
  { subject: 'Geography', accuracy: 61, attempted: 144 },
  { subject: 'Mathematics', accuracy: 58, attempted: 168 },
]

export const RECENT_QUIZZES = [
  { id: 'r1', title: 'SSC CGL · Indian Polity', date: '5 Oct 2026', score: 17, total: 20, durationMin: 18 },
  { id: 'r2', title: 'Daily Challenge', date: '4 Oct 2026', score: 8, total: 10, durationMin: 9 },
  { id: 'r3', title: 'RRB NTPC · General Science', date: '3 Oct 2026', score: 21, total: 30, durationMin: 27 },
  { id: 'r4', title: 'SSC CHSL · Mathematics', date: '1 Oct 2026', score: 12, total: 20, durationMin: 22 },
  { id: 'r5', title: 'IBPS / SBI · Reasoning', date: '29 Sep 2026', score: 7, total: 10, durationMin: 11 },
]

export const WEAK_TOPICS = [
  { topic: 'Profit & Loss', subject: 'Mathematics', accuracy: 46, subjectSlug: 'mathematics' },
  { topic: 'Physical Features', subject: 'Geography', accuracy: 51, subjectSlug: 'geography' },
  { topic: 'Clocks', subject: 'Reasoning', accuracy: 53, subjectSlug: 'reasoning' },
  { topic: 'Antonyms', subject: 'English', accuracy: 57, subjectSlug: 'english' },
]

export const STRONG_TOPICS = ['Fundamental Rights', 'Vitamins & Nutrition', 'Freedom Struggle']
