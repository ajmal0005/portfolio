import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timeline } from '../data/portfolio';

const typeColors: Record<string, { dot: string; bg: string; text: string }> = {
  education: { dot: '#8B5CF6', bg: '#F5F3FF', text: '#6D28D9' },
  leadership: { dot: '#3B82F6', bg: '#EFF6FF', text: '#1D4ED8' },
  award: { dot: '#F59E0B', bg: '#FFFBEB', text: '#92400E' },
  achievement: { dot: '#10B981', bg: '#F0FDF4', text: '#065F46' },
  upcoming: { dot: '#9CA3AF', bg: '#F9FAFB', text: '#6B7280' },
};

const typeLabels: Record<string, string> = {
  education: 'Education',
  leadership: 'Leadership',
  award: '🏆 Award',
  achievement: 'Achievement',
  upcoming: 'Upcoming',
};

export default function Timeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="story" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}
        >
          <p className="type-label" style={{ marginBottom: '0.75rem' }}>Evolution</p>
          <h2 className="type-title">
            How I got
            <br />
            <span className="gradient-text">to this point.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: 720 }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              position: 'absolute',
              left: 'calc(5rem - 1px)',
              top: 0,
              bottom: 0,
              width: 1,
              background: 'linear-gradient(to bottom, var(--lavender-200), var(--border-subtle))',
              transformOrigin: 'top',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {timeline.map((item, i) => {
              const colors = typeColors[item.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '5rem 1fr',
                    gap: '2rem',
                    position: 'relative',
                    paddingBottom: i < timeline.length - 1 ? '2rem' : '0',
                  }}
                >
                  {/* Year */}
                  <div style={{
                    textAlign: 'right',
                    paddingTop: '0.1rem',
                    position: 'relative',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      color: item.type === 'upcoming' ? 'var(--text-faint)' : 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}>{item.year}</span>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute',
                      right: -17,
                      top: '0.35rem',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: colors.dot,
                      border: '2px solid var(--bg-surface)',
                      boxShadow: `0 0 0 3px ${colors.dot}25`,
                      zIndex: 1,
                    }} />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      background: 'var(--bg-root)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 1.25rem',
                      opacity: item.type === 'upcoming' ? 0.6 : 1,
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'var(--border-default)';
                      el.style.background = colors.bg;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'var(--border-subtle)';
                      el.style.background = 'var(--bg-root)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                      }}>{item.title}</span>
                      <span style={{
                        padding: '0.1rem 0.5rem',
                        background: colors.bg,
                        color: colors.text,
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-sans)',
                        border: `1px solid ${colors.dot}30`,
                      }}>{typeLabels[item.type]}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--lavender-500)', fontWeight: 600, marginBottom: '0.35rem' }}>{item.org}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
