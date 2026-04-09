import React from 'react';
import { motion } from 'framer-motion';

// Added = [] default for filteredExams
export default function StudentExamsView({ isDark, t, filteredExams = [] }) {
  return (
    <motion.div key="exams" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
      <h2 className="text-2xl font-bold">{t?.myExams}</h2>
      
      {/* Safe check: ensure filteredExams exists before checking .length */}
      {(filteredExams || []).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <motion.div key={exam.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -4 }} className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/30 hover:border-blue-400/50' : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/50 hover:border-blue-400 shadow-lg'}`}>
              <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>{exam.module}</p>
              <div className="mt-4 space-y-3">
                <div><p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.date}</p><p className="font-semibold">{exam.date}</p></div>
                <div><p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.time}</p><p className="font-semibold">{exam.time}</p></div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <div><p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.room}</p><p className="text-lg font-bold text-blue-400">{exam.room}</p></div>
                  <div><p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.seat}</p><p className="text-lg font-bold text-cyan-400">{exam.seat}</p></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 rounded-2xl backdrop-blur-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50'}`}>
          <p className={isDark ? 'text-gray-400' : 'text-slate-600'}>{t?.noResults}</p>
        </div>
      )}
    </motion.div>
  );
}