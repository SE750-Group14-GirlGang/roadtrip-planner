import { useEffect } from "react";
import axios from 'axios';

export default function usePost(url, body = {}, config = {}) {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function performPost() {
            setLoading(true);
            try {
                const response = await axios.post(url, body, config);
                setData(response.data);
                setError(null);
            } catch (error) {
                setError(error);
                setData(null);
            }
            setLoading(false);
        }
        performPost();
    }, []);

    return { data, error, loading };
}