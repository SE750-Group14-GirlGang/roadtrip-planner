import React, { useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import usePost from '../../hooks/usePost';
import ActionButton from './MapModal.styles';

const dotenv = require('dotenv');

dotenv.config();

export default function MapModal({ open, handleClose, destName, setDestName, setMapDestination }) {
  // Default location is just New Zealand. If/when user selects a different location this will be overridden
  const initialViewport = {
    width: '100vw',
    height: '100vh',
    latitude: -41.01633,
    longitude: 170.83285,
    zoom: 4,
  };

  const [viewport, setViewport] = useState(initialViewport);
  const [destLatitude, setDestLatitude] = useState(-41.01633);
  const [destLongitude, setDestLongitude] = useState(170.83285);

  const mapAccessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const mapRef = useRef();
  const geocoderContainerRef = useRef();
  const post = usePost();
  const { id } = useParams();

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

  function handleSubmit() {
    const destToPost = {
      primaryDestination: {
        long: destLongitude,
        lat: destLatitude,
        name: destName,
      },
    };

    // Post the selected destination
    post(`/api/roadtrip/${id}/map`, destToPost).then(() => handleClose());

    setMapDestination(destToPost.primaryDestination);
    setDestName(destName);
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
          <ActionButton id="modal-cancel" onClick={handleClose} color="primary">
            Cancel
          </ActionButton>
          <ActionButton id="modal-submit" onClick={handleSubmit} color="primary">
            Submit
          </ActionButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
