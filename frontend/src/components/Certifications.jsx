import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Cpu, Zap, CheckCircle } from 'lucide-react';

const certs = [
  {
    title: 'Getting Started with AI',
    issuer: 'IBM SkillsBuild',
    badge: '🏅',
    icon: Cpu,
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    url: 'https://www.credly.com/badges/649a39e4-4c30-4a87-845a-0f8a0809f372/whatsapp',
    platform: 'Credly Verified',
  },
  {
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM SkillsBuild',
    badge: '🛡️',
    icon: ShieldCheck,
    color: '#4F46E5',
    bg: '#EEF2FF',
    border: '#C7D2FE',
    url: 'https://www.credly.com/badges/10d09fcc-75ed-4ce4-8604-2af8b743c916/whatsapp',
    platform: 'Credly Verified',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    badge: '🔐',
    icon: ShieldCheck,
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    url: 'https://www.credly.com/badges/67413b14-240f-4f06-98ba-2cba25f60cd8/whatsapp',
    platform: 'Credly Verified',
  },
  {
    title: 'Quantum Fundamentals',
    issuer: 'WISER & Qubitech',
    badge: '⚛️',
    icon: Zap,
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    url: null,
    platform: 'Institutional Certificate',
  },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } };

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 lg:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DBEAFE] to-transparent" />

      <div className="section-container">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="section-label">Credentials</span>
            <h2 className="section-title">Certifications</h2>
            <p className="section-subtitle text-base">
              Verified credentials from globally recognized platforms and institutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((cert) => {
              const Icon = cert.icon;
              const Card = (
                <motion.div
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-7 card-shadow flex flex-col h-full group relative overflow-hidden"
                  whileHover={{ y: -6, boxShadow: `0 16px 40px ${cert.color}18` }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Decorative blob */}
                  <div
                    className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: cert.color }}
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border relative z-10"
                    style={{ backgroundColor: cert.bg, borderColor: cert.border }}
                  >
                    <span className="text-2xl">{cert.badge}</span>
                  </div>

                  {/* Issuer */}
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2 relative z-10"
                    style={{ color: cert.color }}>
                    {cert.issuer}
                  </p>

                  {/* Title */}
                  <h3 className="font-bold text-[#111827] text-base leading-snug flex-1 relative z-10">
                    {cert.title}
                  </h3>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF] font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-[#059669]" />
                      {cert.platform}
                    </div>
                    {cert.url && (
                      <div className="flex items-center gap-1 text-xs font-bold" style={{ color: cert.color }}>
                        <span>Verify</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );

              return cert.url ? (
                <a key={cert.title} href={cert.url} target="_blank" rel="noreferrer" className="block h-full">
                  {Card}
                </a>
              ) : (
                <div key={cert.title} className="h-full">{Card}</div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
