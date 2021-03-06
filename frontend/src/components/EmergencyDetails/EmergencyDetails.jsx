import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableContainer, TableHead, Paper } from '@material-ui/core';
import { CustomTableCell, CustomTableRow } from './EmergencyDetails.styles';
import styles from './EmergencyDetails.module.css';

import EditDetailsModal from './EditDetailsModal/EditDetailsModal';
import AddButton from '../commons/buttons/AddButton/AddButton';

export default function EmergencyDetails({ allEmergencyDetails, userEmergencyDetails, refetchEmergencyDetails }) {
  const [editDetailsModalOpen, setEditDetailsModalOpen] = useState(false);
  const [addButtonText, setAddButtonText] = useState('Add Your Details');

  const handleOpenEditDetailsModal = () => {
    setEditDetailsModalOpen(true);
  };
  const handleCloseEditDetailsModal = () => {
    setEditDetailsModalOpen(false);
  };

  useEffect(() => {
    if (userEmergencyDetails) {
      setAddButtonText('Edit Your Details');
    } else {
      setAddButtonText('Add Your Details');
    }
  }, [userEmergencyDetails]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.table}>
          <TableContainer component={Paper}>
            <Table id="emergency-details-table">
              <TableHead>
                <CustomTableRow>
                  <CustomTableCell>Name</CustomTableCell>
                  <CustomTableCell>Number</CustomTableCell>
                  <CustomTableCell>Emergency Contact Name</CustomTableCell>
                  <CustomTableCell>Emergency Contact Relation</CustomTableCell>
                  <CustomTableCell>Emergency Contact Number</CustomTableCell>
                </CustomTableRow>
              </TableHead>
              <TableBody>
                {allEmergencyDetails &&
                  allEmergencyDetails.map((emergencyDetails) => (
                    <CustomTableRow key={emergencyDetails.user}>
                      <CustomTableCell>{emergencyDetails.name}</CustomTableCell>
                      <CustomTableCell>{emergencyDetails.phoneNumber}</CustomTableCell>
                      <CustomTableCell>{emergencyDetails.emergencyContact.name}</CustomTableCell>
                      <CustomTableCell>{emergencyDetails.emergencyContact.relation}</CustomTableCell>
                      <CustomTableCell>{emergencyDetails.emergencyContact.phoneNumber}</CustomTableCell>
                    </CustomTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.buttonContainer}>
          <AddButton id="details-button" onClick={handleOpenEditDetailsModal}>
            {addButtonText}
          </AddButton>
        </div>
      </div>
      <EditDetailsModal
        userEmergencyDetails={userEmergencyDetails}
        open={editDetailsModalOpen}
        onClose={handleCloseEditDetailsModal}
        refetchEmergencyDetails={refetchEmergencyDetails}
      />
    </>
  );
}
