import type { Metadata } from 'next'
import Link from 'next/link'
import { InfoPage } from '@/components/site/info-page'
import { btn } from '@/components/site/styles'

export const metadata: Metadata = {
  title: 'About',
  description: 'Rank Rise helps Indian government exam aspirants practise smarter with previous-year questions and frequently tested concepts.',
}

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="Built for Government Exam Aspirants"
      description="Rank Rise helps you practise smart and rank higher by focusing on what exams actually test."
      sections={[
        {
          heading: 'Our mission',
          body: 'Preparing for UPSC, SSC, Railway, Banking, Defence and State exams is demanding. Rank Rise brings previous-year questions, frequently tested concepts and focused practice into one clear, distraction-free place.',
        },
        {
          heading: 'How we approach practice',
          body: 'Instead of endless random questions, Rank Rise organises practice by exam, subject and topic so you can spend time on concepts that matter most and see exactly where you need to improve.',
        },
        {
          heading: 'Where we are today',
          body: 'This is an early version of Rank Rise. Questions, trends and performance numbers shown across the site are demo data for illustration while the full question bank and AI features are being built.',
        },
      ]}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/exams" className={btn('primary', 'md')}>Explore Exams</Link>
        <Link href="/contact" className={btn('outline', 'md')}>Contact us</Link>
      </div>
    </InfoPage>
  )
}
