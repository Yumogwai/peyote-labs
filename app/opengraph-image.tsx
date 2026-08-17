import { ImageResponse } from 'next/og'
import { brand } from '@/lib/brand'

export const alt = 'Peyote Labs — Practical AI products & growth systems'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function BrandMark() {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 10,
        background: brand.mark,
        border: `1px solid ${brand.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          background: brand.accent,
          transform: 'rotate(45deg)',
          borderRadius: 1,
        }}
      />
    </div>
  )
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: brand.bg,
          padding: '64px 72px',
          fontFamily: 'Georgia, Times New Roman, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <BrandMark />
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: brand.text,
            }}
          >
            <span style={{ fontWeight: 600 }}>Peyote</span>
            <span style={{ fontStyle: 'italic', color: brand.muted, marginLeft: 8 }}>Labs</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 500,
              lineHeight: 1.15,
              color: brand.text,
              maxWidth: 920,
            }}
          >
            Practical AI products. Growth systems that ship.
          </div>
          <div
            style={{
              fontSize: 24,
              color: brand.muted,
              maxWidth: 780,
              lineHeight: 1.4,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Two-person software studio in Warsaw — websites, SEO, creatives, ads, and live SaaS.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: brand.accent,
            fontSize: 20,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <span>peyote-labs.com</span>
          <span style={{ color: brand.muted }}>Warsaw / Studio</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
