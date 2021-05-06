import { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { OrganiserContext } from '../../../contexts/OrganiserContextProvider';
import {
  refreshAccessToken,
  requestAuthorization,
} from '../../../pages/RoadTripPage/SpotifyPlaylistPage/utils/authorize';
import { getPlaylist } from '../../../pages/RoadTripPage/SpotifyPlaylistPage/utils/spotifyApiCalls';
import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';
import Playlist from '../Playlist/Playlist';

// TODO handle when access token expires
export default function SpotifyPlaylistPageWrapper({ spotifyPlaylistId }) {
  const { isUserOrganiser } = useContext(OrganiserContext);
  const [playlistId, setPlaylistId] = useState(spotifyPlaylistId);
  const [playlist, setPlaylist] = useState({
    name: null,
    description: null,
    tracks: [],
  });

  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  // If no playlist has been set up, and the user is not a host
  if (!playlistId && !isUserOrganiser) {
    return (
      <div>
        <h1>Playlist</h1>
        <p>The organiser has not created a playlist yet.</p>
      </div>
    );
  }

  if (!accessToken || !refreshToken) {
    return <Button onClick={requestAuthorization}>Authorize Spotify</Button>;
  }

  // Check if access token is valid (they only last 1 hour)
  const ONE_HOUR = 60 * 60 * 1000;
  if (!accessToken && new Date().getTime() - localStorage.getItem('token_retrieved') >= ONE_HOUR) {
    refreshAccessToken();
  }

  if (playlistId && accessToken && !playlist.name) {
    getPlaylist(playlistId, setPlaylist);
  }

  return (
    <div>
      {playlist.name && playlistId && (
        <Playlist
          playlistId={playlistId}
          content={playlist}
          isUserOrganiser={isUserOrganiser}
          setPlaylist={setPlaylist}
        />
      )}
      {!playlistId && accessToken && <CreatePlaylist setPlaylistId={setPlaylistId} />}
    </div>
  );
}
