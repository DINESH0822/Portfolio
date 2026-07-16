import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';

// Tech stack icons as SVG strings for floating elements
const floatingIcons = [
  { label: 'Java', color: '#E76F51', bg: '#FFF3EE', x: '8%', y: '20%', size: 52, delay: 0 },
  { label: 'React', color: '#61DAFB', bg: '#E0F7FF', x: '85%', y: '15%', size: 48, delay: 0.5 },
  { label: 'Spring', color: '#6AAD3D', bg: '#F0FFF0', x: '90%', y: '55%', size: 44, delay: 1.2 },
  { label: 'Python', color: '#3776AB', bg: '#EBF4FF', x: '5%', y: '60%', size: 46, delay: 0.8 },
  { label: 'MongoDB', color: '#47A248', bg: '#F0FFF4', x: '12%', y: '82%', size: 40, delay: 1.5 },
  { label: 'TS', color: '#3178C6', bg: '#EBF4FF', x: '82%', y: '80%', size: 40, delay: 0.3 },
];

function FloatingIcon({ label, color, bg, x, y, size, delay }) {
  return (
    <motion.div
      className="absolute hidden lg:flex items-center justify-center rounded-2xl font-bold text-sm select-none cursor-default"
      style={{
        left: x, top: y, width: size, height: size,
        backgroundColor: bg, color: color,
        boxShadow: `0 4px 16px ${color}20`,
        border: `1px solid ${color}25`,
        fontSize: size > 44 ? '11px' : '10px',
      }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{
        opacity: 0.85,
        scale: 1,
        y: [0, -12, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay: delay + 0.5, duration: 3 + delay * 0.5, repeat: Infinity, ease: 'easeInOut' },
        rotate: { delay: delay + 0.5, duration: 4 + delay * 0.3, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {label}
    </motion.div>
  );
}

// Canvas particle background
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
    }));
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37,99,235,0.18)';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${0.06 * (1 - d / 100)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// Typing animation hook
function useTyping(phrases, speed = 80) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    } else if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }
    setText(current.slice(0, charIdx));
  }, [charIdx, deleting, phraseIdx, phrases, speed]);

  useEffect(() => { setText(phrases[phraseIdx].slice(0, charIdx)); }, [charIdx, phraseIdx, phrases]);
  return text;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const typedText = useTyping(['Java Full Stack Developer', 'AI Enthusiast', 'Software Engineer'], 70);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8FAFC]">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob absolute top-0 -left-32 w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute top-0 -right-32 w-[500px] h-[500px] bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-32 left-1/2 w-[400px] h-[400px] bg-sky-100/40 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Floating tech icons */}
      {floatingIcons.map((icon) => <FloatingIcon key={icon.label} {...icon} />)}

      {/* Main content */}
      <div className="relative z-10 section-container text-center pt-28 pb-16">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6">

          {/* Status badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] text-xs font-bold tracking-widest uppercase shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
              </span>
              Available for Placements & Internships
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#111827] leading-none">
            M{' '}
            <span className="text-gradient">DINESH</span>
          </motion.h1>

          {/* Typed subtitle */}
          <motion.div variants={item} className="h-10 flex items-center justify-center">
            <p className="text-xl sm:text-2xl font-bold text-[#374151]">
              <span className="typing-cursor">{typedText}</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p variants={item} className="text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-2xl">
            Computer Science Engineering student at Kuppam Engineering College, passionate about
            building scalable web applications using Java, React, Spring Boot, Python FastAPI and
            modern technologies. Interested in Full Stack Development, AI applications and building
            practical software solutions.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <motion.button
              onClick={() => scrollTo('projects')}
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a
              href="/M_DINESH_Resume.html"
              download="M_DINESH_Resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </motion.a>

            <motion.button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[#6B7280] hover:text-[#2563EB] font-semibold rounded-xl transition-all duration-200 hover:bg-[#EFF6FF]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </motion.button>
          </motion.div>

          {/* Quick stats */}
          <motion.div variants={item} className="flex items-center gap-8 mt-4 pt-6 border-t border-[#E2E8F0] w-full max-w-md justify-center">
            {[['B.Tech CSE', '2023–2027'], ['CGPA', '7.5/10'], ['Projects', '4+']].map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-xl font-black text-[#111827]">{v}</div>
                <div className="text-xs text-[#9CA3AF] font-medium mt-0.5">{k}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollTo('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#9CA3AF] hover:text-[#2563EB] transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}
