import { useState } from 'react';

const useFetchWithProgress = (setProgress) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url) => {
        setLoading(true);
        setError(null);
        setProgress(10);

        try {
            const response = await fetch(url);
            setProgress(30);

            const result = await response.json();
            setProgress(70);

            setData(result);
            setProgress(100);

            return result;
        } catch (err) {
            setError(err.message);
            console.log(err);
            setProgress(100);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};

export default useFetchWithProgress;
