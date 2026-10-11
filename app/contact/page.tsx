import { Mail } from 'lucide-react'
import type { Metadata } from 'next'
import { InfoPage } from '@/components/site/info-page'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Rank Rise team for feedback, questions or partnership enquiries.',
}

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="We'd love to hear from you"
      description="Questions, feedback or a topic you'd like us to cover? Reach out to the Rank Rise team."
      sections={[
        { heading: 'Feedback & suggestions', body: 'Tell us which exams, subjects or question types you want next. Your feedback directly shapes what we build.' },
        { heading: 'Report a question', body: 'Spotted an error in a question or explanation? Send us the exam, subject and question text and we will review it.' },
      ]}
    >
      <a
        href="mailto:hello@rankrise.in"
        className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-primary-soft"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Mail className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-navy">Email</span>
          <span className="block text-sm text-muted-foreground">hello@rankrise.in</span>
        </span>
      </a>
    </InfoPage>
  )
}
