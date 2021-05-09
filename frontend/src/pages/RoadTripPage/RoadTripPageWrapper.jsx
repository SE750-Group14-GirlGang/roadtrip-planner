import React from 'react';
import { Route, useParams, BrowserRouter, useHistory } from 'react-router-dom';
import './RoadTrip.css';
import RoadTripPage from './RoadTripPage';

import { OrganiserContextProvider } from '../../contexts/OrganiserContextProvider';

export default function RoadTripPageWrapper() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <OrganiserContextProvider roadTripId={id}>
      <div className="roadTrip">
        <BrowserRouter>
          <Route path="/road-trip/:id">
            <RoadTripPage dashboardPageHistory={history} />
          </Route>
        </BrowserRouter>
      </div>
    </OrganiserContextProvider>
  );
}
