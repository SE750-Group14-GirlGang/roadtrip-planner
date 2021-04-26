import React, { useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";

export default function DialogContentAndTitle({ handleClose, handleSubmit }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleSelectedDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    return (
        <React.Fragment>
            <DialogTitle id="form-dialog-title">Enter Destination</DialogTitle>
            <DialogContent>
                <DateRangePicker
                    keepOpenOnDateSelect={true}
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={handleSelectedDatesChange}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) =>
                        setFocusedInput(focusedInput)
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => handleSubmit(startDate, endDate)}
                    color="primary"
                    //only enable submit button is start and end date is selected
                    disabled={!(startDate && endDate)}
                >
                    Submit
                </Button>
            </DialogActions>
        </React.Fragment>
    );
}
