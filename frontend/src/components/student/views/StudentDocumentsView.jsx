import React from 'react';
import { motion } from 'framer-motion';
import { Download, Users } from 'lucide-react';

// Added default values to props to prevent "undefined" crashes
export default function StudentDocumentsView({ 
  isDark, 
  t, 
  STUDENT_DATA = {}, 
  EXAMS = [] 
}) {
  
  // Helper to prevent "Cannot read properties of undefined" on EXAMS[0]
  const firstExam = EXAMS?.[0] || { 
    module: "No Exam Assigned", 
    date: "--", 
    time: "--", 
    room: "--", 
    seat: "--" 
  };

  return (
    <motion.div key="documents" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
      <h2 className="text-2xl font-bold">{t?.officialDocumentation}</h2>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className={`rounded-2xl backdrop-blur-xl border p-8 transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border-indigo-400/30 hover:border-indigo-400/50' : 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-indigo-400/50 hover:border-indigo-400 shadow-lg'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{t?.convocationInfo}</h3>
            <p className={isDark ? 'text-gray-300' : 'text-slate-700'}>Download your official exam convocation document with your exam assignment details.</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-6 flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex-shrink-0">
            <Download className="w-5 h-5" />
            {t?.downloadConvocation}
          </motion.button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className={`rounded-2xl backdrop-blur-xl border p-8 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/50 border-slate-300/50 hover:border-slate-300 shadow-lg'}`}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Users className="w-6 h-6 text-violet-400" />{t?.examAssignment}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className={`text-xs uppercase tracking-wider font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.name}</p>
            {/* Using optional chaining for safety */}
            <p className="text-2xl font-bold mb-6">{STUDENT_DATA?.name || "---"}</p>
            
            <p className={`text-xs uppercase tracking-wider font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.studentID}</p>
            <p className="text-lg font-semibold text-indigo-400 mb-6">{STUDENT_DATA?.studentId || "---"}</p>
            
            <p className={`text-xs uppercase tracking-wider font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{STUDENT_DATA?.semester}</p>
            <p className="font-semibold">{STUDENT_DATA?.program || "---"}</p>
          </div>

          <div className={`rounded-lg border p-6 ${isDark ? 'bg-indigo-600/20 border-indigo-400/30' : 'bg-indigo-500/20 border-indigo-400/50'}`}>
            {/* We use the 'firstExam' helper here so it never reads property of undefined */}
            <h4 className="text-lg font-bold mb-4">{firstExam.module}</h4>
            <div className="space-y-4">
              <div><p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.date}</p><p className="font-semibold">{firstExam.date}</p></div>
              <div><p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.time}</p><p className="font-semibold">{firstExam.time}</p></div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                <div><p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.roomAssignment}</p><p className="text-2xl font-bold text-indigo-400">{firstExam.room}</p></div>
                <div><p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.seatNumber}</p><p className="text-2xl font-bold text-violet-400">{firstExam.seat}</p></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}