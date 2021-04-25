import { React, useState } from "react";
import ReactMapGL from "react-map-gl";
import { Button, withStyles } from "@material-ui/core";
import MapModal from "./MapModal/MapModal";
import styles from "./MapPage.module.css";

const dotenv = require("dotenv");
dotenv.config();

const DestinationButton = withStyles({
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
  const initialViewport = {
    width: "100vw",
    height: "100vh",
    latitude: 40.9006,
    longitude: -174.886,
    zoom: 8,
  };

  /* TODO: remove when implementing full map page functionality*/
  const mapPageSetUp = false;

  /* TODO: If map destination set up, then call a get request for the roadie destination 
  and load it into the map with a marker - do when implementing full map page functionality*/

  const [modalOpen, setModalOpen] = useState(false);
  const [viewport, setViewport] = useState(initialViewport);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setViewport(viewport);
  };

  return (
    <div className={styles.mapPage}>
      <p className={styles.mapPageTitle}>Destination</p>
      {mapPageSetUp ? (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"

          
        ></ReactMapGL>
      ) : (
        <div>
          <p className={styles.emptyMapDescription}>
            The organiser has not entered a destination yet!
          </p>
          <br />
          <DestinationButton onClick={handleOpenModal}>
            Add Destination
          </DestinationButton>
          <MapModal open={modalOpen} handleClose={handleCloseModal}></MapModal>
        </div>
      )}
    </div>
  );
}
