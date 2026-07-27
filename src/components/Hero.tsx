import { motion } from 'framer-motion';
import { personal } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-root)',
      }}
    >
      {/* Main content */}
      <div
        className="container hero-grid"
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '5rem',
          alignItems: 'center',
          paddingTop: '7rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Left: Text */}
        <div>
          {/* Status badge */}
          <motion.div {...fadeUp(0.1)} style={{ marginBottom: '1.75rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              background: 'var(--lavender-100)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.76rem',
              fontWeight: 600,
              color: 'var(--accent-primary)',
            }}>
              <span className="glow-dot" />
              {personal.status}
            </span>
          </motion.div>

          {/* Name */}
          <motion.div {...fadeUp(0.2)}>
            <h1 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              Muhammed
              <br />
              <span style={{
                background: 'linear-gradient(135deg, var(--lavender-600) 0%, var(--lavender-400) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Ajmal P</span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.p {...fadeUp(0.28)} style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            marginBottom: '1.25rem',
            letterSpacing: '0.01em',
          }}>
            ML Engineer · Full-Stack Developer · Data Science Student
          </motion.p>

          {/* Tagline */}
          <motion.p {...fadeUp(0.35)} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            color: 'var(--text-body)',
            lineHeight: 1.7,
            maxWidth: 420,
            marginBottom: '2.25rem',
          }}>
            {personal.tagline}
            <br />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>
              Final-year CSE (Data Science) · MACE, Kerala
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.42)} style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href="#work" className="btn-primary">
              See my work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href={personal.github} target="_blank" rel="noreferrer" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.572C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div {...fadeUp(0.52)} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              style={{ color: 'var(--text-faint)' }}
            >
              <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
                <rect x="1" y="1" width="14" height="20" rx="7" stroke="currentColor" strokeWidth="1.5"/>
                <motion.rect
                  animate={{ y: [0, 5, 0], opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  x="6.5" y="4" width="3" height="5" rx="1.5"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
              Scroll to explore
            </span>
          </motion.div>
        </div>

        {/* Right: Professional Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ position: 'relative', flexShrink: 0, display: 'flex', justifyContent: 'center' }}
        >
          {/* Lavender brush stroke background */}
          <div style={{
            position: 'absolute',
            top: '-5%',
            left: '-15%',
            right: '-15%',
            bottom: '-5%',
            background: 'linear-gradient(135deg, var(--lavender-300), var(--lavender-500))',
            WebkitMaskImage: 'url(/brush_mask.png)',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: 'url(/brush_mask.png)',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            zIndex: 0,
            transform: 'rotate(-5deg) scale(1.1)',
          }} />

          {/* Photo container */}
          <div style={{
            width: 'clamp(260px, 28vw, 360px)',
            position: 'relative',
            zIndex: 1,
          }}>
            <img
              src="/ajmal_transparent.png"
              alt="Muhammed Ajmal P — ML Engineer & Full-Stack Developer"
              style={{
                width: '100%',
                aspectRatio: '4/5',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[
            { num: '5+', label: 'Projects Shipped' },
            { num: '1',  label: 'Special Mention Award' },
            { num: '3',  label: 'Hackathons' },
            { num: '2027', label: 'Graduating' },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{
              flex: 1,
              minWidth: 100,
              padding: '1.25rem 1rem',
              borderRight: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.num}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.2rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 820px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-grid > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
