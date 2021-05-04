import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import styles from './Playlist.module.css';

export default function Playlist({ content }) {
  return (
    <div className={styles.playlist}>
      <h1>{content.name}</h1>
      <p>{content.description}</p>

      <TableContainer className={styles.tracks}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className={styles.headerRow}>
              <TableCell>Name</TableCell>
              <TableCell align="right">Artist</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content.tracks.map((track) => (
              <TableRow key={track.name} className={styles.tableRow}>
                <TableCell component="th" scope="row">
                  {track.name}
                </TableCell>
                <TableCell align="right">{track.artists.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
