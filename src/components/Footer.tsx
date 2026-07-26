import { personal } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '2rem 0',
      background: 'var(--bg-root)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <span style={{
            width: 24,
            height: 24,
            background: 'linear-gradient(135deg, var(--lavender-500), var(--lavender-300))',
            borderRadius: 7,
            display: 'grid',
            placeItems: 'center',
            fontSize: '0.6rem',
            color: '#fff',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
          }}>MA</span>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}>
            {personal.name} · {year}
          </span>
        </div>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          color: 'var(--text-faint)',
        }}>
          Built with React · Vite · Framer Motion · TailwindCSS
        </p>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          {[
            { label: 'GitHub', href: personal.github },
            { label: 'LinkedIn', href: personal.linkedin },
            { label: 'Email', href: `mailto:${personal.email}` },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
