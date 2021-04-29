import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function CreateTripModal({ open, handleClose }) {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const [name, setName] = useState('untitled road trip');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    const accessToken = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const roadTripToPost = {
      name,
    };
    const roadTrip = await axios.post(`/api/roadtrip/${id}`, roadTripToPost, config);
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
