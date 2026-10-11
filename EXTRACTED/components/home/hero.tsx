import { ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { btn } from '@/components/site/styles'
import { HeroPreview } from './hero-preview'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-white">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="animate-in duration-700 fade-in slide-in-from-bottom-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
            <ShieldCheck className="size-3.5 text-highlight" aria-hidden="true" />
            Built for Government Exam Aspirants
          </p>
          <h1 className="mt-6 text-5xl leading-[1.05] font-extrabold text-balance sm:text-6xl lg:text-7xl">
            Practice Smart.{' '}
            <span className="bg-gradient-to-r from-[oklch(0.78_0.12_250)] via-white to-highlight bg-clip-text text-transparent">Rank Higher.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/75">
            AI-powered preparation built around previous-year questions, frequently tested concepts and smart practice for Indian government exams.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/ai-quiz" className={btn('light', 'lg')}>
              Start Preparing
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/exams" className={btn('outline-light', 'lg')}>
              Explore Exams
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              { k: '12+', v: 'Exam tracks' },
              { k: '10', v: 'Core subjects' },
              { k: '3', v: 'Practice modes' },
            ].map((item) => (
              <div key={item.v}>
                <dt className="sr-only">{item.v}</dt>
                <dd className="font-heading text-2xl font-extrabold">{item.k}</dd>
                <dd className="text-xs text-white/60">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <HeroPreview />
      </div>
    </section>
  )
}
