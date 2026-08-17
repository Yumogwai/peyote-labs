import { ImageResponse } from 'next/og'
import { brand } from '@/lib/brand'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Apple touch icon — full crystal mark for home-screen bookmarks. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: brand.mark,
          borderRadius: 36,
          border: `2px solid ${brand.border}`,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={brand.accentLight} />
              <stop offset="1" stopColor={brand.accentDeep} />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#edge)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M24 9 L37 17 L37 31 L24 39 L11 31 L11 17 Z" />
            <path
              d="M24 9 L24 24 M11 17 L24 24 L37 17 M11 31 L24 24 L37 31"
              strokeWidth="1.2"
              opacity="0.85"
            />
            <path d="M24 24 L24 39" strokeWidth="1.2" opacity="0.65" />
          </g>
          <circle cx="24" cy="24" r="2" fill={brand.accent} />
        </svg>
      </div>
    ),
    { ...size },
  )
}
