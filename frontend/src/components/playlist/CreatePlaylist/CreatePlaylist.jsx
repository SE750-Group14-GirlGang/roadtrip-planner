import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Component } from 'react';
import styles from './CreatePlaylist.module.css';

function createPlaylist(name, description, spotifyId, accessToken) {
  console.log(name);
  console.log(description);
  console.log(spotifyId);
  console.log(accessToken);

  axios({
    url: `https://api.spotify.com/v1/users/${spotifyId}/playlists`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: {
      name,
      description,
      public: false,
      collaborative: true,
    },
  }).then((response) => {
    console.log('playlist created');
    console.log(response);
  });
}

class CreatePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  setName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  setDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    const { name, description } = this.state;
    const { spotifyId, accessToken, refreshToken } = this.props;

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
              onChange={this.setName}
              value={name}
            />
          </div>
          <div className={styles.inputSection}>
            <TextField
              className={styles.field}
              id="outlined-required"
              label="Description"
              variant="outlined"
              onChange={this.setDescription}
              value={description}
            />
          </div>
        </form>
        <Button
          className={styles.createButton}
          onClick={() => createPlaylist(name, description, spotifyId, accessToken, refreshToken)}
        >
          Create
        </Button>
      </div>
    );
  }
}

export default CreatePlaylist;
