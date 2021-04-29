import React, { useState } from 'react';
import { Drawer, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, useRouteMatch } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import styles from './SideBar.module.css';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: '#a8d0e6',
    },
  },
}));

export default function SideBar() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBarToggle = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <div>
      <IconButton aria-label="open drawer" onClick={() => handleSideBarToggle()} edge="start" color="#24305e">
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" variant="persistent" open={sideBarOpen} className={classes.root}>
        <IconButton
          aria-label="close drawer"
          onClick={() => handleSideBarToggle()}
          className={styles.iconButtonSideBar}
        >
          <div className={styles.filler} />
          <ArrowBackIosIcon />
        </IconButton>

        <div className={styles.navSideBar}>
          <NavLink to={`${url}/map`} activeClassName={styles.activeLink}>
            Map
          </NavLink>

          <NavLink to={`${url}/itinerary`} activeClassName={styles.activeLink}>
            Itinerary
          </NavLink>

          <NavLink to={`${url}/emergency-details`} activeClassName={styles.activeLink}>
            Emergency Details
          </NavLink>

          <NavLink to={`${url}/packing-list`} activeClassName={styles.activeLink}>
            Packing List
          </NavLink>

          <NavLink to={`${url}/spotify-playlist`} activeClassName={styles.activeLink}>
            Spotify Playlist
          </NavLink>
        </div>
      </Drawer>
    </div>
  );
}
