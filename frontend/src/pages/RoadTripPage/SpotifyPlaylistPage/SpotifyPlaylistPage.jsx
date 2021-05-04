import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { getCode, fetchAccessToken, requestAuthorization } from './utils/authorize';
import CreatePlaylist from '../../../components/playlist/CreatePlaylist/CreatePlaylist';
import Playlist from '../../../components/playlist/Playlist/Playlist';
import { getPlaylist } from './utils/spotifyCalls';

// TODO handle when access token expires
export default function SpotifyPlaylistPage() {
  const isHost = true; // TODO Determine from backend
  const [playlistId, setPlaylistId] = useState(null); // TODO Get from backend
  const [playlist, setPlaylist] = useState({
    name: null,
    description: null,
    tracks: [],
  });

  // If no playlist has been set up, and the user is not a host
  if (!playlistId && !isHost) {
    return (
      <div>
        <h1>Playlist</h1>
        <p>The organiser has not created a playlist yet.</p>
      </div>
    );
  }

  let access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');

  const code = getCode();
  if (code && (!access_token || !refresh_token)) {
    fetchAccessToken(code);
  } else if (!access_token || !refresh_token) {
    return <Button onClick={requestAuthorization}>Authorize Spotify</Button>;
  }

  access_token = localStorage.getItem('access_token');
  if (playlistId && access_token && !playlist.name) {
    getPlaylist(playlistId, setPlaylist);
  }

  return (
    <div>
      {playlist.name && playlistId && <Playlist content={playlist} />}
      {!playlistId && access_token && <CreatePlaylist setPlaylistId={setPlaylistId} />}
    </div>
  );
}
