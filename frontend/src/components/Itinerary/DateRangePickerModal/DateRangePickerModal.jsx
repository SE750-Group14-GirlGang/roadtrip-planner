import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContentAndTitle from './DialogContentAndTitle/DialogContentAndTitle';
import './DateRangePickerModal.module.css';
import useStyles from './DateRangePickerModal.styles';

export default function DateRangePickerModal({ open, handleClose, addDates }) {
  const classes = useStyles();

  async function handleSubmit(startDate, endDate) {
    // Close the modal
    handleClose();

    addDates(startDate, endDate);
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog"
      classes={{ paper: classes.paper }}
    >
      <DialogContentAndTitle handleClose={handleClose} handleSubmit={handleSubmit} />
    </Dialog>
  );
}
