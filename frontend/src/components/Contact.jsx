import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'dinesh.m8481@gmail.com', href: 'mailto:dinesh.m8481@gmail.com', color: '#2563EB', bg: '#EFF6FF' },
  { icon: Phone, label: 'Phone', value: '+91 7842760116', href: 'tel:+917842760116', color: '#059669', bg: '#ECFDF5' },
  { icon: MapPin, label: 'Location', value: 'Kuppam, Andhra Pradesh', href: null, color: '#D97706', bg: '#FFFBEB' },
];

const social = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/DINESH0822', handle: '@DINESH0822', color: '#111827' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dinesh-m-8294802bb', handle: 'M DINESH', color: '#0A66C2' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } };

const InputField = ({ label, id, ...props }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-xs font-bold text-[#374151] uppercase tracking-wider">{label}</label>
    <input
      id={id}
      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#111827] text-sm placeholder-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
      {...props}
    />
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const onChange = (e) => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); if (status.text) setStatus({ type: '', text: '' }); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus({ type: 'error', text: 'Contact form setup is incomplete (missing access key).' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message
        })
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        setStatus({ type: 'success', text: 'Message sent! I\'ll get back to you shortly.' });
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setStatus(s => s.type === 'success' ? { type: '', text: '' } : s);
        }, 3000);
      } else {
        setStatus({ type: 'error', text: result.message || 'Failed to send message.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to send. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DBEAFE] to-transparent" />

      <div className="section-container">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-subtitle text-base">
              Open to placement opportunities, internships, and exciting project collaborations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ── Left column ── */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-5">
              <h3 className="text-xl font-bold text-[#111827]">Contact Information</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                I'm currently available for full-time roles and internships. If you have an opportunity or just want to connect, reach out!
              </p>

              {/* Contact info cards */}
              <div className="space-y-3">
                {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl group hover:border-[#BFDBFE] transition-colors duration-200"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-semibold text-[#111827] hover:text-[#2563EB] transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm font-semibold text-[#111827]">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Connect Online</p>
                <div className="space-y-3">
                  {social.map(({ icon: Icon, label, href, handle, color }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#BFDBFE] hover:bg-white transition-all duration-200 group">
                      <Icon className="w-5 h-5 text-[#6B7280] group-hover:text-[#111827] transition-colors" />
                      <div>
                        <p className="text-sm font-bold text-[#111827]">{label}</p>
                        <p className="text-xs text-[#9CA3AF]">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Right column: form ── */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-8">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Your Name" id="name" name="name" value={form.name} onChange={onChange} placeholder="Enter your name" required />
                    <InputField label="Email Address" id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" required />
                  </div>
                  <InputField label="Subject" id="subject" name="subject" value={form.subject} onChange={onChange} placeholder="What's this about?" required />

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-bold text-[#374151] uppercase tracking-wider">Message</label>
                    <textarea
                      id="message" name="message" rows="5" value={form.message} onChange={onChange}
                      placeholder="Tell me about the opportunity or project..."
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white text-[#111827] text-sm placeholder-[#9CA3AF] outline-none resize-none transition-all duration-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
                    />
                  </div>

                  {status.text && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2.5 p-4 rounded-xl text-sm ${status.type === 'success' ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]' : 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'}`}
                    >
                      {status.type === 'success' ? <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-[#DC2626] flex-shrink-0" />}
                      {status.text}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><span>Send Message</span><Send className="w-4 h-4" /></>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
