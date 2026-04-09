import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Added default [] for filteredGrades
export default function StudentGradesView({ isDark, t, filteredGrades = [] }) {
  return (
    <motion.div key="grades" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
      <h2 className="text-2xl font-bold">{t?.gradeHistory}</h2>
      
      <div className={`rounded-2xl backdrop-blur-xl border overflow-hidden transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'bg-white/10 border-white/10' : 'bg-slate-100/50 border-slate-300/30'}`}>
                <th className="text-left px-6 py-4 font-semibold">{t?.courseCode}</th>
                <th className="text-left px-6 py-4 font-semibold">{t?.courseName}</th>
                <th className="text-center px-6 py-4 font-semibold">{t?.credits}</th>
                <th className="text-center px-6 py-4 font-semibold">{t?.grade}</th>
                <th className="text-center px-6 py-4 font-semibold">{t?.status}</th>
              </tr>
            </thead>
            <tbody>
              {/* Added safe fallback (filteredGrades || []) */}
              {(filteredGrades || []).map((grade, idx) => (
                <tr key={grade.id} className={`border-b transition-all ${idx % 2 === 0 ? isDark ? 'bg-white/2 hover:bg-white/5' : 'bg-slate-100/30 hover:bg-slate-100/50' : isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100/50'} ${isDark ? 'border-white/10' : 'border-slate-300/30'}`}>
                  <td className="px-6 py-4 font-semibold">{grade.code}</td>
                  <td className="px-6 py-4">{grade.name}</td>
                  <td className="px-6 py-4 text-center">{grade.credits}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-lg font-bold text-indigo-400">{grade.grade}</span>
                    <span className={isDark ? 'text-gray-400' : 'text-slate-600'}> {t?.outOf}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${grade.status === 'Validated' ? isDark ? 'bg-green-600/30 border border-green-400/50 text-green-300' : 'bg-green-500/30 border border-green-400/50 text-green-700' : isDark ? 'bg-orange-600/30 border border-orange-400/50 text-orange-300' : 'bg-orange-500/30 border border-orange-400/50 text-orange-700'}`}>
                      {grade.status === 'Validated' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {grade.status === 'Validated' ? t?.validated : t?.pending}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Added a helper for empty states */}
          {(filteredGrades || []).length === 0 && (
            <div className="p-8 text-center opacity-50 italic">
              {t?.noGradesFound || "No grades available yet."}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}