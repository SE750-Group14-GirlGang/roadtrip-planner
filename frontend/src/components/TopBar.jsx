import React from 'react';
import styles from '../styles/TopBar.module.css'
import { Button, Typography } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import * as PropTypes from "prop-types";

// TODO Flags for host
// class FlagsProvider extends React.Component {
//   render() {
//     return null;
//   }
// }
//
// FlagsProvider.propTypes = {
//   features: PropTypes.shape({ moderate: PropTypes.bool }),
//   children: PropTypes.node
// };

export default function TopBar() {
  // <Grid container spacing={0} alignItems="center" className={styles.topBar}>
  return (
    <div className={styles.topBar}>
      <Typography variant="h2" className={styles.title}>
        Roadie
      </Typography>
      {/*<h1>Roadie</h1>*/}
      <div className={styles.navItems}>
        <Button>Join Existing Group</Button>
        <Button>Create New Group</Button>
        {/*TODO Add person to group only if HOST and in group, not dashboard*/}
        {/*<FlagsProvider features={{ moderate: user.role === "admin" }}>*/}
        {/*  <Button>Host Only</Button>*/}
        {/*</FlagsProvider>*/}
        <Button><AccountCircleIcon/></Button>
      </div>
    </div>
  );
}