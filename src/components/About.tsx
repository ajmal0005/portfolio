import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../data/portfolio';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const principles = [
    {
      icon: '◈',
      title: 'Systems over solutions',
      desc: 'I design for the whole — data flow, edge cases, failure modes — before writing the first line.',
    },
    {
      icon: '⬡',
      title: 'Intelligence should be visible',
      desc: "A model that can't explain itself is just a black box. I build tools that make reasoning legible.",
    },
    {
      icon: '◎',
      title: 'Privacy by architecture',
      desc: 'Federated learning, on-device inference — I treat privacy as a design constraint, not an afterthought.',
    },
    {
      icon: '△',
      title: 'Real problems. Real stakes.',
      desc: 'Every project I\'ve built solves something that affects actual people: coastal communities, aid recipients, democracy.',
    },
  ];

  return (
    <section id="about" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem, 8vw, 6rem)',
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="type-label"
              style={{ marginBottom: '0.75rem' }}
            >My Journey Through Data</motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="type-title"
              style={{ marginBottom: '2rem' }}
            >
              I think in
              <br />
              <span className="gradient-text">systems.</span>
            </motion.h2>

            {[personal.summary.split('. ').slice(0, 2).join('. ') + '.', personal.summary.split('. ').slice(2).join('. ')].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.12 + i * 0.08 }}
                className="type-body"
                style={{ marginBottom: '1.25rem' }}
              >
                {para}
              </motion.p>
            ))}

            {/* Info grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {[
                { label: 'Location', value: 'Kerala, India' },
                { label: 'Status', value: 'Final Year' },
                { label: 'College', value: 'MACE Kothamangalam' },
                { label: 'Degree', value: 'B.Tech CSE (DS)' },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{item.label}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Principles */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                marginBottom: '1.5rem',
              }}
            >How I think</motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  style={{
                    padding: '1.25rem 1.5rem',
                    background: 'var(--bg-root)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    transition: 'border-color 0.2s, background 0.2s',
                    cursor: 'default',
                  }}
                  whileHover={{ borderColor: 'var(--border-strong)', background: 'var(--lavender-50)' }}
                >
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '1.2rem',
                    color: 'var(--lavender-400)',
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}>{p.icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>{p.title}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 }}
              style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
            >
              {['English', 'Malayalam'].map((lang) => (
                <span key={lang} className="chip">{lang}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
