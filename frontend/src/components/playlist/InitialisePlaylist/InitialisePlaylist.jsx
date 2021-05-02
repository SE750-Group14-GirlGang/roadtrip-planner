import { Button } from '@material-ui/core';
import React from 'react';

const SPOTIFY_BASE = 'https://accounts.spotify.com';
const redirect_uri = 'http://localhost:3000/road-trip/608a11a9b1a2ffd010b1d738/spotify-playlist/callback';
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const request = require('request'); // "Request" library

const getToken = (authorization_code) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: authorization_code,
      redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    console.log(body);

    if (!error && response.statusCode === 200) {
      console.log('Success!');
      console.log(response);
    } else {
      console.log('Bad!');
      console.log(response);
    }
  });
};

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

export default function InitialisePlaylist() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorization_code = urlParams.get('code');

  if (authorization_code) {
    return <Button onClick={() => getToken(authorization_code)}>Get Token</Button>;
  }

  return <Button onClick={authorizeSpotify}>Log In to Spotify</Button>;
}
