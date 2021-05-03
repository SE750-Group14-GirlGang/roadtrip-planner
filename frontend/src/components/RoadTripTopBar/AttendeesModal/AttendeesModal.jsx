import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogActions, List, ListItem } from '@material-ui/core';
import {
  AddAttendeeTextField,
  ActionButton,
  ColouredAccountIcon,
  ColouredStarIcon,
  ColouredListItemText,
  ColouredDialogTitle,
  CustomDialogContent,
} from './AttendeesModal.Styles';
import Spinner from '../../commons/Spinner/Spinner';
import useGet from '../../../hooks/useGet';
import { OrganiserContext } from '../../../contexts/OrganiserContextProvider';
import styles from './AttendeesModal.module.css';

export default function AttendeesModal({ open, handleClose }) {
  const { id } = useParams();
  const { response, loading } = useGet(`/api/roadtrip/${id}/attendees`);
  const { isUserOrganiser, organiser } = useContext(OrganiserContext);

  const showSpinner = loading || !organiser;

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <ColouredDialogTitle>List of Attendees</ColouredDialogTitle>
        <CustomDialogContent>
          {showSpinner && (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          )}
          {!showSpinner && (
            <List>
              <div key={organiser._id}>
                <ListItem>
                  <ColouredAccountIcon />
                  <div className={styles.organiser}>
                    <ColouredListItemText primary={organiser.email} />
                    <ColouredStarIcon />
                  </div>
                </ListItem>
              </div>
              {response.data.map((attendee) => (
                <div key={attendee._id}>
                  <ListItem>
                    <ColouredAccountIcon />
                    <ColouredListItemText primary={attendee.email} />
                  </ListItem>
                </div>
              ))}
            </List>
          )}
        </CustomDialogContent>
        <DialogActions>
          {isUserOrganiser && (
            <>
              <AddAttendeeTextField
                size="small"
                variant="outlined"
                fullWidth
                margin="dense"
                placeholder="Enter attendee email"
              />
              <ActionButton onClick={handleClose}>Add</ActionButton>
            </>
          )}
          <ActionButton onClick={handleClose}>Cancel</ActionButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
