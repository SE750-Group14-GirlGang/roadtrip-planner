import React from 'react';
import styles from './SpotifyPlaylistPage.module.css';
import InitialisePlaylist from '../../../components/playlist/InitialisePlaylist/InitialisePlaylist';

export default function SpotifyPlaylistPage() {
  const playlistCreated = false;
  const isHost = true;

  return (
    <div className={styles.playlistPage}>
      <p className={styles.playlistPageTitle}>Playlist</p>
      {playlistCreated ? (
        <div>Playlist Created</div>
      ) : (
        <div>
          <p>The organiser has not created a playlist yet.</p>
          {isHost ? <InitialisePlaylist /> : null}
        </div>
      )}
    </div>
  );
}
