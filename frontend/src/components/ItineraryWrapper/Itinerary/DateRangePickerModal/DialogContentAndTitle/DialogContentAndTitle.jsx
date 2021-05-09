import React, { useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './DialogContentAndTitle.css';
import { DateRangePicker } from 'react-dates';

export default function DialogContentAndTitle({ handleClose, handleSubmit }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // have calendar be open
  const [focusedInput, setFocusedInput] = useState('startDate');

  const handleSelectedDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">When will you be going?</DialogTitle>
      <DialogContent>
        <DateRangePicker
          keepOpenOnDateSelect
          startDate={startDate}
          endDate={endDate}
          onDatesChange={handleSelectedDatesChange}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          displayFormat={() => 'DD/MM/YYYY'}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleSubmit(startDate, endDate)}
          color="primary"
          // only enable submit button is start and end date is selected
          disabled={!(startDate && endDate)}
        >
          Submit
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </>
  );
}
