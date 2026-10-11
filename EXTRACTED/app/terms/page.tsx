import type { Metadata } from 'next'
import { InfoPage } from '@/components/site/info-page'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for Rank Rise.',
}

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms of Use"
      description="Last updated: October 2026"
      sections={[
        { heading: 'Using Rank Rise', body: 'Rank Rise is a practice platform for government exam aspirants. You may use it for personal, non-commercial preparation.' },
        {
          heading: 'Practice content',
          body: 'Questions, trends and statistics in this version are demo data for illustration. AI recommendations are based on available question trends and are not guaranteed predictions of future exam questions.',
        },
        {
          heading: 'No affiliation',
          body: 'Rank Rise is not affiliated with UPSC, SSC, RRB, IBPS, SBI, KPSC or any other recruiting body. Always refer to official notifications for exam dates, syllabus and eligibility.',
        },
        { heading: 'Changes', body: 'We may update these terms as Rank Rise grows. Continued use of the site means you accept the latest version.' },
      ]}
    />
  )
}
