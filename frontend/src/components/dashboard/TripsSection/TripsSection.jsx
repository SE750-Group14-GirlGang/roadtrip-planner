import React from "react";
import { CircularProgress, withStyles } from "@material-ui/core";
import styles from "./TripsSection.module.css";
import TripsList from "../commons/TripsList/TripsList";

const CustomCircularProgress = withStyles(() => ({
	colorPrimary: {
	  color: "#f76c6c",
	},
  }))(CircularProgress);

export default function GroupsSection({ title, trips, loading, disable }) {
    return (
        <div className={styles.section}>
            <h1>{title}</h1>
            {loading && <CustomCircularProgress />}
            {trips && <TripsList trips={trips} disable={disable} />}
        </div>
    );
}
