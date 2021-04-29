import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import usePost from '../../../hooks/usePost';

export default function CreateTripModal({ open, handleClose, refetchRoadTrips }) {
  const [name, setName] = useState('untitled road trip');

  const post = usePost();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    const roadTripToPost = {
      name,
    };
    await post(`/api/roadtrip`, roadTripToPost);
    refetchRoadTrips();
    setName('untitled road trip');
    handleClose();
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create new trip</DialogTitle>
        <DialogContent>
          <TextField fullWidth autoFocus label="Enter name" defaultValue={name} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!name}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
