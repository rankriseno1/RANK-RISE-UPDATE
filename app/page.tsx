import { AiImportant } from '@/components/home/ai-important'
import { CtaSection } from '@/components/home/cta-section'
import { DailyChallenge } from '@/components/home/daily-challenge'
import { ExamCategories } from '@/components/home/exam-categories'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { MostAsked } from '@/components/home/most-asked'
import { ProgressSection } from '@/components/home/progress-section'
import { PyqSection } from '@/components/home/pyq-section'
import { SubjectsSection } from '@/components/home/subjects-section'
import { WhyRankRise } from '@/components/home/why-rank-rise'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExamCategories />
      <HowItWorks />
      <MostAsked />
      <AiImportant />
      <PyqSection />
      <DailyChallenge />
      <ProgressSection />
      <SubjectsSection />
      <WhyRankRise />
      <CtaSection />
    </>
  )
}
