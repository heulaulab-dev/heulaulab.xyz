'use client'

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-void)',
        padding: '48px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '18px',
            letterSpacing: '0.05em',
            color: 'var(--color-white)',
          }}
        >
          heulaulab
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <a
            href="mailto:hello@heulaulab.xyz"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '12px',
              color: 'var(--color-muted)',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-white)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-muted)' }}
          >
            hello@heulaulab.xyz
          </a>
          <span
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '12px',
              color: 'var(--color-muted)',
            }}
          >
            {' '}{new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}