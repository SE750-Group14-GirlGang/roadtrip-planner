import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { getCode, fetchAccessToken, requestAuthorization, refreshAccessToken } from './utils/authorize';
import CreatePlaylist from '../../../components/playlist/CreatePlaylist/CreatePlaylist';
import Playlist from '../../../components/playlist/Playlist/Playlist';
import { getPlaylist } from './utils/spotifyApiCalls';

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

  const code = getCode();
  if (code && (!tokens.access_token || !tokens.refresh_token)) {
    fetchAccessToken(code);
  } else if (!tokens.access_token || !tokens.refresh_token) {
    return <Button onClick={requestAuthorization}>Authorize Spotify</Button>;
  }

  // Check if access token is valid (they only last 1 hour)
  const ONE_HOUR = 60 * 60 * 1000;
  if (new Date().getTime() - localStorage.getItem('token_retrieved') >= ONE_HOUR) {
    refreshAccessToken();
  }

  if (playlistId && tokens.access_token && !playlist.name) {
    getPlaylist(playlistId, setPlaylist);
  }

  return (
    <div>
      {playlist.name && playlistId && <Playlist content={playlist} />}
      {!playlistId && tokens.access_token && <CreatePlaylist setPlaylistId={setPlaylistId} />}
    </div>
  );
}
