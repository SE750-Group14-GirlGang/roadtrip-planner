import React, { useState } from 'react';
import { Toolbar } from '@material-ui/core';
import styles from './HomeTopBar.module.css';
import LogoutButton from '../commons/buttons/LogoutButton/LogoutButton';
import AddButton from '../commons/buttons/AddButton/AddButton';
import { useStyles, CustomTopBar } from './HomeTopBar.styles';
import CreateTripModal from './CreateTripModal/CreateTripModal';

export default function HomeTopBar({ refetchRoadTrips }) {
  const [createTripModalOpen, setCreateTripModalOpen] = useState(false);

  const handleOpenCreateTripModal = () => {
    setCreateTripModalOpen(true);
  };

  const handleCloseCreateTripModal = () => {
    setCreateTripModalOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      <CustomTopBar position="static">
        <Toolbar variant="dense">
          <p className={styles.title}>Roadie</p>
          <div className={classes.grow} />
          <AddButton onClick={handleOpenCreateTripModal}>Create New Trip</AddButton>
          <div className={styles.spacer} />
          <LogoutButton />
        </Toolbar>
      </CustomTopBar>
      <CreateTripModal
        open={createTripModalOpen}
        handleClose={handleCloseCreateTripModal}
        refetchRoadTrips={refetchRoadTrips}
      />
    </>
  );
}
