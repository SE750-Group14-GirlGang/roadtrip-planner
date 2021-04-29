import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function usePost(url, body = {}, config = {}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function performPost() {
      const accessToken = await getAccessTokenSilently();
      // set token in Authorization header
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      setLoading(true);
      try {
        const axiosResponse = await axios.post(url, body, config);
        setResponse(axiosResponse);
        setError(null);
      } catch (error) {
        setError(error);
        setResponse(null);
      }
      setLoading(false);
    }
    performPost();
  }, []);

  return { response, error, loading };
}
