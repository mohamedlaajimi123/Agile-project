import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// BACKEND NOTE: These imports provide the mock data for UI testing.
import { LABELS, INVIGILATION_SCHEDULE } from '../data/professorData';
import { useFetch } from '../hooks/useFetch';
import { professorService } from '../api/mockApi';

// Internal Components
import ProfessorProfile from '../components/professor/ProfessorProfile';
import ProfessorSidebar from '../components/professor/ProfessorSidebar';
import ProfessorTopBar from '../components/professor/ProfessorTopBar';
import ProfessorSettings from '../components/professor/ProfessorSettings';
import DashboardView from '../components/professor/views/DashboardView';
import GradesView from '../components/professor/views/GradesView';

// Custom Hook
import { useProfessorActions } from '../hooks/useProfessorActions';

export default function ProfessorPortal() {
  // UI State
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('portal'); 
  const [selectedGradesCourse, setSelectedGradesCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const t = LABELS[language];

  // BACKEND NOTE: useFetch is a wrapper for API calls. 
  // Your teammate should check these service methods to point to the real production URLs.
  const { data: profData } = useFetch(professorService.getProfile);
  const { data: classesData } = useFetch(professorService.getClasses);

  // Logic from our new hook
  const { 
    courseStudents, 
    initializeStudents, 
    updateStudentGrade, 
    handleAutoFillGrades, 
    isAutoFilling 
  } = useProfessorActions();

  // Settings/Profile full-page logic
  const isFullPageView = currentPage === 'profile' || currentPage === 'settings';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'}`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-violet-500/10' : 'bg-violet-500/5'}`} />
      </div>

      {/* Sidebar - Hidden in full page views */}
      {!isFullPageView && (
        <ProfessorSidebar 
          isDark={isDark} setIsDark={setIsDark} 
          language={language} setLanguage={setLanguage} 
          activeTab={activeTab} setActiveTab={setActiveTab} 
          t={t} setCurrentPage={setCurrentPage}
          setSelectedGradesCourse={setSelectedGradesCourse}
        />
      )}

      <main className={`relative z-10 transition-all duration-300 min-h-screen ${isFullPageView ? 'ml-0' : 'ml-64 p-8'}`}>
        
        {!isFullPageView && (
          <ProfessorTopBar 
            isDark={isDark} t={t} 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
          />
        )}

        <div className={!isFullPageView ? 'mt-4' : ''}>
          <AnimatePresence mode="wait">
            
            {/* Full Page Overlay: Profile */}
            {currentPage === 'profile' && (
              <ProfessorProfile key="profile" isDark={isDark} t={t} setCurrentPage={setCurrentPage} />
            )}

            {/* Full Page Overlay: Settings */}
            {currentPage === 'settings' && (
              <ProfessorSettings key="settings" isDark={isDark} t={t} setCurrentPage={setCurrentPage} />
            )}

            {/* Main Portal Content */}
            {currentPage === 'portal' && (
              <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                
                {activeTab === 'dashboard' && (
                  <DashboardView 
                    isDark={isDark} t={t} 
                    setActiveTab={setActiveTab} 
                    setSelectedGradesCourse={setSelectedGradesCourse}
                    PROF_DATA={profData}
                    filteredCourses={classesData || []} 
                    INVIGILATION_SCHEDULE={INVIGILATION_SCHEDULE}
                  />
                )}
                
                {activeTab === 'grades' && (
                  <GradesView 
                    isDark={isDark} t={t} 
                    COURSES={classesData || []}
                    selectedGradesCourse={selectedGradesCourse}
                    setSelectedGradesCourse={setSelectedGradesCourse}
                    courseStudents={courseStudents} 
                    initializeStudents={initializeStudents}
                    updateStudentGrade={updateStudentGrade}
                    handleAutoFillGrades={handleAutoFillGrades}
                    isAutoFilling={isAutoFilling}
                  />
                )}

                {/* BACKEND NOTE: This uses the GradesView component but with 'viewOnly' 
                    so the teammate doesn't have to build a whole new Course management API yet. */}
                {activeTab === 'courses' && (
                  <GradesView 
                    isDark={isDark} t={t} 
                    COURSES={classesData || []}
                    viewOnly={true} 
                  />
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}