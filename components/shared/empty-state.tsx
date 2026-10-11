import { SearchX, type LucideIcon } from 'lucide-react'

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  action,
}: {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
