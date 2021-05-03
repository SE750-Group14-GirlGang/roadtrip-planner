import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CreatePlaylist from '../../../components/playlist/CreatePlaylist/CreatePlaylist';

const request = require('request'); // "Request" library

const SPOTIFY_BASE = 'https://accounts.spotify.com';
const redirect_uri = 'http://localhost:3000/road-trip/608a11a9b1a2ffd010b1d738/spotify-playlist/callback';
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

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

const getCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
};

export default function SpotifyPlaylistPage() {
  const playlistId = null; // TODO Get from backend
  const isHost = true; // TODO Determine from backend

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [spotifyUserId, setSpotifyUserId] = useState('');

  function getTokensAndUser(auth_code) {
    // Then we can get the access and refresh tokens

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: auth_code,
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
        console.log('access token ', body?.access_token);
        console.log('refresh token ', body?.refresh_token);

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
          setSpotifyUserId(response.data.id);
        });
      }
    });
  }

  // If no playlist has been set up, and the user is not a host
  if (playlistId === null && !isHost) {
    return (
      <div>
        <h1>Playlist</h1>
        <p>The organiser has not created a playlist yet.</p>
      </div>
    );
  }

  if (playlistId === null && isHost) {
    if (!accessToken && !refreshToken) {
      const auth_code = getCode();

      // Get the access and refresh token
      if (!auth_code) {
        // Get the authorization code
        return <Button onClick={authorizeSpotify}>Authorize Spotify</Button>;
      }
      getTokensAndUser(auth_code);
    }

    // We can allow the host to create a playlist using the tokens
    return <CreatePlaylist spotifyId={spotifyUserId} accessToken={accessToken} refreshToken={refreshToken} />;
  }

  if (playlistId) {
    // If we have a playlist it can be shown to all users
    // Get playlist and allow user to add songs
    return <div>Show Playlist to All</div>;
  }

  return <div>Loading...</div>; // TODO remove. Not sure what to return when loading state. Takes a while.
}
