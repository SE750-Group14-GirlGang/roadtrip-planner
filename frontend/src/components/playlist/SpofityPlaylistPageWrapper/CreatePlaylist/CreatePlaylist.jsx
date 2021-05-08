import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import styles from './CreatePlaylist.module.css';
import { createPlaylist } from '../../utils/spotifyApiCalls';
import usePost from '../../../../hooks/usePost';

function handleCreate(name, description, roadTrip, setPlaylistId, post) {
  if (!name) {
    alert('You must submit a name for your playlist.');
  } else {
    createPlaylist(name, description, roadTrip, setPlaylistId, post);
  }
}

export default function CreatePlaylist({ setPlaylistId }) {
  const { id } = useParams();
  const post = usePost();

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
        onClick={() => handleCreate(values.name, values.description, id, setPlaylistId, post)}
      >
        Create
      </Button>
    </div>
  );
}
