import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, ExternalLink, Hash } from 'lucide-react';

const focusAreas = [
  { label: 'Artificial Intelligence', color: '#2563EB', bg: '#EFF6FF' },
  { label: 'Machine Learning', color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Large Language Models', color: '#059669', bg: '#ECFDF5' },
  { label: 'Retrieval-Augmented Generation', color: '#D97706', bg: '#FFFBEB' },
  { label: 'Agentic AI', color: '#DC2626', bg: '#FEF2F2' },
  { label: 'Sustainability & UN SDGs', color: '#0891B2', bg: '#ECFEFF' },
  { label: 'Responsible AI Use', color: '#4F46E5', bg: '#EEF2FF' },
  { label: 'Real-world Problem Solving', color: '#059669', bg: '#F0FDF4' },
];

const partners = [
  { name: '1M1B', sub: 'One Million for One Billion', color: '#E76F51' },
  { name: 'AICTE', sub: 'All India Council for Technical Education', color: '#2563EB' },
  { name: 'IBM', sub: 'SkillsBuild Platform', color: '#1D4ED8' },
  { name: 'NIP', sub: 'National Internship Portal', color: '#059669' },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Internship() {
  return (
    <section id="internship" className="py-24 lg:py-32 bg-[#F8FAFC] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DBEAFE] to-transparent" />
      <div className="dot-pattern absolute inset-0 opacity-25" />

      <div className="section-container relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="section-label">Experience</span>
            <h2 className="section-title">Internship</h2>
            <p className="section-subtitle text-base">
              Real-world AI application development aligned with global sustainability goals.
            </p>
          </motion.div>

          {/* Main internship card */}
          <motion.div variants={fadeUp} className="bg-white rounded-3xl card-shadow overflow-hidden">
            {/* Top accent gradient */}
            <div className="h-1.5 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA]" />

            <div className="p-8 lg:p-12">
              {/* Company / title row */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-10">
                <div className="flex items-start gap-5">
                  {/* Company icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-200 flex-shrink-0">
                    <span className="text-white font-black text-xl">AI</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest bg-[#EFF6FF] px-3 py-1 rounded-full">
                        Virtual Internship
                      </span>
                      <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-[#111827] leading-tight mt-2">
                      AI for Sustainability
                    </h3>
                    <p className="text-[#6B7280] font-medium mt-1">Virtual Internship Program</p>
                  </div>
                </div>

                {/* Duration badge */}
                <div className="flex flex-col gap-2 lg:text-right">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280] bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2 rounded-xl">
                    <Calendar className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span className="font-semibold">May 2026 – July 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF] px-4">
                    <Hash className="w-3.5 h-3.5" />
                    <span className="font-mono">INTERNSHIP_177676133869e739fae888f</span>
                  </div>
                </div>
              </div>

              {/* Collaborating organizations */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {partners.map((p) => (
                  <div key={p.name} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 text-center">
                    <div className="text-lg font-black" style={{ color: p.color }}>{p.name}</div>
                    <div className="text-[10px] text-[#9CA3AF] mt-1 leading-tight">{p.sub}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 mb-8">
                <p className="text-[#374151] text-sm leading-relaxed">
                  During this internship, I gained practical experience in AI, responsible AI use, and key
                  sustainability concepts aligned with the UN SDGs. Learned to use Agentic AI and RAG
                  (Retrieval-Augmented Generation) systems to solve real-life problems, demonstrating strong
                  problem-solving and impact-driven skills. The internship was listed on the{' '}
                  <span className="font-semibold text-[#111827]">National Internship Portal</span> and
                  supported by AICTE in collaboration with IBM SkillsBuild.
                </p>
              </div>

              {/* Focus areas */}
              <div>
                <h4 className="text-sm font-bold text-[#111827] uppercase tracking-widest mb-4">
                  Core Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <div
                      key={area.label}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all hover:-translate-y-0.5 cursor-default"
                      style={{
                        color: area.color,
                        backgroundColor: area.bg,
                        borderColor: area.color + '25',
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      {area.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate details footer */}
              <div className="mt-8 pt-6 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                  <span>Issue Date: <span className="font-semibold text-[#6B7280]">01.07.2026</span></span>
                  <span>•</span>
                  <span>Issued by: <span className="font-semibold text-[#6B7280]">Dr. Buddha Chandrasekhar, AICTE</span></span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
                  <CheckCircle2 className="w-4 h-4" />
                  Certificate of Completion Awarded
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
