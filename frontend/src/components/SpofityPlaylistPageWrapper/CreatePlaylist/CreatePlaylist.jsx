import React from 'react';
import { TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import styles from './CreatePlaylist.module.css';
import { createPlaylist } from '../../../utils/spotify/spotifyApiCalls';
import usePost from '../../../hooks/usePost';
import AddButton from '../../commons/buttons/AddButton/AddButton';

export default function CreatePlaylist({ setPlaylistId }) {
  const { id } = useParams();
  const post = usePost();

  const [values, setValues] = React.useState({
    name: '',
    description: '',
  });

  const ERROR_NAME = values.name === '';

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <p className={styles.title}>Create Playlist</p>
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
            error={ERROR_NAME}
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
      <AddButton
        className={styles.createButton}
        onClick={() => createPlaylist(values.name, values.description, id, setPlaylistId, post)}
      >
        Create
      </AddButton>
    </div>
  );
}
