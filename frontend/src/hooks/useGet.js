import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function useGet(url, config = {}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [refetch, setRefetch] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  useEffect(() => {
    async function performGet() {
      setLoading(true);

      const accessToken = await getAccessTokenSilently();
      // set token in Authorization header
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const axiosResponse = await axios.get(url, config);
        setResponse(axiosResponse);
        setError(null);
      } catch (error) {
        setError(error);
        setResponse(null);
      }
      setLoading(false);
    }
    performGet();
  }, [refetch]);

  return { response, error, loading, refetch: handleRefetch };
}
