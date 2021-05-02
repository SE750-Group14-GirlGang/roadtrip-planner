import React from 'react';
import { Button, AppBar, Toolbar, withStyles, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './HomeTopBar.module.css';
import ResizableIconButton from '../commons/ResizableIconButton/ResizableIconButton';

const CustomButton = withStyles({
  root: {
    backgroundColor: '#24305e',
    paddingRight: '10px',
    marginRight: '10px',
    border: 'none',
    '&:hover': {
      backgroundColor: '#374785',
    },
  },
  label: {
    color: 'white',
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
    boxShadow: 'none',
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
        <ResizableIconButton size="large">
          <AccountCircleIcon />
        </ResizableIconButton>
      </Toolbar>
    </CustomTopBar>
  );
}
