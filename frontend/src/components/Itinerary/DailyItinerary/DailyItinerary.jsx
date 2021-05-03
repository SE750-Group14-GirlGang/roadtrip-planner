import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import DayCard from './DayCard/DayCard';
import styles from './DailyItinerary.module.css';
import './SingleDatePicker.css';

export default function DailyItinerary({ itinerary }) {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { days } = itinerary;

  const [error, setError] = useState(false);

  // set the date shown to the first date of the trip
  const [dayIndex, setDayIndex] = useState(0);

  const [calanderFocused, setCalanderFocused] = useState(true);

  const numDays = days.length;
  const hasNextDay = dayIndex + 1 < numDays;
  const hasPrevDay = dayIndex > 0;
  const startDay = days[0].date;
  const endDay = days[numDays - 1].date;

  function nextDayHandler() {
    const nextDayIndex = dayIndex + 1;
    setDayIndex(nextDayIndex);
  }

  function prevDayHandler() {
    const prevDayIndex = dayIndex - 1;
    setDayIndex(prevDayIndex);
  }

  function calanderDayChangeHandler(day) {
    // find how many days it is from start date of the trip
    const dayNum = day.diff(moment(startDay), 'days');
    setDayIndex(dayNum);
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

  function isOutsideRange(day) {
    return day.isAfter(moment(endDay)) || day.isBefore(moment(startDay));
  }

  return (
    <div className={styles.itineraryContainer}>
      <DayCard
        day={days[dayIndex]}
        handleNext={nextDayHandler}
        hasNextDay={hasNextDay}
        handlePrev={prevDayHandler}
        hasPrevDay={hasPrevDay}
        addEvent={addEvent}
      />
      <div className={styles.DatePickerContainer}>
        <SingleDatePicker
          date={moment(days[dayIndex].date)}
          onDateChange={calanderDayChangeHandler}
          focused={calanderFocused}
          onFocusChange={({ focused }) => setCalanderFocused(true)}
          id="calander_single_date_picker"
          numberOfMonths={1}
          isOutsideRange={isOutsideRange}
          displayFormat={() => 'DD/MM/YYYY'}
          readOnly // disable changing of dateInput
        />
      </div>
    </div>
  );
}
