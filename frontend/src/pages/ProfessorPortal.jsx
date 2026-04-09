import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';

// Import Data (Keeping your originals)
import { LABELS } from '../data/professorData';

// Import Hooks and API (Needed to make the data show up)
import { useFetch } from '../hooks/useFetch';
import { professorService } from '../api/mockApi';

// Import Components
import ProfessorProfile from '../components/professor/ProfessorProfile';
import ProfessorSidebar from '../components/professor/ProfessorSidebar';
import ProfessorTopBar from '../components/professor/ProfessorTopBar';
import DashboardView from '../components/professor/views/DashboardView';
import GradesView from '../components/professor/views/GradesView';

export default function ProfessorPortal() {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('portal'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(3);
  const [selectedGradesCourse, setSelectedGradesCourse] = useState(null);
  const [courseStudents, setCourseStudents] = useState({});
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // --- DATA FETCHING ---
  // Fetching the classes and schedule from the API we built
  const { data: profData } = useFetch(professorService.getProfile);
  const { data: classesData } = useFetch(professorService.getClasses);
  const { data: scheduleData } = useFetch(professorService.getInvigilation);

  const t = LABELS[language];
  
  // Use fetched data if available, otherwise fallback to empty array
  const COURSES = classesData || [];
  const INVIGILATION_SCHEDULE = scheduleData || [];

  const filteredCourses = COURSES.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalStudents = COURSES.reduce((acc, course) => acc + (course.studentCount || 0), 0);

  // Initialize course students
  const initializeStudents = async (courseId) => {
    if (!courseStudents[courseId]) {
      const roster = await professorService.getClassRoster(courseId);
      if (roster) setCourseStudents(prev => ({ ...prev, [courseId]: roster }));
    }
  };

  const updateStudentGrade = async (courseId, studentId, newGrade) => {
    setCourseStudents(prev => ({
      ...prev, [courseId]: prev[courseId].map(student => student.id === studentId ? { ...student, grade: newGrade } : student)
    }));
    await professorService.updateGrade(courseId, studentId, newGrade);
  };

  const handleAutoFillGrades = (courseId) => {
    setIsAutoFilling(true);
    setTimeout(() => {
      setCourseStudents(prev => ({
        ...prev, [courseId]: prev[courseId].map(student => student.grade === '' || student.grade === null ? { ...student, grade: Math.floor(Math.random() * 11) + 10, aiGenerated: true } : student)
      }));
      setIsAutoFilling(false);
    }, 2000);
  };

  if (currentPage === 'profile') {
    return <ProfessorProfile isDark={isDark} t={t} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'}`}>
      {isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-30" />
          <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-30" />
        </div>
      )}

      {/* Sidebar */}
      <ProfessorSidebar isDark={isDark} setIsDark={setIsDark} language={language} setLanguage={setLanguage} activeTab={activeTab} setActiveTab={setActiveTab} setCurrentPage={setCurrentPage} t={t} setSelectedGradesCourse={setSelectedGradesCourse} />

      <main className="ml-64 relative z-10 p-8 min-h-screen">
        {/* Top Bar */}
        <ProfessorTopBar isDark={isDark} t={t} searchQuery={searchQuery} setSearchQuery={setSearchQuery} notificationCount={notificationCount} />

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <DashboardView 
              isDark={isDark} 
              t={t} 
              setActiveTab={setActiveTab} 
              setSelectedGradesCourse={setSelectedGradesCourse} 
              totalStudents={totalStudents} 
              filteredCourses={filteredCourses}
              PROF_DATA={profData}
              INVIGILATION_SCHEDULE={INVIGILATION_SCHEDULE} 
            />
          )}

          {activeTab === 'courses' && (
            <motion.div key="courses" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-bold">{t.courses}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSES.map((course) => (
                  <motion.div key={course.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -4 }} className={`rounded-2xl backdrop-blur-xl border p-6 transition-all duration-300 ${isDark ? `bg-gradient-to-br ${course.color} border-white/10 hover:border-white/30` : `bg-gradient-to-br ${course.color.replace('/20', '/30')} border-slate-300/50 shadow-lg`}`}>
                    <p className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{course.id}</p>
                    <h3 className="text-lg font-bold mt-2">{course.name}</h3>
                    <div className="mt-4 inline-block px-3 py-1 rounded-full bg-orange-500/30 text-orange-300 text-xs font-semibold">{t.pending}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'grades' && (
            <GradesView isDark={isDark} t={t} COURSES={COURSES} selectedGradesCourse={selectedGradesCourse} setSelectedGradesCourse={setSelectedGradesCourse} initializeStudents={initializeStudents} courseStudents={courseStudents} updateStudentGrade={updateStudentGrade} handleAutoFillGrades={handleAutoFillGrades} isAutoFilling={isAutoFilling} />
          )}

          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <h2 className="text-2xl font-bold">{t.settings}</h2>
              <div className={`rounded-2xl backdrop-blur-xl border p-8 text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-slate-300/50 shadow-lg'}`}>
                <Settings className="w-16 h-16 mx-auto mb-4 text-violet-400" />
                <h3 className="text-2xl font-bold mb-2">Settings Coming Soon</h3>
                <p className={isDark ? 'text-gray-400' : 'text-slate-600'}>Customize your preferences and account settings here.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}