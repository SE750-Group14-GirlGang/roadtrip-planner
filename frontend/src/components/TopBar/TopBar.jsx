import React from 'react';
import { Button, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <Typography variant="h2" className={styles.title}>
        Roadie
      </Typography>
      <div className={styles.navItems}>
        <Button>Join Existing Trip</Button>
        <Button>Create New Trip</Button>
        <Button>
          <AccountCircleIcon />
        </Button>
      </div>
    </div>
  );
}
