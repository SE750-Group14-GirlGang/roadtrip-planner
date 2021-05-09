import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function AddItemModal({ open, onClose, onSubmit, error }) {
  const [item, setItem] = useState('');

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>Add item</DialogTitle>
        <DialogContent>
          <TextField
            id="add-item-text-field"
            fullWidth
            error={error}
            helperText={error ? 'Error adding item. Try again' : ''}
            autoFocus
            onFocus={(event) => event.target.select()}
            label="Enter item"
            defaultValue={item}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button id="add-item-submit" onClick={() => onSubmit(item)} color="primary" disabled={!item}>
            Submit
          </Button>
          <Button id="add-item-cancel" onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
