import React, { useState } from 'react';
import { Divider, List, ListItem, ListItemIcon, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { addSong, searchTrack } from '../../../utils/spotifyApiCalls';
import styles from './SearchTracks.module.css';

export default function SearchTracks({ playlistId, setPlaylist }) {
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
      <p className={styles.title}>Search Tracks</p>
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
            <ListItem
              key={track.key}
              className={styles.listItem}
              onClick={() => addSong(playlistId, track, setPlaylist)}
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <b className={styles.text}>{track.name}</b>
              <Divider orientation="vertical" flexItem m={20} />
              <div className={styles.text}>{track.artists.join(', ')}</div>
            </ListItem>
          ))
        ) : (
          <p>Search songs to add!</p>
        )}
      </List>
    </div>
  );
}
