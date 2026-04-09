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

export default function StudentPortal() {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState('portal'); // The connection brain!
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(2);

  const t = LABELS[language];
  const daysToNextExam = Math.ceil((new Date('2024-04-15') - new Date()) / (1000 * 60 * 60 * 24));
  
  const filteredExams = EXAMS.filter(exam => exam.module.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredGrades = GRADES.filter(grade => grade.name.toLowerCase().includes(searchQuery.toLowerCase()) || grade.code.toLowerCase().includes(searchQuery.toLowerCase()));

  // The Router Switch: Shows Profile instead of Portal when clicked
  if (currentPage === 'profile') {
    return <StudentProfile isDark={isDark} t={t} STUDENT_DATA={STUDENT_DATA} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900'}`}>
      {isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-30" />
          <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-30" />
        </div>
      )}

      {/* The Cable: Passes setCurrentPage to the Sidebar */}
      <StudentSidebar 
        isDark={isDark} 
        setIsDark={setIsDark} 
        language={language} 
        setLanguage={setLanguage} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setCurrentPage={setCurrentPage} 
        t={t} 
      />

      <main className="ml-64 relative z-10 p-8 min-h-screen">
        <StudentTopbar isDark={isDark} t={t} searchQuery={searchQuery} setSearchQuery={setSearchQuery} notificationCount={notificationCount} programName={STUDENT_DATA.program} />

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <StudentDashboardView key="dashboard" isDark={isDark} t={t} STUDENT_DATA={STUDENT_DATA} EXAMS={EXAMS} SEMESTER_WEEKS={SEMESTER_WEEKS} CURRENT_WEEK={CURRENT_WEEK} MIDTERMS_WEEK={MIDTERMS_WEEK} FINALS_START_WEEK={FINALS_START_WEEK} daysToNextExam={daysToNextExam} />
          )}

          {activeTab === 'exams' && (
            <StudentExamsView key="exams" isDark={isDark} t={t} filteredExams={filteredExams} />
          )}

          {activeTab === 'grades' && (
            <StudentGradesView key="grades" isDark={isDark} t={t} filteredGrades={filteredGrades} />
          )}

          {activeTab === 'documents' && (
            <StudentDocumentsView key="documents" isDark={isDark} t={t} STUDENT_DATA={STUDENT_DATA} EXAMS={EXAMS} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}