import React from "react";
import SideBar from "../../components/SideBar";
import "./Roadtrip.css";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import MapPage from "./MapPage";
import ItineraryPage from "./ItineraryPage";
import EmergencyDetailsPage from "./EmergencyDetailsPage";
import PackingListPage from "./PackingListPage";
import SpotifyPlaylistPage from "./SpotifyPlaylistPage";

export default function RoadtripPage() {
  const { path } = useRouteMatch();

  return (
    <div className="Roadtrip">
      <SideBar />
      <Switch>
        <Route path={`${path}map`}>
          <MapPage />
        </Route>

        <Route path={`${path}itinerary`}>
          <ItineraryPage />
        </Route>

        <Route path={`${path}emergency-details`}>
          <EmergencyDetailsPage />
        </Route>

        <Route path={`${path}packing-list`}>
          <PackingListPage />
        </Route>

        <Route path={`${path}spotify-playlist`}>
          <SpotifyPlaylistPage />
        </Route>

        <Route path="*">
          <Redirect to={`${path}map`} />
        </Route>
      </Switch>
    </div>
  );
}
