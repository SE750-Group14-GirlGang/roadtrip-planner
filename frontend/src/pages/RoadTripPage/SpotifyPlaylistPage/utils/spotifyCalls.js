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

export async function createPlaylist(name, description) {
  const accessToken = localStorage.getItem('access_token');
  const spotify_user_id = localStorage.getItem('spotify_user_id');

  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(accessToken);

  console.log(spotify_user_id === undefined ? 'true undefined' : 'false defined');
  console.log(spotify_user_id);

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
    .then((r) => console.log(r));
}

export default { createPlaylist };
