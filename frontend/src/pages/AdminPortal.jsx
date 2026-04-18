import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Data
import { EXAM_DATA } from '../data/admin/mockData';
import { LABELS } from '../data/admin/labels';

// Layout Components
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopBar from '../components/admin/AdminTopBar';

// Views
import InsightsView from '../components/admin/views/InsightsView';
import ExamPlannerView from '../components/admin/views/ExamPlannerView';
import GradeControlView from '../components/admin/views/GradeControlView';
import UserDirectoryView from '../components/admin/views/UserDirectoryView';
import DocumentCenterView from '../components/admin/views/DocumentCenterView';
import AdminSyncView from '../components/admin/views/AdminSyncView';

// Profile & Settings Wrappers
import AdminProfile from '../components/admin/AdminProfile';
import ProfessorSettings from '../components/professor/ProfessorSettings'; // Reusing the high-end settings glassmorphism

export default function AdminPortal() {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('EN');
  const [activeView, setActiveView] = useState('sync');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Shared state for the planner
  const [gridAssignments, setGridAssignments] = useState({});
  const [unassignedExams, setUnassignedExams] = useState(EXAM_DATA);
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedBachelor, setSelectedBachelor] = useState('All Bachelors');
  
  const t = LABELS[language];

  // AESTHETIC LOGIC: Full-screen views that hide sidebar/topbar
  const isFullPageView = activeView === 'profile' || activeView === 'settings';

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' 
        : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900'
    }`}>
      
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            isDark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'
          }`}
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
            isDark ? 'bg-violet-500/10' : 'bg-violet-500/5'
          }`}
        />
      </div>

      {/* Conditionally Render the Sidebar */}
      {!isFullPageView && (
        <AdminSidebar 
          isDark={isDark} setIsDark={setIsDark}
          language={language} setLanguage={setLanguage}
          activeView={activeView} setActiveView={setActiveView}
          // BACKEND NOTE: Use these triggers to handle Profile/Settings clicks from SharedSidebar
          onProfileClick={() => setActiveView('profile')}
          onSettingsClick={() => setActiveView('settings')}
          t={t}
        />
      )}

      {/* Main Content Area */}
      <main className={`relative z-10 min-h-screen overflow-y-auto transition-all duration-300 ${
        isFullPageView ? 'ml-0 p-0' : 'ml-64 p-8'
      }`}>
        
        {/* Conditionally Render the Top Bar */}
        {!isFullPageView && (
          <AdminTopBar 
            isDark={isDark} 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
            t={t} 
          />
        )}

        <AnimatePresence mode="wait">
          {activeView === 'insights' && <InsightsView key="insights" isDark={isDark} t={t} />}
          
          {activeView === 'exam-planner' && (
            <ExamPlannerView 
              key="planner" isDark={isDark} t={t} 
              gridAssignments={gridAssignments} setGridAssignments={setGridAssignments}
              unassignedExams={unassignedExams} setUnassignedExams={setUnassignedExams}
              selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
              selectedBachelor={selectedBachelor} setSelectedBachelor={setSelectedBachelor}
            />
          )}
          
          {activeView === 'grade-control' && <GradeControlView key="grades" isDark={isDark} t={t} />}
          
          {activeView === 'user-directory' && (
            <UserDirectoryView key="user-directory" isDark={isDark} t={t} searchQuery={searchQuery} />
          )}
          
          {activeView === 'documents' && <DocumentCenterView key="documents" isDark={isDark} t={t} />}

          {activeView === 'sync' && <AdminSyncView key="sync" isDark={isDark} t={t} />}

          {/* FULL SCREEN VIEWS */}
          {activeView === 'profile' && (
            <AdminProfile 
              key="profile" 
              isDark={isDark} 
              t={t} 
              setCurrentPage={() => setActiveView('insights')} 
            />
          )}

          {activeView === 'settings' && (
            <ProfessorSettings 
              key="settings" 
              isDark={isDark} 
              t={t} 
              setCurrentPage={() => setActiveView('insights')} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}