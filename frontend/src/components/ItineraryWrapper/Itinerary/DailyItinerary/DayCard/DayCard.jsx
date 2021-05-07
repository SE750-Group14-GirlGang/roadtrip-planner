import { React, useState, useContext } from 'react';
import moment from 'moment';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import styles from './DayCard.module.css';
import EventCard from './EventCard/EventCard';
import AddButton from '../../../../commons/buttons/AddButton/AddButton';
import AddEventModal from './AddEventModal/AddEventModal';
import { OrganiserContext } from '../../../../../contexts/OrganiserContextProvider';

export default function DayCard({ day, handleNext, hasNextDay, handlePrev, hasPrevDay, addEvent }) {
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  const { date, events } = day;

  const { isUserOrganiser } = useContext(OrganiserContext);

  // format day (e.g Monday 11th May)
  const formattedDate = moment(date).format('dddd Do MMMM');

  // sort events in a day by time
  events.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  const handleOpenAddEventModal = () => {
    setAddEventModalOpen(true);
  };

  const handleCloseAddEventModal = () => {
    setAddEventModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <IconButton onClick={handlePrev} disabled={!hasPrevDay}>
            <NavigateBeforeIcon fontSize="large" />
          </IconButton>
          <p className={styles.date}>{formattedDate}</p>
          <IconButton onClick={handleNext} disabled={!hasNextDay}>
            <NavigateNextIcon fontSize="large" />
          </IconButton>
        </div>
        <div className={styles.cardContent}>
          {events.length > 0 ? (
            events.map((event) => <EventCard event={event} />)
          ) : (
            <p className={styles.noEventDescription}> There is nothing planned today</p>
          )}
        </div>
        <div className={styles.cardFooter}>
          {isUserOrganiser && (
            <>
              <AddButton onClick={handleOpenAddEventModal}>Add</AddButton>
              <AddEventModal open={addEventModalOpen} handleClose={handleCloseAddEventModal} addEvent={addEvent} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
