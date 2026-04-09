import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Clock, Calendar, MapPin, BarChart3, BookOpen } from 'lucide-react';

export default function DashboardView({ 
  isDark, 
  t, 
  setActiveTab, 
  setSelectedGradesCourse, 
  PROF_DATA = {}, 
  INVIGILATION_SCHEDULE = [], 
  filteredCourses = [] 
}) {
  
  // Dynamically calculate total students from the fetched courses
  const totalStudents = (filteredCourses || []).reduce((acc, curr) => acc + (curr.studentCount || 0), 0);

  const quickActions = [
    { label: t?.viewGradebook, icon: BarChart3, action: () => { setActiveTab('grades'); setSelectedGradesCourse?.(null); } },
    { label: t?.submitGrades, icon: Sparkles, action: () => { setActiveTab('grades'); setSelectedGradesCourse?.(null); } },
    { label: t?.manageCourses, icon: BookOpen, action: () => setActiveTab('courses') },
  ];

  return (
    <motion.div 
      key="dashboard" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      transition={{ duration: 0.3 }} 
      className="space-y-6"
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Welcome Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          className={`col-span-12 lg:col-span-8 row-span-2 rounded-2xl backdrop-blur-xl border p-8 flex flex-col justify-between overflow-hidden relative group transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border-white/10 hover:border-white/20' : 'bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border-slate-300/50 hover:border-slate-300 shadow-lg'}`}
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">{t?.readyToReview}, {PROF_DATA?.name?.split(' ')[1] || ''}!</h2>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{t?.reviewDesc}</p>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setActiveTab('grades')} 
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4" />
              {t?.startReviewing}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className={`col-span-12 lg:col-span-4 rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/50 border-slate-300/50 hover:border-slate-300 shadow-lg'}`}
        >
          <h3 className="text-lg font-bold mb-4">{t?.quickActions}</h3>
          <div className="space-y-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.button 
                  key={idx} 
                  whileHover={{ x: 4 }} 
                  whileTap={{ scale: 0.98 }} 
                  onClick={action.action} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20' : 'bg-slate-100/50 hover:bg-slate-200/50 border-slate-300/30 hover:border-slate-300'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
          className="col-span-12 lg:col-span-4 grid grid-cols-3 gap-4"
        >
          <div className={`rounded-xl backdrop-blur-xl border p-4 text-center transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
            <p className="text-4xl font-bold text-indigo-400 mb-1">{totalStudents}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.totalStudents}</p>
          </div>
          <div className={`rounded-xl backdrop-blur-xl border p-4 text-center transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
            <p className="text-4xl font-bold text-violet-400 mb-1">{filteredCourses?.length || 0}</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.activeCourses}</p>
          </div>
          <div className={`rounded-xl backdrop-blur-xl border p-4 text-center transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
            <p className="text-4xl font-bold text-pink-400 mb-1">3</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.pendingGrades}</p>
          </div>
        </motion.div>

        {/* Invigilation Schedule */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }} 
          className="col-span-12 rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300" 
          style={{ 
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)' 
          }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-400" />
            {t?.invigilationSchedule}
          </h3>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.upcomingExams}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(INVIGILATION_SCHEDULE || []).map((exam) => (
              <motion.div 
                key={exam.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: 0.5 + exam.id * 0.05 }} 
                className={`rounded-lg backdrop-blur-xl border p-4 transition-all duration-300 ${isDark ? 'bg-blue-600/20 border-blue-400/30' : 'bg-blue-500/20 border-blue-300/50'}`}
              >
                <p className={`text-xs font-semibold uppercase ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>{exam.exam}</p>
                <div className={`mt-3 space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{exam.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{exam.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{t?.room} {exam.room}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Course Cards */}
        {(filteredCourses || []).length > 0 ? (
          filteredCourses.map((course, idx) => (
            <motion.button 
              key={course.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }} 
              whileHover={{ y: -4 }} 
              onClick={() => setActiveTab('courses')} 
              className={`${idx === 0 ? 'col-span-12 lg:col-span-6' : 'col-span-12 sm:col-span-6 lg:col-span-3'} rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 text-left ${isDark ? `bg-gradient-to-br ${course.color} border-white/10 hover:border-white/30` : `bg-gradient-to-br ${course.color?.replace('/20', '/30')} border-slate-300/50 hover:border-slate-300 shadow-lg`}`}
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{course.id}</p>
                  <h3 className="text-xl font-bold mt-2">{course.name}</h3>
                  <div className="mt-4 inline-block px-3 py-1 rounded-full bg-orange-500/30 border border-orange-400/50 text-orange-300 text-xs font-semibold">{t?.pending}</div>
                </div>
                <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-300/30'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-4xl font-bold ${course.studentColor}`}>{course.studentCount || 0}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.students}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-500'}`} />
                  </div>
                </div>
              </div>
            </motion.button>
          ))
        ) : (
          <div className={`col-span-12 text-center py-12 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            <p className="text-lg font-semibold">{t?.noResults}</p>
          </div>
        )}

        {/* Footer Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.8 }} 
          className={`col-span-12 rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold">{t?.aiPowered}</h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{t?.aiDesc}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}