import React from 'react';
import styles from './TopBar.module.css'
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
  return (
    <div className={styles.topBar}>
      <Typography variant="h2" className={styles.title}>
        Roadie
      </Typography>
      <div className={styles.navItems}>
        <Button>Join Existing Trip</Button>
        <Button>Create New Trip</Button>
        {/*TODO Add person to group only if HOST and in group, not dashboard*/}
        {/*<FlagsProvider features={{ moderate: user.role === "admin" }}>*/}
        {/*  <Button>Host Only</Button>*/}
        {/*</FlagsProvider>*/}
        <Button><AccountCircleIcon/></Button>
      </div>
    </div>
  );
}