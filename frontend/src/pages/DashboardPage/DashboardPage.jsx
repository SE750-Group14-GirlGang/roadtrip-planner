import React from 'react';
import styles from './DashboardPage.module.css';
import TopBar from '../../components/TopBar/TopBar';
import TripsSection from '../../components/dashboard/TripsSection/TripsSection';

import useGet from '../../hooks/useGet';

export default function DashboardPage() {
  const { response, loading } = useGet('/api/roadtrip');

  return (
    <div className={styles.dashboard}>
      <TopBar />
      <TripsSection
        title="Trips I'm Organising"
        trips={response?.data?.roadTripsOrganising}
        loading={loading}
        disable={false}
      />
      <TripsSection
        title="Trips I'm Attending"
        trips={response?.data?.roadTripsAttending}
        loading={loading}
        disable={false}
      />
    </div>
  );
}
