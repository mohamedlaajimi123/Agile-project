import React from 'react';
import { Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfessorTopBar({ isDark, t, searchQuery, setSearchQuery, notificationCount }) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t.welcome}</h1>
        <p className={isDark ? 'text-gray-400' : 'text-slate-600'}>{t.yourStats}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
          <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`pl-10 pr-4 py-2 rounded-lg backdrop-blur-xl transition-all border focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-600 hover:bg-white/10' : 'bg-white/50 border-slate-300/50 text-slate-900 placeholder-slate-500 hover:bg-white/70'}`} />
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`relative p-2 rounded-lg transition-all backdrop-blur-xl border ${isDark ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-white/50 border-slate-300/50 text-slate-600 hover:text-slate-900 hover:bg-white/70'}`}>
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">{notificationCount}</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}