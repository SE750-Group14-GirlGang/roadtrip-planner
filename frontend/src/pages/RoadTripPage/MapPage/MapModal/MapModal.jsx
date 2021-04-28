import React, { useState, useRef, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

const dotenv = require('dotenv');

dotenv.config();

export default function MapModal({ open, handleClose, setDestination, setDestSelected }) {
  // Default location is just New Zealand. If/when user selects a different location
  // this will be overridden
  const initialViewport = {
    width: '100vw',
    height: '100vh',
    latitude: -41.01633,
    longitude: 170.83285,
    zoom: 4,
  };

  const [viewport, setViewport] = useState(initialViewport);
  const [destName, setDestName] = useState('New Zealand');
  const [destLatitude, setDestLatitude] = useState(-41.01633);
  const [destLongitude, setDestLongitude] = useState(170.83285);

  const mapAccessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const { getAccessTokenSilently } = useAuth0();
  const mapRef = useRef();
  const geocoderContainerRef = useRef();

  // Size of map inside the modal - unable to split into separate CSS file
  const mapStyle = {
    width: '100%',
    height: 400,
  };

  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), []);

  // 'Travel' to selected location
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  // When location selected, save that location's information
  const getSelectedResult = useCallback(
    (result) => {
      setDestName(result.result.place_name);
      setDestLongitude(result.result.center[0]);
      setDestLatitude(result.result.center[1]);
    },
    [setDestLatitude, setDestLongitude, setDestName]
  );

  async function handleSubmit() {
    // POST request to set the destination
    const accessToken = await getAccessTokenSilently();

    // set token in Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const destToPost = {
      primaryDestination: {
        long: destLongitude,
        lat: destLatitude,
        name: destName,
      },
    };

    const destination = await axios.post('/api/roadtrip/6083614ff19eef2de864003d/map', destToPost, config);

    setDestination(destination.data);

    // Close the modal
    handleClose();

    // TODO: Uncomment the following line when implementing the actual map page.
    // setDestSelected(true);
  }

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter Destination</DialogTitle>
        <DialogContent>
          <div
            ref={geocoderContainerRef}
            style={{
              position: 'absolute',
              top: 85,
              left: 35,
              zIndex: 1,
            }}
          />
          <ReactMapGL
            mapboxApiAccessToken={mapAccessToken}
            ref={mapRef}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            {...viewport}
            {...mapStyle}
            onViewportChange={(viewport) => setViewport(viewport)}
          >
            <Geocoder
              mapRef={mapRef}
              mapboxApiAccessToken={mapAccessToken}
              onViewportChange={handleGeocoderViewportChange}
              containerRef={geocoderContainerRef}
              position="top-left"
              onResult={getSelectedResult}
            />
          </ReactMapGL>
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
