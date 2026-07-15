import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Education', id: 'education' },
  { label: 'Internship', id: 'internship' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === '/';

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMainPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isMainPage]);

  const scrollTo = (id) => {
    setIsOpen(false);
    if (!isMainPage) {
      navigate('/', { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] z-[9999] origin-left"
        style={{ scaleX }}
      />

      <header className={`fixed top-[2px] left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]/60 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" onClick={() => scrollTo('home')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-md shadow-blue-200 group-hover:shadow-lg group-hover:shadow-blue-300 transition-all duration-200">
              <span className="text-white font-black text-lg tracking-tighter">D</span>
            </div>
            <span className="text-base font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors hidden sm:block">
              M Dinesh
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === item.id && isMainPage
                    ? 'text-[#2563EB]'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC]'
                }`}
              >
                {item.label}
                {activeSection === item.id && isMainPage && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2563EB] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
            <Link
              to="/admin"
              className="ml-2 p-2 text-[#9CA3AF] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-all duration-200"
              title="Admin"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/admin" className="p-2 text-[#9CA3AF] hover:text-[#2563EB] rounded-lg">
              <Shield className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] rounded-lg transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0] overflow-hidden"
            >
              <div className="px-4 py-4 grid grid-cols-3 gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-center ${
                      activeSection === item.id && isMainPage
                        ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold'
                        : 'text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
