import React from 'react';
import { Button, AppBar, Toolbar, withStyles, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './HomeTopBar.module.css';

const CustomButton = withStyles({
  root: {
    backgroundColor: '#24305e',
    border: 'none',
    '&:hover': {
      backgroundColor: '#374785',
    },
  },
  label: {
    color: 'white',
  },
})(Button);

const IconButton = withStyles({
  label: {
    color: '#24305e',
    '&:hover': {
      color: '#374785',
    },
  },
})(Button);

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

const CustomTopBar = withStyles({
  root: {
    backgroundColor: 'white',
  },
})(AppBar);

export default function HomeTopBar() {
  const classes = useStyles();
  return (
    <CustomTopBar position="static">
      <Toolbar variant="dense">
        <p className={styles.title}>Roadie</p>
        <div className={classes.grow} />
        <CustomButton>Create New Trip</CustomButton>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </CustomTopBar>
  );
}
