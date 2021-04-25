import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import "./RoadTrip.css";
<<<<<<< HEAD
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
=======
import {
    Switch,
    Route,
    Redirect,
    useRouteMatch,
    useParams,
} from "react-router-dom";
>>>>>>> wraps roadtrip page in context. Removes console logging and commenting
import MapPage from "./MapPage/MapPage";
import ItineraryPage from "./ItineraryPage/ItineraryPage";
import EmergencyDetailsPage from "./EmergencyDetailsPage/EmergencyDetailsPage";
import PackingListPage from "./PackingListPage/PackingListPage";
import SpotifyPlaylistPage from "./SpotifyPlaylistPage/SpotifyPlaylistPage";

import { OrganiserContextProvider } from "../../contexts/OrganiserContextProvider";

export default function RoadTripPage() {
    const { path, url } = useRouteMatch();
<<<<<<< HEAD

    return (
        <div className="roadTrip">
            <TopBar />
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
=======
    const { id } = useParams();

    return (
        <OrganiserContextProvider roadTripId={id}>
            <div className="roadTrip">
                <TopBar />
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
        </OrganiserContextProvider>
>>>>>>> wraps roadtrip page in context. Removes console logging and commenting
    );
}
