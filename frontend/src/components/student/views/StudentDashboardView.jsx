import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock } from 'lucide-react';

// Added default values (= {} and = []) so if data is fetching, the code doesn't crash
export default function StudentDashboardView({ 
  isDark, 
  t, 
  STUDENT_DATA = {}, 
  EXAMS = [], 
  SEMESTER_WEEKS, 
  CURRENT_WEEK, 
  MIDTERMS_WEEK, 
  FINALS_START_WEEK, 
  daysToNextExam 
}) {
  return (
    <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
      
      {/* Semester Progression Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className={`rounded-2xl backdrop-blur-xl border p-8 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/50 border-slate-300/50 hover:border-slate-300 shadow-lg'}`}>
        <h2 className="text-2xl font-bold mb-6">{t?.semesterProgression}</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {Array.from({ length: SEMESTER_WEEKS || 0 }, (_, i) => {
            const weekNum = i + 1;
            const isCurrent = weekNum === CURRENT_WEEK;
            const isMidterms = weekNum === MIDTERMS_WEEK;
            const isFinals = weekNum >= FINALS_START_WEEK;
            const isPast = weekNum < CURRENT_WEEK;

            let bgColor = isDark ? 'bg-white/10' : 'bg-slate-200/50';
            let textColor = isDark ? 'text-gray-400' : 'text-slate-600';
            let borderColor = isDark ? 'border-white/10' : 'border-slate-300/30';

            if (isPast) { bgColor = isDark ? 'bg-green-600/30' : 'bg-green-500/30'; textColor = isDark ? 'text-green-300' : 'text-green-700'; borderColor = isDark ? 'border-green-400/50' : 'border-green-400/50'; }
            if (isCurrent) { bgColor = 'bg-gradient-to-r from-indigo-500 to-violet-500'; textColor = 'text-white font-bold'; borderColor = 'border-indigo-400'; }
            if (isMidterms) { bgColor = isDark ? 'bg-orange-600/30' : 'bg-orange-500/30'; textColor = isDark ? 'text-orange-300' : 'text-orange-700'; }
            if (isFinals) { bgColor = isDark ? 'bg-red-600/30' : 'bg-red-500/30'; textColor = isDark ? 'text-red-300' : 'text-red-700'; }

            return (
              <motion.div key={weekNum} whileHover={{ scale: 1.1 }} className={`flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center font-semibold text-sm transition-all ${bgColor} ${textColor} ${borderColor}`} title={isMidterms ? t?.midterms : isFinals ? t?.finals : `${t?.week} ${weekNum}`}>
                {weekNum}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/50 border-slate-300/50 hover:border-slate-300 shadow-lg'}`}>
          <div className="flex items-center justify-between">
            {/* Added Optional Chaining STUDENT_DATA?.currentGPA */}
            <div><p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.currentGPA}</p><p className="text-4xl font-bold mt-2 text-indigo-400">{STUDENT_DATA?.currentGPA || '0.0'}</p></div>
            <Award className="w-12 h-12 text-indigo-400/50" />
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/50 border-slate-300/50 hover:border-slate-300 shadow-lg'}`}>
          <div className="flex items-center justify-between">
            <div><p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.creditsEarned}</p><p className="text-4xl font-bold mt-2 text-violet-400">{STUDENT_DATA?.creditsEarned || '0'}</p></div>
            <BookOpen className="w-12 h-12 text-violet-400/50" />
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/50 border-slate-300/50 hover:border-slate-300 shadow-lg'}`}>
          <div className="flex items-center justify-between">
            <div><p className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.nextExamCountdown}</p><p className="text-4xl font-bold mt-2 text-pink-400">{Math.max(0, daysToNextExam || 0)}</p></div>
            <Clock className="w-12 h-12 text-pink-400/50" />
          </div>
        </motion.div>
      </div>

      {/* Upcoming Exams List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/50 border-slate-300/50 hover:border-slate-300 shadow-lg'}`}>
        <h3 className="text-xl font-bold mb-4">{t?.upcomingExams}</h3>
        <div className="space-y-3">
          {/* EXAMS is now safe because of default [] */}
          {EXAMS?.slice(0, 3).map((exam) => (
            <div key={exam.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${isDark ? 'bg-indigo-600/20 border-indigo-400/30 hover:bg-indigo-600/30' : 'bg-indigo-500/20 border-indigo-400/50 hover:bg-indigo-500/30'}`}>
              <div className="flex-1"><p className="font-semibold">{exam.module}</p><p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{exam.date} at {exam.time}</p></div>
              <div className="text-right"><p className={`text-sm font-semibold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>{t?.room} {exam.room}</p></div>
            </div>
          ))}
          {EXAMS?.length === 0 && <p className="text-sm opacity-50 italic">No upcoming exams found.</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}