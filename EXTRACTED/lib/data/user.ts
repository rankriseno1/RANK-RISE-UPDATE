/** Demo learner profile. There is no authentication in this version. */

export const DEMO_USER = {
  name: 'Aarav Sharma',
  initials: 'AS',
  email: 'aarav.sharma@example.com',
  location: 'Jaipur, Rajasthan',
  goalExamSlug: 'ssc-cgl',
  targetYear: 2027,
  joined: 'March 2026',
  dailyGoalQuestions: 50,
  studyHoursThisWeek: 14.5,
}

export type ActivityKind = 'quiz' | 'mock' | 'material' | 'current-affairs' | 'practice'

export interface Activity {
  id: string
  kind: ActivityKind
  title: string
  detail: string
  time: string
  href: string
}

export const RECENT_ACTIVITY: Activity[] = [
  { id: 'a1', kind: 'quiz', title: 'Completed AI Quiz · Indian Polity', detail: 'Scored 17/20 · 85% accuracy', time: '2 hours ago', href: '/ai-quiz?exam=ssc-cgl&subject=polity' },
  { id: 'a2', kind: 'material', title: 'Read Arithmetic Formula Sheet', detail: 'Mathematics · Formula sheet', time: '5 hours ago', href: '/study-materials/maths-formula-sheet' },
  { id: 'a3', kind: 'mock', title: 'Attempted SSC CGL Tier 1 · Full Mock 01', detail: 'Score 142/200 · Top 18%', time: 'Yesterday', href: '/mock-tests/ssc-cgl-tier1-01' },
  { id: 'a4', kind: 'current-affairs', title: 'Read: RBI policy review (sample)', detail: 'Economy · 3 min read', time: 'Yesterday', href: '/current-affairs/rbi-monetary-policy-review' },
  { id: 'a5', kind: 'practice', title: 'Practised 25 Reasoning questions', detail: 'Series & Coding-Decoding', time: '2 days ago', href: '/practice?subject=reasoning' },
]

export const RECOMMENDED = [
  { id: 'r1', title: 'Profit & Loss — targeted practice', reason: 'Your weakest topic (46% accuracy)', href: '/ai-quiz?exam=ssc-cgl&subject=mathematics', cta: 'Practise now', kind: 'quiz' as const },
  { id: 'r2', title: 'Rivers of India & Drainage Systems', reason: 'Boosts Geography — currently 61%', href: '/study-materials/geography-rivers', cta: 'Read notes', kind: 'material' as const },
  { id: 'r3', title: 'SSC CGL Tier 1 · Full Mock 02', reason: 'New mock for your goal exam', href: '/mock-tests/ssc-cgl-tier1-02', cta: 'Attempt test', kind: 'mock' as const },
  { id: 'r4', title: 'Top 300 Synonyms & Antonyms', reason: 'Quick revision for English', href: '/study-materials/english-vocab-revision', cta: 'Revise', kind: 'material' as const },
]

export const DEFAULT_SAVED_MATERIALS = ['maths-formula-sheet', 'polity-fundamental-rights', 'english-vocab-revision']
