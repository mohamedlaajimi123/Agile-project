import React from 'react';
import SharedTopBar from '../shared/SharedTopBar';

export default function ProfessorTopBar(props) {
  const { t, notificationCount } = props;

  return (
    <SharedTopBar 
      {...props} 
      title={t.welcome}
      subtitle={t.yourStats}
      searchPlaceholder={t.searchPlaceholder}
      notificationCount={notificationCount}
    />
  );
}