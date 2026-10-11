import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { DemoStoreProvider } from '@/components/site/demo-store'
import { Footer } from '@/components/site/footer'
import { Navbar } from '@/components/site/navbar'
import { ToastProvider } from '@/components/site/toast-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Rank Rise — Practice Smart. Rank Higher.',
    template: '%s · Rank Rise',
  },
  description:
    'Prepare for UPSC, SSC, Banking, Railways, Defence, State PSC and Teaching exams with smart quizzes, mock tests, current affairs, study materials and performance tracking.',
  keywords: ['government exam preparation', 'UPSC', 'SSC CGL', 'RRB NTPC', 'IBPS', 'CTET', 'previous year questions', 'mock test', 'current affairs', 'Rank Rise'],
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0f1d3d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable} bg-background`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <ToastProvider>
          <DemoStoreProvider>
          <a
            href="#main"
            className="sr-only z-[200] rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          </DemoStoreProvider>
        </ToastProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
