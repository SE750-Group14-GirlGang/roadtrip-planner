import React from 'react';
import Trip from './Trip/Trip';

export default function TripsList({ trips, disable }) {
  return (
    <div>
      {trips.map((item, index) => (
        <Trip key={index} tripName={item.name} id={item._id} disable={disable} />
      ))}
    </div>
  );
}
