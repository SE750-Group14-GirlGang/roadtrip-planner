import React from "react";
import styles from "./TripsSection.module.css";
import TripsList from "../commons/TripsList/TripsList";

export default function GroupsSection({ title, trips, loading, disable }) {
    return (
        <div className={styles.section}>
            <h1>{title}</h1>
            {loading && <div>...fetching trips</div>}
            {trips && <TripsList trips={trips} disable={disable} />}
        </div>
    );
}
