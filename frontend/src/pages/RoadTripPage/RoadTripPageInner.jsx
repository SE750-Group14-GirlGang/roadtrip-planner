import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import RoadTripTopBar from '../../components/RoadTripTopBar/RoadTripTopBar';
import MapPage from './MapPage/MapPage';
import ItineraryPage from './ItineraryPage/ItineraryPage';
import EmergencyDetailsPage from './EmergencyDetailsPage/EmergencyDetailsPage';
import PackingListPage from './PackingListPage/PackingListPage';
import SpotifyPlaylistPage from './SpotifyPlaylistPage/SpotifyPlaylistPage';

export default function RoadTripPageInner({ homePageHistory }) {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <RoadTripTopBar homePageHistory={homePageHistory} />
      <Switch>
        <Route path={`${path}/map`}>
          <MapPage />
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
