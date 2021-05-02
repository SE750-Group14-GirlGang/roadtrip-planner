import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import DayCard from './DayCard/DayCard';

export default function DailyItinerary({ itinerary }) {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { days } = itinerary;

  const [error, setError] = useState(false);

  // set the date shown to the first date of the trip
  const [dayIndex, setDayIndex] = useState(0);

  const numDays = days.length;
  const hasNextDay = dayIndex + 1 < numDays;
  const hasPrevDay = dayIndex > 0;

  async function nextDayHandler() {
    const nextDayIndex = dayIndex + 1;
    setDayIndex(nextDayIndex);
  }

  async function prevDayHandler() {
    const prevDayIndex = dayIndex - 1;
    setDayIndex(prevDayIndex);
  }

  const addEvent = async (event) => {
    const URL = `/api/roadtrip/${id}/itinerary`;

    console.log(event);

    // POST request to set the destination
    const accessToken = await getAccessTokenSilently();

    // set token in Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const body = {
      dayId: days[dayIndex]._id,
      event,
    };

    const itinerary = await axios.patch(URL, body, config);
  };

  return (
    <>
      <DayCard
        day={days[dayIndex]}
        handleNext={nextDayHandler}
        hasNextDay={hasNextDay}
        handlePrev={prevDayHandler}
        hasPrevDay={hasPrevDay}
        addEvent={addEvent}
      />
    </>
  );
}
