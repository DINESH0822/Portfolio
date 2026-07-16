import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* Center content */}
          <div className="flex flex-col items-center gap-6">
            {/* Animated logo */}
            <motion.div
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-2xl shadow-blue-200"
              initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white font-black text-4xl tracking-tighter">D</span>
            </motion.div>

            {/* Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h1 className="text-2xl font-black text-[#111827] tracking-tight">M DINESH</h1>
              <p className="text-[#6B7280] text-sm font-semibold tracking-widest uppercase mt-1">
                Full Stack Developer
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 1.4, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
