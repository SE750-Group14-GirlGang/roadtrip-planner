import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./RoadTrip.css";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import MapPage from "./MapPage/MapPage";
import ItineraryPage from "./ItineraryPage/ItineraryPage";
import EmergencyDetailsPage from "./EmergencyDetailsPage/EmergencyDetailsPage";
import PackingListPage from "./PackingListPage/PackingListPage";
import SpotifyPlaylistPage from "./SpotifyPlaylistPage/SpotifyPlaylistPage";

export default function RoadTripPage() {
  const { path, url } = useRouteMatch();

  return (
    <div className="roadTrip">
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
      <SideBar />
    </div>
  );
}
