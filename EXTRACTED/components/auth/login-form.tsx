'use client'

import { Info, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/site/toast-provider'
import { btn, card, inputClass } from '@/components/site/styles'
import { cn } from '@/lib/utils'

export function LoginForm() {
  const { comingSoon } = useToast()

  return (
    <div className={cn(card, 'w-full max-w-md p-6 sm:p-8')}>
      <h1 className="text-2xl font-extrabold text-navy">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Log in to save your progress and track your improvement.</p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          comingSoon('Login')
        }}
      >
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={inputClass} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-navy">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required minLength={8} placeholder="••••••••" className={inputClass} />
        </div>
        <button type="submit" className={btn('primary', 'lg', 'w-full')}>
          <LogIn aria-hidden="true" />
          Login
        </button>
      </form>

      <p role="note" className="mt-5 flex gap-2 rounded-xl bg-primary-soft p-3 text-xs leading-relaxed text-primary">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        Accounts are coming soon. You can already practise every quiz without logging in.
      </p>

      <Link href="/ai-quiz" className="mt-4 block text-center text-sm font-semibold text-primary hover:underline">
        Continue without an account
      </Link>
    </div>
  )
}
