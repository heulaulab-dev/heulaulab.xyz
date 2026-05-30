export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-void)',
        padding: '48px 24px',
        borderTop: '1px solid var(--color-rule)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
        <span
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '12px',
            color: 'var(--color-muted)',
          }}
        >
          © 2026
        </span>
      </div>
    </footer>
  )
}