import { React } from "react";
import ReactMapGL from "react-map-gl";
import TopBar from "../../../components/TopBar/TopBar";
import { Button } from "@material-ui/core";
import styles from "./MapPage.module.css";

const dotenv = require("dotenv");
dotenv.config();

export default function MapPage() {
  const state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 42.430472,
      longitude: -123.334102,
      zoom: 8,
    },
  };

  const mapPageSetUp = false;

  return (
    <div>
      <TopBar />
      <h3>Destination</h3>
      {mapPageSetUp ? (
        <ReactMapGL
          {...state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/lhuijser/ckntkputc066c17lz7nby5fxs"
        ></ReactMapGL>
      ) : (
        <div className={styles.mapPage}>
          <br />
          <h4>The host has not entered a destination yet!</h4>
          <br />
          <Button>Create New Group</Button>
        </div>
      )}
    </div>
  );
}
