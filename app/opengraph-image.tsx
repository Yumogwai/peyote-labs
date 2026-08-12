import { ImageResponse } from 'next/og'

export const alt = 'Peyote Labs — Practical AI products & growth systems'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function BrandMark() {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        background: '#0b1214',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          background: '#2fe6c8',
          transform: 'rotate(45deg)',
          borderRadius: 2,
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
          background: '#070b0c',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <BrandMark />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              letterSpacing: '0.28em',
              fontSize: 18,
              fontWeight: 700,
              color: '#f4f7f6',
            }}
          >
            <span>PEYOTE</span>
            <span style={{ color: '#8a9a96', letterSpacing: '0.34em' }}>LABS</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#f4f7f6',
              maxWidth: 900,
            }}
          >
            Practical AI products. Growth systems that ship.
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#8a9a96',
              maxWidth: 780,
              lineHeight: 1.35,
            }}
          >
            Two-person software studio in Warsaw - websites, SEO, creatives, ads, and live SaaS.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#2fe6c8',
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          <span>peyote-labs.com</span>
          <span style={{ color: '#8a9a96', fontWeight: 500 }}>Warsaw / Studio</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
