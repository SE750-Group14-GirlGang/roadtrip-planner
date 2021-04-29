import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './TopBar.module.css';

import CreateTripModal from './CreateTripModal/CreateTripModal';

export default function TopBar({ refetchRoadTrips }) {
  const [createTripModalOpen, setCreateTripModalOpen] = useState(false);

  const handleOpenCreateTripModal = () => {
    setCreateTripModalOpen(true);
  };

  const handleCloseCreateTripModal = () => {
    setCreateTripModalOpen(false);
  };

  return (
    <div className={styles.topBar}>
      <Typography variant="h2" className={styles.title}>
        Roadie
      </Typography>
      <div className={styles.navItems}>
        <Button>Join Existing Trip</Button>
        <Button onClick={handleOpenCreateTripModal}>Create New Trip</Button>
        <Button>
          <AccountCircleIcon />
        </Button>
        <CreateTripModal
          open={createTripModalOpen}
          handleClose={handleCloseCreateTripModal}
          refetchRoadTrips={refetchRoadTrips}
        />
      </div>
    </div>
  );
}
