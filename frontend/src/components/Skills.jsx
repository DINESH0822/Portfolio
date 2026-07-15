import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Exact proficiency data as specified
const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    emoji: '⌨️',
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    skills: [
      { name: 'Java', level: 'Advanced', pct: 90 },
      { name: 'Python', level: 'Intermediate', pct: 65 },
      { name: 'JavaScript', level: 'Intermediate', pct: 65 },
      { name: 'SQL', level: 'Advanced', pct: 88 },
      { name: 'C', level: 'Intermediate', pct: 60 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    emoji: '🎨',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    skills: [
      { name: 'React', level: 'Advanced', pct: 88 },
      { name: 'HTML5', level: 'Advanced', pct: 92 },
      { name: 'CSS3', level: 'Advanced', pct: 88 },
      { name: 'Tailwind CSS', level: 'Advanced', pct: 87 },
      { name: 'Vite', level: 'Intermediate', pct: 68 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    emoji: '⚙️',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    skills: [
      { name: 'Spring Boot', level: 'Intermediate', pct: 70 },
      { name: 'FastAPI', level: 'Intermediate', pct: 68 },
      { name: 'Hibernate', level: 'Intermediate', pct: 65 },
      { name: 'JDBC', level: 'Intermediate', pct: 65 },
      { name: 'REST APIs', level: 'Intermediate', pct: 72 },
    ],
  },
  {
    id: 'database',
    title: 'Databases',
    emoji: '🗄️',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    skills: [
      { name: 'MongoDB Atlas', level: 'Intermediate', pct: 68 },
      { name: 'Oracle XE', level: 'Intermediate', pct: 65 },
      { name: 'SQLite', level: 'Intermediate', pct: 62 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & IDE',
    emoji: '🔧',
    color: '#DC2626',
    bg: '#FEF2F2',
    border: '#FECACA',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', pct: 88 },
      { name: 'VS Code', level: 'Advanced', pct: 92 },
      { name: 'Maven', level: 'Intermediate', pct: 65 },
      { name: 'Postman', level: 'Intermediate', pct: 68 },
    ],
  },
];

const levelColors = {
  Advanced: { text: '#2563EB', bg: '#DBEAFE', dot: '#2563EB' },
  Intermediate: { text: '#059669', bg: '#D1FAE5', dot: '#059669' },
};

// Single animated skill bar
function SkillBar({ name, level, pct, color, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const lc = levelColors[level] || levelColors.Intermediate;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#374151]">{name}</span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide"
          style={{ color: lc.text, backgroundColor: lc.bg }}
        >
          {level}
        </span>
      </div>
      <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Skills() {
  const [active, setActive] = useState('all');
  const tabs = [{ id: 'all', label: 'All' }, ...skillCategories.map((c) => ({ id: c.id, label: c.title }))];
  const visible = active === 'all' ? skillCategories : skillCategories.filter((c) => c.id === active);

  return (
    <section id="skills" className="py-24 lg:py-32 bg-[#F8FAFC] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DBEAFE] to-transparent" />
      <div className="dot-pattern absolute inset-0 opacity-30" />

      <div className="section-container relative">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>

          {/* Header */}
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="section-label">Skills</span>
            <h2 className="section-title">Technical Expertise</h2>
            <p className="section-subtitle text-base">
              A carefully curated stack spanning enterprise Java backends, modern JS frontends, and AI-powered APIs.
            </p>
          </motion.div>

          {/* Tab filters */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active === tab.id
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-200'
                    : 'bg-white text-[#6B7280] border border-[#E2E8F0] hover:border-[#BFDBFE] hover:text-[#2563EB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Skill category cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((cat, catIdx) => (
              <motion.div
                key={cat.id}
                layout
                variants={fadeUp}
                className="bg-white rounded-3xl p-7 card-shadow group cursor-default flex flex-col"
                whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(37,99,235,0.10)' }}
                transition={{ duration: 0.2 }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl border"
                    style={{ backgroundColor: cat.bg, borderColor: cat.border }}
                  >
                    {cat.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111827] text-base">{cat.title}</h3>
                    <p className="text-xs text-[#9CA3AF]">{cat.skills.length} skills</p>
                  </div>
                </div>

                {/* Skill bars */}
                <div className="space-y-4 flex-1">
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      {...skill}
                      color={cat.color}
                      delay={catIdx * 0.05 + si * 0.07}
                    />
                  ))}
                </div>

                {/* Footer indicator */}
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                  <div className="flex gap-2 text-[10px] font-semibold">
                    <span className="flex items-center gap-1 text-[#2563EB]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] inline-block" />
                      Advanced
                    </span>
                    <span className="flex items-center gap-1 text-[#059669]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] inline-block" />
                      Intermediate
                    </span>
                  </div>
                  <span className="text-[10px] text-[#9CA3AF]">
                    {cat.skills.filter(s => s.level === 'Advanced').length} advanced
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary bar */}
          <motion.div variants={fadeUp} className="mt-12 bg-white rounded-2xl p-6 card-shadow grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              ['22+', 'Total Skills'],
              ['8', 'Advanced Proficiency'],
              ['14', 'Intermediate Level'],
              ['5', 'Tech Categories'],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-gradient">{num}</div>
                <div className="text-xs text-[#6B7280] font-medium mt-1">{label}</div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
