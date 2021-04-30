import { React, useState } from 'react';
import DayCard from './DayCard/DayCard';

export default function DailyItinerary({ itinerary }) {
  // sort days by dates in ascending order
  const days = itinerary.days.sort((a, b) => b.date - a.date);

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

  return (
    <DayCard
      day={days[dayIndex].date}
      handleNext={nextDayHandler}
      hasNextDay={hasNextDay}
      handlePrev={prevDayHandler}
      hasPrevDay={hasPrevDay}
    />
  );
}
