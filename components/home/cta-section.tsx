import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { LogoMark } from '@/components/site/logo'
import { btn } from '@/components/site/styles'

export function CtaSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary-soft via-card to-secondary px-6 py-14 text-center sm:px-12 md:py-20">
          <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <LogoMark className="size-12" />
            <h2 className="mt-6 text-4xl font-extrabold text-balance text-navy md:text-5xl">Ready to Rise?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Start preparing smarter for your government exam.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/ai-quiz" className={btn('primary', 'lg')}>
                Start Preparing
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link href="/exams" className={btn('outline', 'lg')}>
                Explore Exams
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
