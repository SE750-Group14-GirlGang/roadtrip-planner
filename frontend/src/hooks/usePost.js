import { useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function usePost() {
  const { getAccessTokenSilently } = useAuth0();

  const post = useCallback(async (url, body = {}, config = {}) => {
    const accessToken = await getAccessTokenSilently();
    // set token in Authorization header
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const axiosResponse = await axios.post(url, body, config);
      return { response: axiosResponse, error: null };
    } catch (error) {
      return { response: null, error };
    }
  });

  return post;
}
