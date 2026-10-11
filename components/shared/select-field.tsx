import { ChevronDown } from 'lucide-react'
import { useId } from 'react'
import { inputClass } from '@/components/site/styles'
import { cn } from '@/lib/utils'

export function SelectField({
  label,
  value,
  onChange,
  options,
  className,
  hideLabel,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
  hideLabel?: boolean
}) {
  const id = useId()
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className={cn('text-xs font-semibold text-navy', hideLabel && 'sr-only')}>
        {label}
      </label>
      <div className="relative">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={cn(inputClass, 'appearance-none pr-10')}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
    </div>
  )
}
