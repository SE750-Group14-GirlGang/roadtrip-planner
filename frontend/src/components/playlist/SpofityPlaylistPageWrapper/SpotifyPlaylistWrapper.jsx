import { useContext, useEffect, useState } from 'react';
import { OrganiserContext } from '../../../contexts/OrganiserContextProvider';
import { refreshAccessToken, requestAuthorization } from '../utils/authorize';
import { getPlaylist } from '../utils/spotifyApiCalls';
import CreatePlaylist from './CreatePlaylist/CreatePlaylist';
import Playlist from './Playlist/Playlist';
import styles from './SpotifyPlaylistWrapper.module.css';
import AddButton from '../../commons/buttons/AddButton/AddButton';

const TOKEN_EXPIRATION = 60 * 60 * 1000;

export default function SpotifyPlaylistWrapper({ spotifyPlaylistId }) {
  const { isUserOrganiser } = useContext(OrganiserContext);
  const [playlistId, setPlaylistId] = useState(spotifyPlaylistId);
  const [playlist, setPlaylist] = useState({
    name: '',
    description: '',
    tracks: [],
  });

  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  useEffect(() => {
    // Check if access token is valid (they only last 1 hour)
    const DURATION = new Date().getTime() - localStorage.getItem('token_retrieved');
    if (refreshToken && DURATION >= TOKEN_EXPIRATION) {
      refreshAccessToken().then(() => {
        if (playlistId && localStorage.getItem('access_token') && !playlist.name) {
          getPlaylist(playlistId, setPlaylist);
        }
      });
    } else if (playlistId && localStorage.getItem('access_token') && !playlist.name) {
      getPlaylist(playlistId, setPlaylist);
    }
  });

  // If no playlist has been set up, and the user is not a host
  if (!playlistId && !isUserOrganiser) {
    return (
      <div>
        <p className={styles.title}>Playlist</p>
        <p className={styles.emptyPlaylistDescription}>The organiser has not created a playlist yet!</p>
      </div>
    );
  }

  if (!accessToken || !refreshToken) {
    return <AddButton onClick={requestAuthorization}>Authorize Spotify</AddButton>;
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
