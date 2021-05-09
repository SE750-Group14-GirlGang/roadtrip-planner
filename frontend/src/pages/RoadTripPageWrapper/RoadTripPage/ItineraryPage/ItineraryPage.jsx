import { React } from 'react';
import styles from './ItineraryPage.module.css';
import ItineraryWrapper from '../../../../components/ItineraryWrapper/ItineraryWrapper';

export default function ItineraryPage() {
  return (
    <div className={styles.itineraryPage}>
      <p className={styles.itineraryPageTitle}>Itinerary</p>
      <ItineraryWrapper />
    </div>
  );
}
