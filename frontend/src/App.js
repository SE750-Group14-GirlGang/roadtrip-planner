import React from "react";
import SideBar from "./components/SideBar";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import MapPage from "./pages/MapPage";
import ItineraryPage from "./pages/ItineraryPage";
import EmergencyDetailsPage from "./pages/EmergencyDetailsPage";
import PackingListPage from "./pages/PackingListPage";
import SpotifyPlaylistPage from "./pages/SpotifyPlaylistPage";
import Dashboard from "./pages/DashboardPage";

function App() {
  return (
    <div className="App">
      <SideBar />
      <Switch>
        <Route path="/home">
          <Dashboard />
        </Route>

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

        <Route path="*">
          <Redirect to="/map" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;