import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SharedSettings from '../shared/SharedSettings';

export default function ProfessorSettings({ isDark, t, setCurrentPage }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      // backdrop-blur-xl creates the heavy blur effect
      // bg-opacity classes ensure the blur has a "tint" (dark or light)
      className={`min-h-screen w-full fixed inset-0 z-[100] overflow-y-auto backdrop-blur-xl transition-colors duration-500 ${
        isDark 
          ? 'bg-slate-950/60' 
          : 'bg-white/60'
      }`}
    >
      <div className="max-w-6xl mx-auto p-8 lg:p-16">
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => setCurrentPage('portal')}
          className={`group flex items-center gap-3 mb-12 px-5 py-2.5 rounded-xl font-medium transition-all ${
            isDark 
              ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10' 
              : 'bg-slate-200/50 hover:bg-slate-200 text-slate-600 border border-slate-300'
          }`}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </motion.button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <SharedSettings isDark={isDark} t={t} />
        </motion.div>
      </div>
    </motion.div>
  );
}