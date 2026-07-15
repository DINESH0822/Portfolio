import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white p-8 rounded-3xl card-shadow text-center space-y-6 relative z-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100 font-extrabold text-2xl shadow-sm">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">Resource Not Found</h1>
          <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs mx-auto">
            The page you are trying to view does not exist or has been moved to a new route.
          </p>
        </div>

        <div className="pt-4 border-t border-[#F1F5F9]">
          <Link
            to="/"
            className="w-full btn-primary"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
