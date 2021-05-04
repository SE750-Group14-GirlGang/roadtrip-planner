import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import usePost from '../../../hooks/usePost';

const DEFAULT_TEXTFIELD_VALUE = 'untitled road trip';

export default function CreateTripModal({ open, handleClose, refetchRoadTrips }) {
  const [name, setName] = useState(DEFAULT_TEXTFIELD_VALUE);
  const [error, setError] = useState(false);

  const post = usePost();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    setError(false);
    const roadTripToPost = {
      name,
    };
    const { error } = await post(`/api/roadtrip`, roadTripToPost);
    if (error) {
      setError(true);
    } else {
      refetchRoadTrips();
      setName(DEFAULT_TEXTFIELD_VALUE);
      handleClose();
    }
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create new trip</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            error={error}
            helperText={error ? 'Error creating trip. Try again.' : ''}
            autoFocus
            onFocus={(event) => event.target.select()}
            label="Enter name"
            defaultValue={name}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" disabled={!name}>
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
