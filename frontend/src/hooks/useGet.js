import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function useGet(url, config = {}) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { response, error, loading };
}
