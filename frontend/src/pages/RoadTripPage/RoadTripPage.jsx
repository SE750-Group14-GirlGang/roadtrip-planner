import React from 'react';
import { Route, useParams, BrowserRouter, useHistory } from 'react-router-dom';
import './RoadTrip.css';
import RoadTripPageInner from './RoadTripPageInner';

import { OrganiserContextProvider } from '../../contexts/OrganiserContextProvider';

export default function RoadTripPage() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <OrganiserContextProvider roadTripId={id}>
      <div className="roadTrip">
        <BrowserRouter>
          <Route path="/road-trip/:id">
            <RoadTripPageInner homePageHistory={history} />
          </Route>
        </BrowserRouter>
      </div>
    </OrganiserContextProvider>
  );
}
