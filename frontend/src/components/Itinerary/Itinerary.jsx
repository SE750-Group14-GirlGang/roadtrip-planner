import { React, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DateRangePickerModal from './DateRangePickerModal/DateRangePickerModal';
import AddButton from '../commons/buttons/AddButton/AddButton';
import styles from './Itinerary.module.css';
import getDaysInbetween from '../../utils/dates/getDaysInbetween';
import usePost from '../../hooks/usePost';
import { OrganiserContext } from '../../contexts/OrganiserContextProvider';

export default function Itinerary({ itineraryData }) {
  const { id } = useParams();
  const { isUserOrganiser } = useContext(OrganiserContext);
  const post = usePost();

  const [modalOpen, setModalOpen] = useState(false);
  const [itinerary, setItinerary] = useState(itineraryData);

  const addDates = async (startDate, endDate) => {
    const URL = `/api/roadtrip/${id}/itinerary`;

    const dates = getDaysInbetween(startDate, endDate);

    // create an array of days which contains a date and an empty itinerary
    const days = [];
    dates.forEach((date) => days.push({ date, itinerary: [] }));

    const body = {
      days,
    };

    // POST request to set the itinerary with dates
    const { response } = await post(URL, body);

    setItinerary(response?.data);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
          {isUserOrganiser && (
            <>
              <AddButton onClick={handleOpenModal}>Add Dates</AddButton>
              <DateRangePickerModal open={modalOpen} handleClose={handleCloseModal} addDates={addDates} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
