import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import styles from './EditDetailsModal.module.css';

export default function EditDetailsModal({ userEmergencyDetails, open, onClose, onSubmit, error }) {
  const [name, setName] = useState(userEmergencyDetails?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(userEmergencyDetails?.phoneNumber || '');
  const [emergencyContactName, setEmergencyContactName] = useState(userEmergencyDetails?.emergencyContact.name || '');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState(
    userEmergencyDetails?.emergencyContact.relation || ''
  );
  const [emergencyContactPhoneNumber, setEmergenctContactPhoneNumber] = useState(
    userEmergencyDetails?.emergencyContact.phoneNumber || ''
  );

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleEmergencyContactNameChange = (event) => {
    setEmergencyContactName(event.target.value);
  };
  const handleEmergencyContactRelationChange = (event) => {
    setEmergencyContactRelation(event.target.value);
  };
  const handleEmergencyContactPhoneNumberChange = (event) => {
    setEmergenctContactPhoneNumber(event.target.value);
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>Edit emergency contact details</DialogTitle>
        <DialogContent>
          <div className={styles.textField}>
            <TextField
              variant="outlined"
              fullWidth
              label="Enter name"
              defaultValue={name}
              onChange={handleNameChange}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              variant="outlined"
              fullWidth
              label="Enter phone number"
              defaultValue={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              variant="outlined"
              fullWidth
              label="Enter emergency contact's name"
              defaultValue={emergencyContactName}
              onChange={handleEmergencyContactNameChange}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              variant="outlined"
              fullWidth
              label="Enter emergency contact's relation"
              defaultValue={emergencyContactRelation}
              onChange={handleEmergencyContactRelationChange}
            />
          </div>
          <div className={styles.bottomTextField}>
            <TextField
              variant="outlined"
              fullWidth
              label="Enter emergency contact's phone number"
              defaultValue={emergencyContactPhoneNumber}
              onChange={handleEmergencyContactPhoneNumberChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              onSubmit({
                name,
                phoneNumber,
                emergencyContact: {
                  name: emergencyContactName,
                  relation: emergencyContactRelation,
                  phoneNumber: emergencyContactPhoneNumber,
                },
              })
            }
            color="primary"
          >
            Submit
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
