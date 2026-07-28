import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // 3D Magnetic Hover Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0, 0.3]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['-100%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp as any}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 0.35s',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        transformPerspective: 1200,
        rotateX,
        rotateY,
        position: 'relative',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 25px 50px -12px rgba(109,40,217,0.25)',
      }}
    >
      {/* Glare layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-20%',
          zIndex: 10,
          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.7) 25%, transparent 30%)',
          opacity: glareOpacity,
          y: glareY,
          pointerEvents: 'none',
        }}
      />

      {/* Project header strip */}
      <div style={{
        background: project.colorLight,
        padding: '2rem 2rem 1.5rem',
        borderBottom: `1px solid ${project.color}22`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Large num watermark */}
        <span style={{
          position: 'absolute',
          right: '1.5rem',
          top: '0.5rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '4.5rem',
          color: `${project.color}18`,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          userSelect: 'none',
        }}>{project.num}</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: project.color,
          }}>{project.category}</span>
          <span style={{ flex: 1 }} />
          <span style={{
            padding: '0.2rem 0.65rem',
            background: `${project.color}18`,
            color: project.color,
            borderRadius: 'var(--radius-full)',
            fontSize: '0.7rem',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            border: `1px solid ${project.color}30`,
          }}>{project.status}</span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.6rem',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '0.3rem',
          lineHeight: 1.1,
        }}>{project.title}</h3>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          fontWeight: 500,
        }}>{project.subtitle}</p>
      </div>

      {/* Content */}
      <div style={{ padding: '1.75rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
        }}>"{project.tagline}"</p>

        {/* Problem */}
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>The Problem</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{project.problem}</p>
        </div>

        {/* Architecture */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.875rem 1rem',
          border: '1px solid var(--border-subtle)',
        }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: project.color, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Architecture</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{project.architecture}</p>
        </div>

        {/* Award badge if exists */}
        {project.award && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 0.875rem',
            background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #FCD34D44',
          }}>
            <span style={{ fontSize: '1rem' }}>🏆</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 600, color: '#92400E' }}>{project.award}</span>
          </div>
        )}

        {/* Tech stack */}
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Stack</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {project.stack.map((tech) => (
              <span key={tech} className="chip" style={{ fontSize: '0.72rem' }}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Highlights</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {project.highlights.map((h) => (
              <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--text-body)' }}>
                <span style={{ color: project.color, marginTop: 3, flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.6rem',
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--lavender-100)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-subtle)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.572C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="work" className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <p className="type-label" style={{ marginBottom: '0.75rem' }}>Things I've Built</p>
          <h2 className="type-title" style={{ maxWidth: 560, marginBottom: '1rem' }}>
            Every project is a
            <br />
            <span className="gradient-text">system in motion.</span>
          </h2>
          <p className="type-body" style={{ maxWidth: 520, color: 'var(--text-muted)' }}>
            From coastal IoT alerts to federated learning architectures — I build things that convert data into decisions people can act on.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
