import React from "react";
import SideBar from "../../components/SideBar";
import "./RoadTrip.css";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import MapPage from "./MapPage/MapPage";
import ItineraryPage from "./ItineraryPage/ItineraryPage";
import EmergencyDetailsPage from "./EmergencyDetailsPage/EmergencyDetailsPage";
import PackingListPage from "./PackingListPage/PackingListPage";
import SpotifyPlaylistPage from "./SpotifyPlaylistPage/SpotifyPlaylistPage";

export default function RoadTripPage() {

  return (
    <div className="roadTrip">
      <Switch>
        <Route path="/map">
          <MapPage />
        </Route>

        <Route path="/itinerary">
          <ItineraryPage />
        </Route>

        <Route path="/emergency-details">
          <EmergencyDetailsPage />
        </Route>

        <Route path="/packing-list">
          <PackingListPage />
        </Route>

        <Route path="/spotify-playlist">
          <SpotifyPlaylistPage />
        </Route>
      </Switch>
      <SideBar />
    </div>
  );
}