import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Check, Star, Filter } from 'lucide-react';
import { Github } from './BrandIcons';

/* ─── SVG Mockup Illustrations ─────────────────────────────────────── */
function MockupCode() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="280" rx="12" fill="#F8FAFC" />
      {/* Browser chrome */}
      <rect x="16" y="16" width="448" height="32" rx="8" fill="white" stroke="#E2E8F0" />
      <circle cx="34" cy="32" r="5" fill="#FCA5A5" /><circle cx="50" cy="32" r="5" fill="#FDE68A" /><circle cx="66" cy="32" r="5" fill="#6EE7B7" />
      <rect x="88" y="24" width="200" height="16" rx="4" fill="#F1F5F9" />
      {/* Sidebar */}
      <rect x="16" y="60" width="100" height="204" rx="8" fill="white" stroke="#E2E8F0" />
      <rect x="28" y="76" width="76" height="10" rx="5" fill="#DBEAFE" />
      <rect x="28" y="96" width="60" height="8" rx="4" fill="#F1F5F9" />
      <rect x="28" y="112" width="76" height="8" rx="4" fill="#F1F5F9" />
      <rect x="28" y="128" width="50" height="8" rx="4" fill="#F1F5F9" />
      <rect x="28" y="148" width="76" height="8" rx="4" fill="#EFF6FF" />
      <rect x="28" y="164" width="65" height="8" rx="4" fill="#F1F5F9" />
      {/* Main area */}
      <rect x="128" y="60" width="336" height="204" rx="8" fill="white" stroke="#E2E8F0" />
      {/* Featured card */}
      <rect x="144" y="76" width="304" height="80" rx="10" fill="#EFF6FF" />
      <circle cx="176" cy="116" r="20" fill="#2563EB" opacity="0.15" />
      <circle cx="176" cy="116" r="10" fill="#2563EB" opacity="0.4" />
      <rect x="208" y="100" width="180" height="10" rx="5" fill="#2563EB" opacity="0.3" />
      <rect x="208" y="118" width="120" height="8" rx="4" fill="#93C5FD" />
      <rect x="208" y="134" width="80" height="8" rx="4" fill="#BFDBFE" />
      {/* Stats row */}
      <rect x="144" y="168" width="90" height="56" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
      <rect x="244" y="168" width="90" height="56" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
      <rect x="344" y="168" width="90" height="56" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
      <rect x="156" y="180" width="66" height="10" rx="5" fill="#DBEAFE" />
      <rect x="156" y="197" width="40" height="8" rx="4" fill="#F1F5F9" />
      <rect x="256" y="180" width="66" height="10" rx="5" fill="#D1FAE5" />
      <rect x="256" y="197" width="40" height="8" rx="4" fill="#F1F5F9" />
      <rect x="356" y="180" width="66" height="10" rx="5" fill="#FDE68A" />
      <rect x="356" y="197" width="40" height="8" rx="4" fill="#F1F5F9" />
    </svg>
  );
}

function MockupDatabase() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="280" rx="12" fill="#F8FAFC" />
      {/* Tables */}
      <rect x="40" y="40" width="160" height="200" rx="10" fill="white" stroke="#E2E8F0" />
      <rect x="40" y="40" width="160" height="36" rx="10" fill="#EFF6FF" />
      <rect x="56" y="52" width="100" height="12" rx="6" fill="#2563EB" opacity="0.6" />
      {[0,1,2,3,4].map(i => <rect key={i} x="56" y={96 + i*24} width="128" height="10" rx="5" fill="#F1F5F9" />)}
      <rect x="56" y="96" width="128" height="10" rx="5" fill="#DBEAFE" />
      {/* Relation lines */}
      <path d="M200 140 Q280 100 280 140" stroke="#BFDBFE" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <circle cx="200" cy="140" r="4" fill="#2563EB" />
      <circle cx="280" cy="140" r="4" fill="#7C3AED" />
      <rect x="280" y="60" width="160" height="170" rx="10" fill="white" stroke="#E2E8F0" />
      <rect x="280" y="60" width="160" height="36" rx="10" fill="#F5F3FF" />
      <rect x="296" y="72" width="100" height="12" rx="6" fill="#7C3AED" opacity="0.6" />
      {[0,1,2,3].map(i => <rect key={i} x="296" y={112 + i*24} width="128" height="10" rx="5" fill="#F1F5F9" />)}
    </svg>
  );
}

function MockupNetwork() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="280" rx="12" fill="#F8FAFC" />
      {/* Server node */}
      <circle cx="240" cy="140" r="44" fill="white" stroke="#DBEAFE" strokeWidth="2" />
      <circle cx="240" cy="140" r="28" fill="#EFF6FF" />
      <circle cx="240" cy="140" r="12" fill="#2563EB" opacity="0.7" />
      {/* Client nodes */}
      {[
        [80, 60], [400, 60], [80, 220], [400, 220], [240, 30],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2="240" y2="140" stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="5 3" />
          <circle cx={cx} cy={cy} r="22" fill="white" stroke="#E2E8F0" />
          <circle cx={cx} cy={cy} r="8" fill="#93C5FD" opacity="0.7" />
        </g>
      ))}
      {/* Labels */}
      <rect x="200" y="172" width="80" height="14" rx="7" fill="#EFF6FF" />
      <rect x="208" y="176" width="64" height="6" rx="3" fill="#2563EB" opacity="0.3" />
    </svg>
  );
}

function MockupSecurity() {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="480" height="280" rx="12" fill="#F8FAFC" />
      <rect x="160" y="48" width="160" height="184" rx="16" fill="white" stroke="#E2E8F0" strokeWidth="2" />
      {/* Padlock arc */}
      <path d="M200 96 Q200 64 240 64 Q280 64 280 96" stroke="#2563EB" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Padlock body */}
      <rect x="175" y="112" width="130" height="100" rx="12" fill="#EFF6FF" />
      {/* Keyhole */}
      <circle cx="240" cy="152" r="16" fill="#2563EB" opacity="0.7" />
      <rect x="234" y="152" width="12" height="22" rx="4" fill="#BFDBFE" />
      {/* Strength bar */}
      <rect x="184" y="60" width="112" height="8" rx="4" fill="#E2E8F0" />
      <rect x="184" y="60" width="90" height="8" rx="4" fill="#2563EB" />
      {/* Side indicators */}
      {[0,1,2].map(i => (
        <circle key={i} cx={144 + i*4} cy={140 + i*16} r="4" fill="#DBEAFE" />
      ))}
    </svg>
  );
}

const mockupMap = { code: MockupCode, database: MockupDatabase, network: MockupNetwork, security: MockupSecurity };

/* ─── 3D Tilt Card ─────────────────────────────────────────────────── */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Fallback data ─────────────────────────────────────────────────── */
const FALLBACK = [
  {
    _id: 'eco', title: 'EcoShare AI', subtitle: 'AI Powered Sustainable Resource Sharing Platform',
    description: 'A full-stack platform that promotes sustainable living by allowing users to share, donate, and exchange reusable items while integrating AI-powered recommendations.',
    tech_stack: ['React', 'Vite', 'Tailwind CSS', 'Python FastAPI', 'MongoDB Atlas', 'JWT Auth', 'AI Integration'],
    features: ['User Authentication', 'Resource Sharing', 'AI Recommendations', 'Search & Filter', 'Responsive Design', 'Secure JWT Login', 'MongoDB Integration'],
    live_url: 'https://eco-share-ai.vercel.app/login', github_url: 'https://github.com/DINESH0822/EcoShare-AI',
    is_featured: true, image_placeholder_type: 'code',
  },
  {
    _id: 'ems', title: 'Employee Management System', subtitle: 'Enterprise Java Backend with Spring Boot',
    description: 'A comprehensive employee tracking system built with Java and Spring Boot, utilizing Hibernate ORM with Oracle Database and layered REST architecture.',
    tech_stack: ['Java', 'Spring Boot', 'Hibernate', 'Oracle XE', 'REST API', 'Maven'],
    features: ['CRUD Operations', 'Employee Search', 'REST APIs', 'Layered Architecture'],
    live_url: null, github_url: 'https://github.com/DINESH0822', is_featured: false, image_placeholder_type: 'database',
  },
  {
    _id: 'nas', title: 'Network Smart Attendance System', subtitle: 'LAN-based Socket Attendance Logger',
    description: 'A Java desktop application using socket connections for automatic attendance logging over LAN, validating client IPs and timestamping records.',
    tech_stack: ['Java', 'Networking', 'Socket Programming', 'File IO'],
    features: ['Automatic Attendance', 'IP Validation', 'Timestamp Logging'],
    live_url: null, github_url: 'https://github.com/DINESH0822', is_featured: false, image_placeholder_type: 'network',
  },
  {
    _id: 'psa', title: 'Password Strength Analyzer', subtitle: 'Regex-Driven Interactive Security Tool',
    description: 'An interactive web utility that validates password complexity using cryptographic patterns and provides live strength feedback with actionable suggestions.',
    tech_stack: ['Python', 'HTML', 'CSS', 'JavaScript', 'Regex'],
    features: ['Regex Validation', 'Strength Detection', 'Live Feedback', 'Interactive UI'],
    live_url: null, github_url: 'https://github.com/DINESH0822', is_featured: false, image_placeholder_type: 'security',
  },
];

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python / AI' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } };

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const featured = projects.find(p => p.is_featured);
  const others = projects.filter(p => !p.is_featured).filter(p => {
    if (filter === 'all') return true;
    if (filter === 'java') return p.tech_stack.some(t => ['java','spring'].some(k => t.toLowerCase().includes(k)));
    if (filter === 'python') return p.tech_stack.some(t => ['python','ai','fastapi'].some(k => t.toLowerCase().includes(k)));
    return true;
  });

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#F8FAFC] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DBEAFE] to-transparent" />

      <div className="section-container">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle text-base">Hand-picked applications demonstrating full-stack engineering, AI integration, and architectural design.</p>
          </motion.div>

          {/* ── FEATURED PROJECT ── */}
          {featured && (() => {
            const Mockup = mockupMap[featured.image_placeholder_type] || MockupCode;
            return (
              <motion.div variants={fadeUp} className="mb-20">
                <TiltCard className="bg-white rounded-3xl overflow-hidden card-shadow group">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Mockup panel */}
                    <div className="relative bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] p-8 min-h-[280px] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 dot-pattern opacity-40" />
                      <motion.div
                        className="relative z-10 w-full max-w-md"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Mockup />
                      </motion.div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-[#DBEAFE]">
                          <Star className="w-3.5 h-3.5 fill-[#2563EB]" />
                          Featured Project
                        </span>
                      </div>
                    </div>

                    {/* Content panel */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-3xl font-black text-[#111827]">{featured.title}</h3>
                          <p className="text-[#2563EB] font-semibold text-sm mt-1.5">{featured.subtitle}</p>
                        </div>
                        <p className="text-[#6B7280] text-sm leading-relaxed">{featured.description}</p>

                        {/* Features checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {featured.features.map((f) => (
                            <div key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                              <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 space-y-5 pt-6 border-t border-[#F1F5F9]">
                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {featured.tech_stack.map((t) => (
                            <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#374151]">{t}</span>
                          ))}
                        </div>
                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-3">
                          {featured.live_url && (
                            <motion.a href={featured.live_url} target="_blank" rel="noreferrer" className="btn-primary text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                              <span>Live Demo</span><ExternalLink className="w-3.5 h-3.5" />
                            </motion.a>
                          )}
                          {featured.github_url && (
                            <motion.a href={featured.github_url} target="_blank" rel="noreferrer" className="btn-secondary text-sm" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                              <Github className="w-4 h-4" /><span>GitHub</span>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })()}

          {/* ── OTHER PROJECTS ── */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-xl font-bold text-[#111827]">More Projects</h3>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#9CA3AF]" />
              {filters.map((f) => (
                <button key={f.id} onClick={() => setFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === f.id ? 'bg-[#111827] text-white' : 'bg-white border border-[#E2E8F0] text-[#6B7280] hover:border-[#BFDBFE] hover:text-[#2563EB]'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {others.map((p) => {
                const Mockup = mockupMap[p.image_placeholder_type] || MockupCode;
                return (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(37,99,235,0.10)' }}
                    className="bg-white rounded-3xl overflow-hidden card-shadow flex flex-col group cursor-default"
                  >
                    {/* Mockup top */}
                    <div className="h-44 bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] flex items-center justify-center p-4 overflow-hidden">
                      <motion.div className="w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                        <Mockup />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="font-bold text-[#111827] text-base group-hover:text-[#2563EB] transition-colors">{p.title}</h4>
                      <p className="text-[#2563EB] text-xs font-semibold mt-0.5 mb-3">{p.subtitle}</p>
                      <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-3 flex-1">{p.description}</p>

                      <div className="mt-4 space-y-4 pt-4 border-t border-[#F1F5F9]">
                        <div className="flex flex-wrap gap-1.5">
                          {p.tech_stack.slice(0, 4).map(t => (
                            <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#374151]">{t}</span>
                          ))}
                          {p.tech_stack.length > 4 && <span className="text-[10px] text-[#9CA3AF] self-center">+{p.tech_stack.length - 4}</span>}
                        </div>
                        <div className="flex items-center gap-3">
                          {p.github_url && (
                            <a href={p.github_url} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-colors">
                              <Github className="w-3.5 h-3.5" />View Code
                            </a>
                          )}
                          {p.live_url && (
                            <a href={p.live_url} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" />Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
