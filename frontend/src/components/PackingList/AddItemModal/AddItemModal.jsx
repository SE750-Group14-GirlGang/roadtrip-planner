import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function AddItemModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    console.log('submitting item with name', name);
    onClose();
    setName('');
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>Add item</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            error={error}
            helperText={error ? 'Error adding item. Try again' : ''}
            autoFocus
            label="Enter item"
            defaultValue={name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
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
