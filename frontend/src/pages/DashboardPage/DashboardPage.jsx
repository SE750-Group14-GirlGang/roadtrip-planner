import React from 'react';
import styles from './DashboardPage.module.css';
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar';
import TripsSection from '../../components/TripsSection/TripsSection';

import useGet from '../../hooks/useGet';

export default function DashboardPage() {
  const { response, loading, refetch } = useGet('/api/roadtrip');

  return (
    <div className={styles.dashboard}>
      <HomeTopBar refetchRoadTrips={refetch} />
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
