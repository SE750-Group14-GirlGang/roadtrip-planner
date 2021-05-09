import React from 'react';
import { Route, useParams, BrowserRouter, useHistory } from 'react-router-dom';
import styles from './RoadTripPageWrapper.module.css';
import RoadTripPage from './RoadTripPage/RoadTripPage';

import { OrganiserContextProvider } from '../../contexts/OrganiserContextProvider';

export default function RoadTripPageWrapper() {
  const { id } = useParams();
  const history = useHistory();

  return (
    <OrganiserContextProvider roadTripId={id}>
      <div className={styles.roadTrip}>
        <BrowserRouter>
          <Route path="/road-trip/:id">
            <RoadTripPage dashboardPageHistory={history} />
          </Route>
        </BrowserRouter>
      </div>
    </OrganiserContextProvider>
  );
}
