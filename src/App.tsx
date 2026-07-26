import './index.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Easter egg: Konami code
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function EasterEgg({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(30,27,75,0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.6 }}
        style={{ fontSize: '4rem' }}
      >🎉</motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.03em',
          textAlign: 'center',
        }}
      >You found the easter egg.</motion.p>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}
      >Congrats, recruiter. That curiosity? I like it. — Ajmal</motion.p>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}
      >Click anywhere to close</motion.span>
    </motion.div>
  );
}

export default function App() {
  const [easterEgg, setEasterEgg] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  // Konami code detector
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiProgress]) {
        const next = konamiProgress + 1;
        if (next === KONAMI.length) {
          setEasterEgg(true);
          setKonamiProgress(0);
        } else {
          setKonamiProgress(next);
        }
      } else {
        setKonamiProgress(0);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [konamiProgress]);

  // Console easter egg
  useEffect(() => {
    console.log(
      '%c👋 Hey, fellow dev.',
      'color: #8B5CF6; font-size: 18px; font-weight: bold; font-family: monospace;'
    );
    console.log(
      '%cYou found the console. Nice instinct.\nI\'m Muhammed Ajmal P — aspiring ML/backend engineer.\nIf you\'re reading this, you probably appreciate curiosity.\nLet\'s talk: muhammedajmalp395@gmail.com',
      'color: #A78BFA; font-size: 13px; font-family: monospace; line-height: 1.8;'
    );
    console.log(
      '%c⬡ github.com/ajmal0005  |  linkedin.com/in/mhddajmal',
      'color: #C4B5FD; font-size: 12px; font-family: monospace;'
    );
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {easterEgg && <EasterEgg onClose={() => setEasterEgg(false)} />}
      </AnimatePresence>
    </div>
  );
}
