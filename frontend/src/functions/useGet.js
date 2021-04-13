import { useEffect } from "react";
import axios from 'axios';

export default function useGet(url, config = {}) {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function performGet() {
            setLoading(true);
            try {
                const response = await axios.get(url, config);
                setData(response.data);
                setError(null);
            } catch (error) {
                setError(error);
                setData(null);
            }
            setLoading(false);
        }
        performGet();
    }, []);

    return { data, error, loading };

}