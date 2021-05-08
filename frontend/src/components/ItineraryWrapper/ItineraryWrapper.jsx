import { React } from 'react';
import { useParams } from 'react-router-dom';
import Itinerary from './Itinerary/Itinerary';
import Spinner from '../commons/Spinner/Spinner';
import useGet from '../../hooks/useGet';

export default function ItineraryWrapper() {
  const { id } = useParams();
  const URL = `/api/roadtrip/${id}/itinerary`;
  // get itinenary data
  const { response, loading } = useGet(URL);

  // show spinner while data is being fetched
  return <>{loading || !response ? <Spinner /> : <Itinerary itineraryData={response.data} />}</>;
}
