import React from "react";
import styles from "./RoadTripTopBar.module.css";
import { Button, withStyles } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
const CustomButton = withStyles({
  root: {
    backgroundColor: "#24305e",
    border: "none",
    "&:hover": {
      backgroundColor: "#374785",
    },
  },
  label: {
    color: "white",
  },
})(Button);

const IconButton = withStyles({
  root: {
    "&:hover": {
      color: "#374785",
    },
  },
  label: {
    color: "#24305e",
  },
})(Button);

export default function RoadTripTopBar() {
  return (
    <div className={styles.topBar}>
      <p className={styles.title}>Roadie</p>
      <div className={styles.navItems}>
        <CustomButton>Join Existing Trip</CustomButton>
        <div className={styles.buttonPadding} />
        <CustomButton>Create New Trip</CustomButton>
        {/*TODO Add person to group only if HOST and in group, not dashboard*/}
        {/*<FlagsProvider features={{ moderate: user.role === "admin" }}>*/}
        {/*  <Button>Host Only</Button>*/}
        {/*</FlagsProvider>*/}
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </div>
    </div>
  );
}
