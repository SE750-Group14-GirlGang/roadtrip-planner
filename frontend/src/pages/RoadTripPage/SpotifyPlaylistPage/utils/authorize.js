const redirect_uri = 'http://localhost:3000/road-trip/608a11a9b1a2ffd010b1d738/spotify-playlist/callback';
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const TOKEN = 'https://accounts.spotify.com/api/token';

export function requestAuthorization() {
  const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  window.location.href =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${client_id}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
}

export const getCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
};

function callAuthApi(body) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', TOKEN, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', `Basic ${btoa(`${client_id}:${client_secret}`)}`);
  xhr.send(body);
  xhr.onload = function () {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      console.log(data);
      if (data.access_token !== undefined) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('token_retrieved', new Date().getTime());
      }
      if (data.refresh_token !== undefined) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }
    }
  };
}

export function fetchAccessToken(code) {
  const body = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURI(
    redirect_uri
  )}&client_id=${client_id}&client_secret=${client_secret}`;

  callAuthApi(body);
}

export function refreshAccessToken() {
  const refresh_token = localStorage.getItem('refresh_token');
  const body = `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${client_id}`;

  callAuthApi(body);
}

export default { getCode, fetchAccessToken, requestAuthorization };
