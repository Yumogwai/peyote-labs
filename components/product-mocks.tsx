import { cn } from '@/lib/utils'

/** Stylized JobCommand pipeline board. */
export function PipelineMock({ className }: { className?: string }) {
  const columns = [
    { name: 'Saved', count: 8, cards: ['Frontend Eng · Nordic', 'Product Eng · Vela'] },
    { name: 'Applied', count: 5, cards: ['ML Engineer · Corta', 'Full-stack · Lumen'] },
    { name: 'Interview', count: 2, cards: ['Senior Eng · Apex'] },
    { name: 'Offer', count: 1, cards: ['Staff Eng · Rune'] },
  ]
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-surface/80 shadow-2xl shadow-black/40',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-3 text-xs text-muted-foreground">JobCommand — Pipeline</span>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
        {columns.map((col) => (
          <div key={col.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {col.name}
              </span>
              <span className="rounded bg-surface-2 px-1.5 text-[10px] text-muted-foreground">
                {col.count}
              </span>
            </div>
            {col.cards.map((c) => (
              <div
                key={c}
                className="rounded-md border border-border bg-surface-2 p-2.5 text-[11px] leading-snug text-foreground/90"
              >
                <span className="mb-1.5 block h-1 w-8 rounded-full bg-accent/70" />
                {c}
              </div>
            ))}
            {col.name === 'Offer' && (
              <div className="rounded-md border border-accent/30 bg-accent/10 p-2.5 text-[11px] text-accent">
                Offer received
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Stylized WellFitCV tailoring view: job description → tailored resume. */
export function ResumeMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-surface/80 shadow-2xl shadow-black/40',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-3 text-xs text-muted-foreground">WellFitCV — Tailor</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-surface-2 p-3">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Job description
          </span>
          <div className="mt-3 space-y-1.5">
            {[90, 70, 82, 60, 76].map((w, i) => (
              <span
                key={i}
                className="block h-1.5 rounded-full bg-muted-foreground/20"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-md border border-accent/30 bg-accent/5 p-3">
          <span className="text-[11px] font-medium uppercase tracking-wider text-accent">
            Tailored resume
          </span>
          <div className="mt-3 space-y-1.5">
            {[85, 92, 64, 88].map((w, i) => (
              <span
                key={i}
                className="block h-1.5 rounded-full bg-accent/50"
                style={{ width: `${w}%` }}
              />
            ))}
            <span className="mt-3 inline-flex items-center gap-1.5 rounded bg-surface px-2 py-1 text-[10px] text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              ATS-parseable · from real experience
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
