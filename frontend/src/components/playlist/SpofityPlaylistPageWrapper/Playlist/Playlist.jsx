import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './Playlist.module.css';
import { followPlaylist } from '../../utils/spotifyApiCalls';
import SearchTracks from './SearchTracks/SearchTracks';

export default function Playlist({ playlistId, content, isUserOrganiser, setPlaylist }) {
  const OPEN_SPOTIFY_LINK = `https://open.spotify.com/playlist/${playlistId}`;

  return (
    <div className={styles.playlist}>
      <h1>{content.name}</h1>
      <p>{content.description}</p>
      {!isUserOrganiser && <Button onClick={() => followPlaylist(playlistId)}>Follow</Button>}
      <Button href={OPEN_SPOTIFY_LINK} target="_blank">
        Open Spotify
      </Button>

      <TableContainer className={styles.tracks}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={styles.headerRow}>
              <TableCell>Name</TableCell>
              <TableCell align="right">Artist</TableCell>
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
