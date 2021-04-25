import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactMapGL from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";

const dotenv = require("dotenv");
dotenv.config();

export default function MapModal({ open, handleClose }) {
  // Default location is just New Zealand. If user selects a different location this will be overridden
  const initialViewport = {
    width: "100vw",
    height: "100vh",
    latitude: 40.9006,
    longitude: -174.886,
    zoom: 10,
  };

  const mapStyle = {
    width: "100%",
    height: 300,
  };

  const countrySelect = {
    country: "nz",
  };

  const [viewport, setViewport] = useState(initialViewport);

  const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const onSelected = (viewport) => {
    setViewport(viewport);
  };

  const handleSubmit = () => {
    //send post request and close the modal
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Destination</DialogTitle>
        <DialogContent>
          <Geocoder
            mapboxApiAccessToken={accessToken}
            onSelected={onSelected}
            viewport={viewport}
            hideOnSelect={true}
            value=""
            queryParams={countrySelect}
          />
          <ReactMapGL
            mapboxApiAccessToken={accessToken}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            {...viewport}
            {...mapStyle}
            onViewportChange={(viewport) => setViewport(viewport)}
          ></ReactMapGL>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
