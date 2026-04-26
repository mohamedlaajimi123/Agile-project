import React from 'react';
import { CalendarDays, GraduationCap, Users, FolderOpen, RefreshCw } from 'lucide-react';
import SharedSidebar from '../shared/SharedSidebar';

// 👇 IMPORT YOUR LOGO HERE.
import horizonLogo from '../../assets/horizon-logo.png'; 

export default function AdminSidebar({ 
  isDark, setIsDark, 
  language, setLanguage, 
  activeView, setActiveView, 
  onSettingsClick, 
  t 
}) {
  
  // Navigation items updated to remove 'insights' and 'class-list'
  const adminNavItems = [
    { id: 'exam-planner', label: t?.examPlanner || 'Exam Planner', icon: CalendarDays },
    { id: 'grade-control', label: t?.gradeControl || 'Grade Control', icon: GraduationCap },
    { id: 'user-directory', label: t?.userDirectory || 'User Directory', icon: Users },
    { id: 'documents', label: t?.documents || 'Documents', icon: FolderOpen },
    { id: 'sync', label: t?.sync || 'Data Sync', icon: RefreshCw }
  ];

  const adminProfile = {
    initials: "SA",
    name: "System Admin",
    role: "Operations"
  };

  return (
    <SharedSidebar 
      isDark={isDark} 
      setIsDark={setIsDark}
      language={language} 
      setLanguage={setLanguage}
      activeView={activeView} 
      setActiveView={setActiveView}
      t={t}
      navItems={adminNavItems}
      userProfile={adminProfile}
      logoSrc={horizonLogo} 
      logoAlt="Horizon University Logo"
      onProfileClick={() => setActiveView('profile')} 
      onSettingsClick={onSettingsClick} 
    />
  );
}