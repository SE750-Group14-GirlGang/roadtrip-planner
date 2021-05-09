import React from 'react';
import { Switch } from 'react-router-dom';
import RoadTripPageWrapper from '../pages/RoadTripPageWrapper/RoadTripPageWrapper';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import GenericSpotifyRedirectPage from '../pages/GenericSpotifyPlaylistRedirectPage/GenericSpotifyRedirectPage';
import ProtectedRoute from '../auth/protected-route';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <Switch>
        <ProtectedRoute exact path="/" component={DashboardPage} />
        <ProtectedRoute path="/road-trip/spotify-playlist" component={GenericSpotifyRedirectPage} />
        <ProtectedRoute path="/road-trip/:id" component={RoadTripPageWrapper} />
      </Switch>
    </div>
  );
}

export default App;
