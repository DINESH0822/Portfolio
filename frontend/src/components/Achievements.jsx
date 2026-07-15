import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Users, ChevronRight } from 'lucide-react';

const achievements = [
  {
    emoji: '🏆',
    icon: Award,
    title: '3rd Prize – National Symposium Technical Quiz',
    category: 'Academic Achievement',
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    desc: 'Competed with 100+ teams from engineering institutions across the state. Demonstrated quick technical problem-solving and deep CS fundamentals knowledge.',
    tags: ['Technical Quiz', 'State Level', 'Engineering'],
  },
  {
    emoji: '📄',
    icon: Users,
    title: 'Team Lead – Federated Learning Research',
    category: 'Research & Leadership',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    desc: 'Directed an academic research team compiling guidelines on edge-centric machine learning with focus on privacy preservation and distributed model training.',
    tags: ['Research Paper', 'Federated Learning', 'Team Lead'],
  },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } };

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 lg:py-32 bg-[#F8FAFC] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DBEAFE] to-transparent" />
      <div className="dot-pattern absolute inset-0 opacity-25" />

      <div className="section-container relative">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="section-label">Milestones</span>
            <h2 className="section-title">Achievements</h2>
            <p className="section-subtitle text-base">
              Highlights beyond the classroom — competitions, research, and leadership excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
            {achievements.map((a) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-8 card-shadow group flex flex-col relative overflow-hidden"
                  whileHover={{ y: -6, boxShadow: `0 16px 40px ${a.color}18` }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Decorative corner */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-300"
                    style={{ backgroundColor: a.color }}
                  />

                  {/* Emoji icon */}
                  <div
                    className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mb-6 border relative z-10"
                    style={{ backgroundColor: a.bg, borderColor: a.border }}
                  >
                    {a.emoji}
                  </div>

                  {/* Category label */}
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 relative z-10"
                    style={{ color: a.color }}>
                    {a.category}
                  </p>

                  {/* Title */}
                  <h3 className="font-bold text-[#111827] text-lg leading-snug mb-4 relative z-10 group-hover:text-[#2563EB] transition-colors duration-200">
                    {a.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6B7280] text-sm leading-relaxed flex-1 relative z-10">
                    {a.desc}
                  </p>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                    {a.tags.map((tag) => (
                      <span key={tag}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: a.color, backgroundColor: a.bg, border: `1px solid ${a.border}` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
