import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertCircle, Zap } from 'lucide-react';
import { EXAM_DATA, USERS, COURSES } from '../../../data/admin/mockData';

export default function InsightsView({ isDark, t }) {
  const atRiskCount = COURSES.filter(c => c.risk).length;
  const avgRoomOccupancy = Math.round(EXAM_DATA.reduce((acc, exam) => acc + (exam.students / 150), 0) / EXAM_DATA.length * 100);
  const avgInvigilatorLoad = Math.round(EXAM_DATA.length / USERS.filter(u => u.role.includes('Lecturer')).length);

  return (
    <motion.div
      key="insights"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`rounded-2xl backdrop-blur-xl border p-6 hover:border-indigo-400/50 transition-all ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-white/50 border-indigo-200 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
              {t.roomOccupancy}
            </h3>
            <div className={`p-2 rounded-lg border ${
              isDark ? 'bg-blue-500/20 border-blue-400/30' : 'bg-blue-100 border-blue-300'
            }`}>
              <BarChart3 className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">{avgRoomOccupancy}%</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Average across all venues</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-2xl backdrop-blur-xl border p-6 hover:border-purple-400/50 transition-all ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-white/50 border-indigo-200 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
              {t.invigilatorLoad}
            </h3>
            <div className={`p-2 rounded-lg border ${
              isDark ? 'bg-purple-500/20 border-purple-400/30' : 'bg-purple-100 border-purple-300'
            }`}>
              <TrendingUp className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">{avgInvigilatorLoad} Exams</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Average per invigilator</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`rounded-2xl backdrop-blur-xl border p-6 hover:border-red-400/50 transition-all ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-white/50 border-indigo-200 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>
              {t.atRiskStudents}
            </h3>
            <div className={`p-2 rounded-lg border ${
              isDark ? 'bg-red-500/20 border-red-400/30' : 'bg-red-100 border-red-300'
            }`}>
              <AlertCircle className={`w-5 h-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">{atRiskCount}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>Courses below 75% completion</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`rounded-2xl backdrop-blur-xl border p-8 relative overflow-hidden group ${
          isDark
            ? 'bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border-white/10'
            : 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-indigo-300 shadow-lg'
        }`}
      >
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-indigo-500/0 via-transparent to-violet-500/0 group-hover:from-indigo-500/10 group-hover:to-violet-500/10' : ''} transition-all duration-500`} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t.aiHealthMonitor}</h2>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>{t.systemStatus}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <div>
              <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.allocationAccuracy}</p>
              <p className="text-2xl font-bold text-indigo-400">98.5%</p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.processingTime}</p>
              <p className="text-2xl font-bold text-violet-400">1.2s</p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`}>{t.systemHealth}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-sm font-semibold text-green-400">{t.healthy}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}