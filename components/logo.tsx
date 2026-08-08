import { cn } from '@/lib/utils'

/**
 * Peyote Labs mark — a faceted crystalline polyhedron with a teal edge glow
 * and internal lattice lines, matching the LinkedIn brand system.
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
          <stop offset="0" stopColor="#2fe6c8" />
          <stop offset="1" stopColor="#1ab89e" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="11" fill="#0b1214" stroke="rgba(255,255,255,0.09)" />
      <g
        fill="none"
        stroke="url(#pl-edge)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* outer crystal */}
        <path d="M24 9 L37 17 L37 31 L24 39 L11 31 L11 17 Z" />
        {/* internal lattice */}
        <path d="M24 9 L24 24 M11 17 L24 24 L37 17 M11 31 L24 24 L37 31" strokeWidth="1" opacity="0.75" />
        <path d="M24 24 L24 39" strokeWidth="1" opacity="0.55" />
      </g>
      <circle cx="24" cy="24" r="1.6" fill="#2fe6c8" />
    </svg>
  )
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm font-bold tracking-[0.24em] text-foreground">
          PEYOTE
        </span>
        <span className="mt-1 h-px w-full bg-accent/70" aria-hidden />
        <span className="mt-1 font-display text-sm font-bold tracking-[0.34em] text-muted-foreground">
          LABS
        </span>
      </span>
    </span>
  )
}
