import React from 'react';
import SharedSyncView from '../../shared/SharedSyncView';

export default function AdminSyncView({ isDark, t }) {
  return (
    <SharedSyncView
      isDark={isDark}
      endpoint="/admin/sync"
      title="Admin Data Synchronization"
      description="Sync administrative data including user records, permissions, and system configurations across all connected systems."
    />
  );
}