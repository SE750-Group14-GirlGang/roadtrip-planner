import React, { useState, useCallback } from "react";
import DateRangePickerWrapper from "./DateRangePickerWrapper";
import { withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import usePost from "../../../hooks/usePost";
import Modal from "@material-ui/core/Modal";
import DialogContentAndTitle from "./DialogContentAndTitle";

export default function DateRangePickerModal({ open, handleClose }) {

    function handleSubmit(startDate, endDate) {
        console.log(startDate)
        console.log(endDate)

        handleClose()
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
