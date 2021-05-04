import React from 'react';
import { Table, TableBody, TableContainer, TableHead, Paper } from '@material-ui/core';
import { CustomTableCell, CustomTableRow } from './EmergencyDetails.styles';
import styles from './EmergencyDetails.module.css';

export default function EmergencyDetails({ allEmergencyDetails, userEmergencyDetails }) {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table>
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
    </div>
  );
}
