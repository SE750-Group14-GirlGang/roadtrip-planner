import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import styles from './Playlist.module.css';
import {
  addSong,
  followPlaylist,
  searchTrack,
} from '../../../pages/RoadTripPage/SpotifyPlaylistPage/utils/spotifyApiCalls';

export default function Playlist({ playlistId, content, isUserOrganiser, setPlaylist }) {
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

function SearchTracks({ playlistId, setPlaylist }) {
  const [tracks, setTracks] = useState([]);

  const handleChangeForm = (event) => {
    const { value } = event.target;
    if (!value) {
      setTracks([]);
    } else {
      searchTrack(value, setTracks);
    }
  };

  return (
    <div className={styles.search}>
      <h1>Search Tracks</h1>
      <TextField
        className={styles.searchField}
        required
        id="outlined-required"
        variant="outlined"
        onChange={handleChangeForm}
      />
      <List>
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <ListItem className={styles.listItem} onClick={() => addSong(playlistId, track, setPlaylist)}>
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <b className={styles.text}>{track.name}</b>
              <Divider orientation="vertical" flexItem m={20} />
              <body className={styles.text}>{track.artists.join(', ')}</body>
            </ListItem>
          ))
        ) : (
          <p>Search songs to add!</p>
        )}
      </List>
    </div>
  );
}
