import { brand } from '@/lib/brand'
import { cn } from '@/lib/utils'

/**
 * Peyote Labs mark — a faceted crystal. Edges catch clay/sand light
 * against a warm stone ground.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('h-8 w-8', className)}
      role="img"
      aria-label="Peyote Labs"
    >
      <defs>
        <linearGradient id="pl-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={brand.accentLight} />
          <stop offset="1" stopColor={brand.accentDeep} />
        </linearGradient>
      </defs>
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="8"
        fill={brand.mark}
        stroke={brand.border}
      />
      <g
        fill="none"
        stroke="url(#pl-edge)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M24 9 L37 17 L37 31 L24 39 L11 31 L11 17 Z" />
        <path
          d="M24 9 L24 24 M11 17 L24 24 L37 17 M11 31 L24 24 L37 31"
          strokeWidth="1"
          opacity="0.75"
        />
        <path d="M24 24 L24 39" strokeWidth="1" opacity="0.55" />
      </g>
      <circle cx="24" cy="24" r="1.6" fill={brand.accent} />
    </svg>
  )
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-display text-[1.05rem] leading-none tracking-tight">
        <span className="font-medium text-foreground">Peyote</span>
        {' '}
        <span className="italic text-muted-foreground">Labs</span>
      </span>
    </span>
  )
}
