import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';

const SPOTIFY_BASE = 'https://accounts.spotify.com';
const redirect_uri = 'http://localhost:3000/road-trip/608a11a9b1a2ffd010b1d738/spotify-playlist/callback';
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const request = require('request'); // "Request" library

function authorizeSpotify() {
  const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  const auth_url =
    `${SPOTIFY_BASE}/authorize?` +
    `client_id=${client_id}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  window.location.replace(auth_url);
}

export default function InitialisePlaylist() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userId, setUserId] = useState('');

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
      if (!error && response.statusCode === 200) {
        setAccessToken(body?.access_token);
        setRefreshToken(body?.refresh_token);

        axios({
          url: 'https://api.spotify.com/v1/me',
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${body?.access_token}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          setUserId(response.data.id);

          axios({
            url: `https://api.spotify.com/v1/users/${response.data.id}/playlists`,
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${body?.access_token}`,
              'Content-Type': 'application/json',
            },
            data: {
              name: 'collaborative one!',
              description: 'This is my roadie playlist woo',
              public: false,
              collaborative: true,
            },
          }).then((response) => {
            console.log('playlist created');
            console.log(response);
          });
        });
      }
    });
  };

  function createPlaylist(authorization_code) {
    getToken(authorization_code);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const authorization_code = urlParams.get('code');

  if (authorization_code) {
    return (
      <div>
        <p>Access Token: {accessToken}</p>
        <p>Refresh Token: {refreshToken}</p>
        <p>User ID: {userId}</p>
        <Button onClick={() => createPlaylist(authorization_code)}>Get Token</Button>
      </div>
    );
  }

  return <Button onClick={authorizeSpotify}>Log In to Spotify</Button>;
}
