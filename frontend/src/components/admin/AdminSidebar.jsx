import React from 'react';
<<<<<<< HEAD
import { LayoutDashboard, CalendarDays, GraduationCap, Users, FolderOpen, BookOpen } from 'lucide-react';
=======
import { LayoutDashboard, CalendarDays, GraduationCap, Users, FolderOpen, RefreshCw } from 'lucide-react';
>>>>>>> 56be6afd1916d87f315e3ec5363ccc5756b2fbdf
import SharedSidebar from '../shared/SharedSidebar';

// 👇 IMPORT YOUR LOGO HERE. Adjust the path if your assets folder is somewhere else!
import horizonLogo from '../../assets/horizon-logo.png'; 

export default function AdminSidebar({ 
  isDark, setIsDark, 
  language, setLanguage, 
  activeView, setActiveView, 
  onSettingsClick, // 👈 Destructure this from props
  t 
}) {
  
  // Define the navigation items for the Admin
  const adminNavItems = [
    { id: 'insights', label: t?.insights || 'Insights', icon: LayoutDashboard },
    { id: 'exam-planner', label: t?.examPlanner || 'Exam Planner', icon: CalendarDays },
    { id: 'grade-control', label: t?.gradeControl || 'Grade Control', icon: GraduationCap },
    { id: 'user-directory', label: t?.userDirectory || 'User Directory', icon: Users },
<<<<<<< HEAD
    { id: 'class-list', label: t?.classGPA || 'Class GPA', icon: BookOpen },
    { id: 'documents', label: t?.documents || 'Documents', icon: FolderOpen }
=======
    { id: 'documents', label: t?.documents || 'Documents', icon: FolderOpen },
    { id: 'sync', label: t?.sync || 'Data Sync', icon: RefreshCw }
>>>>>>> 56be6afd1916d87f315e3ec5363ccc5756b2fbdf
  ];

  // Define the mock profile data for the Admin
  // BACKEND NOTE: Initials and Name should eventually come from the Auth context.
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
      
      // 👇 PASS THE IMPORTED LOGO VARIABLE HERE
      logoSrc={horizonLogo} 
      logoAlt="Horizon University Logo"
      
      // Tells the portal to switch to the profile view
      onProfileClick={() => setActiveView('profile')} 
      // 👇 ADDED THIS: Tells the portal to switch to the settings view
      onSettingsClick={onSettingsClick} 
    />
  );
}