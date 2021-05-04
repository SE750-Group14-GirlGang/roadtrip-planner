import React from 'react';
import styles from './TripsSection.module.css';
import Spinner from '../../commons/Spinner/Spinner';
import TripsList from '../commons/TripsList/TripsList';

export default function GroupsSection({ title, trips, loading, disable }) {
  return (
    <div className={styles.section}>
      <h1>{title}</h1>
      {trips && <TripsList trips={trips} disable={disable} />}
      {loading && <Spinner />}
    </div>
  );
}
