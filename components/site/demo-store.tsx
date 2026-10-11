'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_SAVED_MATERIALS } from '@/lib/data/user'

export interface AttemptRecord {
  id: string
  title: string
  kind: 'quiz' | 'mock'
  correct: number
  incorrect: number
  unanswered: number
  total: number
  accuracy: number
  score: number
  timeTakenSeconds: number
  completedAt: number
}

interface DemoStore {
  saved: string[]
  isSaved: (id: string) => boolean
  toggleSaved: (id: string) => boolean
  attempts: AttemptRecord[]
  /** False until session data has been restored on the client. */
  hydrated: boolean
  recordAttempt: (attempt: Omit<AttemptRecord, 'id' | 'completedAt'>) => void
  clearAttempts: () => void
}

const DemoStoreContext = createContext<DemoStore | null>(null)
const ATTEMPTS_KEY = 'rank-rise:session-attempts'
const MAX_ATTEMPTS = 50

function isAttemptRecord(value: unknown): value is AttemptRecord {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    (v.kind === 'quiz' || v.kind === 'mock') &&
    ['correct', 'incorrect', 'unanswered', 'total', 'accuracy', 'score', 'timeTakenSeconds', 'completedAt'].every((k) => typeof v[k] === 'number')
  )
}

function readStoredAttempts(): AttemptRecord[] {
  try {
    const parsed: unknown = JSON.parse(window.sessionStorage.getItem(ATTEMPTS_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter(isAttemptRecord).slice(0, MAX_ATTEMPTS) : []
  } catch {
    return []
  }
}

/**
 * Session-only demo state. Attempts are kept in sessionStorage so they survive
 * reloads within the same tab but disappear when the tab closes. Replace with
 * user-scoped database rows once accounts exist.
 */
export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<string[]>(DEFAULT_SAVED_MATERIALS)
  const [attempts, setAttempts] = useState<AttemptRecord[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // sessionStorage is client-only; restore after mount to keep server and client markup identical.
    setAttempts((current) => [...current, ...readStoredAttempts()].slice(0, MAX_ATTEMPTS))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts))
    } catch {
      // Storage can be unavailable (private mode / quota); the in-memory session still works.
    }
  }, [attempts, hydrated])

  const isSaved = useCallback((id: string) => saved.includes(id), [saved])

  const toggleSaved = useCallback(
    (id: string) => {
      const next = !saved.includes(id)
      setSaved((prev) => (next ? [...prev, id] : prev.filter((s) => s !== id)))
      return next
    },
    [saved],
  )

  const recordAttempt = useCallback((attempt: Omit<AttemptRecord, 'id' | 'completedAt'>) => {
    const completedAt = Date.now()
    const id = `${completedAt}-${Math.random().toString(36).slice(2, 8)}`
    setAttempts((prev) => [{ ...attempt, id, completedAt }, ...prev].slice(0, MAX_ATTEMPTS))
  }, [])

  const clearAttempts = useCallback(() => setAttempts([]), [])

  const value = useMemo(
    () => ({ saved, isSaved, toggleSaved, attempts, hydrated, recordAttempt, clearAttempts }),
    [saved, isSaved, toggleSaved, attempts, hydrated, recordAttempt, clearAttempts],
  )

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>
}

export function useDemoStore() {
  const ctx = useContext(DemoStoreContext)
  if (!ctx) throw new Error('useDemoStore must be used inside DemoStoreProvider')
  return ctx
}
