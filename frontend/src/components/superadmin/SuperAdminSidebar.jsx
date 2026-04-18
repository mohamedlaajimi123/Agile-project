import React from 'react';
import { Database, Shield, Settings } from 'lucide-react';
import SharedSidebar from '../shared/SharedSidebar';

// Adjust path to your assets folder
import horizonLogo from '../../assets/horizon-logo.png'; 

export default function SuperAdminSidebar({ 
  isDark, setIsDark, 
  language, setLanguage, 
  activeView, setActiveView, 
  onSettingsClick, 
  t 
}) {
  
  // Super Admin navigation items
  const superAdminNavItems = [
    { id: 'sync', label: t?.nav?.sync || 'Data Sync', icon: Database },
    { id: 'audit', label: t?.nav?.audit || 'Audit Log', icon: Shield },
    { id: 'config', label: t?.nav?.config || 'Config', icon: Settings }
  ];

  const superAdminProfile = {
    initials: "SA",
    name: "Super Admin",
    role: "System Administrator"
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
      navItems={superAdminNavItems}
      userProfile={superAdminProfile}
      logoSrc={horizonLogo} 
      logoAlt="Horizon University Logo"
      
      // Inline routing! Matches your Admin pattern perfectly
      onProfileClick={() => setActiveView('profile')} 
      onSettingsClick={onSettingsClick || (() => setActiveView('settings'))} 
    />
  );
}