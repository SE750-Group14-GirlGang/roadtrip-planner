import { useEffect, useState } from "react";
import axios from 'axios';

export default function useGet(url, config = {}) {
    
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function performGet() {
            setLoading(true);
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