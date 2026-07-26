import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../data/portfolio';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const links = [
    {
      label: 'GitHub',
      href: personal.github,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.572C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      desc: 'github.com/ajmal0005',
    },
    {
      label: 'LinkedIn',
      href: personal.linkedin,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      desc: 'linkedin.com/in/mhddajmal',
    },
    {
      label: 'Email',
      href: `mailto:${personal.email}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="3"/>
          <path d="M2 7l10 7.5L22 7"/>
        </svg>
      ),
      desc: personal.email,
    },
  ];

  return (
    <section id="connect" className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container" ref={ref}>
        <div style={{
          maxWidth: 700,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="type-label" style={{ marginBottom: '0.75rem' }}>Let's Connect</p>
            <h2 className="type-title" style={{ marginBottom: '1.5rem' }}>
              Building something
              <br />
              <span className="gradient-text">interesting?</span>
            </h2>
            <p className="type-body" style={{ color: 'var(--text-muted)', maxWidth: 460, margin: '0 auto 3rem' }}>
              I'm actively looking for internships and full-time roles in software engineering, backend, AI, or data science. If you're building something ambitious — I'd love to be part of it.
            </p>
          </motion.div>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ marginBottom: '3rem' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.6rem 0.6rem 1.5rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-md)',
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-body)',
              }}>{personal.email}</span>
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.55rem 1.25rem',
                  background: copied ? '#10B981' : 'var(--text-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="3" width="9" height="10" rx="2" stroke="white" strokeWidth="1.2"/>
                      <path d="M4 3V2a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1" stroke="white" strokeWidth="1.2"/>
                    </svg>
                    Copy email
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.8rem 1.25rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--border-strong)';
                  el.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--border-subtle)';
                  el.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <span style={{ color: 'var(--lavender-500)' }}>{link.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{link.label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{link.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
