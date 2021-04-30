import React from 'react';
import { Dialog, DialogActions, List, ListItem } from '@material-ui/core';
import {
  AddAttendeeTextField,
  ActionButton,
  ColouredAccountIcon,
  ColouredListItemText,
  ColouredDialogTitle,
  CustomDialogContent,
} from './AttendeesModal.Styles';

export default function AttendeesModal({ open, handleClose }) {
  const isOrganiser = true;

  function generate(element) {
    return [0, 1, 2, 3].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <ColouredDialogTitle>List of Attendees</ColouredDialogTitle>
        <CustomDialogContent>
          <List>
            {generate(
              <ListItem>
                <ColouredAccountIcon />
                <ColouredListItemText primary="Attendee email here" />
              </ListItem>
            )}
          </List>
        </CustomDialogContent>
        <DialogActions>
          {isOrganiser && (
            <AddAttendeeTextField
              size="small"
              variant="outlined"
              fullWidth
              margin="dense"
              placeholder="Enter attendee email"
            />
          )}
          {isOrganiser && <ActionButton onClick={handleClose}>Add</ActionButton>}
          <ActionButton onClick={handleClose}>Cancel</ActionButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
