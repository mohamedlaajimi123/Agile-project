import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Wand2, AlertCircle } from 'lucide-react';

export default function GradesView({ 
  isDark, 
  t, 
  COURSES = [], 
  selectedGradesCourse, 
  setSelectedGradesCourse, 
  initializeStudents, 
  courseStudents = {}, 
  updateStudentGrade, 
  handleAutoFillGrades, 
  isAutoFilling,
  viewOnly = false // New prop to differentiate Courses tab from Grades tab
}) {

  // --- 1. LIST VIEW (Used for both "Courses" tab and "Grades" initial tab) ---
  if (!selectedGradesCourse || viewOnly) {
    return (
      <motion.div 
        key="grades-list" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }} 
        transition={{ duration: 0.3 }} 
        className="space-y-6 text-left"
      >
        <h2 className="text-2xl font-bold">{viewOnly ? t.courses : t.grades}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <motion.button 
              key={course.id} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              whileHover={{ y: -4 }} 
              onClick={() => { 
                // Only allow clicking into the roster if NOT in viewOnly mode
                if (!viewOnly) {
                  setSelectedGradesCourse(course.id); 
                  if (initializeStudents) initializeStudents(course.id); 
                }
              }} 
              className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 text-left relative overflow-hidden group ${
                isDark 
                  ? `bg-gradient-to-br ${course.color} border-white/10 hover:border-white/30` 
                  : `bg-gradient-to-br ${course.color?.replace('/20', '/30')} border-slate-300/50 hover:border-slate-300 shadow-lg`
              } ${viewOnly ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {course.id}
              </p>
              <h3 className="text-lg font-bold mt-2">{course.name}</h3>
              
              <div className="mt-4 inline-block px-3 py-1 rounded-full bg-orange-500/30 border border-orange-400/50 text-orange-300 text-xs font-semibold">
                {t.pending}
              </div>

              <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-300/30'}`}>
                <p className={`text-4xl font-bold ${course.studentColor || 'text-indigo-400'}`}>
                  {course.students || course.studentCount || 0}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  {t.students}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  // --- 2. DETAILS VIEW (The Roster/Grading Table) ---
  const currentCourseData = COURSES.find(c => c.id === selectedGradesCourse);

  return (
    <motion.div 
      key="grades-detail" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      transition={{ duration: 0.3 }} 
      className="space-y-6 text-left"
    >
      <motion.button 
        onClick={() => setSelectedGradesCourse(null)} 
        whileHover={{ x: -4 }} 
        className={`flex items-center gap-2 font-semibold transition-all ${
          isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
        }`}
      >
        <ChevronLeft className="w-5 h-5" /> {t.backToCourses}
      </motion.button>

      <div className={`rounded-2xl backdrop-blur-xl border p-8 transition-all duration-300 ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'
      }`}>
        <h2 className="text-2xl font-bold mb-2">{currentCourseData?.name}</h2>
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
          {t.classRoster} - {t.manualGrading}
        </p>

        <div className={`rounded-xl backdrop-blur-xl border overflow-hidden mb-6 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'bg-white/10 border-white/10' : 'bg-slate-100/50 border-slate-300/30'}`}>
                  <th className="text-left px-6 py-4 font-semibold">{t.studentCode}</th>
                  <th className="text-left px-6 py-4 font-semibold">Name</th>
                  <th className="text-center px-6 py-4 font-semibold">{t.grade} ({t.outOf})</th>
                </tr>
              </thead>
              <tbody>
                {courseStudents[selectedGradesCourse]?.map((student) => (
                  <tr 
                    key={student.id} 
                    className={`border-b transition-all ${
                      student.aiGenerated 
                        ? (isDark ? 'bg-purple-600/20 border-white/10' : 'bg-purple-500/10 border-slate-300/30') 
                        : isDark ? 'border-white/10' : 'border-slate-300/30'
                    }`}
                  >
                    <td className="px-6 py-4 font-mono text-sm opacity-70">{student.code}</td>
                    <td className="px-6 py-4 font-medium">
                      {student.name}
                      {student.aiGenerated && (
                        <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                          isDark ? 'bg-purple-600/50 text-purple-200' : 'bg-purple-500/20 text-purple-700'
                        }`}>
                          {t.autoFilled}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input 
                          type="number" 
                          min="0" 
                          max="20" 
                          value={student.grade} 
                          onChange={(e) => updateStudentGrade(selectedGradesCourse, student.id, e.target.value ? parseInt(e.target.value) : '')} 
                          className={`w-24 px-3 py-2 text-center rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${
                            student.aiGenerated 
                              ? (isDark ? 'bg-purple-600/30 border-purple-400/50 text-white' : 'bg-purple-500/10 border-purple-400/50 text-slate-900') 
                              : (isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white/50 border-slate-300/50 text-slate-900')
                          }`} 
                        />
                        {student.grade !== '' && student.grade < 5 && (
                          <AlertCircle className="w-5 h-5 text-orange-500" title={t.lowGrade} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <motion.button 
            onClick={() => handleAutoFillGrades(selectedGradesCourse)} 
            disabled={isAutoFilling} 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/40 disabled:opacity-60 transition-all text-sm"
          >
            {isAutoFilling ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t.autoFilling}
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                {t.autoFillGrades}
              </>
            )}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/40 transition-all text-sm"
          >
            Submit Grades
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}