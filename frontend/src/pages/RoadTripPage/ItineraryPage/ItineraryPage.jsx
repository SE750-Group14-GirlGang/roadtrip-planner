import { React, useContext } from "react";
import { OrganiserContext } from "../../../contexts/OrganiserContextProvider";

export default function ItineraryPage() {
    const { isUserOrganiser } = useContext(OrganiserContext);
    return (
        <div>
            <p>{`User is organiser: ${isUserOrganiser}`}</p>
            <p>Itinerary</p>
        </div>
    );
}
