import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

const categoryIcons: Record<string, string> = {
  'Machine Learning': '⬡',
  'Full-Stack': '◈',
  'Databases': '◎',
  'Systems & Hardware': '△',
  'Web3': '◇',
  'Developer Tools': '⊕',
};

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  'Machine Learning': { bg: '#F5F3FF', border: '#C4B5FD', text: '#6D28D9' },
  'Full-Stack': { bg: '#EFF6FF', border: '#93C5FD', text: '#1D4ED8' },
  'Databases': { bg: '#F0FDF4', border: '#86EFAC', text: '#16A34A' },
  'Systems & Hardware': { bg: '#FFF7ED', border: '#FCA5A5', text: '#B45309' },
  'Web3': { bg: '#FDF4FF', border: '#E879F9', text: '#9333EA' },
  'Developer Tools': { bg: '#F8FAFC', border: '#CBD5E1', text: '#475569' },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="craft" className="section" style={{ background: 'var(--bg-root)' }}>
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)', maxWidth: 560 }}
        >
          <p className="type-label" style={{ marginBottom: '0.75rem' }}>My Toolkit</p>
          <h2 className="type-title">
            The stack behind
            <br />
            <span className="gradient-text">the systems.</span>
          </h2>
          <p className="type-small" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            Click a category to explore. No progress bars — just the tools I actually use.
          </p>
        </motion.div>

        {/* Category grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '1rem',
        }}>
          {Object.entries(skills).map(([category, items], i) => {
            const colors = categoryColors[category];
            const isActive = activeCategory === category;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                onClick={() => setActiveCategory(isActive ? null : category)}
                style={{
                  background: isActive ? colors.bg : 'var(--bg-surface)',
                  border: `1px solid ${isActive ? colors.border : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: isActive ? `0 4px 20px ${colors.border}44` : 'var(--shadow-sm)',
                }}
              >
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    color: isActive ? colors.text : 'var(--lavender-400)',
                  }}>{categoryIcons[category]}</span>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: isActive ? colors.text : 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}>{category}</span>
                  <span style={{ flex: 1 }} />
                  <motion.span
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: 'var(--text-faint)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.span>
                </div>

                {/* Tech chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {items.map((tech, j) => (
                    <motion.span
                      key={tech}
                      initial={false}
                      animate={isActive
                        ? { opacity: 1, scale: 1, y: 0 }
                        : { opacity: j < 4 ? 1 : 0.5, scale: j < 4 ? 1 : 0.95, y: 0 }
                      }
                      transition={{ duration: 0.25, delay: isActive ? j * 0.03 : 0 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.25rem 0.7rem',
                        background: isActive ? `${colors.text}15` : 'var(--lavender-50)',
                        color: isActive ? colors.text : 'var(--accent-primary)',
                        border: `1px solid ${isActive ? colors.border : 'var(--border-subtle)'}`,
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Core concepts strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            marginTop: '2.5rem',
            padding: '1.5rem 2rem',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Core Concepts</p>
          {['Data Structures', 'DBMS', 'Object-Oriented Programming', 'Problem Solving', 'Statistical Analysis', 'EDA'].map((c) => (
            <span key={c} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-body)' }}>{c}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
