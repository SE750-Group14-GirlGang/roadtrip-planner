import React from "react";
import { withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContentAndTitle from "./DialogContentAndTitle";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import getDaysInbetween from "../../../utils/dates/getDaysInbetween"


export default function DateRangePickerModal({ open, handleClose, setItinerary}) {
    const { getAccessTokenSilently } = useAuth0();

    async function handleSubmit(startDate, endDate ) {
        console.log(startDate);
        console.log(endDate);

        ///POST request to set the itinerary
        const accessToken = await getAccessTokenSilently();
        const url = "/api/roadtrip/6083614ff19eef2de864003d/itinerary"

        // set token in Authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const body =  {
            dates: getDaysInbetween(startDate,endDate),
        }

        const response = await axios.post(
            url,
            body,
            config
        );

        // Close the modal
        handleClose();

        setItinerary(response.data)
    }

    const AddDateDialog = withStyles({
        paper: {
            minHeight: "70%",
            minWidth: "50%",
        },
    })(Dialog);

    return (
        <AddDateDialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog"
        >
            <DialogContentAndTitle
                handleClose={handleClose}
                handleSubmit={handleSubmit}
            />
        </AddDateDialog>
    );
}
