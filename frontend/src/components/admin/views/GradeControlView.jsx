import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { COURSES } from '../../../data/admin/mockData';

export default function GradeControlView({ isDark, t }) {
  const [releaseStates, setReleaseStates] = useState({});

  const toggleRelease = (courseId) => {
    setReleaseStates(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  return (
    <motion.div
      key="grade-control"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">{t.gradeControl}</h2>
      <div className={`rounded-2xl backdrop-blur-xl border overflow-hidden ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-indigo-200 shadow-lg'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'bg-white/10 border-white/10' : 'bg-white/60 border-indigo-200'}`}>
                <th className={`text-left px-6 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                  {t.courseCode}
                </th>
                <th className={`text-left px-6 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                  {t.courseName}
                </th>
                <th className={`text-center px-6 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                  {t.completion}
                </th>
                <th className={`text-center px-6 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-zinc-700'}`}>
                  {t.releaseToPortal}
                </th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((course, idx) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border-b last:border-0 ${
                    isDark ? 'border-white/10' : 'border-indigo-100'
                  }`}
                >
                  <td className="px-6 py-4 font-medium">{course.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {course.name}
                      {course.risk && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[10px] font-bold uppercase">
                          Action Needed
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className={`w-24 h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-indigo-100'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.completion}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full rounded-full ${
                            course.completion > 80 ? 'bg-green-500' :
                            course.completion > 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                        />
                      </div>
                      <span className="text-xs font-semibold w-8">{course.completion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <motion.button
                      onClick={() => toggleRelease(course.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg border transition-all ${
                        releaseStates[course.id]
                          ? isDark ? 'bg-green-500/30 border-green-400/50' : 'bg-green-500/30 border-green-400'
                          : isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-indigo-200'
                      }`}
                    >
                      {releaseStates[course.id] ? (
                        <Unlock className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      ) : (
                        <Lock className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-zinc-600'}`} />
                      )}
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}