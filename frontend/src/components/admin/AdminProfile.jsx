import React from 'react';
import { Server, ShieldCheck } from 'lucide-react';
import SharedProfile from '../shared/SharedProfile';

export default function AdminProfile({ isDark, t, setCurrentPage }) {
  
  // Simulated Admin data
  const adminData = {
    name: 'System Administrator',
    email: 'admin@horizon-university.tn',
    phone: '+216 50 000 000'
  };

  const handleSaveProfile = async (formData) => {
    // Replace with real API call later
    console.log("Saving Admin Profile:", formData);
  };

  const adminCustomFields = [
    { label: 'Department', value: 'IT & Infrastructure', icon: <Server className="w-4 h-4 text-violet-400" /> },
    { label: 'Clearance Level', value: 'Super Administrator', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <SharedProfile 
      isDark={isDark}
      t={t}
      onBack={() => setCurrentPage('portal')}
      user={adminData}
      roleLabel="System Operations"
      customFields={adminCustomFields}
      onSaveProfile={handleSaveProfile}
    />
  );
}