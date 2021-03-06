import React, { useState, useContext } from 'react';
import { Toolbar } from '@material-ui/core';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { useParams } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import styles from './RoadTripTopBar.module.css';
import useGet from '../../hooks/useGet';
import AttendeesModal from './AttendeesModal/AttendeesModal';
import { OrganiserContext } from '../../contexts/OrganiserContextProvider';
import ResizableIconButton from '../commons/buttons/ResizableIconButton/ResizableIconButton';
import { CustomTopBar, useStyles } from './RoadTripTopBar.styles';
import LogoutButton from '../commons/buttons/LogoutButton/LogoutButton';

export default function RoadTripTopBar({ dashboardPageHistory }) {
  const { id } = useParams();
  const { response } = useGet(`/api/roadtrip/${id}`);
  const { isUserOrganiser } = useContext(OrganiserContext);
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRedirectDashboard = () => {
    dashboardPageHistory.push('/');
  };

  return (
    <CustomTopBar position="static">
      <Toolbar variant="dense">
        <SideBar />
        <p id="road-trip-name" className={styles.title}>
          {response?.data.name}
        </p>
        <div className={classes.grow} />
        <ResizableIconButton size="large">
          {isUserOrganiser ? (
            <GroupAddRoundedIcon id="organiser-attendees-button" onClick={handleOpenModal} />
          ) : (
            <GroupRoundedIcon id="regular-attendees-button" onClick={handleOpenModal} />
          )}
        </ResizableIconButton>
        <ResizableIconButton size="large" onClick={handleRedirectDashboard}>
          <HomeRoundedIcon />
        </ResizableIconButton>
        <LogoutButton />
      </Toolbar>
      <AttendeesModal open={modalOpen} closeModal={handleCloseModal} />
    </CustomTopBar>
  );
}
