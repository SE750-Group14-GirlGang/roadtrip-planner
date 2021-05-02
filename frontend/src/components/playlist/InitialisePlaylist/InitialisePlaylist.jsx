import { Button } from '@material-ui/core';
import React from 'react';
import axios from 'axios';

const SPOTIFY_BASE = 'https://accounts.spotify.com';
const redirect_uri = 'http://localhost:3000/road-trip/608a11a9b1a2ffd010b1d738/spotify-playlist/callback';
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

function authorizeSpotify() {
  const scopes = 'user-read-private user-read-email';
  const auth_url =
    `${SPOTIFY_BASE}/authorize?` +
    `client_id=${client_id}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  window.location.replace(auth_url);
}

// TODO Fix Token 400 response
const getToken = (authorization_code) => {
  return axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    params: {
      code: authorization_code,
      grant_type: 'authorization_code',
      redirect_uri,
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((token) => {
      return token;
    })
    .catch((error) => {
      console.error(error.response);
      console.error(error.response.data);
    });
};

export default function InitialisePlaylist() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorization_code = urlParams.get('code');

  if (authorization_code) {
    const token = getToken(authorization_code);
    return <div>Trying to get Token</div>;
  }

  return <Button onClick={authorizeSpotify}>Log In to Spotify</Button>;
}
