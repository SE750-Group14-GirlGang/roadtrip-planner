import { useEffect, useState } from "react";
import axios from 'axios';

export default function usePost(url, body = {}, config = {}) {
    
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function performPost() {
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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return { response, error, loading };
}