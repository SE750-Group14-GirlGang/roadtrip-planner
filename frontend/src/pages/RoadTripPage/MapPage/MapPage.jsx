import { React } from "react";
import ReactMapGL from "react-map-gl";
import { Button, withStyles } from "@material-ui/core";
import styles from "./MapPage.module.css";

const dotenv = require("dotenv");
dotenv.config();

const CustomButton = withStyles({
  root: {
    backgroundColor: "#24305e",
    border: "none",
    "&:hover": {
      backgroundColor: "#374785",
    },
  },
  label: {
    color: "white",
  },
})(Button);

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

  // TODO: remove when implementing full map page functionality
  const mapPageSetUp = false;

  return (
    <div className={styles.mapPage}>
      <p className={styles.mapPageTitle}>Destination</p>
      {mapPageSetUp ? (
        <ReactMapGL
          {...state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/lhuijser/ckntkputc066c17lz7nby5fxs"
        ></ReactMapGL>
      ) : (
        <div>
          <p className={styles.emptyMapDescription}>
            The organiser has not entered a destination yet!
          </p>
          <br />
          <CustomButton>Add Destination</CustomButton>
        </div>
      )}
    </div>
  );
}
