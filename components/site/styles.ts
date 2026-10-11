import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30 hover:-translate-y-px',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
  outline: 'border border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary-soft hover:text-primary',
  ghost: 'text-foreground hover:bg-muted',
  light: 'bg-white text-navy shadow-sm hover:bg-white/90 hover:-translate-y-px',
  'outline-light': 'border border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-white/40',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function btn(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

export const card =
  'rounded-2xl border border-border bg-card shadow-[0_1px_2px_oklch(0.2_0.06_264/0.04),0_8px_24px_-12px_oklch(0.2_0.06_264/0.12)]'

export const cardHover =
  'transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_2px_4px_oklch(0.2_0.06_264/0.05),0_20px_40px_-16px_oklch(0.5_0.2_262/0.3)]'

export const inputClass =
  'h-11 w-full rounded-xl border border-input bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground/80 transition-colors outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 aria-invalid:border-destructive aria-invalid:ring-destructive/15'
