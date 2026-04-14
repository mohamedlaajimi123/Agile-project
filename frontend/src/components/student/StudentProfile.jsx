import React from 'react';
import { BookOpen, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import { studentService } from '../../api/mockApi';
import SharedProfile from '../shared/SharedProfile';

export default function StudentProfile({ t, setCurrentPage }) {
  const { isDark, showToast } = useAuth();
  const { data: student, refetch } = useFetch(studentService.getProfile);

  const handleSaveProfile = async (formData) => {
    try {
      await studentService.updateProfile(formData);
      await refetch();
      showToast(t.profileUpdated || "Profile Updated Successfully!", "success");
    } catch (err) {
      showToast("Sync Error: Could not save changes.", "error");
    }
  };

  const studentCustomFields = [
    { label: 'Program', value: student?.program || '...', icon: <BookOpen className="w-4 h-4 text-violet-400" /> },
    { label: 'Current Semester', value: student?.semester || '...', icon: <Calendar className="w-4 h-4 text-violet-400" /> }
  ];

  return (
    <SharedProfile 
      isDark={isDark}
      t={t}
      onBack={() => setCurrentPage('portal')} // Back to main layout
      user={student}
      roleLabel={student?.id || "Student ID"}
      customFields={studentCustomFields}
      onSaveProfile={handleSaveProfile}
    />
  );
}