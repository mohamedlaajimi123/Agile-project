import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { STUDENT_DATA as MOCK_STUDENT_DATA } from "../../../data/studentData";

// Using existing logic patterns from your portal
const SEMESTER_WEEKS = 14;
const CURRENT_WEEK = 8;
const MIDTERMS_WEEK = 6;
const FINALS_START_WEEK = 12;

function StudentDashboardView({ isDark, t, STUDENT_DATA = MOCK_STUDENT_DATA }) {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setStudent(STUDENT_DATA);
    setIsLoading(false);
  }, [STUDENT_DATA]);

  if (isLoading) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Semester Progression - Refined Aesthetics */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl backdrop-blur-xl border p-8 transition-all ${
          isDark ? 'border-white/10 bg-white/5' : 'bg-white/50 border-slate-300/50'
        }`}
      >
        <h2 className="text-xl font-bold mb-6">{t.semesterProgression}</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {Array.from({ length: SEMESTER_WEEKS }, (_, i) => {
            const weekNum = i + 1;
            const isCurrent = weekNum === CURRENT_WEEK;
            const isPast = weekNum < CURRENT_WEEK;
            const isMidterms = weekNum === MIDTERMS_WEEK;
            const isFinals = weekNum >= FINALS_START_WEEK;

            // Refined color states matching your portal's gradient/glow aesthetic
            let bg = isCurrent ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white' : 
                     isPast ? (isDark ? 'bg-green-600/30 text-green-300' : 'bg-green-500/20 text-green-700') :
                     (isDark ? 'bg-white/10' : 'bg-slate-200/50');

            return (
              <motion.div whileHover={{ scale: 1.1 }} key={weekNum} 
                className={`flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center font-semibold text-sm ${bg} ${isDark ? 'border-white/10' : 'border-slate-300/30'}`}
              >
                {weekNum}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Stats Grid - Refined with hover transitions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: t.currentGPA, val: student.currentGPA, icon: Award, color: 'text-indigo-400' },
          { label: t.creditsEarned, val: student.creditsEarned, icon: BookOpen, color: 'text-violet-400' },
          { label: t.nextExamCountdown, val: 5, icon: Clock, color: 'text-pink-400' }
        ].map((stat, i) => (
          <motion.div whileHover={{ y: -4 }} key={i} className={`rounded-2xl backdrop-blur-xl border p-6 ${isDark ? 'border-white/10 bg-white/5' : 'bg-white/50 border-slate-300/50'}`}>
            <p className="text-sm uppercase tracking-wider text-slate-500">{stat.label}</p>
            <div className="flex justify-between items-center mt-2">
              <p className={`text-4xl font-bold ${stat.color}`}>{stat.val}</p>
              <stat.icon className={`w-10 h-10 opacity-30 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default StudentDashboardView;