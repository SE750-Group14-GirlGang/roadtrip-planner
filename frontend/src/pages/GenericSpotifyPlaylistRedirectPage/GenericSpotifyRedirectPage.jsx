import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAccessToken, getCode } from '../RoadTripPage/SpotifyPlaylistPage/utils/authorize';
import Spinner from '../../components/commons/Spinner/Spinner';

export default function GenericSpotifyRedirectPage() {
  const id = localStorage.getItem('last_road_trip');
  const redirect = `/road-trip/${id}/spotify-playlist`;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getToken() {
      const code = getCode();
      await fetchAccessToken(code);
    }
    getToken().then(() => {
      setLoading(false);
    });
  });

  return <div>{loading ? <Spinner /> : <Redirect to={redirect} />}</div>;
}
