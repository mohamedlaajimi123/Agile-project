import React from 'react';
import SharedSyncView from '../../shared/SharedSyncView';

export default function ProfessorSyncView({ isDark, t }) {
  return (
    <SharedSyncView
      isDark={isDark}
      endpoint="/professor/sync"
      title="Professor Data Synchronization"
      description="Sync course data, student records, grades, and academic information with the central database."
    />
  );
}