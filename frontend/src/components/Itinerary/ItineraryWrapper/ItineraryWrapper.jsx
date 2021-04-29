import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Itinerary from '../Itinerary';
import Spinner from '../../commons/Spinner/Spinner';
import useGet from '../../../hooks/useGet';

export default function ItineraryWrapper() {
  const { id } = useParams();
  const URL = `/api/roadtrip/${id}/itinerary`;
  // get itinenary data
  const { response, loading } = useGet(URL);

  return <div>{loading || !response ? <Spinner /> : <Itinerary itineraryData={response.data} />}</div>;
}
