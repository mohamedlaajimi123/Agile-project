import React from 'react';
import SharedTopBar from '../shared/SharedTopBar';

export default function StudentTopbar(props) {
  const { t, programName, notificationCount } = props;

  return (
    <SharedTopBar 
      {...props} 
      title={t.welcome}
      subtitle={programName}
      searchPlaceholder={t.searchPlaceholder}
      notificationCount={notificationCount}
      onProfileClick={() => setActiveView('profile')}
    />
  );
}