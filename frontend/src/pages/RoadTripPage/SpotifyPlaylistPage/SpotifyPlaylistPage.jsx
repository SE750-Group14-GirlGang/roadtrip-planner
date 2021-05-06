import React from 'react';
import { useParams } from 'react-router-dom';
import useGet from '../../../hooks/useGet';
import Spinner from '../../../components/commons/Spinner/Spinner';
import SpotifyPlaylistPageWrapper from '../../../components/playlist/SpofityPlaylistPageWrapper/SpotifyPlaylistWrapper';

export default function SpotifyPlaylistPage() {
  const { id } = useParams();
  const { response, loading } = useGet(`/api/roadtrip/${id}/spotify`);

  return (
    <div>
      {loading || !response ? <Spinner /> : <SpotifyPlaylistPageWrapper spotifyPlaylistId={response.data.playlistId} />}
    </div>
  );
}
