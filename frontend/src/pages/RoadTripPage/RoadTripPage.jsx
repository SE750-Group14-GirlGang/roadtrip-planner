import React from 'react';
import { Route, useParams } from 'react-router-dom';
import RoadTripTopBar from '../../components/RoadTripTopBar/RoadTripTopBar';
import './RoadTrip.css';
import RoadTripPageInner from './RoadTripPageInner';

import { OrganiserContextProvider } from '../../contexts/OrganiserContextProvider';

export default function RoadTripPage() {
  const { id } = useParams();

  return (
    <OrganiserContextProvider roadTripId={id}>
      <div className="roadTrip">
        <RoadTripTopBar />
        <BrowserRouter>
          <Route path="/road-trip/:id">
            <RoadTripPageInner />
          </Route>
        </BrowserRouter>
      </div>
    </OrganiserContextProvider>
  );
}
