import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { motion } from 'framer-motion';

const social = [
  { icon: Github, href: 'https://github.com/DINESH0822', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dinesh-m-8294802bb', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:dinesh.m8481@gmail.com', label: 'Email' },
];

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-[#111827] text-white">
      {/* Top gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-900/50">
                <span className="text-white font-black text-lg">D</span>
              </div>
              <span className="text-xl font-bold">M Dinesh</span>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs">
              Java Full Stack Developer & AI Enthusiast building scalable applications and innovative software solutions.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {social.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Navigation</h4>
            <div className="space-y-2">
              {links.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scroll(id)}
                  className="block text-sm text-[#9CA3AF] hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Get In Touch</h4>
            <p className="text-[#9CA3AF] text-sm">
              Open to placement opportunities, internships, and freelance collaborations.
            </p>
            <a
              href="mailto:dinesh.m8481@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-xl transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              Say Hello
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <span>© {year} M Dinesh. All rights reserved.</span>
          <span>Designed & Developed by <span className="text-[#9CA3AF] font-semibold">M Dinesh</span></span>
          <span>Built with React, Vite & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
