import React from 'react';
import { LayoutDashboard, Calendar, BarChart3, FileText } from 'lucide-react';
import SharedSidebar from '../shared/SharedSidebar'; 
import horizonLogo from '../../assets/horizon-logo.png';

export default function StudentSidebar(props) {
  const { 
    isDark, setIsDark, 
    language, setLanguage, 
    activeTab, setActiveTab, 
    setCurrentPage, 
    t 
  } = props;

  // BACKEND NOTE: Navigation labels come from the 't' (translations) object.
  // Your teammate should ensure these keys exist in the backend translation files.
  const studentNavItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'exams', label: t.myExams, icon: Calendar },
    { id: 'grades', label: t.myGrades, icon: BarChart3 },
    { id: 'documents', label: t.documents, icon: FileText },
  ];

  // BACKEND NOTE: This mock profile should be replaced with data from your 
  // AuthContext or Global User State once the login system is live.
  const studentProfile = {
    initials: 'AC',
    name: 'Alex Chen',
    role: 'Student'
  };

  return (
    <SharedSidebar 
      isDark={isDark} setIsDark={setIsDark}
      language={language} setLanguage={setLanguage}
      t={t}
      activeView={activeTab} 
      setActiveView={setActiveTab} 
      navItems={studentNavItems}
      userProfile={studentProfile}
      logoSrc={horizonLogo}
      logoAlt="Horizon Student"
      // FIXED: Added both triggers to connect the Sidebar to the Portal state
      onProfileClick={() => setCurrentPage('profile')} 
      onSettingsClick={() => setCurrentPage('settings')} 
    />
  );
}