import React, { useState } from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, useRouteMatch } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import styles from './SideBar.module.css';
import ResizableIconButton from '../commons/buttons/ResizableIconButton/ResizableIconButton';

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
      <ResizableIconButton
        size="large"
        aria-label="open drawer"
        onClick={() => handleSideBarToggle()}
        edge="start"
        id="burger-button"
      >
        <MenuIcon />
      </ResizableIconButton>

      <Drawer anchor="left" variant="persistent" open={sideBarOpen} className={classes.root}>
        <ResizableIconButton
          aria-label="close drawer"
          onClick={() => handleSideBarToggle()}
          className={styles.iconButtonSideBar}
        >
          <div className={styles.filler} />
          <ArrowBackIosIcon />
        </ResizableIconButton>

        <div className={styles.navSideBar} id="side-bar">
          <NavLink to={`${url}/map`} activeClassName={styles.activeLink} id="map-link">
            Map
          </NavLink>

          <NavLink to={`${url}/itinerary`} activeClassName={styles.activeLink} id="itinerary-link">
            Itinerary
          </NavLink>

          <NavLink to={`${url}/emergency-details`} activeClassName={styles.activeLink} id="emergency-details-link">
            Emergency Details
          </NavLink>

          <NavLink to={`${url}/packing-list`} activeClassName={styles.activeLink} id="packing-list-link">
            Packing List
          </NavLink>

          <NavLink to={`${url}/spotify-playlist`} activeClassName={styles.activeLink} id="spotify-playlist-link">
            Spotify Playlist
          </NavLink>
        </div>
      </Drawer>
    </div>
  );
}
