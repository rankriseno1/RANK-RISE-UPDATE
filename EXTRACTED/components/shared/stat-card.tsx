import type { LucideIcon } from 'lucide-react'
import { card } from '@/components/site/styles'
import { cn } from '@/lib/utils'

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = 'primary',
  className,
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  accent?: 'primary' | 'success' | 'warning' | 'danger' | 'navy'
  className?: string
}) {
  const accents = {
    primary: 'bg-primary-soft text-primary',
    success: 'bg-success-soft text-success',
    warning: 'bg-warning-soft text-warning',
    danger: 'bg-danger-soft text-destructive',
    navy: 'bg-navy text-highlight',
  }
  return (
    <div className={cn(card, 'p-5', className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn('flex size-9 items-center justify-center rounded-xl', accents[accent])}>
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 font-heading text-3xl font-extrabold text-navy tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
