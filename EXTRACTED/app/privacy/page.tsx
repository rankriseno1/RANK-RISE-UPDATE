import type { Metadata } from 'next'
import { InfoPage } from '@/components/site/info-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Rank Rise handles your information.',
}

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="Last updated: October 2026"
      sections={[
        {
          heading: 'Information we collect',
          body: 'In this version of Rank Rise there are no user accounts. Quiz answers and saved items are kept only in your browser session and are cleared when you reload or close the page.',
        },
        {
          heading: 'How information will be used',
          body: 'When accounts launch, information such as your email and practice history will be used only to provide your dashboard, save progress and improve recommendations. We will not sell your personal data.',
        },
        {
          heading: 'Cookies',
          body: 'Rank Rise may use essential cookies required for the site to function. Any future analytics or account cookies will be described here before they are introduced.',
        },
        { heading: 'Contact', body: 'For privacy questions, email hello@rankrise.in.' },
      ]}
    />
  )
}
