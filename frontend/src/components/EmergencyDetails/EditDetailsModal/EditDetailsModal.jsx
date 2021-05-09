import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import styles from './EditDetailsModal.module.css';
import usePut from '../../../hooks/usePut';

export default function EditDetailsModal({ userEmergencyDetails, open, onClose, refetchEmergencyDetails }) {
  const { id } = useParams();
  const put = usePut();

  const [name, setName] = useState(userEmergencyDetails?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(userEmergencyDetails?.phoneNumber || '');
  const [emergencyContactName, setEmergencyContactName] = useState(userEmergencyDetails?.emergencyContact.name || '');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState(
    userEmergencyDetails?.emergencyContact.relation || ''
  );
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] = useState(
    userEmergencyDetails?.emergencyContact.phoneNumber || ''
  );

  useEffect(() => {
    setName(userEmergencyDetails?.name || '');
    setPhoneNumber(userEmergencyDetails?.phoneNumber || '');
    setEmergencyContactName(userEmergencyDetails?.emergencyContact.name || '');
    setEmergencyContactRelation(userEmergencyDetails?.emergencyContact.relation || '');
    setEmergencyContactPhoneNumber(userEmergencyDetails?.emergencyContact.phoneNumber || '');
  }, [userEmergencyDetails]);

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
    setEmergencyContactPhoneNumber(event.target.value);
  };

  const handleSubmit = async (emergencyDetails) => {
    await put(`/api/roadtrip/${id}/emergencydetails/user`, emergencyDetails);
    refetchEmergencyDetails();
    onClose();
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>Edit emergency contact details</DialogTitle>
        <DialogContent>
          <div className={styles.textField}>
            <TextField
              id="enter-name-field"
              variant="outlined"
              fullWidth
              label="Enter name"
              defaultValue={name}
              onChange={handleNameChange}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              id="phone-number-field"
              variant="outlined"
              fullWidth
              label="Enter phone number"
              defaultValue={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              id="emergency-contact-name-field"
              variant="outlined"
              fullWidth
              label="Enter emergency contact's name"
              defaultValue={emergencyContactName}
              onChange={handleEmergencyContactNameChange}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              id="emergency-contact-relation-field"
              variant="outlined"
              fullWidth
              label="Enter emergency contact's relation"
              defaultValue={emergencyContactRelation}
              onChange={handleEmergencyContactRelationChange}
            />
          </div>
          <div className={styles.bottomTextField}>
            <TextField
              id="emergency-contact-phone-field"
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
            id="submit-details"
            onClick={() =>
              handleSubmit({
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
          <Button id="cancel-button" onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
