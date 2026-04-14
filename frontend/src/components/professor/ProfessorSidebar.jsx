import React from 'react';
import { LayoutDashboard, BookOpen, BarChart3 } from 'lucide-react';
import SharedSidebar from '../shared/SharedSidebar'; 
import horizonLogo from '../../assets/horizon-logo.png';

export default function ProfessorSidebar({ isDark, setIsDark, language, setLanguage, activeTab, setActiveTab, t, setCurrentPage, setSelectedGradesCourse }) {

  const profNavItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'courses', label: t.courses, icon: BookOpen },
    { id: 'grades', label: t.grades, icon: BarChart3 },
  ];

  const handleTabChange = (viewId) => {
    setActiveTab(viewId);
    // If we switch tabs, reset any open grading details
    if (setSelectedGradesCourse) setSelectedGradesCourse(null);
  };

  return (
    <SharedSidebar 
      isDark={isDark} setIsDark={setIsDark} language={language} setLanguage={setLanguage} t={t}
      activeView={activeTab} setActiveView={handleTabChange} navItems={profNavItems}
      userProfile={{ initials: 'RM', name: 'Prof. Richard M.', role: 'Lecturer' }} 
      logoSrc={horizonLogo} logoAlt="Horizon Professor"
      onProfileClick={() => setCurrentPage('profile')}
      onSettingsClick={() => setCurrentPage('settings')}
    />
  );
}