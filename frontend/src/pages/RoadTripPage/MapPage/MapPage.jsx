import { React, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import MapModal from './MapModal/MapModal';
import styles from './MapPage.module.css';
import AddButton from '../../../components/commons/buttons/AddButton/AddButton';

const dotenv = require('dotenv');

dotenv.config();

export default function MapPage({ mapData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [destination, setDestination] = useState(mapData);

  // TODO: implement check to see if user is organiser or attendee
  const isOrganiser = true;

  // TODO: get zoom level
  const initialViewport = {
    width: '100vw',
    height: '100vh',
    latitude: -41.01633,
    longitude: 170.83285,
    zoom: 4,
  };

  const [viewport, setViewport] = useState(initialViewport);

  /* TODO: If map destination set up & nav to the page, then call a get request for the roadie
  destination and load it into the viewport - do when implementing full map page functionality */

  /* TODO: If map destination FRESHLY set up, then load the destination state variable into the
  viewport and load it into the map with a marker - do when implementing full map page
   functionality */

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
      {destination ? (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        />
      ) : (
        <div>
          <p className={styles.emptyMapDescription}>The organiser has not entered a destination yet!</p>
          <br />
          {isOrganiser && <AddButton onClick={handleOpenModal}>Add Destination</AddButton>}
          <MapModal open={modalOpen} handleClose={handleCloseModal} setDestination={setDestination} />
        </div>
      )}
    </div>
  );
}
