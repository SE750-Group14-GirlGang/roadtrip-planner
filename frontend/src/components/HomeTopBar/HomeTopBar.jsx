import React from 'react';
import { Toolbar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './HomeTopBar.module.css';
import ResizableIconButton from '../commons/buttons/ResizableIconButton/ResizableIconButton';
import AddButton from '../commons/buttons/AddButton/AddButton';
import { useStyles, CustomTopBar } from './HomeTopBar.styles';

export default function HomeTopBar() {
  const classes = useStyles();
  return (
    <CustomTopBar position="static">
      <Toolbar variant="dense">
        <p className={styles.title}>Roadie</p>
        <div className={classes.grow} />
        <AddButton>Create New Trip</AddButton>
        <div className={styles.spacer} />
        <ResizableIconButton size="large">
          <AccountCircleIcon />
        </ResizableIconButton>
      </Toolbar>
    </CustomTopBar>
  );
}
