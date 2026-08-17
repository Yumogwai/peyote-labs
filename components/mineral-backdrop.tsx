import { brand } from '@/lib/brand'
import { cn } from '@/lib/utils'

/**
 * Mineral atmosphere — sedimentary strata, a sun-on-stone wash,
 * and (on the hero) a crystal inclusion with quartz veins.
 */
export function MineralBackdrop({
  density = 'quiet',
  className,
}: {
  density?: 'hero' | 'quiet'
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className="mineral-wash absolute inset-0" />
      <div className="mineral-strata absolute inset-0" />
      {density === 'hero' && (
        <>
          <CrystalInclusion />
          <QuartzVeins />
        </>
      )}
    </div>
  )
}

function CrystalInclusion() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="absolute -right-[16%] top-[-10%] h-[108%] w-auto text-muted-foreground"
      style={{
        opacity: 0.38,
        maskImage: 'linear-gradient(100deg, transparent 8%, black 48%)',
        WebkitMaskImage: 'linear-gradient(100deg, transparent 8%, black 48%)',
      }}
    >
      <defs>
        <clipPath id="pl-crystal-clip">
          <path d="M24 9 L37 17 L37 31 L24 39 L11 31 L11 17 Z" />
        </clipPath>
        <linearGradient id="pl-facet-lit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="pl-gleam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1e9dc" stopOpacity="0" />
          <stop offset="0.46" stopColor="#f1e9dc" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f1e9dc" stopOpacity="0.7" />
          <stop offset="0.54" stopColor="#f1e9dc" stopOpacity="0" />
          <stop offset="1" stopColor="#f1e9dc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
        <path fill="url(#pl-facet-lit)" stroke="none" d="M24 9 L37 17 L24 24 Z" />
        <path fill="currentColor" fillOpacity="0.05" stroke="none" d="M37 17 L37 31 L24 24 Z" />
        <path fill="#000" fillOpacity="0.12" stroke="none" d="M37 31 L24 39 L24 24 Z" />
        <path fill="#000" fillOpacity="0.18" stroke="none" d="M24 39 L11 31 L24 24 Z" />
        <path fill="#000" fillOpacity="0.1" stroke="none" d="M11 31 L11 17 L24 24 Z" />
        <path fill="currentColor" fillOpacity="0.03" stroke="none" d="M11 17 L24 9 L24 24 Z" />
        <path
          fill="none"
          strokeWidth="0.28"
          strokeOpacity="0.28"
          d="M24 9 L37 17 L37 31 L24 39 L11 31 L11 17 Z"
        />
        <path
          fill="none"
          strokeWidth="0.18"
          strokeOpacity="0.14"
          d="M24 9 L24 24 M11 17 L24 24 L37 17 M11 31 L24 24 L37 31 M24 24 L24 39"
        />
      </g>
      <g clipPath="url(#pl-crystal-clip)" className="mineral-gleam-layer">
        <rect
          className="mineral-gleam"
          x="-24"
          y="-24"
          width="96"
          height="96"
          fill="url(#pl-gleam)"
        />
      </g>
    </svg>
  )
}

function QuartzVeins() {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <g
        fill="none"
        stroke={brand.sand}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-20 168 C 180 140, 340 210, 520 176 C 720 138, 880 198, 1220 150" strokeWidth="1.1" opacity="0.22" />
        <path d="M-20 176 C 200 158, 360 228, 540 190 C 740 148, 900 214, 1220 164" strokeWidth="0.6" opacity="0.12" />
        <path d="M80 520 C 280 470, 460 560, 680 500 C 860 452, 1020 530, 1240 490" strokeWidth="0.9" opacity="0.16" />
        <path d="M420 -10 C 450 120, 390 260, 470 400 C 530 510, 500 600, 560 720" strokeWidth="0.7" opacity="0.14" />
        <path d="M900 40 C 860 180, 940 300, 880 430 C 840 530, 910 620, 870 740" strokeWidth="0.55" opacity="0.1" />
      </g>
    </svg>
  )
}
