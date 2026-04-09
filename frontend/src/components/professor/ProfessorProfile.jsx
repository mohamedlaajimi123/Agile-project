import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export default function ProfessorProfile({ isDark, t, setCurrentPage }) {
  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'}`}>
      {isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-30" />
          <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-30" />
        </div>
      )}

      <main className="relative z-10 p-8 min-h-screen max-w-4xl mx-auto">
        <motion.button onClick={() => setCurrentPage('portal')} whileHover={{ x: -4 }} className={`flex items-center gap-2 mb-8 font-semibold transition-all ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}>
          <ChevronLeft className="w-5 h-5" /> {t.backToPortal}
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className={`rounded-2xl backdrop-blur-xl border p-8 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-4xl font-bold">RM</div>
              <div>
                <h1 className="text-3xl font-bold">Prof. Richard Morrison</h1>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Senior Lecturer, Computer Science</p>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl backdrop-blur-xl border p-8 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
            <h2 className="text-2xl font-bold mb-6">{t.professionalInfo}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t.email}</p><p className="text-lg font-semibold mt-2">richard.morrison@horizon-university.tn</p></div>
              <div><p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t.department}</p><p className="text-lg font-semibold mt-2">Faculty of Engineering</p></div>
              <div><p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t.office}</p><p className="text-lg font-semibold mt-2">Mon-Wed 2:00 PM - 5:00 PM</p></div>
              <div><p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t.specialization}</p><p className="text-lg font-semibold mt-2">Web Technologies & Databases</p></div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}