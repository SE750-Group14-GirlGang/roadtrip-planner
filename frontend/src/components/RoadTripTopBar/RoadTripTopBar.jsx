import React, { useState, useContext } from 'react';
import { Button, AppBar, Toolbar, withStyles, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { NavLink, useParams } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import styles from './RoadTripTopBar.module.css';
import useGet from '../../hooks/useGet';
import AttendeesModal from './AttendeesModal/AttendeesModal';
import { OrganiserContext } from '../../contexts/OrganiserContextProvider';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

const IconButton = withStyles({
  label: {
    color: '#24305e',
    '&:hover': {
      color: '#374785',
    },
  },
})(Button);

const CustomTopBar = withStyles({
  root: {
    backgroundColor: 'white',
  },
})(AppBar);

export default function RoadTripTopBar() {
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

  return (
    <CustomTopBar position="static">
      <Toolbar variant="dense">
        <SideBar />
        <p className={styles.title}>{response?.data.name}</p>
        <div className={classes.grow} />
        <IconButton>
          {isUserOrganiser ? (
            <GroupAddRoundedIcon onClick={handleOpenModal} />
          ) : (
            <GroupRoundedIcon onClick={handleOpenModal} />
          )}
        </IconButton>
        <NavLink to="/">
          <IconButton>
            <HomeRoundedIcon />
          </IconButton>
        </NavLink>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <AttendeesModal open={modalOpen} handleClose={handleCloseModal} />
    </CustomTopBar>
  );
}
