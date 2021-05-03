import { React, useState, useContext, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import MapModal from './MapModal/MapModal';
import styles from './MapPage.module.css';
import AddButton from '../../../components/commons/buttons/AddButton/AddButton';
import { OrganiserContext } from '../../../contexts/OrganiserContextProvider';

const dotenv = require('dotenv');

dotenv.config();

export default function MapPage({ mapData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [destName, setDestName] = useState(mapData?.primaryDestination?.name);
  const [mapDestination, setMapDestination] = useState(mapData?.primaryDestination);

  const { isUserOrganiser } = useContext(OrganiserContext);

  const [viewport, setViewport] = useState({
    width: '65vw',
    height: '80vh',
    latitude: mapDestination ? mapDestination.lat : 0,
    longitude: mapDestination ? mapDestination.long : 0,
    zoom: 15,
  });

  useEffect(() => {
    setViewport({
      width: '65vw',
      height: '80vh',
      latitude: mapDestination ? mapDestination.lat : 0,
      longitude: mapDestination ? mapDestination.long : 0,
      zoom: 15,
    });
  }, [mapDestination]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.mapPage}>
      <p className={styles.mapPageTitle}>Destination</p>
      {mapDestination ? (
        <div className={styles.mapContainer}>
          <div className={styles.mapBox}>
            <ReactMapGL
              {...viewport}
              className={styles.mapContainer}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            />
          </div>
          <div className={styles.mapDescription}>
            <p className={styles.mapDescriptionText}>{destName}</p>
          </div>
        </div>
      ) : (
        <div>
          <p className={styles.emptyMapDescription}>The organiser has not entered a destination yet!</p>
          <br />
          {isUserOrganiser && <AddButton onClick={handleOpenModal}>Add Destination</AddButton>}
          <MapModal
            open={modalOpen}
            handleClose={handleCloseModal}
            setNewViewport={setViewport}
            destName={destName}
            setDestName={setDestName}
            setMapDestination={setMapDestination}
          />
        </div>
      )}
    </div>
  );
}
