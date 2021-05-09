import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import RoadTripTopBar from '../../components/RoadTripTopBar/RoadTripTopBar';
import MapPageWrapper from './MapPageWrapper/MapPageWrapper';
import ItineraryPage from './ItineraryPage/ItineraryPage';
import EmergencyDetailsPage from './EmergencyDetailsPage/EmergencyDetailsPage';
import PackingListPage from './PackingListPage/PackingListPage';
import SpotifyPlaylistPage from './SpotifyPlaylistPage/SpotifyPlaylistPage';

export default function RoadTripPage({ dashboardPageHistory }) {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <RoadTripTopBar dashboardPageHistory={dashboardPageHistory} />
      <Switch>
        <Route path={`${path}/map`}>
          <MapPageWrapper />
        </Route>

        <Route path={`${path}/itinerary`}>
          <ItineraryPage />
        </Route>

        <Route path={`${path}/emergency-details`}>
          <EmergencyDetailsPage />
        </Route>

        <Route path={`${path}/packing-list`}>
          <PackingListPage />
        </Route>

        <Route path={`${path}/spotify-playlist`}>
          <SpotifyPlaylistPage />
        </Route>

        <Route path={`${path}/`}>
          <Redirect to={`${url}/map`} />
        </Route>
      </Switch>
    </div>
  );
}
