import type { MockTest } from '@/lib/types'

/**
 * DEMO MOCK TESTS
 * Question counts and durations mirror typical exam patterns. A demo attempt
 * draws `demoQuestions` items from the local question bank.
 */
export const MOCK_TESTS: MockTest[] = [
  { id: 'ssc-cgl-tier1-01', title: 'SSC CGL Tier 1 · Full Mock 01', examSlug: 'ssc-cgl', type: 'Full-length', questions: 100, durationMin: 60, difficulty: 'Medium', subjectSlugs: ['mathematics', 'reasoning', 'english', 'gk'], attempts: 48210, demoQuestions: 20, lastScore: 142, isNew: false },
  { id: 'ssc-cgl-tier1-02', title: 'SSC CGL Tier 1 · Full Mock 02', examSlug: 'ssc-cgl', type: 'Full-length', questions: 100, durationMin: 60, difficulty: 'Hard', subjectSlugs: ['mathematics', 'reasoning', 'english', 'gk'], attempts: 31540, demoQuestions: 20, isNew: true },
  { id: 'upsc-prelims-gs-01', title: 'UPSC Prelims GS Paper I · Mock 01', examSlug: 'upsc-cse', type: 'Full-length', questions: 100, durationMin: 120, difficulty: 'Hard', subjectSlugs: ['polity', 'history', 'geography', 'economics', 'science', 'current-affairs'], attempts: 22870, demoQuestions: 25, lastScore: 98 },
  { id: 'rrb-ntpc-cbt1-01', title: 'RRB NTPC CBT 1 · Full Mock 01', examSlug: 'rrb-ntpc', type: 'Full-length', questions: 100, durationMin: 90, difficulty: 'Medium', subjectSlugs: ['mathematics', 'reasoning', 'gk', 'science'], attempts: 39650, demoQuestions: 20, isNew: true },
  { id: 'ibps-po-pre-01', title: 'IBPS PO Prelims · Full Mock 01', examSlug: 'ibps-sbi', type: 'Full-length', questions: 100, durationMin: 60, difficulty: 'Hard', subjectSlugs: ['reasoning', 'mathematics', 'english'], attempts: 27430, demoQuestions: 20 },
  { id: 'ssc-chsl-quant-01', title: 'SSC CHSL · Quantitative Aptitude Sectional', examSlug: 'ssc-chsl', type: 'Sectional', questions: 25, durationMin: 15, difficulty: 'Easy', subjectSlugs: ['mathematics'], attempts: 18920, demoQuestions: 10, lastScore: 38 },
  { id: 'polity-sectional-01', title: 'Indian Polity · Sectional Test', examSlug: 'upsc-cse', type: 'Sectional', questions: 30, durationMin: 25, difficulty: 'Medium', subjectSlugs: ['polity'], attempts: 15380, demoQuestions: 10 },
  { id: 'rrb-group-d-pyp-2022', title: 'RRB Group D · 2022 Pattern Paper', examSlug: 'rrb-group-d', type: 'Previous Year Paper', questions: 100, durationMin: 90, difficulty: 'Easy', subjectSlugs: ['science', 'mathematics', 'reasoning', 'gk'], attempts: 41200, demoQuestions: 20 },
  { id: 'nda-gat-01', title: 'NDA General Ability · Mock 01', examSlug: 'defence', type: 'Full-length', questions: 150, durationMin: 150, difficulty: 'Hard', subjectSlugs: ['english', 'science', 'history', 'geography'], attempts: 12650, demoQuestions: 25, isNew: true },
  { id: 'ctet-paper1-01', title: 'CTET Paper I · Full Mock 01', examSlug: 'ctet', type: 'Full-length', questions: 150, durationMin: 150, difficulty: 'Medium', subjectSlugs: ['pedagogy', 'mathematics', 'english', 'science'], attempts: 20540, demoQuestions: 20 },
  { id: 'kpsc-gs-pyp-2021', title: 'KPSC General Studies · 2021 Pattern Paper', examSlug: 'kpsc', type: 'Previous Year Paper', questions: 100, durationMin: 120, difficulty: 'Medium', subjectSlugs: ['gk', 'history', 'geography', 'polity'], attempts: 8740, demoQuestions: 20 },
  { id: 'reasoning-sectional-01', title: 'Reasoning Ability · Sectional Test', examSlug: 'ibps-sbi', type: 'Sectional', questions: 35, durationMin: 20, difficulty: 'Medium', subjectSlugs: ['reasoning'], attempts: 16480, demoQuestions: 10, lastScore: 26 },
]
