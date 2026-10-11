import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to Rank Rise to save your progress and track your performance.',
}

export default function LoginPage() {
  return (
    <div className="bg-hero">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </div>
  )
}
