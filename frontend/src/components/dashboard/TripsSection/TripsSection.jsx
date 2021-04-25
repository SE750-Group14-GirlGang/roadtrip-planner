import React from "react";
import styles from "./TripsSection.module.css";
import { CustomCircularProgress } from "./TripsSection.styles";
import TripsList from "../commons/TripsList/TripsList";

export default function GroupsSection({ title, trips, loading, disable }) {
    return (
        <div className={styles.section}>
            <h1>{title}</h1>
            {loading && <CustomCircularProgress />}
            {trips && <TripsList trips={trips} disable={disable} />}
        </div>
    );
}
