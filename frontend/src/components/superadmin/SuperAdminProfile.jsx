import React from 'react';
import { Server, ShieldAlert } from 'lucide-react';
import SharedProfile from '../shared/SharedProfile';

export default function SuperAdminProfile({ isDark, t, setActiveView }) {
  
  // Simulated Super Admin data
  const superAdminData = {
    name: 'Super Administrator',
    email: 'admin@horizon-university.tn',
    phone: '+216 55 555 555'
  };

  const handleSaveProfile = async (formData) => {
    // Replace with real API call later
    console.log("Saving Super Admin Profile:", formData);
  };

  const superAdminCustomFields = [
    { label: 'Department', value: 'Global IT Operations', icon: <Server className="w-4 h-4 text-violet-400" /> },
    { label: 'Clearance Level', value: 'Level 5 (System Wide)', icon: <ShieldAlert className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <div className={`min-h-screen p-8 transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white' 
        : 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        <SharedProfile 
          isDark={isDark}
          t={t}
          // 'sync' is the default landing tab for Super Admin
          onBack={() => setActiveView('sync')} 
          user={superAdminData}
          roleLabel="System Administrator"
          customFields={superAdminCustomFields}
          onSaveProfile={handleSaveProfile}
        />
      </div>
    </div>
  );
}