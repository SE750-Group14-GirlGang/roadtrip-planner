import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';

async function setUserId() {
  await axios({
    url: 'https://api.spotify.com/v1/me',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      localStorage.setItem('spotify_user_id', response.data.id);
    }
  });
}

export async function createPlaylist(name, description, setPlaylistId) {
  const accessToken = localStorage.getItem('access_token');
  const spotify_user_id = localStorage.getItem('spotify_user_id');

  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(accessToken);

  if (!spotify_user_id) {
    await setUserId();
  }

  spotify
    .createPlaylist(localStorage.getItem('spotify_user_id'), {
      name,
      description,
      public: false,
      collaborative: true,
    })
    .then((r) => setPlaylistId(r.id));
}

export default { createPlaylist };
