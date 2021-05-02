import { React } from 'react';
import { useParams } from 'react-router-dom';
import MapPage from '../MapPage';
import Spinner from '../../../../components/commons/Spinner/Spinner';
import useGet from '../../../../hooks/useGet';

export default function MapPageWrapper() {
  const { id } = useParams();
  const URL = `/api/roadtrip/${id}/itinerary`;
  // get itinenary data
  const { response, loading } = useGet(URL);

  // show spinner while data is being fetched
  return <div>{loading || !response ? <Spinner /> : <MapPage mapData={response.data} />}</div>;
}
