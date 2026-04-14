import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Data
import { STUDENT_DATA, EXAMS, GRADES, SEMESTER_WEEKS, CURRENT_WEEK, MIDTERMS_WEEK, FINALS_START_WEEK, LABELS } from '../data/studentData';

// Import Components
import StudentProfile from '../components/student/StudentProfile';
import StudentSidebar from '../components/student/StudentSidebar';
import StudentTopbar from '../components/student/StudentTopbar';
import StudentDashboardView from '../components/student/views/StudentDashboardView';
import StudentExamsView from '../components/student/views/StudentExamsView';
import StudentGradesView from '../components/student/views/StudentGradesView';
import StudentDocumentsView from '../components/student/views/StudentDocumentsView';

// Full Page View Components
import ProfessorSettings from '../components/professor/ProfessorSettings';

export default function StudentPortal() {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('portal'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(2);

  const t = LABELS[language];
  
  // Logic & Filtering preserved
  const daysToNextExam = Math.ceil((new Date('2024-04-15') - new Date()) / (1000 * 60 * 60 * 24));
  const filteredExams = EXAMS.filter(exam => exam.module.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredGrades = GRADES.filter(grade => grade.name.toLowerCase().includes(searchQuery.toLowerCase()) || grade.code.toLowerCase().includes(searchQuery.toLowerCase()));

  // AESTHETIC CHECK: Determine if we are in a full-screen blurred state
  const isFullPageView = currentPage === 'profile' || currentPage === 'settings';

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-slate-950 text-white' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* BACKEND NOTE: Background Orbs are decorative. 
          If performance issues occur on lower-end devices, 
          the backend-driven settings could allow users to toggle "Advanced Visuals" off.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }} 
          transition={{ duration: 20, repeat: Infinity }} 
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'}`} 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }} 
          transition={{ duration: 25, repeat: Infinity }} 
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-violet-500/10' : 'bg-violet-500/5'}`} 
        />
      </div>

      {/* Sidebar - Aesthetic: Hidden in Full Page Views to maintain focus */}
      {!isFullPageView && (
        <StudentSidebar 
          isDark={isDark} setIsDark={setIsDark} 
          language={language} setLanguage={setLanguage} 
          activeTab={activeTab} setActiveTab={setActiveTab} 
          setCurrentPage={setCurrentPage} 
          t={t} 
        />
      )}

      <main className={`relative z-10 transition-all duration-300 min-h-screen ${
        isFullPageView ? 'ml-0 p-0' : 'ml-64 p-8'
      }`}>
        
        {/* Topbar - Aesthetic: Hidden in Full Page Views */}
        {!isFullPageView && (
          <StudentTopbar 
            isDark={isDark} t={t} 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
            notificationCount={notificationCount} 
            programName={STUDENT_DATA.program} 
          />
        )}

        <AnimatePresence mode="wait">
          {currentPage === 'profile' && (
            <StudentProfile key="profile" t={t} setCurrentPage={setCurrentPage} isDark={isDark} />
          )}

          {currentPage === 'settings' && (
            <ProfessorSettings key="settings" isDark={isDark} t={t} setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'portal' && (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {activeTab === 'dashboard' && (
                <StudentDashboardView isDark={isDark} t={t} STUDENT_DATA={STUDENT_DATA} EXAMS={EXAMS} SEMESTER_WEEKS={SEMESTER_WEEKS} CURRENT_WEEK={CURRENT_WEEK} MIDTERMS_WEEK={MIDTERMS_WEEK} FINALS_START_WEEK={FINALS_START_WEEK} daysToNextExam={daysToNextExam} />
              )}
              {activeTab === 'exams' && (
                <StudentExamsView isDark={isDark} t={t} filteredExams={filteredExams} />
              )}
              {activeTab === 'grades' && (
                <StudentGradesView isDark={isDark} t={t} filteredGrades={filteredGrades} />
              )}
              {activeTab === 'documents' && (
                <StudentDocumentsView isDark={isDark} t={t} STUDENT_DATA={STUDENT_DATA} EXAMS={EXAMS} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}