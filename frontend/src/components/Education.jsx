import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const educationData = [
  {
    degree: 'B.Tech – Computer Science Engineering',
    institution: 'Kuppam Engineering College',
    period: '2023 – 2027',
    grade: 'CGPA: 7.5',
    gradeColor: '#2563EB',
    gradeBg: '#EFF6FF',
    icon: GraduationCap,
    iconColor: '#2563EB',
    iconBg: '#EFF6FF',
    dotColor: '#2563EB',
    status: 'Pursuing',
    statusColor: '#2563EB',
    statusBg: '#EFF6FF',
    highlights: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
    ],
    desc: 'Focusing on full-stack development, AI applications, and practical software engineering. Active in research projects including a paper on Federated Learning.',
  },
  {
    degree: 'Intermediate – MPC',
    institution: 'Vikas Junior College',
    period: '2021 – 2023',
    grade: 'Score: 75%',
    gradeColor: '#7C3AED',
    gradeBg: '#F5F3FF',
    icon: Award,
    iconColor: '#7C3AED',
    iconBg: '#F5F3FF',
    dotColor: '#7C3AED',
    status: 'Completed',
    statusColor: '#059669',
    statusBg: '#ECFDF5',
    highlights: ['Mathematics', 'Physics', 'Chemistry'],
    desc: 'Pre-university curriculum with focus on Mathematics, Physics, and Chemistry. Developed strong analytical and logical reasoning skills.',
  },
  {
    degree: 'Secondary School Certificate – SSC',
    institution: 'Adarsha High School',
    period: '2020 – 2021',
    grade: 'Score: 95%',
    gradeColor: '#D97706',
    gradeBg: '#FFFBEB',
    icon: Award,
    iconColor: '#D97706',
    iconBg: '#FFFBEB',
    dotColor: '#D97706',
    status: 'Completed',
    statusColor: '#059669',
    statusBg: '#ECFDF5',
    highlights: ['Top Academic Performance', 'Class Representative'],
    desc: 'Graduated with distinction securing 95%, demonstrating exceptional academic consistency and strong foundational knowledge.',
  },
];

function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = item.icon;

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8">
      {/* Left: connector line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <motion.div
          className="relative z-10 w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-sm"
          style={{ backgroundColor: item.iconBg, borderColor: item.dotColor + '40' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15, type: 'spring', stiffness: 200 }}
        >
          <Icon className="w-5 h-5" style={{ color: item.dotColor }} />
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 mt-2 rounded-full"
            style={{ backgroundColor: item.dotColor + '25' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15 + 0.3 }}
          />
        )}
      </div>

      {/* Right: content card */}
      <motion.div
        className="flex-1 pb-12"
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-white rounded-3xl p-6 card-shadow group hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-[#111827] text-lg leading-snug">{item.degree}</h3>
              <p className="text-[#2563EB] font-semibold text-sm mt-1">{item.institution}</p>
            </div>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <span
                className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ color: item.statusColor, backgroundColor: item.statusBg }}
              >
                {item.status}
              </span>
            </div>
          </div>

          {/* Period & Grade */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-full font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {item.period}
            </div>
            <div
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ color: item.gradeColor, backgroundColor: item.gradeBg }}
            >
              {item.grade}
            </div>
          </div>

          {/* Description */}
          <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{item.desc}</p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {item.highlights.map((h) => (
              <span
                key={h}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#374151]"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-24 lg:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DBEAFE] to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Education</span>
          <h2 className="section-title">Academic Journey</h2>
          <p className="section-subtitle text-base">
            A structured path through foundational sciences to advanced computer engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {educationData.map((item, i) => (
            <TimelineItem key={item.degree} item={item} index={i} isLast={i === educationData.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
