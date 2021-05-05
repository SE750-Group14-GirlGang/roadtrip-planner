import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import styles from './Playlist.module.css';
import { followPlaylist } from '../../../pages/RoadTripPage/SpotifyPlaylistPage/utils/spotifyApiCalls';

export default function Playlist({ playlistId, content }) {
  return (
    <div className={styles.playlist}>
      <h1>{content.name}</h1>
      <p>{content.description}</p>
      <Button onClick={() => followPlaylist(playlistId)}>Follow</Button>

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
              content.tracks.map((track) => (
                <TableRow key={track.name} className={styles.tableRow}>
                  <TableCell component="th" scope="row">
                    {track.name}
                  </TableCell>
                  <TableCell align="right">{track.artists.toString()}</TableCell>
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
    </div>
  );
}
