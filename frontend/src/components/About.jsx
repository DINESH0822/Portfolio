import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, GraduationCap, Award, Briefcase, Cpu, BookOpen } from 'lucide-react';

// Counter that animates from 0 to target
function Counter({ target, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const num = parseFloat(target);
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(+(num * ease).toFixed(1));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { icon: Code2, label: 'Projects Built', value: 4, suffix: '+', color: '#2563EB', bg: '#EFF6FF' },
  { icon: Award, label: 'Certifications', value: 4, suffix: '+', color: '#7C3AED', bg: '#F5F3FF' },
  { icon: Briefcase, label: 'Internships', value: 1, suffix: '', color: '#059669', bg: '#ECFDF5' },
  { icon: GraduationCap, label: 'Current CGPA', value: 7.5, suffix: '', color: '#DC2626', bg: '#FEF2F2' },
];

const highlights = [
  { icon: Cpu, title: 'Full Stack Development', desc: 'Java, Spring Boot, React, FastAPI — end-to-end application development.' },
  { icon: BookOpen, title: 'AI & Machine Learning', desc: 'Practical experience with LLMs, RAG systems, and Agentic AI workflows through IBM SkillsBuild internship.' },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative">
      {/* subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DBEAFE] to-transparent" />

      <div className="section-container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Turning ideas into{' '}
              <span className="text-gradient">scalable products</span>
            </h2>
            <p className="section-subtitle">
              I'm a Computer Science Engineering student at Kuppam Engineering College with a passion
              for building web applications that solve real problems. I thrive at the intersection of
              engineering, design, and AI.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map(({ icon: Icon, label, value, suffix, color, bg }) => (
              <motion.div
                key={label}
                className="glass-card-strong rounded-2xl p-6 text-center card-shadow group cursor-default"
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(37,99,235,0.10)' }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div className="text-3xl font-black text-[#111827]">
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-xs text-[#6B7280] font-semibold mt-1 uppercase tracking-wider">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bio + highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} className="space-y-5">
              <h3 className="text-2xl font-bold text-[#111827]">Who I am</h3>
              <p className="text-[#6B7280] leading-relaxed text-base">
                I am a passionate software developer who believes that great products are built at the
                intersection of technical excellence and thoughtful design. I enjoy working across the
                full stack — from designing database schemas to crafting pixel-perfect user interfaces.
              </p>
              <p className="text-[#6B7280] leading-relaxed text-base">
                Currently pursuing B.Tech in Computer Science Engineering (2023–2027) at Kuppam
                Engineering College, I continuously improve my skills through real-world projects,
                AI virtual internships, and exploring cutting-edge technologies like Retrieval-Augmented
                Generation and Agentic AI.
              </p>

              {/* Timeline quick facts */}
              <div className="space-y-3 pt-2">
                {[
                  ['🎓', 'B.Tech CSE', 'Kuppam Engineering College (2023–2027)'],
                  ['🤖', 'AI Intern', 'IBM SkillsBuild | AICTE | 1M1B (May–July 2026)'],
                ].map(([emoji, title, sub]) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{emoji}</span>
                    <div>
                      <div className="font-semibold text-[#111827] text-sm">{title}</div>
                      <div className="text-[#6B7280] text-xs">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  className="glass-card rounded-2xl p-6 card-shadow group"
                  whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(37,99,235,0.08)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563EB] transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111827] text-sm mb-1">{title}</h4>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Tech pills */}
              <div className="glass-card rounded-2xl p-6 card-shadow">
                <h4 className="font-bold text-[#111827] text-sm mb-3">Core Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'React', 'FastAPI', 'MongoDB', 'Python', 'Tailwind CSS', 'Hibernate'].map((t) => (
                    <span key={t} className="px-3 py-1 bg-[#F8FAFC] border border-[#E2E8F0] text-[#374151] text-xs font-medium rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
