import { React, useState } from 'react';
import { Button, withStyles } from '@material-ui/core';
import DateRangePickerModal from './DateRangePickerModal/DateRangePickerModal';
import styles from './Itinerary.module.css';

export default function Itinerary() {
  // // TODO: roadTripId will be passed in

  const [modalOpen, setModalOpen] = useState(false);

  // TODO: use getRequest()
  const [itinerary, setItinerary] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const AddDatesButton = withStyles({
    root: {
      backgroundColor: '#24305e',
      border: 'none',
      '&:hover': {
        backgroundColor: '#374785',
      },
    },
    label: {
      color: 'white',
    },
  })(Button);

  return (
    <div>
      {itinerary ? (
        <div>An actual itinerary with dates</div>
      ) : (
        <div>
          <p className={styles.emptyItineraryPageDescription}>
            The organiser has not entered dates for the road trip yet!
          </p>
          <br />
          <AddDatesButton onClick={handleOpenModal}>Add Dates</AddDatesButton>
          <DateRangePickerModal open={modalOpen} handleClose={handleCloseModal} setItinerary={setItinerary} />
        </div>
      )}
    </div>
  );
}
