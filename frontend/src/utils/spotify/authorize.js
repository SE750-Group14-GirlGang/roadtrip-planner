const redirect_uri = 'http://localhost:3000/road-trip/spotify-playlist/callback';
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const TOKEN = 'https://accounts.spotify.com/api/token';

export function requestAuthorization() {
  const scopes = 'user-read-private user-read-email spotify-modify-public spotify-modify-private';
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
  // eslint-disable-next-line func-names
  return new Promise(function (resolve) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `Basic ${btoa(`${client_id}:${client_secret}`)}`);
    xhr.send(body);
    // eslint-disable-next-line func-names
    xhr.onload = function () {
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        if (data.access_token !== undefined) {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('token_retrieved', new Date().getTime());
        }
        if (data.refresh_token !== undefined) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
        resolve();
      }
    };
  });
}

export async function fetchAccessToken(code) {
  const body = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURI(
    redirect_uri
  )}&client_id=${client_id}&client_secret=${client_secret}`;

  await callAuthApi(body);
}

export async function refreshAccessToken() {
  const refresh_token = localStorage.getItem('refresh_token');
  const body = `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${client_id}`;

  await callAuthApi(body);
}

export default { getCode, fetchAccessToken, requestAuthorization };
