import React from 'react';
import moment from 'moment';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import styles from './DayCard.module.css';

export default function DayCard({ day, handleNext, hasNextDay, handlePrev, hasPrevDay }) {
  // format day (e.g Monday 11th May)
  const formattedDay = moment(day).format('dddd Do MMMM');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <IconButton onClick={handlePrev} disabled={!hasPrevDay}>
            <NavigateBeforeIcon fontSize="large" />
          </IconButton>
          <p className={styles.date}>{formattedDay}</p>
          <IconButton onClick={handleNext} disabled={!hasNextDay}>
            <NavigateNextIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
