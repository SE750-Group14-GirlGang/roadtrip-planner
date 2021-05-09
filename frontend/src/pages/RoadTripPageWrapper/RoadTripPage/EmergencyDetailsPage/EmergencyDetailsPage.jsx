import { React } from 'react';
import { useParams } from 'react-router-dom';
import styles from './EmergencyDetailsPage.module.css';

import EmergencyDetails from '../../../../components/EmergencyDetails/EmergencyDetails';
import Spinner from '../../../../components/commons/Spinner/Spinner';

import useGet from '../../../../hooks/useGet';

export default function EmergencyDetailsPage() {
  const { id } = useParams();

  const {
    response: allEmergencyDetails,
    loading: allEmergencyDetailsLoading,
    refetch: refetchAllEmergencyDetails,
  } = useGet(`/api/roadtrip/${id}/emergencydetails`);
  const {
    response: userEmergencyDetails,
    loading: userEmergencyDetailsLoading,
    refetch: refetchUserEmergencyDetails,
  } = useGet(`/api/roadtrip/${id}/emergencydetails/user`);

  const refetch = () => {
    refetchUserEmergencyDetails();
    refetchAllEmergencyDetails();
  };

  const isLoading = allEmergencyDetailsLoading || userEmergencyDetailsLoading;

  return (
    <div className={styles.emergencyDetailsPage}>
      <p className={styles.title}>Emergency Details</p>
      <EmergencyDetails
        allEmergencyDetails={allEmergencyDetails?.data}
        userEmergencyDetails={userEmergencyDetails?.data}
        refetchEmergencyDetails={refetch}
      />
      {isLoading && <Spinner />}
    </div>
  );
}
