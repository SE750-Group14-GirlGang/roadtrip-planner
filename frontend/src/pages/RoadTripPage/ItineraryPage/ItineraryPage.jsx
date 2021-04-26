import React from "react";
import styles from "./ItineraryPage.module.css";
import Itinerary from "../../../components/itinerary/Itinerary";

export default function ItineraryPage() {
    return (
        <div className={styles.itineraryPage}>
            <p className={styles.itineraryPageTitle}>Itinerary</p>
             <Itinerary/>
        </div>
    );
}
