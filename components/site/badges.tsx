import { FlaskConical } from 'lucide-react'
import type { Difficulty, Importance } from '@/lib/types'
import { cn } from '@/lib/utils'

const pill = 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap'

export function DemoBadge({ label = 'Demo data', tone = 'default', className }: { label?: string; tone?: 'default' | 'dark'; className?: string }) {
  return (
    <span
      className={cn(
        pill,
        'border border-dashed',
        tone === 'dark' ? 'border-white/30 bg-white/10 text-white/85' : 'border-warning/40 bg-warning-soft text-warning',
        className,
      )}
    >
      <FlaskConical className="size-3" aria-hidden="true" />
      {label}
    </span>
  )
}

const IMPORTANCE_STYLES: Record<Importance, string> = {
  'Very High': 'bg-danger-soft text-destructive',
  High: 'bg-warning-soft text-warning',
  Medium: 'bg-primary-soft text-primary',
}

export function ImportanceBadge({ level, className }: { level: Importance; className?: string }) {
  return <span className={cn(pill, IMPORTANCE_STYLES[level], className)}>{level}</span>
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: 'bg-success-soft text-success',
  Medium: 'bg-warning-soft text-warning',
  Hard: 'bg-danger-soft text-destructive',
}

export function DifficultyBadge({ level, className }: { level: Difficulty; className?: string }) {
  return <span className={cn(pill, DIFFICULTY_STYLES[level], className)}>{level}</span>
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn(pill, 'bg-muted text-muted-foreground', className)}>{children}</span>
}
