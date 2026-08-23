import { cn } from '@/lib/utils'

const WIDTH = 1800
const HEIGHT = 1200

export function StudioPhoto({
  className,
  priority,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <picture>
      <source srcSet="/studio.webp" type="image/webp" />
      <img
        src="/studio.jpg"
        alt="The two people behind Peyote Labs, Warsaw"
        width={WIDTH}
        height={HEIGHT}
        className={cn('block h-auto w-full', className)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}
