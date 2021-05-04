import { React } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EmergencyDetailsPage.module.css';

import EmergencyDetails from '../../../components/EmergencyDetails/EmergencyDetails';
import Spinner from '../../../components/commons/Spinner/Spinner';

import useGet from '../../../hooks/useGet';

export default function EmergencyDetailsPage() {
  const { id } = useParams();

  const { response: allEmergencyDetails, loading: allEmergencyDetailsLoading } = useGet(
    `/api/roadtrip/${id}/emergencydetails`
  );
  const { response: userEmergencyDetails, loading: userEmergencyDetailsLoading } = useGet(
    `/api/roadtrip/${id}/emergencydetails/user`
  );

  const isLoading = allEmergencyDetailsLoading || userEmergencyDetailsLoading;

  return (
    <div className={styles.emergencyDetailsPage}>
      <p className={styles.title}>Emergency Details</p>
      {isLoading && <Spinner />}
      {!isLoading && (
        <EmergencyDetails
          allEmergencyDetails={allEmergencyDetails?.data}
          userEmergencyDetails={userEmergencyDetails?.data}
        />
      )}
    </div>
  );
}
