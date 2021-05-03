import React from 'react';
import { Switch, Route, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import SideBar from '../../components/SideBar/SideBar';
import './RoadTrip.css';
import MapPageWrapper from './MapPage/MapPageWrapper/MapPageWrapper';
import ItineraryPage from './ItineraryPage/ItineraryPage';
import EmergencyDetailsPage from './EmergencyDetailsPage/EmergencyDetailsPage';
import PackingListPage from './PackingListPage/PackingListPage';
import SpotifyPlaylistPage from './SpotifyPlaylistPage/SpotifyPlaylistPage';

import { OrganiserContextProvider } from '../../contexts/OrganiserContextProvider';

export default function RoadTripPage() {
  const { path, url } = useRouteMatch();
  const { id } = useParams();

  return (
    <OrganiserContextProvider roadTripId={id}>
      <div className="roadTrip">
        <TopBar />
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
        <SideBar />
      </div>
    </OrganiserContextProvider>
  );
}
