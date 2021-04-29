import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import DateRangePickerModal from './DateRangePickerModal/DateRangePickerModal';
import styles from './Itinerary.module.css';
import useGet from '../../hooks/useGet';
import getDaysInbetween from '../../utils/dates/getDaysInbetween';

export default function Itinerary() {
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const URL = `/api/roadtrip/${id}/itinerary`;

  const [modalOpen, setModalOpen] = useState(false);

  // get itinenary data
  const { response, loading } = useGet(URL);
  const [itinerary, setItinerary] = useState(response?.data);
  let hasDates = false;

  if (itinerary?.dates) {
    hasDates = true;
  }

  const addDates = async (startDate, endDate) => {
    const accessToken = await getAccessTokenSilently();

    // set token in Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const body = {
      dates: getDaysInbetween(startDate, endDate),
    };

    // POST request to set the itinerary with dates
    const response = await axios.post(URL, body, config);

    setItinerary(response.data);
  };

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
      {hasDates ? (
        <div>An actual itinerary with dates</div>
      ) : (
        <div>
          <p className={styles.emptyItineraryPageDescription}>
            The organiser has not entered dates for the road trip yet!
          </p>
          <br />
          <AddDatesButton onClick={handleOpenModal}>Add Dates</AddDatesButton>
          <DateRangePickerModal open={modalOpen} handleClose={handleCloseModal} addDates={addDates} />
        </div>
      )}
    </div>
  );
}
