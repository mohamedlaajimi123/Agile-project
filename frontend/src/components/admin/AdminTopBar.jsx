import React from 'react';
import SharedTopBar from '../shared/SharedTopBar'; // Adjust path if needed

export default function AdminTopBar(props) {
  const { t } = props;

  return (
    <SharedTopBar 
      {...props} 
      title={t.administration}
      subtitle={t.systemOverview}
      searchPlaceholder="Search..." // You can change this to t.search if you have a translation for it!
    />
  );
}