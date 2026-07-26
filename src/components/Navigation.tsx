import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '../data/portfolio';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Craft', href: '#craft' },
  { label: 'Story', href: '#story' },
  { label: 'Connect', href: '#connect' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          background: scrolled
            ? 'rgba(247,246,255,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(139,92,246,0.08)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{
              width: 28,
              height: 28,
              background: 'linear-gradient(135deg, var(--lavender-500), var(--lavender-300))',
              borderRadius: 8,
              display: 'grid',
              placeItems: 'center',
              fontSize: '0.7rem',
              color: '#fff',
              fontWeight: 800,
            }}>MA</span>
            {personal.nameShort}
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="hidden-mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: active === link.href ? 'var(--lavender-600)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  padding: '0.5rem 0.875rem',
                  borderRadius: 'var(--radius-full)',
                  transition: 'all 0.2s',
                  background: active === link.href ? 'var(--lavender-100)' : 'transparent',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = 'var(--text-primary)';
                  el.style.background = 'var(--lavender-50)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = active === link.href ? 'var(--lavender-600)' : 'var(--text-muted)';
                  el.style.background = active === link.href ? 'var(--lavender-100)' : 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={`mailto:${personal.email}`}
              className="btn-primary hidden-mobile"
              style={{ fontSize: '0.82rem', padding: '0.55rem 1.25rem' }}
            >
              Get in touch
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="show-mobile"
              style={{
                background: 'var(--lavender-100)',
                border: '1px solid var(--border-default)',
                borderRadius: 10,
                width: 40,
                height: 40,
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <motion.rect
                  animate={{ y: menuOpen ? 5 : 0, rotate: menuOpen ? 45 : 0 }}
                  x="0" y="0" width="18" height="2" rx="1"
                  fill="currentColor"
                  style={{ transformOrigin: '9px 1px' }}
                />
                <motion.rect
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  x="0" y="6" width="14" height="2" rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={{ y: menuOpen ? -5 : 0, rotate: menuOpen ? -45 : 0 }}
                  x="0" y="12" width="18" height="2" rx="1"
                  fill="currentColor"
                  style={{ transformOrigin: '9px 13px' }}
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(247,246,255,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  letterSpacing: '-0.03em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${personal.email}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navLinks.length * 0.06 + 0.05 }}
              className="btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={() => setMenuOpen(false)}
            >
              Get in touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: grid !important; }
        }
      `}</style>
    </>
  );
}
