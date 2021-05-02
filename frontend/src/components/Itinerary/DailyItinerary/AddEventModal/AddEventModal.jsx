import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function AddEventModal({ open, handleClose, addEvent }) {
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(null);
  const [time, setTime] = useState(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    const event = { description, location, time, notes };
    addEvent(event);
    handleClose();
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>What would like to do?</DialogTitle>
        <DialogContent>
          <TextField fullWidth autoFocus label="Description" onChange={(event) => setDescription(event.target.value)} />
          <TextField fullWidth label="Location" onChange={(event) => setLocation(event.target.value)} />
          <TextField
            type="time"
            defaultValue="12:30"
            label="Time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 600, // 10 min
            }}
            onChange={(event) => setTime(event.target.value)}
          />
          <TextField defaultValue="" fullWidth label="Notes" onChange={(event) => setNotes(event.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!(description && location)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
