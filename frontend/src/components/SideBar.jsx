import React, { useState } from "react";
import { Drawer, List, ListItem, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

export default function SideBar() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBarToggle = () => {
    setSideBarOpen(!sideBarOpen);
  };

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
      <Drawer anchor="left" variant="persistent" open={sideBarOpen}>
        <Router>
          <List>
            <ListItem button>
              <NavLink to="/map">Map</NavLink>
            </ListItem>
            <ListItem button>
              <NavLink to="/itinerary">Itinerary</NavLink>
            </ListItem>
            <ListItem button>
              <NavLink to="/emergency-details">Emergency Details</NavLink>
            </ListItem>
            <ListItem button>
              <NavLink to="/packing-list">Packing List</NavLink>
            </ListItem>
            <ListItem button>
              <NavLink to="/spotify-playlist">Spotify Playlist</NavLink>
            </ListItem>
          </List>
        </Router>
      </Drawer>
    </div>
  );
}
