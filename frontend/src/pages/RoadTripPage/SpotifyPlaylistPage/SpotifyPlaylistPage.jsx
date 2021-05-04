import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CreatePlaylist from '../../../components/playlist/CreatePlaylist/CreatePlaylist';
import Playlist from '../../../components/playlist/Playlist/Playlist';

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
  const playlistId = '070Bs0e7yP4dvUbE9eKDuf'; // TODO Get from backend
  const isHost = true; // TODO Determine from backend

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [spotifyUserId, setSpotifyUserId] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  function getPlaylist() {
    console.log(`getting playlist! ${accessToken}`);
    console.log(`playlist id! ${playlistId}`);

    axios({
      url: `https://api.spotify.com/v1/playlists/${playlistId}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log('get playlist: ', response);

      // Build the playlist state
      const tracks = [];
      response.data.tracks.items.forEach((item) => {
        const { track } = item.track;
        const artist_array = [];
        track.artists.forEach((artist) => {
          artist_array.push(artist.name);
        });

        tracks.push({
          name: track.name,
          artist: artist_array,
        });
      });

      setPlaylist({
        name: response.data.name,
        description: response.data.description,
        tracks,
      });
    });
  }

  useEffect(() => {
    console.log(`acc token changed ${accessToken || '- empty'}`);
    if (accessToken && !playlist && !playlistId && isHost) {
      return <CreatePlaylist spotifyId={spotifyUserId} accessToken={accessToken} refreshToken={refreshToken} />;
      // eslint-disable-next-line
    } else if (accessToken && !playlist && playlistId) {
      getPlaylist();
    }
    return <p>empty</p>;
  }, [accessToken]);

  useEffect(() => {
    console.log('playlist changed!', playlist);
  }, [playlist]);

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

  if (!accessToken && !refreshToken && (!playlist || !playlistId)) {
    const auth_code = getCode();

    // Get the access and refresh token
    if (!auth_code) {
      // Get the authorization code
      return <Button onClick={authorizeSpotify}>Authorize Spotify</Button>;
    }

    getTokensAndUser(auth_code);
  }

  if (playlistId) {
    // If we have a playlist get it from an axios call
  }

  // TODO Dummy data
  const playlistContent = {
    name: `Courtney's Playlist`,
    description: 'This is my playlist description.',
    tracks: [
      {
        name: 'Track 1',
        artist: 'Artist 1',
      },
      {
        name: 'Track 2',
        artist: 'Artist 2',
      },
    ],
  };

  return (
    <div>
      {playlistId == null && isHost && (
        <CreatePlaylist spotifyId={spotifyUserId} accessToken={accessToken} refreshToken={refreshToken} />
      )}

      {playlistId && playlistContent && <Playlist content={playlistContent} />}
    </div>
  );
}
