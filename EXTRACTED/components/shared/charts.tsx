import { cn } from '@/lib/utils'

export function TrendChart({
  data,
  className,
  tone = 'default',
  title = 'Accuracy trend',
}: {
  data: { label: string; accuracy: number }[]
  className?: string
  tone?: 'default' | 'dark'
  title?: string
}) {
  const width = 600
  const height = 220
  const pad = { top: 16, right: 16, bottom: 30, left: 36 }
  const values = data.map((d) => d.accuracy)
  const yMin = Math.max(0, Math.floor((Math.min(...values) - 8) / 10) * 10)
  const yMax = Math.min(100, Math.ceil((Math.max(...values) + 6) / 10) * 10)
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom
  const x = (i: number) => pad.left + (i / Math.max(1, data.length - 1)) * innerW
  const y = (v: number) => pad.top + (1 - (v - yMin) / (yMax - yMin)) * innerH
  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.accuracy).toFixed(1)}`).join(' ')
  const area = `${line} L${x(data.length - 1)},${pad.top + innerH} L${x(0)},${pad.top + innerH} Z`
  const ticks = Array.from({ length: 5 }, (_, i) => yMin + ((yMax - yMin) / 4) * i)
  const dark = tone === 'dark'
  const gradientId = `trend-${tone}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn('h-auto w-full', className)} role="img" aria-label={`${title}: ${data.map((d) => `${d.label} ${d.accuracy}%`).join(', ')}`}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity={dark ? 0.55 : 0.28} />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke={dark ? 'white' : 'var(--border)'} strokeOpacity={dark ? 0.1 : 1} strokeDasharray="4 4" />
          <text x={pad.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill={dark ? 'white' : 'var(--muted-foreground)'} fillOpacity={dark ? 0.55 : 1}>
            {Math.round(t)}%
          </text>
        </g>
      ))}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke={dark ? 'oklch(0.75 0.13 255)' : 'var(--primary)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={d.label}>
          <circle cx={x(i)} cy={y(d.accuracy)} r="4.5" fill={dark ? 'var(--navy)' : 'white'} stroke={dark ? 'oklch(0.75 0.13 255)' : 'var(--primary)'} strokeWidth="2.5" />
          <text x={x(i)} y={height - 8} textAnchor="middle" fontSize="11" fill={dark ? 'white' : 'var(--muted-foreground)'} fillOpacity={dark ? 0.55 : 1}>
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function ScoreRing({
  value,
  max = 100,
  size = 120,
  stroke = 10,
  label,
  sublabel,
  tone = 'default',
}: {
  value: number
  max?: number
  size?: number
  stroke?: number
  label?: string
  sublabel?: string
  tone?: 'default' | 'dark'
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(1, Math.max(0, value / max))
  const dark = tone === 'dark'
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={dark ? 'white' : 'var(--muted)'} strokeOpacity={dark ? 0.12 : 1} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={dark ? 'var(--highlight)' : 'var(--primary)'}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={cn('font-heading text-2xl font-extrabold', dark ? 'text-white' : 'text-navy')}>{label ?? value}</span>
        {sublabel && <span className={cn('text-[11px] font-medium', dark ? 'text-white/60' : 'text-muted-foreground')}>{sublabel}</span>}
      </div>
    </div>
  )
}

export function ProgressBar({ value, className, barClassName, label }: { value: number; className?: string; barClassName?: string; label?: string }) {
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className={cn('h-full rounded-full bg-primary transition-[width] duration-700 ease-out', barClassName)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

export function accuracyColor(accuracy: number) {
  if (accuracy >= 75) return 'bg-success'
  if (accuracy >= 60) return 'bg-primary'
  return 'bg-warning'
}
