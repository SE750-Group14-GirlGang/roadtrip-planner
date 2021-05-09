import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import styles from './Playlist.module.css';
import { followPlaylist } from '../../utils/spotifyApiCalls';
import SearchTracks from './SearchTracks/SearchTracks';
import AddButton from '../../../commons/buttons/AddButton/AddButton';

export default function Playlist({ playlistId, content, isUserOrganiser, setPlaylist }) {
  const OPEN_SPOTIFY_LINK = `https://open.spotify.com/playlist/${playlistId}`;

  return (
    <div className={styles.playlist}>
      <p className={styles.title}>{content.name}</p>
      <p>{content.description}</p>
      {!isUserOrganiser && (
        <AddButton className={styles.spotifyActionButton} onClick={() => followPlaylist(playlistId)}>
          Follow
        </AddButton>
      )}
      <AddButton className={styles.spotifyActionButton} href={OPEN_SPOTIFY_LINK} target="_blank">
        Open Spotify
      </AddButton>

      <TableContainer className={styles.tracks}>
        <Table aria-label="simple table">
          <TableHead className={styles.headerRow}>
            <TableRow>
              <TableCell>
                <div className={styles.headerText}>Name</div>
              </TableCell>
              <TableCell align="right">
                <div className={styles.headerText}>Artist</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content.tracks.length > 0 ? (
              content.tracks.map((track, key) => (
                <TableRow key={key} className={styles.tableRow}>
                  <TableCell component="th" scope="row">
                    {track.name}
                  </TableCell>
                  <TableCell align="right">{track.artists.join(', ')}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="empty-playlist" className={styles.emptyPlaylist}>
                <TableCell colSpan={2} align="center" component="th" scope="row">
                  This playlist currently has no songs.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isUserOrganiser && <SearchTracks playlistId={playlistId} setPlaylist={setPlaylist} />}
    </div>
  );
}
