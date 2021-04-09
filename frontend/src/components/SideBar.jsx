import React, { useState } from "react";
import { Drawer, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styles from "../styles/SideBar.module.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#a8d0e6",
    },
  },
}));

export default function SideBar() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBarToggle = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const classes = useStyles();

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => handleSideBarToggle()}
        edge="start"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        variant="persistent"
        open={sideBarOpen}
        className={classes.root}
      >
        <div className={styles.navSideBar}>
          <Router>
            <NavLink to="/map" activeClassName={styles.activeLink}>
              Map
            </NavLink>

            <NavLink to="/itinerary" activeClassName={styles.activeLink}>
              Itinerary
            </NavLink>

            <NavLink
              to="/emergency-details"
              activeClassName={styles.activeLink}
            >
              Emergency Details
            </NavLink>

            <NavLink to="/packing-list" activeClassName={styles.activeLink}>
              Packing List
            </NavLink>

            <NavLink to="/spotify-playlist" activeClassName={styles.activeLink}>
              Spotify Playlist
            </NavLink>
          </Router>
        </div>
      </Drawer>
    </div>
  );
}
