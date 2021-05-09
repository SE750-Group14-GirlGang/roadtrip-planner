import React from 'react';
import { useParams } from 'react-router-dom';
import useGet from '../../../hooks/useGet';
import Spinner from '../../../components/commons/Spinner/Spinner';
import SpotifyPlaylistWrapper from '../../../components/SpofityPlaylistPageWrapper/SpotifyPlaylistWrapper';

export default function SpotifyPlaylistPage() {
  const { id } = useParams();
  localStorage.setItem('last_road_trip', id);
  const { response, loading } = useGet(`/api/roadtrip/${id}/spotify`);

  return (
    <div>
      {loading || !response ? <Spinner /> : <SpotifyPlaylistWrapper spotifyPlaylistId={response?.data?.playlistId} />}
    </div>
  );
}
