import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/** Favicon — simplified crystal mark from LogoMark, readable at 32px. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b1214',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2fe6c8" />
              <stop offset="1" stopColor="#1ab89e" />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#edge)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M24 9 L37 17 L37 31 L24 39 L11 31 L11 17 Z" />
            <path d="M24 9 L24 24 M11 17 L24 24 L37 17 M11 31 L24 24 L37 31" strokeWidth="1.6" />
            <path d="M24 24 L24 39" strokeWidth="1.6" />
          </g>
          <circle cx="24" cy="24" r="2.2" fill="#2fe6c8" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
