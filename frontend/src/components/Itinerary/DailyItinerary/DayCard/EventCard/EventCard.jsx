import React from 'react';
import moment from 'moment';

import styles from './EventCard.module.css';

export default function EventCard({ event }) {
  // add arbitrary date in front of time so that a moment object can be created which can then be formatted
  const formattedTime = moment(`2016-03-12 ${event.time}:00`).format('LT');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <p className={styles.time}>{formattedTime}</p>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{event.description}</p>
          </div>
          <div className={styles.locationTimeContainer}>
            <p> Location: {event.location}</p>
            <p> Notes: {event.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
