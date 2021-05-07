import React, { useState } from 'react';
import { Toolbar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './HomeTopBar.module.css';
import ResizableIconButton from '../commons/buttons/ResizableIconButton/ResizableIconButton';
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
          <ResizableIconButton size="large">
            <AccountCircleIcon />
          </ResizableIconButton>
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
