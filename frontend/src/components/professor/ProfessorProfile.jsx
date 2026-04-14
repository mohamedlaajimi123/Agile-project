import React from 'react';
import { Building, Clock, Star } from 'lucide-react';
import SharedProfile from '../shared/SharedProfile';

export default function ProfessorProfile({ isDark, t, setCurrentPage }) {
  
  const professorData = {
    name: 'Prof. Richard Morrison',
    email: 'richard.morrison@horizon-university.tn',
    phone: '+216 55 987 654'
  };

  const professorCustomFields = [
    { label: t.department || 'Department', value: 'Faculty of Engineering', icon: <Building className="w-4 h-4 text-violet-400" /> },
    { label: t.office || 'Office Hours', value: 'Mon-Wed 2:00 PM - 5:00 PM', icon: <Clock className="w-4 h-4 text-violet-400" /> },
    { label: t.specialization || 'Specialization', value: 'Web Technologies & Databases', icon: <Star className="w-4 h-4 text-violet-400" /> }
  ];

  return (
    <SharedProfile 
      isDark={isDark}
      t={t}
      // This sends the professor back to the dashboard layout
      onBack={() => setCurrentPage('portal')}
      user={professorData}
      roleLabel="Senior Lecturer, Computer Science"
      customFields={professorCustomFields}
      onSaveProfile={(data) => console.log("Saving...", data)}
    />
  );
}