'use client'

import { CircleCheck, CircleAlert, Info, X } from 'lucide-react'
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type ToastVariant = 'success' | 'info' | 'warning'

interface ToastItem {
  id: number
  title: string
  description?: string
  variant: ToastVariant
}

interface ToastContextValue {
  toast: (input: { title: string; description?: string; variant?: ToastVariant }) => void
  comingSoon: (feature: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ICONS = { success: CircleCheck, info: Info, warning: CircleAlert }
const ICON_STYLES = { success: 'text-success', info: 'text-primary', warning: 'text-warning' }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback<ToastContextValue['toast']>(
    ({ title, description, variant = 'info' }) => {
      const id = ++nextId.current
      setToasts((current) => [...current.slice(-2), { id, title, description, variant }])
      window.setTimeout(() => dismiss(id), 4200)
    },
    [dismiss],
  )

  const comingSoon = useCallback(
    (feature: string) =>
      toast({ title: `${feature} is coming soon`, description: 'This feature is part of an upcoming Rank Rise release.', variant: 'info' }),
    [toast],
  )

  const value = useMemo(() => ({ toast, comingSoon }), [toast, comingSoon])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
      >
        {toasts.map((t) => {
          const Icon = ICONS[t.variant]
          return (
            <div
              key={t.id}
              role="status"
              className="pointer-events-auto flex w-full max-w-sm animate-in items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-navy/10 duration-300 fade-in slide-in-from-bottom-4"
            >
              <Icon className={cn('mt-0.5 size-5 shrink-0', ICON_STYLES[t.variant])} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-navy">{t.title}</p>
                {t.description && <p className="mt-0.5 text-sm text-muted-foreground">{t.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Dismiss notification"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
