import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentAndTitle from "./DialogContentAndTitle/DialogContentAndTitle";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import getDaysInbetween from "../../../utils/dates/getDaysInbetween";
import "./DateRangePickerModal.module.css";
import { useStyles } from "./DateRangePickerModal.styles";

export default function DateRangePickerModal({
    open,
    handleClose,
    setItinerary,
}) {
    const classes = useStyles();
    const { getAccessTokenSilently } = useAuth0();

    async function handleSubmit(startDate, endDate) {
        // Close the modal
        handleClose();

        // TODO: roadTripId will be passed in

        // POST request to set the itinerary
        const accessToken = await getAccessTokenSilently();
        const url = "/api/roadtrip/6083614ff19eef2de864003d/itinerary";

        // set token in Authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const body = {
            dates: getDaysInbetween(startDate, endDate),
        };

        const response = await axios.post(url, body, config);

        setItinerary(response.data);
    }

    return (
        <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog"
            classes={{ paper: classes.paper }}
        >
            <DialogContentAndTitle
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </Dialog>
    );
}
