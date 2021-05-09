import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function AddEventModal({ open, handleClose, addEvent }) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('12:30');
  const [notes, setNotes] = useState('');

  const resetState = () => {
    setDescription('');
    setLocation('');
    setNotes('');
    setTime('12:30');
  };

  const handleSubmit = async () => {
    const event = { description, location, time, notes };
    addEvent(event);
    handleClose();
    resetState();
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>What would like to do?</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            defaultValue={description}
            label="Description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            fullWidth
            defaultValue={location}
            label="Location"
            onChange={(event) => setLocation(event.target.value)}
          />
          <TextField
            type="time"
            defaultValue={time}
            label="Time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 600, // 10 min
            }}
            onChange={(event) => setTime(event.target.value)}
          />
          <TextField defaultValue={notes} fullWidth label="Notes" onChange={(event) => setNotes(event.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!(description && location && time)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
