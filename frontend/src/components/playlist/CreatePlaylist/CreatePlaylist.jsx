import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import styles from './CreatePlaylist.module.css';
import { createPlaylist } from '../../../pages/RoadTripPage/SpotifyPlaylistPage/utils/spotifyApiCalls';

export default function CreatePlaylist({ setPlaylistId }) {
  const [values, setValues] = React.useState({
    name: null,
    description: null,
  });

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <h1>Create Playlist</h1>
      <form noValidate autoComplete="off">
        <div className={styles.inputSection}>
          <TextField
            className={styles.field}
            required
            id="outlined-required"
            label="Name"
            variant="outlined"
            onChange={handleChangeForm('name')}
            value={values.name}
          />
        </div>
        <div className={styles.inputSection}>
          <TextField
            className={styles.field}
            id="outlined-required"
            label="Description"
            variant="outlined"
            onChange={handleChangeForm('description')}
            value={values.description}
          />
        </div>
      </form>
      <Button
        className={styles.createButton}
        onClick={() => createPlaylist(values.name, values.description, setPlaylistId)}
      >
        Create
      </Button>
    </div>
  );
}
